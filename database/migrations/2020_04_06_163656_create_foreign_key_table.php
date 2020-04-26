<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForeignKeyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mains', function (Blueprint $table) {
            $table->foreign('category_id')->references('id')->on('categories');
        });
        Schema::table('courses', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::table('courses', function (Blueprint $table) {
            $table->foreign('main_id')->references('id')->on('mains');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mains', function(Blueprint $table) {

            $table->dropForeign('category_id')->onDelete('cascade');
        });
        Schema::table('courses', function(Blueprint $table) {

            $table->dropForeign('user_id')->onDelete('cascade');
        });
        Schema::table('courses', function(Blueprint $table) {

            $table->dropForeign('main_id')->onDelete('cascade');
        });
    }
}
