<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(5)->create();

        $projects = Project::factory(5)->create([
            'user_id' => $users->random()->id,
        ]);

        Task::factory(20)->create([
            'project_id' => $projects->random()->id,
            'user_id' => $users->random()->id,
        ]);
    }
}
