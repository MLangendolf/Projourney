<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pj_experiencia', function (Blueprint $table) {
            $table->id();
            $table->string('empresa', 100)->nullable();
            $table->string('cargo', 100)->nullable();
            $table->text('descricao')->nullable();
            $table->date('inicio')->nullable();
            $table->date('fim')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pj_experiencia');
    }
};

