<?php
// Conexión a la base de datos
include ('db_connect.php');

// Categorías
$categories = ['Tecnologia', 'Ciencia', 'Salud', 'Arte y cultura', 'Negocios y finanzas'];

foreach ($categories as $category) {
    // Insertar la categoría
    $sql = "INSERT INTO Categories (name) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category);
    $stmt->execute();
}

echo "Categorías insertadas con éxito.";

// Cerrar la conexión
$conn->close();
?>
