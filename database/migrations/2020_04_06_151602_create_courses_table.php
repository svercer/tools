<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_url')->unique();
            $table->string('course_name');
            $table->integer('course_type'); //video or book
            $table->integer('course_price_type'); //free or paid
            $table->integer('course_language'); //english, spanish, french, german
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('main_id');
            $table->integer('course_aproved')->default(0); //0 not approved 1 approved
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
