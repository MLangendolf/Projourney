<?php
require_once __DIR__. '/db.php';
require_once __DIR__. '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
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

// Pega o corpo da requisição (texto JSON) e decodifica para um objeto PHP.
$dados = json_decode(file_get_contents("php://input"));

// Validação simples para garantir dados não vasios.
if (empty($dados->email) || empty($dados->password)) {
    http_response_code(400); // Define o código de status HTTP para "Bad Request".
    echo json_encode(["status" => "erro", "mensagem" => "E-mail e senha são obrigatórios."]);
    exit();
}

// Inicia um bloco try...catch (tentar...pegar) para capiturar erros do Banco de Dados.
try {
    $stmt = $pdo->prepare(" SELECT id, nome, senha FROM users WHERE email = ?");
    $stmt->execute([$dados->email]);
    $aluno = $stmt->fetch();

    // 'password_veryfy' compara senha vinda do front-end com o hash armazenado no banco de dados.
    if ($aluno && password_verify($dados->password, $aluno['senha'])) {

        unset($aluno['senha']); // Remove a senha do array por segurança.

        $payload=[
            "iss" => "localhost:8000",
            "aud" => "localhost:8000",
            "iat" => time(),
            "exp" => time() + (60*60*24),
            "uid" => $aluno['id'],
        ];

        $jwt = JWT::encode($payload, $token_key, 'HS256');

        http_response_code(200); // código de status 'OK'.
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Login realizado com sucesso!",
            "token" => $jwt,
            "dados_usuario" => $aluno
        ]);
    } else {
        http_response_code(401); // Código de status "Unauthorized".
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Credenciais inválidas. Verifique email e senha."
        ]);
    }
} catch (PDOException $e) {
    // caso ocorra erro de conexão com o banco de dados.
    http_response_code(500); // código de atatus "Iternal Server Error".
    echo json_encode(["status" => "erro", "mensagem" => "Erro no servidor."]);
}
