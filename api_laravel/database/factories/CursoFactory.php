<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CursoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'titulo' => ucfirst($this->faker->words(3, true)),
            'descricao' => $this->faker->paragraph(),
            'duracao' => $this->faker->numberBetween(30, 480),
            'nivel' => $this->faker->randomElement(['Iniciante', 'Intermediário', 'Avançado']),
        ];
    }
}
