<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\HistoryController as AdminHistoryController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\User\ProductController as UserProductController;
use App\Http\Controllers\Api\User\OrderController as UserOrderController;

//public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [UserProductController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // user
    Route::middleware('role:user')->prefix('user')->name('user.')->group(function () {
        Route::get('/orders', [UserOrderController::class, 'index']);
        Route::post('/orders', [UserOrderController::class, 'store']);
        Route::delete('/orders/{id}/cancel', [UserOrderController::class, 'cancel']);
    });

    // admin and staff
    Route::middleware('role:admin,staff')->prefix('admin')->group(function () {
        Route::apiResource('products', AdminProductController::class);
        // Orders
        Route::get('/orders/pending', [AdminOrderController::class, 'index']);
        Route::get('/orders/approved', [AdminOrderController::class, 'showApproved']);
        Route::patch('/orders/{order}/approve', [AdminOrderController::class, 'approve']);
        Route::patch('/orders/{order}/done', [AdminOrderController::class, 'done']);
        Route::patch('/orders/{order}/unclaimed', [AdminOrderController::class, 'unclaimed']);
        // History
        Route::get('/histories', [AdminHistoryController::class, 'index']); // View order history

        // User
        Route::get('/users', [AdminUserController::class, 'index']);
        Route::post('/users', [AdminUserController::class, 'store']);
    });

});
