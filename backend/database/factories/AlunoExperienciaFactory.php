<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AlunoExperienciaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'experiencia_id' => \App\Models\PjExperiencia::factory(),
            'aluno_id' => \App\Models\PjAluno::factory(),
        ];
    }
}

