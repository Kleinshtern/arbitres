<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Response;

class UsersController extends Controller
{
    public function list(): Application|Response|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $users = User::orderBy('created_at', "DESC")->get();

        return response([
            'users' => $users
        ], 201);
    }
}
