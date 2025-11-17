<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alunos', function (Blueprint $table){
            $table->id();
            $table->string('nome', 60);
            $table->string('email', 100)->unique();
            $table->date('data_nascimento');
            $table->string('telefone', 30);
            $table->string('cidade', 100)->nullable();
            $table->string('descrição', 500)->nullable();
            $table->string('area_interesse', 100)->nullable();
            $table->string('senha', 300);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alunos');
    }
};
