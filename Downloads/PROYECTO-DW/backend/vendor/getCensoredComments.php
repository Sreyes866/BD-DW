<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

$articleId = isset($_GET['article_id']) ? (int)$_GET['article_id'] : null;

if ($articleId !== null) {
    $sql = "SELECT CommentID, UserID, Text, IsCensored, ParentCommentID FROM Comments WHERE ArticleID = ? AND IsCensored = 1";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(['error' => 'Error en la preparación de la consulta: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $articleId);

    if (!$stmt->execute()) {
        echo json_encode(['error' => 'Error en la ejecución de la consulta: ' . $stmt->error]);
        exit;
    }

    $result = $stmt->get_result();
    $comments = array();

    while ($row = $result->fetch_assoc()) {
        array_push($comments, $row);
    }

    echo json_encode(['comments' => $comments]);
} else {
    echo json_encode(['message' => 'ID de artículo requerido']);
}

$conn->close();
?>