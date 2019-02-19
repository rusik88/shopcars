<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Http\Request;

use App\User;
use Auth;

class UserController extends Controller
{

    public function create(Request $request) {
        if($request->name && $request->email && $request->password) {

            $userEmail = User::where('email', $request->email)->first();

            if(!$userEmail) {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password)
                ]);

                if($user) {
                    return response()->json([
                        "user" => $user,
                        "message" => "User was added",
                        "status" => true
                    ]); 
                }
                else {
                    return response()->json([
                        "message" => "User was found with this email",
                        "status" => false
                    ]);
                }
            }
            else {
                return response()->json([
                    "message" => "User was found with this email",
                    "status" => false
                ]);
            }
        }
        else {
            return response()->json([
                "message" => "User didn't add",
                "status" => false
            ]);
        }
    }

    public function userEmail (Request $request) {
        
        $statArray = [
            "message" => "User didn't find",
            "status" => false
        ];

        if(isset($request->email)) {
            $user = User::where('email', $request->email)->first();
            if($user) {
                $statArray = [
                    "message" => "User was found",
                    "status" => true
                ];
            }
        } 

        return response()->json($statArray);
        
    }

    public function logout() {
        
        
        auth()->user()->tokens->each(function($token, $key) {
            $token->delete();
        });

        return response()->json([
            "message" => "User was logout",
            "status" => true
        ]);
    }
}
