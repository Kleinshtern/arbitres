<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');

        Route::get('logout', 'logout')
            ->middleware('auth:sanctum');
    });
});


Route::get('/user', function (Request $request) {

    $user = $request->user();

    return response([
        'user' => $user,
        'permissions' => $user->getAllPermissions(),
    ]);
})->middleware('auth:sanctum');

include('api/admin.php');
