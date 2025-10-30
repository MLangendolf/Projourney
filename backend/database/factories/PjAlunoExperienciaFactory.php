<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PjAlunoExperienciaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'pj_experiencia_id' => \App\Models\PjExperiencia::factory(),
            'pj_aluno_id' => \App\Models\PjAluno::factory(),
        ];
    }
}

