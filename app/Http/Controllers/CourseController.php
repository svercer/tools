<?php

namespace App\Http\Controllers;

use App\Course;
use App\Events\CourseApprovedEvent;
use App\Events\DeclineCourseEvent;
use App\Main;
use App\User;
use App\Vote;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function getCoursesForAdmin(Request $request)
    {   
        $admin = $request->user();
        if ($admin->role == 1) {
            $courses = Course::orderBy('course_aproved', 'ASC') 
                ->orderBy('created_at', 'DESC')
                ->with('user')
                ->with('votes')
                ->get();
                return response()->json([
                    'success' => 200,
                    'items' => $courses,
                ]);
        } else {
            return response()->json([
                'error'=>401,
                'message'=>"You are not Authorized to be here"
            ]);
        }
    }
    public function index($slug, $token = null)
    {
        if ($token != null) {
            $token = `Bearer ${token}`;
            $user = auth('api')->authenticate($token);
                $userID = $user->id;
                $courses = Course::where('user_id', $userID)
                ->orderBy('created_at', "DESC")
                ->with('user')
                ->with('votes')
                ->get();
            
        } else {
            $main = Main::where('main_slug', $slug)->first();
            $main_id = $main->id;
            $courses = Course::where('main_id', $main_id)
            ->where('course_aproved', 1)
            ->orderBy('created_at', "DESC")
            ->with('user')
            ->with('votes')
            ->get();

        }
        return response()->json([
            'success' => 200,
            'items' => $courses,
        ]);
        
    }
    public function store(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'course_url' => "required|string",
            "course_name" => "required|string|max:255",
            "course_price_type" => "required",
            "course_type" => "required",
            "course_language" => "required",
            "main_id" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error'=>'validation',
                'message'=> $validator->messages()->toArray()
            ]);
        }

        $doubleCourse = Course::where('course_url', $request->course_url)->first();
        if ($doubleCourse) {
            return response()->json([
                'error'=>500,
                'message'=>'Овој курс е веке прикачен на нашиот вебсајт, креирајте нов'
            ]);
        }

        $course = new Course();
        $course->course_url = $request->course_url;
        $course->course_name = $request->course_name;
        $course->course_type = $request->course_type;
        $course->course_price_type = $request->course_price_type;
        $course->course_language = $request->course_language;
        $course->user_id = $request->user()->id;
        $course->main_id = $request->main_id;
        $course->save();

        return response()->json([
            "success" => 200,
            "message" => "course being created, pending approval from Brainster.co Team"
        ]);
    }
    public function edit($id)
    {
        $course = Course::where('id', $id)
            ->with('main')
            ->first();
        return response()->json([
            'success'=>200,
            'item'=>$course
        ]);
    }
    public function update(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'course_name'=>"nullable|string|max:255",
            'course_url' => "nullable|string",
            "course_price_type" => "nullable",
            "course_type" => "nullable",
            "course_language" => "nullable",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error'=>true,
                'message'=> $validator->messages()->toArray()
            ]);
        }

        $course = Course::where('id', $request->id)->first();
        if ($request->course_name != null) {
            
            $course->course_name = $request->course_name;
        }
        if ($request->course_url != null) {
            $course->course_url = $request->course_url;
        }
        if ($request->course_type != null) {
            $course->course_type = $request->course_type;
        }
        if ($request->course_language != null) {
            $course->course_language = $request->course_language;
        }
        if ($request->course_price_type != null) {
            $course->course_price_type = $request->course_price_type;
        }

        $course->course_aproved = 0;
        $course->save();
        return response()->json([
            'success'=>200,
            'message'=>'Туторијалот беше успешно изменет, ке биде разгледан од тимот на Браинстер и повторно одобрен'
        ]);
    }
    public function destroy(Request $request)
    {
        $id = $request->id;
        Course::where('id', $id)->delete();
        
        return response()->json([
            'success'=>true,
            'message'=>'Успешно го избришавте вашиот туторијал'
        ]);
    }
    public function approve(Request $request)
    {
        $admin = $request->user();
        $course = Course::where('id', $request->courseid)->first();
        $user = User::where('id', $course->user_id)->first();
        

        if ($admin->role == 1) {
            $course->course_aproved = 1;
            $course->save();
        }
        event(new CourseApprovedEvent($user, $course));

        return response()->json([
            'success'=>200,
            'message'=>'course approved'
        ]);
    }
    public function decline(Request $request)
    {
        $admin = $request->user();
        $message = $request->text;
        $course = Course::where('id', $request->courseid)->first();
        $user = User::where('id', $course->user_id)->first();
        
        
        if ($admin->role == 1) {
            $course->course_aproved = 0;
            $course->save();
        }
        event(new DeclineCourseEvent($user, $course, $message));
        
        
        return response()->json([
            'success'=>200,
            'message'=>'declined'
            ]);
    }
}
