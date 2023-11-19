<?php

include('db_connect.php');

$authorName = $_GET['authorName'];

$query = "SELECT email FROM users WHERE name = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $authorName);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
  echo json_encode(['email' => $row['email']]);
} else {
  echo json_encode(['error' => 'Email not found']);
}

$stmt->close();
$conn->close();
?>