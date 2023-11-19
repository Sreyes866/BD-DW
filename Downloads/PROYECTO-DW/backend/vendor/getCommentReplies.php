<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('db_connect.php');

$articleId = isset($_GET['article_id']) ? (int)$_GET['article_id'] : null;

// Función recursiva para obtener respuestas anidadas
function getReplies($parentId, $conn) {
    $replies = [];
    if ($parentId === null) {
        // Es un comentario de nivel superior
        $sql = "SELECT c.CommentID, c.Text, c.UserID, u.name AS userName, c.ParentCommentID
                FROM Comments c
                LEFT JOIN users u ON c.UserID = u.id
                WHERE c.ArticleID = ? AND c.ParentCommentID IS NULL";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $GLOBALS['articleId']);
    } else {
        // Es una respuesta a otro comentario
        $sql = "SELECT c.CommentID, c.Text, c.UserID, u.name AS userName, c.ParentCommentID
                FROM Comments c
                LEFT JOIN users u ON c.UserID = u.id
                WHERE c.ParentCommentID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $parentId);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
        $row['replies'] = getReplies($row['CommentID'], $conn);
        $replies[] = $row;
    }
    
    return $replies;
}

if ($articleId !== null) {
    // Si tenemos un articleId, obtenemos todos los comentarios de nivel superior y sus respuestas
    $comments = getReplies(null, $conn); // Pasamos null para obtener comentarios de nivel superior
    echo json_encode(['comments' => $comments]);
} else {
    echo json_encode(['message' => 'ID de artículo requerido']);
}

$conn->close();
?>