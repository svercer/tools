<?php

namespace App\Http\Controllers;

use App\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    
    public function index()
    {
        
    }
    
    public function store(Request $request)
    {
        $courseid = $request->courseid;
        $token = $request->token;
        $userId = $request->user()->id;

        $vote = new Vote();
        $vote->course_id = $courseid;
        $vote->user_id = $userId;
        $vote->save();

        $votes = Vote::where('course_id', $courseid)->count();
        
        return response()->json([
            'success' => 200,
            'votes' => $votes,
        ]);
        
    }

    public function destroy(Request $request)
    {
        $courseid = $request->courseid;
        $userId = $request->user()->id;
        $vote = Vote::where('course_id', $courseid)->where('user_id', $userId);
        $vote->delete();

        $votes = Vote::where('course_id', $courseid)->count();
        return response()->json([
            'success'=>200,
            'votes'=>$votes
        ]);
    }
}
