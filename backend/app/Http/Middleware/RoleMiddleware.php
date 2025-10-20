<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->check()) {
            return response()->json([
                'message' => 'Unauthorized — please log in first.'
            ], 401);
        }

        $userRole = auth()->user()->role;
        if (!in_array($userRole, $roles)) {
            return response()->json([
                'message' => 'Forbidden — you do not have permission to access this route.'
            ], 403);
        }
        return $next($request);
    }
}
