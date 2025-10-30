<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pj_curso', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 200);
            $table->text('descricao')->nullable();
            $table->integer('duracao')->nullable(); // minutos
            $table->string('nivel', 50)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pj_curso');
    }
};
