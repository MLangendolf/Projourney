<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('curso_trilha', function (Blueprint $table) {
            $table->foreignId('cursos_id')->constrained('cursos')->cascadeOnDelete();
            $table->foreignId('trilhas_id')->constrained('trilhas')->cascadeOnDelete();
            $table->primary(['curso_id', 'trilha_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('curso_trilha');
    }
};

