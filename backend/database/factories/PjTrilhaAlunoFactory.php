<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PjTrilhaAlunoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'pj_trilha_id' => \App\Models\PjTrilha::factory(),
            'pj_aluno_id' => \App\Models\PjAluno::factory(),
            'progresso' => $this->faker->randomElement(['Inscrito', 'Cursando', 'Suspenso', 'Concluido']),
        ];
    }
}
