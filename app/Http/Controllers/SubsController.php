<?php

namespace App\Http\Controllers;

use App\Events\SubscribeEvent;
use App\Subscribe;
use Illuminate\Http\Request;

class SubsController extends Controller
{
    public function subs(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email'=> "required|email|"
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                "error"=>300,
                'message'=>"invalid email address"
            ]);
        }
        $checkExisting = Subscribe::where('email', $request->email)->first();
        if ($checkExisting) {
            return response()->json([
                "error"=>500,
                'message'=>"Овој емаил е веке зачленет"
            ]);
        }
        $subscriber = new Subscribe();
        $subscriber->email = $request->email;
        $subscriber->save();

        event(new SubscribeEvent($subscriber));
        return response()->json([
            'success'=>200,
            'message'=> "Успешно се зачленивте"
        ]);
        
    }
}
