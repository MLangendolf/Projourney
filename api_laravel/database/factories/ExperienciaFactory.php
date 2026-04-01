<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ExperienciaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'empresa' => $this->faker->company(),
            'cargo' => $this->faker->jobTitle(),
            'descricao' => $this->faker->sentence(10),
            'inicio' => $this->faker->date('Y-m-d', '-3 years'),
            'fim' => $this->faker->optional()->date('Y-m-d'),
        ];
    }
}
