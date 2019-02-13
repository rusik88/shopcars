<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;

class RegisterController extends Controller
{
    public function create(Request $request) {
        if($request->name && $request->email && $request->password) {
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            return response()->json([
                "error" => "Пользователь не добавлен"
            ]);
            /*if($user) {
                return response()->json([
                    "success" => "Пользователь успешно зарегестрирован"
                ]); 
            }
            else {
                return response()->json([
                    "error" => "Пользователь не добавлен"
                ]);
            }*/
        }
        else {
            return response()->json([
                "error" => "Пользователь не добавлен"
            ]);
        }
    }
}
