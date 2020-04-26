<?php

use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/getMains', "MainController@index");
    Route::post('/addCourse/create-course', "CourseController@store");
    Route::get('/getUser', "UserController@index");
    Route::get('/edit-course/{id}', "CourseController@edit");
    Route::post('/delete-course', "CourseController@destroy");
    Route::post('/update-course', "CourseController@update");
    Route::post('/vote-up', "VoteController@store");
    Route::post('/vote-down', "VoteController@destroy");
    Route::get('/getCoursesForAdmin', "CourseController@getCoursesForAdmin");

    Route::post('/course/approve', "CourseController@approve");
    Route::post('/course/decline', "CourseController@decline");
    Route::post("/create-tech", "MainController@store");
    Route::get("/check-user", "UserController@index");
});

Route::get('/getCourses/{slug}/{token?}', "CourseController@index");
Route::get('/getMains/{id}', "CategoryController@index");

Route::post('/register', 'UserController@registerUser');
Route::post('/login', 'UserController@loginUser');
Route::post('/login-admin', "UserController@loginAdmin");


// Route::get("/sign-in/github", "Auth\SocialController@github");
// Route::get("/sign-in/github/redirect", "Auth\SocialController@githubRedirect");

Route::post("/sign-in/{provider}", "Auth\SocialController@social");
// Route::get("/sign-in/facebook/redirect", "Auth\SocialController@facebookRedirect");

Route::post("/subs/user", "SubsController@subs");
