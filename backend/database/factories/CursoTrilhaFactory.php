<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CursoTrilhaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'curso_id' => \App\Models\PjCurso::factory(),
            'trilha_id' => \App\Models\PjTrilha::factory(),
        ];
    }
}
