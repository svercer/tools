<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DeclineCourseMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $course, $message)
    {
        $this->user = $user;
        $this->course = $course;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.decline')
                    ->with([
                        'username' => $this->user->fullname,
                        'message' => $this->message,
                        'coursename' => $this->course->course_name,
                        'created_at'=> $this->course->created_at,
                    ]);
    }
}
