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

Route::get('/check-token', ['uses'=>'Api\UserController@changeToken', 'middleware' => ['auth:api']]); 

Route::post('/logout', ['uses'=>'Api\UserController@logout', 'middleware' => ['auth:api']]); 
Route::post('/register', ['uses'=>'Api\UserController@create', 'middleware' => ['guest']]); 
Route::post('/register/email', ['uses'=>'Api\UserController@userEmail', 'middleware' => ['guest']]); 


Route::group(['prefix'=>'ad'], function(){
    Route::get('', ['uses'=>'Api\AdsController@all']);
    Route::post('create', ['uses'=>'Api\AdsController@create', 'middleware' => ['auth:api']]);
    Route::post('upload-file', ['uses'=>'Api\AdsController@uploadFile', 'middleware' => ['auth:api']]); 
    Route::post('update/{id}', ['uses'=>'Api\AdsController@update', 'middleware' => ['auth:api']]);
    Route::post('delete', ['uses'=>'Api\AdsController@deleteAd', 'middleware' => ['auth:api']]);  
    Route::get('{id}', ['uses'=>'Api\AdsController@one']); 
});

Route::group(['prefix'=>'order'], function(){
    Route::get('all', ['uses'=>'Api\OrdersController@all', 'middleware' => ['auth:api']]);
    Route::post('create', ['uses'=>'Api\OrdersController@create']);   
    Route::post('done', ['uses'=>'Api\OrdersController@orderDone']);   
});

