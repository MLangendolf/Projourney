<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pj_trilha_aluno', function (Blueprint $table) {
            $table->foreignId('pj_trilha_id')->constrained('pj_trilha')->cascadeOnDelete();
            $table->foreignId('pj_aluno_id')->constrained('pj_aluno')->cascadeOnDelete();
            $table->enum('progresso', ['Inscrito', 'Cursando', 'Suspenso', 'Concluido'])->default('Inscrito');
            $table->primary(['pj_trilha_id', 'pj_aluno_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pj_trilha_aluno');
    }
};
