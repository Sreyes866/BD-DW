<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include ('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$title = $data['title'];
$content = $data['content'];
$category_id = $data['category_id'];
$sub_category_id = $data['sub_category_id'];

$sql = "UPDATE Articles SET title = ?, content = ?, category_id = ?, sub_category_id = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssii", $title, $content, $category_id, $sub_category_id, $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Artículo actualizado']);
} else {
    echo json_encode(['message' => 'Error al actualizar artículo']);
}

$conn->close();
?>