<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Aluno extends Model
{

    use HasFactory;

    protected $table = 'alunos';

    protected $fillable = [
        'nome',
        'email',
        'data_nascimento',
        'telefone',
        'senha',
        'cidade',
        'descricao',
        'area_interesse'
    ];
}

