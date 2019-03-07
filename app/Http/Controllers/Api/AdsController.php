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
                "image" => "/uploads/".$post["image"]
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

    public function uploadFile(Request $request) {
        $config_file = config('main');

        $formats = explode('|', $config_file["formats_image"]);
        

        if($request->hasFile('image')) {
            $status = false;
            $file = $request->file('image');
            foreach($formats as $format) {
                if($file->extension() == $format) {
                    $status = true;
                    if($file->getSize() < $config_file["file_size"]) {
                        $file = $request->file('image'); 
                        $file_name =  time().'_'.$file->getClientOriginalName();
                        $file->move(public_path() . '/uploads', $file_name);
                        return response()->json([
                            "message" => "File was downloaded",
                            "status" => true,
                            "file" => $file_name
                        ]);
                    } 
                    else {
                        $file_size = (int)$config_file["file_size"] / 1000000;
                        return response()->json([
                            "message" => "File must be less than ".$file_size."MB", 
                            "status" => false
                        ]);
                    }
                }
            }
            
            if(!$status) {
                $formats_str = str_replace('|', ', ', $config_file["formats_image"]);
                return response()->json([
                    "message" => "File not format. Accept formats are ".$formats_str,
                    "status" => false
                ]);
            }
        }
        else {
            return response()->json([
                "message" => "File didn't upload. You upload file again, please",
                "status" => false
            ]);
        }
    }
    public function update(Request $request, $id) {}
    public function delete(Request $request, $id) {}
    
}
