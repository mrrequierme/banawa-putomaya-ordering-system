<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query()->select('id', 'name', 'price', 'description', 'image');
        $products = $query->get()->map(function ($product) {
            $product->image_url = $product->image ? asset('storage/products/' . basename($product->image)) : asset('images/no-image.png');

            return $product;
        });

        return response()->json(
            [
                'message' => $request->user() ? 'User product list loaded.' : 'Public product list loaded.',
                'data' => $products,
            ],
            200,
        );
    }
}
