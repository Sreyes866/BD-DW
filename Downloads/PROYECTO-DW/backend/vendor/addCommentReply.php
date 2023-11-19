<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include('db_connect.php'); 

$articleId = $_POST['article_id'] ?? null;
$userId = $_POST['user_id'] ?? null;
$text = $_POST['text'] ?? '';
$parentCommentId = $_POST['parent_comment_id'] ?? null; 

if (is_null($articleId) || is_null($userId) || is_null($parentCommentId) || trim($text) === '') {
    echo json_encode(['message' => 'Datos incompletos o faltantes para la respuesta del comentario.']);
    exit();
}

$sql = "INSERT INTO Comments (ArticleID, ParentCommentID, UserID, Text) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['message' => 'Error al preparar la consulta: ' . $conn->error]);
    exit();
}

$stmt->bind_param("iiis", $articleId, $parentCommentId, $userId, $text);

if ($stmt->execute()) {
    $newCommentId = $stmt->insert_id;
    echo json_encode(['message' => 'Respuesta añadida exitosamente', 'newReplyID' => $newCommentId]);
} else {
    echo json_encode(['message' => 'Error al añadir la respuesta del comentario: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>