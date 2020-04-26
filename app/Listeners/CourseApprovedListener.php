<?php

namespace App\Listeners;

use App\Events\CourseApprovedEvent;
use App\Mail\CourseApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class CourseApprovedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(CourseApprovedEvent $event)
    {
        $user = $event->user;
        $course = $event->course;
        Mail::to($user->email)->send(new CourseApprovedMail($user, $course));
    }
}
