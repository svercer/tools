<?php

namespace App\Listeners;

use App\Events\SubscribeEvent;
use App\Mail\SubscribeConfirmationEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SubscribeListener
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
    public function handle(SubscribeEvent $event)
    {
        $subscriber = $event->subscribe;
        Mail::to($subscriber->email)->send(new SubscribeConfirmationEmail($subscriber));

    }
}
