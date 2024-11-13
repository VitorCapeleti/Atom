<?php
require_once('conection.php');

if (isset($_GET['query'])) {
    $query = $_GET['query']; // Obtém a string de pesquisa

    // Segurança: Evitar injeção SQL
    $stmt = $conection->prepare("SELECT USU_INT_ID, USU_VAR_NAME, USU_VAR_IMGPERFIL FROM usuario WHERE USU_VAR_NAME LIKE ?");
    $searchTerm = "%" . $query . "%";
    $stmt->bind_param('s', $searchTerm);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $usuarios = [];
    if ($resultado) {
        while ($usuario = mysqli_fetch_assoc($resultado)) {
            $usuarios[] = $usuario;
        }
    }

    echo json_encode($usuarios); // Retorna os dados em formato JSON
}
?>
