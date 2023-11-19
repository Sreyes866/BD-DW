<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

$username = $data['username'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && $password === $user['password']) {
        // Update last_active_date
        $update_sql = "UPDATE users SET last_active_date = NOW() WHERE username = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("s", $username);
        $update_stmt->execute();

        // If the role is "logged_in_visitor", update the UserLoginRecords table
        if ($user['role'] === 'logged_in_visitor') {
            $insert_sql = "INSERT INTO UserLoginRecords (user_id, login_time) VALUES (?, NOW())";
            $insert_stmt = $conn->prepare($insert_sql);
            $insert_stmt->bind_param("i", $user['id']);
            $insert_stmt->execute();
        }

        echo json_encode([
            'message' => 'Usuario autenticado',
            'user' => [
                'role' => $user['role'],
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => $user['password'],
                'is_subscribed' => $user['is_subscribed'],
                'expiryDate' => $user['expiryDate']
            ]
        ]);
    } else {
        echo json_encode(['message' => 'Usuario o contraseña incorrectos']);
    }
} else {
    echo json_encode(['message' => 'Error en la autenticación', 'error' => $stmt->error]);
}

$conn->close();
?>