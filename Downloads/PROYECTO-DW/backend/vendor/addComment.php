<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include('db_connect.php'); 

$articleId = $_POST['article_id'] ?? null;
$userId = $_POST['user_id'] ?? null;
$text = $_POST['text'] ?? null;
$parentCommentId = $_POST['parent_comment_id'] ?? null;

// Log de diagnóstico
error_log("Recibidos: article_id={$articleId}, user_id={$userId}, text={$text}, parent_comment_id={$parentCommentId}");

// Verificar si los campos requeridos están disponibles
if (!$articleId || !$userId || !$text) {
    $error_message = 'Datos incompletos: ' . json_encode($_POST);
    error_log($error_message);
    echo json_encode(['message' => $error_message]);
    exit();
}

// Preparar la consulta SQL
$sql = "INSERT INTO Comments (ArticleID, UserID, Text, ParentCommentID) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    $error_message = 'Error al preparar la consulta: ' . $conn->error;
    error_log($error_message);
    echo json_encode(['message' => $error_message]);
    $conn->close();
    exit();
}

// Vincular los parámetros
$stmt->bind_param("iisi", $articleId, $userId, $text, $parentCommentId);

// Ejecutar la consulta
if ($stmt->execute()) {
    $newCommentID = $stmt->insert_id; 
    echo json_encode(['message' => 'Comentario añadido exitosamente', 'newCommentID' => $newCommentID]);
} else {
    $error_message = 'Error al añadir comentario: ' . $stmt->error;
    error_log($error_message);
    echo json_encode(['message' => $error_message, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>