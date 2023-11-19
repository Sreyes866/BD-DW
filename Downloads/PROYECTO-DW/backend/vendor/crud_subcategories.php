<?php
include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

$action = $data['action'];

if ($action === 'create_subcategory') {
    $name = $data['name'];
    $category_id = $data['category_id'];
    $sql = "INSERT INTO SubCategories (name, category_id) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $name, $category_id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Subcategory created']);
    } else {
        echo json_encode(['message' => 'Error creating subcategory']);
    }
}

if ($action === 'update_subcategory') {
    $id = $data['id'];
    $newName = $data['newName'];
    $category_id = $data['category_id'];

    $sql = "UPDATE SubCategories SET name = ?, category_id = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sii", $newName, $category_id, $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Subcategory updated']);
    } else {
        echo json_encode(['message' => 'Error updating subcategory']);
    }
}

$conn->close();
?>
