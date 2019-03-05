<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Api\Ad;

class AdsController extends Controller
{
    public function all() {
        $ads = Ad::all();
        return response()->json(array("ads" => $ads)); 
    }
    public function one() {
        return response()->json(array("test", 25));
    } 

    public function create(Request $request) { 
        $post = $request->all();
        if(!empty($post)) {
            $ad = Ad::create([
                "title" => $post["title"],
                "user_id" => $post["user_id"],
                "description" => $post["description"],
                "promo" => $post["promo"],
                "image" => $post["image"]
            ]); 
            if($ad) {
                 return response()->json([
                    "message" => "Ad was created", 
                    "status" => true,
                    "ad" => $ad 
                ]);
            }
            else { 
                return response()->json([
                    "message" => "Ad didn't create",
                    "status" => false
                ]);
            }
        }
    } 

    public function update(Request $request, $id) {}
    public function delete(Request $request, $id) {}
    
}
