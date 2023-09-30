<?php
// Conexión a la base de datos
include ('db_connect.php');

// Subcategorías mapeadas a sus categorías
$subcategories = [
    'Tecnologia' => ['Programación', 'Inteligencia Artificial', 'Ciberseguridad', 'IoT', 'Blockchain'],
    'Ciencia' => ['Biología', 'Física', 'Química', 'Astronomía', 'Geología'],
    'Salud' => ['Nutrición', 'Salud Mental', 'Cardiología', 'Pediatría', 'Neurología'],
    'Arte y cultura' => ['Historia del Arte', 'Literatura Clásica', 'Música', 'Teatro', 'Cine'],
    'Negocios y finanzas' => ['Inversión en Criptomonedas', 'Marketing Digital', 'Gestión de Proyectos', 'Finanzas Personales', 'Emprendimiento']
];

foreach ($subcategories as $category => $subs) {
    // Obtener el ID de la categoría
    $sql = "SELECT id FROM Categories WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $category_id = $row['id'];
    
    // Insertar las subcategorías
    foreach ($subs as $subcategory) {
        $sql = "INSERT INTO SubCategories (name, category_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $subcategory, $category_id);
        $stmt->execute();
    }
}

echo "Subcategorías insertadas con éxito.";

// Cerrar la conexión
$conn->close();
?>
