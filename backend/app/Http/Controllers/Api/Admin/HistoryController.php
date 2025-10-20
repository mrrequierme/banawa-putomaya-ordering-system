<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\History;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        $histories = History::orderByRaw("
            CASE
                WHEN status = 'done' THEN 1
                WHEN status = 'unclaimed' THEN 2
                ELSE 3
            END
        ")
        ->with('products')
        ->orderBy('claim_date', 'desc')
        ->get();

        return response()->json($histories);
    }
    
}
