<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    protected $table = 'ads';
    protected $fillable = ['user_id', 'title', 'image', 'description','promo'];
}
