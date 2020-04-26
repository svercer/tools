<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $users = [
            [
                'fullname' => 'Stojanche Manev',
                'email' => 'stojancem85@gmail.com',
                'password' => Hash::make('123456')
            ],
            [
                'fullname' => 'Bob Manev',
                'email' => 'bob@mail.com',
                'password' => Hash::make('123456'),
                'role'=>1
            ],
        ];
        foreach($users as $user) {
            User::insert($user);
        }
    }
}
