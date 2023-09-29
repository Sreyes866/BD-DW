<?php
include 'db_connect.php';

$title = $_POST['title'];
$content = $_POST['content'];
$category = $_POST['category'];
$subCategory = $_POST['subCategory'];
$templateType = $_POST['templateType'];
$author = $_POST['author'];

$sql = "INSERT INTO articles (title, content, category, sub_category, template_type, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $title, $content, $category, $subCategory, $templateType, $author);
$result = $stmt->execute();

if ($result) {
    echo json_encode(["success" => true, "message" => "Article created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error creating article"]);
}

$stmt->close();
$conn->close();
?>
