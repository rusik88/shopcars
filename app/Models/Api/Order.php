<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['ad_id', 'name', 'phone'];
}
