<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

$articleId = isset($_GET['article_id']) ? (int)$_GET['article_id'] : 0;

if ($articleId <= 0) {
    echo json_encode(['message' => 'ID de artículo inválido']);
    exit();
}

$sql = "SELECT c.CommentID, c.ParentCommentID, c.Text, u.name AS userName
        FROM Comments c
        JOIN users u ON c.UserID = u.id
        WHERE c.ArticleID = ?
        ORDER BY c.ParentCommentID ASC, c.CommentID ASC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['message' => 'Error al preparar la consulta: ' . $conn->error]);
    exit();
}

$stmt->bind_param("i", $articleId);
$stmt->execute();
$result = $stmt->get_result();
$comments = [];

while ($row = $result->fetch_assoc()) {
    $comments[$row['CommentID']] = $row;
    $comments[$row['CommentID']]['replies'] = [];
}

// Reset the pointer to the beginning of the array
reset($comments);

// Populate replies
foreach ($comments as $id => &$comment) {
    if ($comment['ParentCommentID'] !== null && isset($comments[$comment['ParentCommentID']])) {
        $comments[$comment['ParentCommentID']]['replies'][] = &$comment;
    }
}

// Filter out replies from the top level
$topLevelComments = array_filter($comments, function($comment) {
    return $comment['ParentCommentID'] === null;
});

$stmt->close();
$conn->close();

echo json_encode(array_values($topLevelComments)); // Convertimos los comentarios a un arreglo indexado antes de devolverlos.
?>