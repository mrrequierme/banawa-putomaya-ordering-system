<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $pending = Order::with('products')->where('user_id', $userId)->where('status', 'pending')->latest()->first();

        $records = Order::with('products')->where('user_id', $userId)->where('status', '!=', 'pending')->orderBy('updated_at', 'desc')->get();

        return response()->json([
            'pending' => $pending,
            'records' => $records,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cart' => 'required|array|min:1',
            'claim_date' => 'required|date|after:today',
        ]);

        $cart = $request->cart;
        $userId = $request->user()->id;

        $order = Order::where('user_id', $userId)->where('status', 'pending')->first();

        $total = collect($cart)->sum(fn($i) => $i['qty'] * $i['price']);

        if ($order) {
            $order->update([
                'total' => $total,
                'claim_date' => $request->claim_date,
            ]);

            $order->products()->sync(
                collect($cart)->mapWithKeys(
                    fn($i) => [
                        $i['id'] => ['qty' => $i['qty'], 'price' => $i['price']],
                    ],
                ),
            );
        } else {
            $order = Order::create([
                'user_id' => $userId,
                'total' => $total,
                'claim_date' => $request->claim_date,
                'status' => 'pending',
            ]);

            foreach ($cart as $i) {
                $order->products()->attach($i['id'], [
                    'qty' => $i['qty'],
                    'price' => $i['price'],
                ]);
            }
        }

        return response()->json(
            [
                'message' => 'Your order was placed successfully! It will be reviewed shortly.',
                'order' => $order->load('products'),
            ],
            201,
        );
    }

    public function cancel(Request $request, $id)
    {
        $userId = $request->user()->id;
        $order = Order::where('id', $id)->where('user_id', $userId)->where('status', 'pending')->first();

        if (!$order) {
            return response()->json(['message' => 'No pending order found or already processed.'], 404);
        }

        $order->products()->detach();
        $order->delete();
        return response()->json(['message' => 'Order has been cancelled successfully.']);
    }
}
