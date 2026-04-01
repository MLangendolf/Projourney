<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Aluno;
use App\Models\Trilha;
use App\Models\Curso;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Criar alunos
        $alunos = Aluno::factory(10)->create();
        // Criar trilhas
        $trilhas = Trilha::factory(5)->create();
        // Criar cursos
        $cursos = Curso::factory(8)->create();

    }
}
