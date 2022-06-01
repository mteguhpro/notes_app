<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try
		{
            $key = env('JWT_SECRET_KEY');
            // $jwt = $request->header('X_JWT_DATA') ?? null;
            $jwt = $request->bearerToken();
            if(!$jwt){
                throw new \Exception('Akses ditolak, silahkan login terlebih dahulu.');
            }
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
            $decoded_array = (array) $decoded;
            $request->request->add(['jwt_data' => $decoded_array]);
		}
		catch (\Exception $e)
		{
            return response()->json(['message' => $e->getMessage()], 401);
        }

        return $next($request);
    }
}

//buat data key di file env
//jalankan: php artisan make:middleware NamaMiddleware
//edit middleware
//setelah itu registrasikan middleware di kernel (jika global middleware)
// Atau masukkan ke route jika spesifik/bukan global

