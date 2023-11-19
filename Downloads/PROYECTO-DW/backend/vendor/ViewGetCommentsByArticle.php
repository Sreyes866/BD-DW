<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include('db_connect.php');

// Decodificar JSON del cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);
$articleId = isset($input['article_id']) ? $input['article_id'] : null;

// Verificar si se recibió el article_id
if ($articleId === null) {
    echo json_encode(["error" => "No se proporcionó article_id"]);
    exit;
}

// Llamada a la función SQL
$query = "SELECT GetTotalComments(?) AS total";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $articleId);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Devolver el total de comentarios
echo json_encode($row['total']);

$conn->close();
?>