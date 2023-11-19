<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

include('db_connect.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $authorId = filter_input(INPUT_GET, 'author_id', FILTER_SANITIZE_NUMBER_INT);

    if (!$authorId) {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'ID de autor no proporcionado o no válido']);
        exit;
    }

    $sql = "SELECT c.id, c.name FROM Categories c JOIN AuthorCategory ac ON c.id = ac.category_id WHERE ac.author_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $authorId);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $categories = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['categories' => $categories]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['message' => 'Error al obtener categorías', 'error' => $stmt->error]);
    }

    $stmt->close();
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(['message' => 'Método HTTP no permitido']);
}

$conn->close();
?>


