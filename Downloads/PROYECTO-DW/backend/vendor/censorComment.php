<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$commentId = $data->commentId;
$isCensored = $data->isCensored;

$sql = "UPDATE Comments SET IsCensored = ? WHERE CommentID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $isCensored, $commentId);

if ($stmt->execute()) {
    echo json_encode(['message' => $isCensored ? 'Comentario censurado con éxito' : 'Comentario descensurado con éxito']);
} else {
    echo json_encode(['message' => 'Error al actualizar el comentario: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>