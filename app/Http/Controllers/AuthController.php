<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Cookie\CookieJar;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Cookie;

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
            throw new \Exception("Неверный пароль", 422);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'user' => $user,
        ])->withCookie($this->createCookieToken($token, 120));
    }

    /**
     * @throws \Exception
     */
    public function register(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string|email',
            'password' => 'required|string',
            'name'     => 'required|string'
        ]);

        if(User::where('email', $credentials['username'])->first()) {
            throw new \Exception(
                "Пользователь с таким Email уже существует"
            );
        }

        $user = new User();
        $user->email = $credentials['username'];
        $user->name = $credentials['name'];
        $user->setPassword($credentials['password']);

        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'user' => $user
        ])->withCookie($this->createCookieToken($token, 120));
    }

    /**
     * @throws \Exception
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            $cookie = \Illuminate\Support\Facades\Cookie::forget('auth_token');

            return response([
                'logout' => true
            ])->withCookie($cookie);
        }
        catch (\Exception $e) {
            throw new \Exception("Произошла непредвиденная ошибка", $e->getCode());
        }
    }

    private function createCookieToken($token, $minutes): Cookie
    {
        return \Illuminate\Support\Facades\Cookie::make(
            'auth_token',
            $token,
            $minutes,
            null,
            env('SESSION_DOMAIN'),
            true
        );
    }

}
