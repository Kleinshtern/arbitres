<?php

use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function() {

    include('admin/users.php');

})->middleware('auth:sanctum|can:view_users');
