<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('aluno_experiencia', function (Blueprint $table) {
            $table->foreignId('experiencias_id')->constrained('experiencias')->cascadeOnDelete();
            $table->foreignId('alunos_id')->constrained('alunos')->cascadeOnDelete();
            $table->primary(['experiencias_id', 'alunos_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aluno_experiencia');
    }
};

