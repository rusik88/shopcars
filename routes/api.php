<?php

use Illuminate\Http\Request;

use App\User;

use Laravel\Passport\Passport;


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

Passport::routes(); 

Route::get('users', function () {
    return response()->json([
        "message" => "User was logout",
        "status" => true,
        "user" =>  User::all()
    ]);
})->middleware('auth:api');

Route::post('/logout', ['uses'=>'Api\UserController@logout', 'middleware' => ['auth:api']]); 
Route::post('/register', ['uses'=>'Api\UserController@create', 'middleware' => ['guest']]); 
Route::post('/register/email', ['uses'=>'Api\UserController@userEmail', 'middleware' => ['guest']]); 
