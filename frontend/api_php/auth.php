<?php
require_once __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

function tokenVerify()
{
    $headers = getallheaders();
    $authHeaders = $headers['Authorization'] ?? '';

    // Corrected regex to match "Bearer" and capture the token
    if (preg_match('/Bearer\s(\S+)/', $authHeaders, $matches)) {
        $jwt = $matches[1]; // Get token from the matches array


        try {
            $decoded = JWT::decode($jwt, new Key($_ENV['JWT_SECRET'], 'HS256'));
            return $decoded->uid;
        } catch (Exception $e) {
            http_response_code(401); // Unauthorized
            header('content-type: application/json'); // Ensures JSON response. 
            echo json_encode(["status" => "erro", "mensasgem" => "Token inválido ou expirado. Por favor faça login novamente."]);
            exit();
        };
    } else {
        http_response_code(401);
        header('content-type: application/json');
        echo json_encode(["status" => "erro", "mensagem" => "token de autenticação não foi fornecido ou em formatação inválida."]);
        exit();
    }
};
