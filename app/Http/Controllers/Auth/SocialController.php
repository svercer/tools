<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\UserController;

class SocialController extends Controller
{
    public function social(Request $request)
    {
        $fbUser = User::firstOrCreate([
            'email' => $request->email
        ], [
            'fullname' => $request->fullname,
            'password' => Hash::make(Str::random(24)),
        ]);
        $user = User::where('email', $request->email)->first();

        $token = $user->createToken('access token brainster');
        return response()->json([
            'success' => 200,
            'access_token' => $token->accessToken,
            'fullname' => $user->fullname,
            'email' => $user->email,
            'voting_id'=>$user->id,
        ]);

    }
    
    
    
}
