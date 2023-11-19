UpdateUserProfileAdmin.php:    <?php
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
        $is_active = $data->is_active ?? 1;
        $nationality = $data->nationality ?? '';

        $query = "UPDATE users SET name=?, email=?, role=?, expiryDate=?, is_active=?, nationality=? WHERE username=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssssiss", $name, $email, $role, $expiryDate, $is_active, $nationality, $username);

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
        $nationality = $data->nationality ?? '';
        $is_subscribed = $data->is_subscribed ?? '0';
        $expiryDate = isset($data->expiryDate) ? $data->expiryDate : NULL;
        $is_active = isset($data->is_active) ? $data->is_active : 1;

        $query = "INSERT INTO users (username, name, email, role, password, nationality, is_subscribed, expiryDate, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssssssii", $username, $name, $email, $role, $password, $nationality, $is_subscribed, $expiryDate, $is_active);

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

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Usuario eliminado exitosamente']);
        } else {
            echo json_encode(['message' => 'Error al eliminar usuario', 'error' => $stmt->error]);
        }
        $stmt->close();
    }
    elseif ($action === 'toggleActive') {
        $username = $data->username;
        $is_active = $data->is_active;

        $query = "UPDATE users SET is_active = ? WHERE username = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("is", $is_active, $username);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Usuario activado/desactivado exitosamente']);
        } else {
            echo json_encode(['message' => 'Error al activar/desactivar usuario']);
        }
    }
    else {
        echo json_encode(['message' => 'Acción no válida']);
    }
} else {
    echo json_encode(['message' => 'Acción no especificada']);
}

$conn->close();
?>