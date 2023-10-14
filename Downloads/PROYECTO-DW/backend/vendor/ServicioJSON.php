<?php
// Archivo: api.php
header('Content-Type: application/json');

include('db_connect.php');  // Conexión a la base de datos

// Obtener un artículo
$articleSql = "SELECT * FROM Articles WHERE id = 1";  // Cambia el id según necesites
$articleStmt = $conn->prepare($articleSql);
$articleStmt->execute();
$article = $articleStmt->get_result()->fetch_assoc();

// Obtener categorías
$categoriesSql = "SELECT * FROM Categories";
$categoriesStmt = $conn->prepare($categoriesSql);
$categoriesStmt->execute();
$categoriesResult = $categoriesStmt->get_result();
$categories = $categoriesResult->fetch_all(MYSQLI_ASSOC);

// Obtener subcategorías
$subcategoriesSql = "SELECT * FROM SubCategories";
$subcategoriesStmt = $conn->prepare($subcategoriesSql);
$subcategoriesStmt->execute();
$subcategoriesResult = $subcategoriesStmt->get_result();
$subcategories = $subcategoriesResult->fetch_all(MYSQLI_ASSOC);

// Preparar la respuesta JSON
$response = [
    'article' => $article,
    'categories' => $categories,
    'subcategories' => $subcategories
];

echo json_encode($response);

$conn->close();
?>