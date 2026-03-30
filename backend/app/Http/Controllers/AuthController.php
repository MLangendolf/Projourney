<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aluno;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // login de fato, onde e passado os dados email e senha para entrada do saite
    public function login(Request $request)
    {
        // Validação (equivalente ao empty())
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {
            // Busca usuário
            $aluno = Aluno::where('email', $request->email)->first();

            // Verifica senha
            if ($aluno && Hash::check($request->password, $aluno->senha)) {

                return response()->json([
                    "status" => "sucesso",
                    "mensagem" => "Login realizado com sucesso!",
                    "dados_usuario" => [
                        "id" => $aluno->id,
                        "nome" => $aluno->nome
                    ]
                ], 200);
            }

            return response()->json([
                "status" => "erro",
                "mensagem" => "Credenciais inválidas. Verifique email e senha."
            ], 401);
        } catch (\Exception $e) {

            return response()->json([
                "status" => "erro",
                "mensagem" => "Erro no servidor."
            ], 500);
        }
    }

    // criação de login - cadastro de login
    public function store(Request $request)
    {
        // 1. Validação (substitui toda aquela lógica manual)
        $validated = $request->validate([
            'nome' => 'required|string',
            'email' => 'required|email|unique:aluno,email',
            'senha' => 'required|string',
            'data_nascimento' => 'required|date_format:Y-m-d',
            'telefone' => 'required|string',
            'cidade' => 'nullable|string',
            'objetivos' => 'nullable|string',
            'areasInteresse' => 'nullable|array'
        ]);

        // 2. Tratamento dos dados
        $telefoneLimpo = preg_replace('/[^0-9]/', '', $validated['telefone']);

        $areaInteresse = isset($validated['areasInteresse'])
            ? implode(', ', $validated['areasInteresse'])
            : null;

        // 3. Criar aluno
        $aluno = Aluno::create([
            'nome' => trim($validated['nome']),
            'email' => trim($validated['email']),
            'senha' => Hash::make($validated['senha']), // bcrypt/argon automático
            'data_nascimento' => $validated['data_nascimento'],
            'telefone' => $telefoneLimpo,
            'cidade' => $validated['cidade'] ?? null,
            'descricao' => $validated['objetivos'] ?? null,
            'area_interesse' => $areaInteresse
        ]);

        return response()->json([
            'status' => 'sucesso',
            'mensagem' => 'Aluno cadastrado com sucesso!',
            'data' => $aluno
        ], 201);
    }
}
