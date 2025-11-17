<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trilha_aluno', function (Blueprint $table) {
            $table->foreignId('trilhas_id')->constrained('trilhas')->cascadeOnDelete();
            $table->foreignId('alunos_id')->constrained('alunos')->cascadeOnDelete();
            $table->enum('progresso', ['Inscrito', 'Cursando', 'Suspenso', 'Concluido'])->default('Inscrito');
            $table->primary(['trilhas_id', 'alunos_id']);
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trilha_aluno');
    }
};
