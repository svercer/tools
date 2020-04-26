<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function mains()
    {
        return $this->hasMany(Main::class);
    }
}
