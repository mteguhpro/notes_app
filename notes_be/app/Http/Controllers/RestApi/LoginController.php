<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if($validator->fails()){
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $user = User::select('id', 'name', 'username', 'role', 'password')
        ->where('email', $request->post('email'))
        ->first();

        if(!$user){
            return response()->json(['message' => 'user tidak ditemukan'], 400);
        }
        
        if (! Hash::check($request->post('password'), $user['password'])) {
            return response()->json(['message' => 'email atau passowrd salah'], 400);
        }

        //jwt-proses
        $key = env('JWT_SECRET_KEY');
        $payload = [
            'id_user' => $user['id'],
            'name' => $user['name'],
            'username' => $user['username'],
            'role' => $user['role'],
            'nbf' => date("U"),
            'exp' => date("U", strtotime('+1 days')),
        ];

        $jwt = JWT::encode($payload, $key, 'HS256');

        return response()->json(['token' => $jwt]);
        //.
    }
}
