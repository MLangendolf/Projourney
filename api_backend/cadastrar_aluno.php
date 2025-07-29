
<?php
  require_once 'db.php';


// Habilita o CORS para permitir que seu app React acesse a API
header("Access-Control-Allow-Origin: *"); // Em produção, troque "*" pelo seu domínio real
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Permitir POST e OPTIONS (para pre-flight)
header('Content-Type: application/json; charset=utf-8');

// Se a requisição for OPTIONS (pre-flight request), apenas retorne OK.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

/*
// --- Conexão com o Banco de Dados ---
$servidor = "localhost:3306";
$usuario_bd = "root";
$senha_bd = "root";
$banco = "PROJOURNEY"; // O nome do seu schema

try {
    $pdo = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8", $usuario_bd, $senha_bd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "erro", "mensagem" => "Erro na conexão com o banco de dados: " . $e->getMessage()]);
    exit;
}
 */

// --- Lógica de Cadastro ---

// 1. Receber e decodificar os dados JSON enviados pelo React
$dados = json_decode(file_get_contents('php://input'));

// 2. Validação de segurança no back-end (essencial!)
if (
    !isset($dados->nome) || empty(trim($dados->nome)) ||
    !isset($dados->email) || !filter_var($dados->email, FILTER_VALIDATE_EMAIL) ||
    !isset($dados->senha) || empty($dados->senha) ||
    !isset($dados->idade) || !is_numeric($dados->idade) ||
    !isset($dados->telefone) || empty(trim($dados->telefone))
) {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "erro", "mensagem" => "Dados obrigatórios ausentes ou inválidos."]);
    exit;
}

// 3. Preparar os dados para inserção
$nome = trim($dados->nome);
$email = $dados->email;
$idade = (int)$dados->idade;
$telefone = preg_replace('/[^0-9]/', '', $dados->telefone); // Remove caracteres não numéricos do telefone
$senhaHash = password_hash($dados->senha, PASSWORD_ARGON2ID); // Usando Argon2, mais moderno e seguro

// Campos opcionais (usando o operador de coalescência nula do PHP 7+)
$cidade = isset($dados->cidade) ? trim($dados->cidade) : null;
$descricao = isset($dados->objetivos) ? trim($dados->objetivos) : null; // Mapeando 'objetivos' para 'descricao'
$area_interesse = isset($dados->areasInteresse) ? implode(', ', $dados->areasInteresse) : null; // Converte array em string

// 4. Verificar se o e-mail já existe
try {
    $stmt = $pdo->prepare("SELECT ID FROM PJ_ALUNO WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        echo json_encode(["status" => "erro", "mensagem" => "Este e-mail já está cadastrado."]);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao verificar e-mail: " . $e->getMessage()]);
    exit;
}

// 5. Inserir o novo aluno no banco
$sql = "INSERT INTO PJ_ALUNO (nome, email, idade, telefone, senha, cidade, descricao, area_interesse) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $nome,
        $email,
        $idade,
        $telefone,
        $senhaHash,
        $cidade,
        $descricao,
        $area_interesse
    ]);

    http_response_code(201); // Created
    echo json_encode(["status" => "sucesso", "mensagem" => "Aluno cadastrado com sucesso!"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao realizar o cadastro: " . $e->getMessage()]);
}
?>
