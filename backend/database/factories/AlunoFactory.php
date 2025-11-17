<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AlunoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'data_nascimento' => $this->faker->date('Y-m-d', '2005-12-31'),
            'telefone' => $this->faker->phoneNumber(),
            'cidade' => $this->faker->city(),
            'desc' => $this->faker->sentence(10),
            'area_inter' => $this->faker->word(),
            'senha' => bcrypt('senha123'),
        ];
    }
}
