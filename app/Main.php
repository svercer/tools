<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Main extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
