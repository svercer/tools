<?php

namespace App\Listeners;

use App\Events\DeclineCourseEvent;
use App\Mail\DeclineCourseMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class DeclineCourseListener
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
    public function handle(DeclineCourseEvent $event)
    {
        $user = $event->user;
        $message = $event->message;
        $course = $event->course;

        Mail::to($user->email)->send(new DeclineCourseMail($user, $course, $message));
    }
}
