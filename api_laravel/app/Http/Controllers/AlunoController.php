<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AlunoController extends Controller
{
    // GET /alunos → listar todos
    public function index()
    {
        return response()->json(Aluno::all(), 200);
    }

    // GET /alunos/{id} → mostrar 1 aluno
    public function show(string $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json([
                'status'   => 'erro',
                'mensagem' => 'Aluno não encontrado.'
            ], 404);
        }

        return response()->json($aluno, 200);
    }

    // GET /alunos/email/{email} → buscar por email
    public function findByEmail(string $email)
    {
        $aluno = Aluno::where('email', $email)->first();

        if (!$aluno) {
            return response()->json([
                'status' => 'erro',
                'mensagem' => 'Aluno não encontrado.'
            ], 404);
        }

        return response()->json($aluno, 200);
    }

    // POST /alunos → cadastrar aluno
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome'            => 'required|string',
            'email'           => 'required|email|unique:aluno,email',
            'senha'           => 'required|string|min(6)',
            'data_nascimento' => 'required|date_format:Y-m-d',
            'telefone'        => 'required|string',
            'cidade'          => 'nullable|string',
            'objetivos'       => 'nullable|string',
            'areasInteresse'  => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'   => 'erro',
                'mensagem' => $validator->errors()
            ], 400);
        }

        $dados = $validator->validated();
        $dados['telefone'] = preg_replace('/[^0-9]/', '', $dados['telefone']);
        $dados['senha'] = Hash::make($dados['senha']);

        if (isset($dados['areasInteresse'])) {
            $dados['area_interesse'] = implode(', ', $dados['areasInteresse']);
        }

        $aluno = Aluno::create($dados);

        return response()->json([
            'status' => 'sucesso',
            'mensagem' => 'Aluno cadastrado com sucesso!',
            'aluno' => $aluno
        ], 201);
    }

    // PUT /alunos/{id} → editar aluno
    public function update(Request $request, string $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json([
                'status' => 'erro',
                'mensagem' => 'Aluno não encontrado.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome'            => 'nullable|string',
            'email'           => 'nullable|email|unique:aluno,email,' . $aluno->id,
            'senha'           => 'nullable|string|min(6)',
            'data_nascimento' => 'nullable|date_format:Y-m-d',
            'telefone'        => 'nullable|string',
            'cidade'          => 'nullable|string',
            'objetivos'       => 'nullable|string',
            'areasInteresse'  => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'   => 'erro',
                'mensagem' => $validator->errors()
            ], 400);
        }

        $dados = $validator->validated();

        if (isset($dados['telefone'])) {
            $dados['telefone'] = preg_replace('/[^0-9]/', '', $dados['telefone']);
        }

        if (isset($dados['senha'])) {
            $dados['senha'] = Hash::make($dados['senha']);
        }

        if (isset($dados['areasInteresse'])) {
            $dados['area_interesse'] = implode(', ', $dados['areasInteresse']);
        }

        $aluno->update($dados);

        return response()->json([
            'status'   => 'sucesso',
            'mensagem' => 'Aluno atualizado com sucesso!',
            'aluno'    => $aluno
        ], 200);
    }

    // DELETE /alunos/{id} → deletar aluno
    public function destroy(string $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json([
                'status' => 'erro',
                'mensagem' => 'Aluno não encontrado.'
            ], 404);
        }

        $aluno->delete();

        return response()->json([
            'status' => 'sucesso',
            'mensagem' => 'Aluno deletado com sucesso.'
        ], 200);
    }
}
