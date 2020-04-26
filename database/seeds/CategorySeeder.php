<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = ['programming', "datas-cience", "dev-ops", "design"];
        foreach ($types as $type) { 
            Category::create([
                'category_name' => $type
            ]);
        }

        

    }
}
