<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role == 1) {
            # code...
            return response()->json([
                "success"=>200,
                "message"=>"ok"
                ]);
        } else {
            return response()->json([
                'error'=>401,
                'message'=>"not allowed"
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    public function registerUser(Request $request)
    {
        $validator = \Validator::make($request->all() , [
            'fullname' => 'required|string|min:8',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success'=>false,
                'message'=> $validator->messages()->toArray()
            ]);
        }
        $existUser = User::where('email', $request->email)->first();
        if ($existUser) {
            return response()->json([
                'error'=>500,
                'message'=>'Овој емаил е веке регистриран во нашиот систем, изберете друг!'
            ]);
        }

        $user = new User();
        $user->fullname = $request->fullname;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        if ($user) {
            return $this->loginUser($request);
        }

    }

    public function loginUser(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success'=>false,
                'message'=>  $validator->messages()->toArray()
            ]);
        }
        $credentials = request(['email', 'password']);
         
        if(!Auth::attempt($credentials))
        {
            return response()->json([
                'error'=>401,
                'message' => 'Wrong user or password, please try again ...'
            ]);
        } 
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

    public function loginAdmin(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success'=>false,
                'message'=>  $validator->messages()->toArray()
            ]);
        }
        $credentials = request(['email', 'password']);
         
        if(!Auth::attempt($credentials))
        {
            return response()->json([
                'error'=>401,
                'message' => 'Wrong user or password, please try again ...'
            ]);
        } 
        $user = User::where('email', $request->email)->first();

        $token = $user->createToken('access token brainster');
        // $token->save();
        if ($user->role == 1) {
            # code...
            return response()->json([
                'success' => 200,
                'access_token' => $token->accessToken,
                'fullname' => $user->fullname,
                'email' => $user->email,
            ]);
        } else {
            return response()->json([
                'error'=>401,
                'message' => 'You are not Allowed to use this software as Admin'
            ]);
        }        
    }





    // public function logout(Request $request)
    // {
    //     $request->user()->token()->revoke();
    //     return response()->json([
    //         'message' => 'Successfully logged out'
    //     ]);
    // }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */

    // public function user(Request $request)
    // {
    //     return response()->json($request->user());
    // }

    
}
