<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function main()
    {
        return $this->belongsTo(Main::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
// 
    public function votes(){
        return $this->hasMany(Vote::class);
    }
}
