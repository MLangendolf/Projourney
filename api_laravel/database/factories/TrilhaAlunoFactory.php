<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TrilhaAlunoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'trilha_id' => \App\Models\PjTrilha::factory(),
            'aluno_id' => \App\Models\PjAluno::factory(),
            'progresso' => $this->faker->randomElement(['Inscrito', 'Cursando', 'Suspenso', 'Concluido']),
        ];
    }
}
