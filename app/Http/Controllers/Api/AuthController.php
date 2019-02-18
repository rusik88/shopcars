<?php

/*namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        if($request->email && $request->password) {
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                return response()->json([
                    "message" => "Authorization was success",
                    "status" => true,
                    "user" => Auth::user()
                ]);
            }
            else {
                return response()->json([
                    "message" => "Login or password no correct",
                    "status" => false
                ]);
            }
        }
    }
}*/

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = '/';

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    } 
}
