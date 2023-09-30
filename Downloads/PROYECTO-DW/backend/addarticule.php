<?php
// Configuración de encabezados para permitir solicitudes desde cualquier origen,
// con los métodos POST y GET y el encabezado Content-Type permitido.
header("Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

// Incluye el archivo de conexión a la base de datos.
include ('db_connect.php');

// Lee los datos JSON de la solicitud entrante y los decodifica en un arreglo asociativo.
$data = json_decode(file_get_contents('php://input'), true);

// Verifica si los datos requeridos están presentes en el arreglo.
if (!isset($data['title']) || !isset($data['content']) || !isset($data['category_id']) || !isset($data['sub_category_id']) || !isset($data['author_id'])) {
    // Si falta algún dato, imprime un mensaje JSON y finaliza la ejecución del script.
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

// Prepara una consulta SQL de inserción para agregar un nuevo registro a la tabla "Articles".
$sql = "INSERT INTO Articles (title, content, category_id, sub_category_id, author_id) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Vincula los parámetros de la consulta SQL con los valores obtenidos del arreglo.
$stmt->bind_param("sssii", $data['title'], $data['content'], $data['category_id'], $data['sub_category_id'], $data['author_id']);

// Ejecuta la consulta SQL preparada.
if ($stmt->execute()) {
    // Si la inserción es exitosa, imprime un mensaje JSON.
    echo json_encode(['message' => 'Artículo añadido']);
} else {
    // Si hay un error en la inserción, imprime un mensaje JSON que incluye información sobre el error.
    echo json_encode(['message' => 'Error al añadir artículo', 'error' => $stmt->error]);
}

// Cierra la conexión a la base de datos.
$conn->close();
?>