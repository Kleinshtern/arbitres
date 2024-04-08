<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
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

    /**
     * @throws \Exception
     */
    public function create(CreateUserRequest $createUserRequest)
    {
        $validated = $createUserRequest->validated();

        if($validated) {
            $user = User::createUser($validated);
        }
        else {
            throw new \Exception('Произошла ошибка при создании пользователя');
        }

        return response([
            'user' => $user
        ]);
    }

    /**
     * @throws \Exception
     */
    public function update(UpdateUserRequest $updateUserRequest, User $user)
    {
        $validated = $updateUserRequest->validated();

        if($validated) {
            $user->update($validated);
        }
        else {
            throw new \Exception('Произошлда ошибка при сохранении данных');
        }

        return response([
            'user' => $user
        ]);
    }

    public function delete(User $user)
    {
        $user->delete();

        return response([
            'message' => 'Пользователь был удален'
        ]);
    }
}
