<?php
include 'db_connect.php';

$id = $_POST['id'];
$title = $_POST['title'];
$content = $_POST['content'];
$category = $_POST['category'];
$subCategory = $_POST['subCategory'];
$templateType = $_POST['templateType'];

$sql = "UPDATE articles SET title = ?, content = ?, category = ?, sub_category = ?, template_type = ?, updated_at = NOW() WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $title, $content, $category, $subCategory, $templateType, $id);
$result = $stmt->execute();

if ($result) {
    echo json_encode(["success" => true, "message" => "Article updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating article"]);
}

$stmt->close();
$conn->close();
?>