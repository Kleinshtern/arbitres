<?php

use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    
    Route::controller(UsersController::class)->group(function () {
        Route::get('', 'list');
    });

})->middleware('auth:sanctum');
