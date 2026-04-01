<?php
require_once __DIR__. '/db.php';
require_once __DIR__. '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__."/..");
$dotenv->load();

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
};

$token_key = $_ENV['JWT_SECRET'];

// Corpo da requisição (texto JSON): decodificaR para um objeto PHP.
$dados = json_decode(file_get_contents("php://input"));

// Validação simples: garantir dados não vasios.
if (empty($dados->email) || empty($dados->password)) {
    http_response_code(400); 
    echo json_encode(["status" => "erro", "mensagem" => "E-mail e senha são obrigatórios."]);
    exit();
}

try {
    $stmt = $pdo->prepare(" SELECT id, nome, senha FROM users WHERE email = ?");
    $stmt->execute([$dados->email]);
    $aluno = $stmt->fetch();

    // 'password_veryfy' compara senha vinda do front-end com o hash armazenado no banco de dados.
    if ($aluno && password_verify($dados->password, $aluno['senha'])) {

        unset($aluno['senha']); // Remover a senha do array por segurança.

        $payload=[
            "iss" => "localhost:8000",
            "aud" => "localhost:8000",
            "iat" => time(),
            "exp" => time() + (60*60*24),
            "uid" => $aluno['id'],
        ];

        $jwt = JWT::encode($payload, $token_key, 'HS256');

        http_response_code(200);
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Login realizado com sucesso!",
            "token" => $jwt,
            "dados_usuario" => $aluno
        ]);
    } else {
        http_response_code(401); 
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Credenciais inválidas. Verifique email e senha."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500); 
    echo json_encode(["status" => "erro", "mensagem" => "Erro no servidor."]);
}

