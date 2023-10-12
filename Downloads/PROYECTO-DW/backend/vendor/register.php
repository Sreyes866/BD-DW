<?php
// Incluye PHPMailer
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Configuración CORS y conexión a la base de datos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['username']) || !isset($data['password']) || !isset($data['email'])) {
    echo json_encode(['message' => 'Datos incompletos']);
    exit();
}

$name = $data['name'];
$username = $data['username'];
$password = $data['password']; 
$email = $data['email'];
$role = 'logged_in_visitor';

$sql = "INSERT INTO users (name, username, password, email, role) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

$stmt->bind_param("sssss", $name, $username, $password, $email, $role);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Usuario registrado']);
    
    // Inicializar PHPMailer para enviar el correo
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tu_correo@gmail.com'; // Reemplaza con tu dirección de correo
        $mail->Password = 'tu_contraseña';       // Reemplaza con tu contraseña
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        
        $mail->setFrom('tu_correo@gmail.com', 'Tu Nombre'); // Reemplaza con tu nombre y dirección de correo
        $mail->addAddress($email, $name);
        
        $mail->isHTML(true);
        $mail->Subject = 'Gracias por registrarte';
        $mail->Body = "<p>Hola $name,</p><p>Gracias por registrarte en nuestro sitio web.</p>";
        
        $mail->send();
    } catch (Exception $e) {
        // Si hay un error al enviar el correo, puedes manejarlo aquí
    }
} else {
    echo json_encode(['message' => 'Error al registrar usuario', 'error' => $stmt->error]);
}

$conn->close();
?>