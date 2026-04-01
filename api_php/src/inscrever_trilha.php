<?php
require_once __DIR__."/db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

// --- Lógica para Inscrição na Trilha ---

$dados = json_decode(file_get_contents("php://input"));

if (
    !isset($dados->alunoId) || !is_numeric($dados->alunoId) ||
    !isset($dados->trilhaId) || !is_numeric($dados->trilhaId)
) {
    http_response_code(400 ); 
    echo json_encode(["status" => "erro", "mensagem" => "Dados inválidos. ID do aluno e da trilha são obrigatórios."]);
    exit();
}

$aluno_id = $dados->alunoId;
$trilha_id = $dados->trilhaId;

try {
    $stmt = $pdo->prepare("SELECT * FROM trilha_aluno WHERE aluno_id = ? AND trilha_id = ?");
    $stmt->execute([$aluno_id, $trilha_id]);
    
    if ($stmt->rowCount() > 0) {
        http_response_code(409 ); 
        echo json_encode(["status" => "erro", "mensagem" => "Você já está inscrito nesta trilha."]);
        exit();
    }
} catch (PDOException $e) {
    http_response_code(500 );
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao verificar inscrição existente."]);
    exit();
}


$sql = "INSERT INTO trilha_aluno (aluno_id, trilha_id) VALUES (?, ?)";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$aluno_id, $trilha_id]);

    http_response_code(201 );
    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Inscrição na trilha realizada com sucesso!"
    ]);

} catch (PDOException $e) {
		
    http_response_code(500 );
    // Mensagem de erro genérica para o usuário por segurança
    echo json_encode([
        "status" => "erro", 
        "mensagem" => "Não foi possível concluir a inscrição. Verifique os dados e tente novamente."
	
	// Trata erros de chave estrangeira (ex: alunoId ou trilhaId não existem) ou outros erros do SGBD
        // "debug_info" => $e->getMessage()      // Descomentar apenas para depuração
    ]);
}
?>
