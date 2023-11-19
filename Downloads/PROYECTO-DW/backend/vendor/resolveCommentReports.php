<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$commentId = $data->commentId;

$sql = "UPDATE CommentReports SET IsResolved = 1 WHERE CommentID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $commentId);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Reportes del comentario marcados como ignorados']);
} else {
    echo json_encode(['error' => 'Error al actualizar los reportes: ' . $stmt->error]);
}

$stmt->close();
$conn->close();

?>