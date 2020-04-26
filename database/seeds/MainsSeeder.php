<?php

use App\Main;
use Illuminate\Database\Seeder;

class MainsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = [
            [
                'main_name' => 'After Effects', 
                'main_url' => 'uploads/logo-adobe-after-effects.svg',
                'category_id' => '4',
                'main_slug' => 'after-effects',
            ],
            [
                'main_name' => 'After Experience Design', 
                'main_url' => 'uploads/logo-adobe-experience-design.svg',
                'category_id' => '4',
                'main_slug' => 'after-experience',
            ],
            [
                'main_name' => 'Adobe Premiere', 
                'main_url' => 'uploads/logo-adobe-premier-pro.svg',
                'category_id' => '4',
                'main_slug' => 'adobe-premiere',
            ],
            [
                'main_name' => 'Android Development', 
                'main_url' => 'uploads/logo-android-development.svg',
                'category_id' => '1',
                'main_slug' => 'android-development',
                
            ],
            [
                'main_name' => 'Photoshop', 
                'main_url' => 'uploads/logo-photoshop.svg',
                'category_id' => '4',
                'main_slug' => 'photoshop',
                
            ],
            [
                'main_name' => 'Angular', 
                'main_url' => 'uploads/logo-angular.svg',
                'category_id' => '1',
                'main_slug' => 'angular',
            ],
            [
                'main_name' => 'Java Script', 
                'main_url' => 'uploads/logo-javascript.svg',
                'category_id' => '1',
                'main_slug' => 'java-script',
            ],
            [
                'main_name' => 'Php', 
                'main_url' => 'uploads/logo-php.svg',
                'category_id' => '1',
                'main_slug' => 'php',
            ],
            [
                'main_name' => 'Python', 
                'main_url' => 'uploads/logo-python.svg',
                'category_id' => '1',
                'main_slug' => 'python',
            ],
            [
                'main_name' => 'React Js', 
                'main_url' => 'uploads/logo-react.svg',
                'category_id' => '1',
                'main_slug' => 'reactjs',
            ],
            [
                'main_name' => 'Artificial Intelligence', 
                'main_url' => 'uploads/logo-artificial-intelligence-ai.svg',
                'category_id' => '2',
                'main_slug' => 'artificial-intelligence',
            ],
            [
                'main_name' => 'Data Science', 
                'main_url' => 'uploads/logo-data-science.svg',
                'category_id' => '2',
                'main_slug' => 'data-science',
            ],
            [
                'main_name' => 'DevOps', 
                'main_url' => 'uploads/logo-devops.svg',
                'category_id' => '3',
                'main_slug' => 'devops',
            ],
            [
                'main_name' => 'Doker', 
                'main_url' => 'uploads/logo-docker.svg',
                'category_id' => '3',
                'main_slug' => 'doker',
            ],
            [
                'main_name' => 'Lynux System', 
                'main_url' => 'uploads/logo-linux-system-administration.svg',
                'category_id' => '3',
                'main_slug' => 'lynux-systems',
            ],
        ];

        foreach($courses as $course ) {
            Main::insert($course);
        }
    }
}
