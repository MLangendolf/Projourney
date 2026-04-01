<?php
require_once __DIR__.'/db.php';

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if (!isset($_GET['trilhaId']) || !is_numeric($_GET['trilhaId'])) {
    http_response_code(400 ); 
    echo json_encode(["erro" => "ID da trilha inválido ou não fornecido."]);
    exit;
}

$trilhaId = (int)$_GET['trilhaId'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            c.id, 
            c.nome, 
            c.nivel, 
            c.link_curso
        FROM curso c
        JOIN curso_trilha ct ON c.id = ct.curso_id
        WHERE ct.trilha_id = ?
    ");
    $stmt->execute([$trilhaId]);
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200 );
    echo json_encode($cursos);

} catch (Exception $e) {
    http_response_code(500 ); 
    echo json_encode(["erro" => "Erro ao buscar os cursos: " . $e->getMessage()]);
}
