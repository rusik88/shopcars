<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Api\Order;

class OrdersControllet extends Controller
{
    public function all() {

    }

    public function create(Request $request) {
        $post = $request->all();

        
    }
}
