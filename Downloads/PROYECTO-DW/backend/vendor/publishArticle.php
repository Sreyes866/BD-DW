<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include ('db_connect.php');

// Obtener el ID del artículo desde el cuerpo de la solicitud POST
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$article_id = $input['id'];

// Actualizar el estado de publicación a "Published"
$sql = "UPDATE Articles SET publish_status = 'Published' WHERE id = ?";

// Preparar y ejecutar la declaración
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $article_id);
$result = $stmt->execute();

if ($result) {
    echo json_encode(["success" => true, "message" => "Article published successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error publishing article"]);
}

$stmt->close();
$conn->close();
?>
