<?php

include('db_connect.php');

$commentId = $_POST['commentId'];

$query = $conn->prepare("UPDATE Comments SET IsCensored = 0 WHERE CommentID = :commentId");
$query->bindParam(':commentId', $commentId);
$query->execute();

echo json_encode(["success" => true]);
?>