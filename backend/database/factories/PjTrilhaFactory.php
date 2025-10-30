<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PjTrilhaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => ucfirst($this->faker->words(2, true)),
        ];
    }
}
