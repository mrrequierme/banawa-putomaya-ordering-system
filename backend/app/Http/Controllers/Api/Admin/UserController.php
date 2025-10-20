<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderByRaw("
            CASE
                WHEN role = 'admin' THEN 1
                WHEN role = 'staff' THEN 2
                ELSE 3
            END
        ")
        ->orderBy('name', 'asc')
        ->get();

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'birthday' => 'required|date|before:today',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:staff,admin',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'gender' => $validated['gender'],
            'birthday' => $validated['birthday'],
            'address' => $validated['address'],
            'contact' => $validated['contact'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user,
        ], 201);
    }
}
