<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');


$data = json_decode(file_get_contents('php://input'), true);

$action = $data['action'];

if ($action === 'create_category') {
    $name = $data['name'];
    $sql = "INSERT INTO Categories (name) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $name);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Category created']);
    } else {
        echo json_encode(['message' => 'Error creating category']);
    }
}


if ($action === 'update_category') {
    $id = $data['id'];
    $newName = $data['newName'];
    $sql = "UPDATE Categories SET name = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newName, $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Category updated']);
    } else {
        echo json_encode(['message' => 'Error updating category']);
    }
}


$conn->close();
?>


