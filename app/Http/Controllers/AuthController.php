<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    /**
     * @throws \Exception
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $credentials['username'])->first();

        if(!$user) {
            throw new \Exception("Пользователь не найден", 404);
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            return response([
                'code' => 422,
                'message' => 'Неправильный пароль'
            ],);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'user' => $user,
        ])->withCookie([
            'token' => $token,
        ]);
    }

    public function register(Request $request)
    {

    }

}
