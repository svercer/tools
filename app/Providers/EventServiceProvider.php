<?php

namespace App\Providers;

use App\Events\CourseApprovedEvent;
use App\Events\DeclineCourseEvent;
use App\Events\SubscribeEvent;
use App\Listeners\CourseApprovedListener;
use App\Listeners\DeclineCourseListener;
use App\Listeners\SubscribeListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        CourseApprovedEvent::class=> [
            CourseApprovedListener::class,
        ],
        DeclineCourseEvent::class=> [
            DeclineCourseListener::class,
        ],
        SubscribeEvent::class=> [
            SubscribeListener::class,
        ],

    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
