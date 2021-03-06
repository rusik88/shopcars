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
    public function one($id) {

        $ad = Ad::where('id', $id)->first();

        if($ad) {
            return response()->json([
                "message" => "Ad was created", 
                "status" => true,
                "ad" => $ad  
            ]);
        }
        else {
            return response()->json([
                "message" => "Ad was found",
                "status" => false
            ]);
        }

        
    } 

    public function create(Request $request) { 
        $post = $request->all();
        if(!empty($post)) {
            $ad = Ad::create([
                "title" => $post["title"],
                "user_id" => $post["user_id"],
                "description" => $post["description"],
                "promo" => $post["promo"],
                "image" => $post["image"] ? "/uploads/".$post["image"] : null
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
            if($file) {
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
                    "message" => "No file",
                    "status" => true,
                    "file" => null
                ]);
            }
        }
    }

    public function update(Request $request, $id) {
        $post = $request->all();
        if(!empty($post)) {

            $ad = Ad::find($id);

            $ad->title =  $post["title"];
            $ad->description =  $post["description"];
            $ad->promo =  $post["promo"];

            if($post["image"]) {
                $ad->image =  "/uploads/".$post["image"]; 
            }

            $ad->save();

            return response()->json([
                "message" => "Ad was updated", 
                "status" => true,
                "ad" =>  $ad
            ]);

           
        }
        else {
            return response()->json([
                "message" => "Ad didn't update", 
                "status" => true 
            ]);
        } 
    }
    public function deleteAd(Request $request) {
        $post = $request->all();

        if($post) {
            $ad = Ad::where('id', $post['id']);
            $ad->delete(); 
            return response()->json([
                "message" => "Ad was deleted", 
                "status" => true
            ]);
        }
        else {
            return response()->json([
                "message" => "Ad didn't deleted", 
                "status" => false
            ]); 
        }


        
    }
    
}
