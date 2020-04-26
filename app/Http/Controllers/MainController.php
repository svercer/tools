<?php

namespace App\Http\Controllers;

use App\Main;
use Illuminate\Http\Request;

class MainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mains = Main::all()->toArray();
        return response()->json([
            'success'=>true,
            'mains'=> $mains
        ]);
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
        $validator = \Validator::make($request->all(), [
            "main_name"=> "required|string",
            "main_url" => "required|image",
            "category_id"=> "required|integer",
            "main_slug"=> "required|string"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error'=>"validation",
                'message'=>$validator->messages()->toArray()
            ]);
        }

        $slug = Main::where("main_slug", $request->main_slug)->first();

        if ($slug) {
            return response()->json([
                'error'=>"slug",
                'message'=>"Oваа патека веке постои, одберете друга!",
            ]);
        }

        $image = $request->main_url;
        
        $tech = new Main();
        $tech->main_name = $request->main_name;
        $tech->main_url = $image->store('uploads', 'storage');
        $tech->category_id = $request->category_id;
        $tech->main_slug = $request->main_slug;
        $tech->save();

        return response()->json([
            'success'=>200,
            'message'=>'Успешно креиравте технологија'
        ]);
    }
    

    /**
     * Display the specified resource.
     *
     * @param  \App\Main  $main
     * @return \Illuminate\Http\Response
     */
    public function show(Main $main)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Main  $main
     * @return \Illuminate\Http\Response
     */
    public function edit(Main $main)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Main  $main
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Main $main)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Main  $main
     * @return \Illuminate\Http\Response
     */
    public function destroy(Main $main)
    {
        //
    }
}
