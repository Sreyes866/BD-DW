<?php

include('db_connect.php');

$query = $conn->prepare("SELECT CommentID, Text FROM Comments WHERE IsCensored = 1 AND AutoCensored = 1");
$query->execute();
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>