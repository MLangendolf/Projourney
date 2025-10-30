<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PjCursoTrilhaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'pj_curso_id' => \App\Models\PjCurso::factory(),
            'pj_trilha_id' => \App\Models\PjTrilha::factory(),
        ];
    }
}
