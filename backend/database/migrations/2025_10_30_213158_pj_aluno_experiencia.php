<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pj_aluno_experiencia', function (Blueprint $table) {
            $table->foreignId('pj_experiencia_id')->constrained('pj_experiencia')->cascadeOnDelete();
            $table->foreignId('pj_aluno_id')->constrained('pj_aluno')->cascadeOnDelete();
            $table->primary(['pj_experiencia_id', 'pj_aluno_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pj_aluno_experiencia');
    }
};

