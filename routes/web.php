<?php

use Illuminate\Support\Facades\Route;

Route::get('/{vue_capture?}', function () {
    return view('layout');
})->where('vue_capture', '[\/\w\.-]*');