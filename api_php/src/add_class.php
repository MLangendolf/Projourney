<?php
require_once __DIR__ . '/db.php';
session_start();

$busca = $pdo->query("SELECT * FROM curso");
$cursos = $busca->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['curso'];
    $nivel = $_POST['nivel'];
    $link_curso = $_POST['link_url'];

    $stm = $pdo->prepare("SELECT * FROM curso WHERE nome = ?");
    $stm->execute([$nome]);

    if ($stm->fetch()) {
        $_SESSION['old_link'] = $_POST['link_url'];
        $_SESSION['old_course'] = $_POST['curso'];
        
        $message = "Curso de mesmo nome ($nome) já existe!";
        header("location: " . $_SERVER['PHP_SELF'] . "?status=error&message=" . urlencode($message));
        exit();

    } else {
        $stm = $pdo->prepare("INSERT INTO curso (nome, nivel, link_curso) VALUES (?, ?, ?)");
        if ($stm->execute([$nome, $nivel, $link_curso])) {
            $_SESSION['old_link'] = '';
            $_SESSION['old_course'] = '';
            $message = "Curso '$nome' cadastrado com sucesso.";
            header("location: " . $_SERVER['PHP_SELF'] . "?status=success&message=" . urlencode($message));
            exit();
        } else {
        $_SESSION['old_link'] = $_POST['link_url'];
        $_SESSION['old_course'] = $_POST['curso'];

            $message = "Falha ao registrar o curso.";
            header("location: " . $_SERVER['PHP_SELF'] . "?status=error&message=" . urlencode($message));
            exit();

        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR, en">

<head>
    <meta charset="UTF-8">
    <!-- Define a largura da página como a largura do dispositivo e impede o zoom manual -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> <?= $_ENV['APP_NAME'] ?? "Projourney"; ?> </title>
    <link rel="stylesheet" href="./css/styles.css">

</head>

<body>
    <header>

        <h1><?= $_ENV['APP_NAME'] ?? "PROJOURNEY" ?></h1>
        <div class="itemCentered">
            
            <label for="nivel">Serviços:</label>
            <select name="nivel" id="nivel" onchange="if(this.value) window.location.href=this.value;">
                <option value="">--Selecione--</option>
                <option value="../index.php">Home</option>
                <option value="./add_trail.php">Criar Trilha</option>
            </select>
        </div>

    </header>
    <main>
        <h2>Cadastro de Cursos</h2>
        <form class="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
            <label for="curso">Nome do curso:</label>
            <input type="text" id="curso" name="curso" value="<?= htmlspecialchars_decode ($_SESSION['old_course'] ?? ''); ?>" required>
            <label for="nivel">Nivel do curso:</label>
            <select name="nivel" id="nivel" required>
                <option value="">--Selecione--</option>
                <option value="Basico">Básico</option>
                <option value="Intermediario">Intermediário</option>
                <option value="Avançado">Avançado</option>
            </select>
            <br>
            <label for="link_url">link do curso:</label>
            <input type="text" id="link_url" name="link_url" value="<?= htmlspecialchars_decode($_SESSION['old_link']) ?? ''; ?>" required>
            <button type="submit">Adicionar Curso</button>
            <?php
            if (isset($_GET['status']) && $_GET['status'] == 'success') {
                $message =  htmlspecialchars($_GET['message']);
                echo '<p class="messageSuccess">'.$message.'</p>';
            } else if (isset($_GET['status']) && $_GET['status'] == 'error') {
                $message =  htmlspecialchars($_GET['message']);
                echo '<p class="messageError">'.$message.'</p>';
            }
            ?>
        </form>
    </main>
    
    <div>
        <h4>lista de Cursos:</h4>

        <table>
            <thead>
                <tr>
                    <th>Curso</th>
                    <th>Nível</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($cursos as $curso): ?>
                    <tr>
                        <td><?= $curso['nome'] ?></td>
                        <td><?= $curso['nivel'] ?></td>
                        <td> <a href="<?= $curso['link_curso'] ?>"> <?= $curso['link_curso'] ?> </a> </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>


    <footer>
    </footer>

    <!-- link JavaScript
     <script src="js/scripts.js" defer></script>
    -->
</body>

</html>
<?php 
    // phpinfo();