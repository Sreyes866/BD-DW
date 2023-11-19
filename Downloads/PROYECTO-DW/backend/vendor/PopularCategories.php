<?php
include('db_connect.php');

// Encontrar la category_id con más artículos
$sql = "SELECT category_id, COUNT(*) as count FROM Articles GROUP BY category_id ORDER BY count DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $maxCategoryId = $row["category_id"];

    // Seleccionar todos los artículos de la categoría con más artículos
    $sql = "SELECT * FROM Articles WHERE category_id = $maxCategoryId";
    $result = $conn->query($sql);

    $articles = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $articles[] = $row;
        }
    }

    // Aquí tienes todos los artículos en la categoría con más artículos
    print_r($articles);

} else {
    echo "0 resultados";
}

$conn->close();
?>
