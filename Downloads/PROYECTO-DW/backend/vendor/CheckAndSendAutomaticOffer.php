<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

// Consultar configuración de oferta automática
$sql = "SELECT * FROM AutomaticOfferConfig ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);
$config = $result->fetch_assoc();

// Verificar usuarios que cumplen con los días consecutivos de login
$sql = "SELECT user_id, COUNT(*) as count FROM UserLoginRecords GROUP BY user_id HAVING count >= {$config['login_days']}";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $user_id = $row['user_id'];
    // Verificar si el usuario tiene el rol "logged_in_visitor" y no está suscrito
    $sql = "SELECT * FROM users WHERE id = $user_id AND role = 'logged_in_visitor' AND is_subscribed = 0";
    $user_result = $conn->query($sql);
    if ($user_result->num_rows > 0) {
        // Insertar oferta
        $expiry_date = date('Y-m-d H:i:s', strtotime("+{$config['validity_days']} days"));
        $sql = "INSERT INTO Ofertas (user_id, discount, validity_days, offer_type, created_at, expiry_date) VALUES ($user_id, {$config['discount']}, {$config['validity_days']}, 'Automatic', NOW(), '$expiry_date')";
        $conn->query($sql);
    }
}

// Enviar correos se haría en el frontend
echo json_encode(array("message" => "Ofertas automáticas enviadas si aplicable"));
?>