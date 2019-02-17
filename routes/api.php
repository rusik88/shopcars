<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', ['uses'=>'Api\AuthController@login', 'middleware' => ['guest']]); 
Route::post('/register', ['uses'=>'Api\RegisterController@create', 'middleware' => ['guest']]); 
Route::post('/register/email', ['uses'=>'Api\RegisterController@userEmail', 'middleware' => ['guest']]); 
