<?php
require_once __DIR__."/db.php"; 

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT id, nome FROM trilha ORDER BY nome ASC");
    $stmt->execute();

    $trilhas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200 );
    echo json_encode($trilhas);

} catch (PDOException $e) {
    http_response_code(500 );
    echo json_encode([
        "status" => "erro", 
        "mensagem" => "Erro ao buscar as trilhas no servidor."
    ]);
}
?>
