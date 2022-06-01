<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();

        \App\Models\Category::create([
            'name' => 'Sekolah',
            'slug' => 'sekolah',
        ]);
        \App\Models\Category::create([
            'name' => 'Pekerjaan',
            'slug' => 'pekerjaan',
        ]);
        \App\Models\Category::create([
            'name' => 'Pribadi',
            'slug' => 'pribadi',
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
