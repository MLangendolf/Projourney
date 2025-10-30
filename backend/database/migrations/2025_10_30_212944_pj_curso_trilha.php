<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pj_curso_trilha', function (Blueprint $table) {
            $table->foreignId('pj_curso_id')->constrained('pj_curso')->cascadeOnDelete();
            $table->foreignId('pj_trilha_id')->constrained('pj_trilha')->cascadeOnDelete();
            $table->primary(['pj_curso_id', 'pj_trilha_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pj_curso_trilha');
    }
};

