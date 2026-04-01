<?php
require_once __DIR__ . '/../vendor/autoload.php';

// Carregar variáveis de ambiente
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// --- Conexão com o Banco de Dados ---
$servidor = $_ENV['DATABASE_SERVER'];
$usuario_bd = $_ENV['DATABASE_USER'];
$senha_bd = $_ENV['DATABASE_PASSWORD'];
$banco = $_ENV['DATABASE_NAME'];

try {
    $pdo = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8", $usuario_bd, $senha_bd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "erro", "mensagem" => "Erro na conexão com o banco de dados: " . $e->getMessage()]);
    exit;
}

