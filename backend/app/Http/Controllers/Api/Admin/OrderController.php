<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['products', 'user'])
            ->where('status', 'pending')
            ->orderBy('claim_date') 
            ->get();

        return response()->json($orders);
    }

    public function showApproved()
    {
        $orders = Order::with(['products', 'user'])
            ->where('status', 'approved')
            ->orderBy('claim_date', 'desc') 
            ->orderBy('updated_at') 
            ->get();

        return response()->json($orders);
    }

    public function approve(Order $order)
    {
        $order->update(['status' => 'approved']);
        return response()->json(['message' => 'Order approved successfully!']);
    }

    public function done(Order $order)
    {
        $staff = auth()->user();

        $history = History::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'customer_name' => $order->user->name,
            'customer_email' => $order->user->email,
            'customer_contact' => $order->user->contact,
            'customer_gender' => $order->user->gender,
            'customer_birthday' => $order->user->birthday,
            'customer_address' => $order->user->address,
            'total' => $order->total,
            'claim_date' => $order->claim_date,
            'status' => 'done',
            'staff_id' => $staff->id,
            'staff_name' => $staff->name,
            'staff_email' => $staff->email,
        ]);

        foreach ($order->products as $product) {
            $history->products()->create([
                'name' => $product->name,
                'price' => $product->pivot->price,
                'qty' => $product->pivot->qty,
                'subtotal' => $product->pivot->price * $product->pivot->qty,
            ]);
        }
        $order->update(['status' => 'done']);
        return response()->json(['message' => 'Order marked as done.']);
    }

    public function unclaimed(Order $order)
    {
        $staff = auth()->user();
        $history = History::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'customer_name' => $order->user->name,
            'customer_email' => $order->user->email,
            'customer_contact' => $order->user->contact,
            'customer_gender' => $order->user->gender,
            'customer_birthday' => $order->user->birthday,
            'customer_address' => $order->user->address,
            'total' => $order->total,
            'claim_date' => $order->claim_date,
            'status' => 'unclaimed',
            'staff_id' => $staff->id,
            'staff_name' => $staff->name,
            'staff_email' => $staff->email,
        ]);

        foreach ($order->products as $product) {
            $history->products()->create([
                'name' => $product->name,
                'price' => $product->pivot->price,
                'qty' => $product->pivot->qty,
                'subtotal' => $product->pivot->price * $product->pivot->qty,
            ]);
        }
        $order->update(['status' => 'unclaimed']);
        return response()->json(['message' => 'Order marked as unclaimed.']);
    }
}
