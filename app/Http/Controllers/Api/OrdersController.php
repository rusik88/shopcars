<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Api\Order;

class OrdersController extends Controller
{
    public function all() {
        return response()->json([
            "message" => "All orders'", 
            "status" => true,
            "orders" =>  Order::orderBy('id', 'DESC')->get()
        ]);  
    }

    public function create(Request $request) {
        $post = $request->all();
        
        if($post) {
            $data = array(
                'ad_id' => $post['ad_id'],
                'name' => $post['name'],
                'phone' => $post['phone']
            ); 

            $order = Order::create($data);
            
            if($order) {
                return response()->json([
                    "message" => "You made order. Your order id is '".$order['id']."'", 
                    "status" => true,
                    "order" =>  $order
                ]);
            }
            else {
                return response()->json([
                    "message" => "Your order didn't make. Please try later", 
                    "status" => false,
                ]);
            }
        }

        return response()->json([
            "message" => "Your order didn't make. Please try later", 
            "status" => false,
        ]);
        
        
    }

    public function orderDone(Request $request) {

        $post = $request->all();

        if($post) {

            $order = Order::where('id', $post['id'])->first();

            $order->done = $post['done'];
            $order->save();
            
            return response()->json([
                "message" => "Your order was updated", 
                "status" => true,
                "order" =>  $order
            ]);
        }
        else {
            return response()->json([
                "message" => "Your order didn't update. Please try later", 
                "status" => false,
            ]);
        }
    } 
}
