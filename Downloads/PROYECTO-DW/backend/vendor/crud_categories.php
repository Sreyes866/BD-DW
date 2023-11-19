<?php
include ('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

$action = $data['action'];

// Categorías
if ($action === 'create_category') {
    $name = $data['name'];
    $sql = "INSERT INTO Categories (name) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $name);
    
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Categoría creada']);
    } else {
        echo json_encode(['message' => 'Error al crear categoría']);
    }
}

if ($action === 'update_category') {
    $id = $data['id'];
    $newName = $data['newName'];
    $sql = "UPDATE Categories SET name = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newName, $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Categoría actualizada']);
    } else {
        echo json_encode(['message' => 'Error al actualizar categoría']);
    }
}



$conn->close();
?>



