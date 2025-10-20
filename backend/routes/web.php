<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'ok', 'app' => 'Putomaya API'
    ]);
});

// Route::get('/', fn() => response()->json(['status' => 'ok', 'app' => 'Putomaya API']));
