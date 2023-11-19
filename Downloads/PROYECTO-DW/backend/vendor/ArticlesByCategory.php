<?php
include('db_connect.php');

$category_id = $_GET['category_id'] ?? null;
$sub_category_id = $_GET['sub_category_id'] ?? null;

$sql = "SELECT * FROM Articles WHERE 1";

if ($category_id) {
    $sql .= " AND category_id = $category_id";
}

if ($sub_category_id) {
    $sql .= " AND sub_category_id = $sub_category_id";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $articles = array();
    while($row = $result->fetch_assoc()) {
        $articles[] = $row;
    }
    echo json_encode($articles);
} else {
    echo json_encode(["message" => "No articles found"]);
}

$conn->close();
?>
