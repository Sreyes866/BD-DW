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
        $role = $data->role ?? '';
        $expiryDate = isset($data->expiryDate) ? $data->expiryDate : NULL;
    
        if ($expiryDate !== NULL) {
            $query = "UPDATE users SET name=?, email=?, role=?, expiryDate=? WHERE username=?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("sssss", $name, $email, $role, $expiryDate, $username);
        } else {
            $query = "UPDATE users SET name=?, email=?, role=?, expiryDate=NULL WHERE username=?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssss", $name, $email, $role, $username);
        }
    
        if ($stmt === false) {
            die("Failed to prepare statement: " . $conn->error);
        }
    
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Usuario actualizado exitosamente']);
        } else {
            echo json_encode(['message' => 'Error al actualizar usuario', 'error' => $stmt->error]);
        }
        $stmt->close();
    }
    elseif ($action === 'createUser') {
        $username = $data->username ?? '';
        $name = $data->name ?? '';
        $email = $data->email ?? '';
        $role = $data->role ?? '';
        $password = $data->password ?? '';
        $is_subscribed = $data->is_subscribed ?? '0';  // Valor predeterminado
        $expiryDate = isset($data->expiryDate) ? $data->expiryDate : NULL;  // Aquí es donde cambiamos para aceptar NULL
        
        $query = "INSERT INTO users (username, name, email, role, password, is_subscribed, expiryDate) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        
        if ($stmt === false) {
            die("Failed to prepare statement: " . $conn->error);
        }
        
        $stmt->bind_param("sssssss", $username, $name, $email, $role, $password, $is_subscribed, $expiryDate);
        
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Usuario creado exitosamente']);
        } else {
            echo json_encode(['message' => 'Error al crear usuario', 'error' => $stmt->error]);
        }
        $stmt->close();
    }
    elseif ($action === 'deleteUser') {
        $username = $data->username ?? '';

        $query = "DELETE FROM users WHERE username=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $username);

        if ($stmt === false) {
            die("Failed to prepare statement: " . $conn->error);
        }

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Usuario eliminado exitosamente']);
        } else {
            echo json_encode(['message' => 'Error al eliminar usuario', 'error' => $stmt->error]);
        }
        $stmt->close();
    }
    else {
        echo json_encode(['message' => 'Acción no válida']);
    }
} else {
    echo json_encode(['message' => 'Acción no especificada']);
}

$conn->close();
?>