<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Ajusta esto según tu configuración CORS

include('db_connect.php'); // Asegúrate de que este archivo contenga la lógica de conexión a tu base de datos

try {
    // Consideramos un comentario como 'sin moderar' si existe en la tabla CommentReports y su campo IsResolved es 0
    $query = "SELECT COUNT(*) as unmoderatedCount FROM CommentReports WHERE IsResolved = 0";
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_assoc();
        $hasUnmoderatedComments = $row['unmoderatedCount'] > 0;

        echo json_encode(['hasUnmoderatedComments' => $hasUnmoderatedComments]);
    } else {
        // Manejar error en la consulta
        echo json_encode(['error' => 'Error al consultar la base de datos.']);
    }
} catch (Exception $e) {
    // Manejar cualquier otra excepción
    echo json_encode(['error' => 'Error del servidor: ' . $e->getMessage()]);
}

$conn->close();
?>