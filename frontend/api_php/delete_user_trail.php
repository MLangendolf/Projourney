<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__.'/auth.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: content-type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
};

$userId = tokenVerify();    // if not valid, return errors and STOP the script with 'exit()'
$trilhaId = $_GET['trilhaId'];

try {
    $stmtUser = $pdo->prepare("DELETE FROM `trilha_aluno` WHERE  `trilha_id` = ? AND `aluno_id` = ?");
    $stmtUser->execute([$trilhaId, $userId]);

    http_response_code(200);
    echo json_encode(["status" => "sucesso", "mensagem" => "Trilha removida com sucesso"]);

} catch (Exception $e) {
    http_response_code(500); // 
    header('content-type: application/json'); // Ensures JSON response. 
    echo json_encode(["status" => "erro", "mensasgem" => $e->getMessage() ?? "A trilha não pôde ser removida, tenhe mais tarde ou contate o suporte."]);
    exit();
};
