<?php

Route::get('/', function () {
    return view('index');
});


//Auth::routes();

Route::get('/login', ['uses'=>'Auth\LoginController@showLoginForm', 'as' => 'login']);
Route::post('/login', ['uses'=>'Auth\LoginController@login']);
Route::post('/logout', ['uses'=>'Auth\LoginController@logout', 'as' => 'logout']);

Route::get('/register', function () {
    return view('index');
});

Route::get('/home', function () {
    return view('index');
});

Route::get('/ad/{id?}', function () {
    return view('index');
})->middleware('web', 'auth');;

Route::get('/list', function () {
    return view('index');
})->middleware('web', 'auth');;

Route::get('/new', function () {
    return view('index'); 
})->middleware('web', 'auth');

Route::get('/orders', function () {
    return view('index');
})->middleware('web', 'auth');;
