<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

if (isset($data->action)) {
    $action = $data->action;

    if ($action === 'updateUser') {
        $username = $data->username ?? '';
        $name = $data->name ?? '';
        $email = $data->email ?? '';
        $password = $data->password ?? '';
    
        $query = "UPDATE users SET name=?, email=?, password=? WHERE username=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssss", $name, $email, $password, $username);
    
        if ($stmt === false) {
            die("Failed to prepare statement: " . $conn->error);
        }
    

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Usuario actualizado exitosamente']);
        } else {
            echo json_encode(['message' => 'Error al actualizar usuario', 'error' => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['message' => 'Acción no válida']);
    }
} else {
    echo json_encode(['message' => 'Acción no especificada']);
}

$conn->close();
?>