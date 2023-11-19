<?php
// CORS y Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include('db_connect.php');

// Inicializar una matriz para almacenar los datos de los usuarios que cumplen con los requisitos de la oferta
$eligible_users = [];

// Consulta para obtener los registros de login de los usuarios
$queryLogin = "SELECT user_id, COUNT(*) as login_count FROM UserLoginRecords GROUP BY user_id";
$resultLogin = mysqli_query($conn, $queryLogin);

// Verificación de errores en la consulta de registros de login (ya funciona)
if (!$resultLogin) {
    die("Error en la consulta de registros de login: " . mysqli_error($conn));
}

// Bucle para procesar cada fila devuelta en la consulta de registros de login
while ($rowLogin = mysqli_fetch_assoc($resultLogin)) {
    $user_id = $rowLogin['user_id'];
    $login_count = $rowLogin['login_count'];

    // Consulta para verificar si el usuario no tiene una suscripción
    $querySubscription = "SELECT * FROM users WHERE id = '$user_id' AND is_subscribed = 0";
    $resultSubscription = mysqli_query($conn, $querySubscription);

    // Si el usuario no tiene una suscripción
    if (mysqli_num_rows($resultSubscription) > 0) {
        
        // Consulta para obtener las ofertas configuradas que el usuario pueda cumplir
        $queryOffer = "SELECT * FROM OfferConfig WHERE continuous_login_days <= $login_count";
        $resultOffer = mysqli_query($conn, $queryOffer);

        // Si el usuario cumple con los requisitos de alguna oferta
        if (mysqli_num_rows($resultOffer) > 0) {
            
            // Obtener detalles del usuario y de la oferta
            $userInfo = mysqli_fetch_assoc($resultSubscription);
            $offerInfo = mysqli_fetch_assoc($resultOffer);
            
            // Almacenar los datos del usuario y la oferta en la matriz $eligible_users
            $eligible_users[] = [
                'user_id' => $user_id,
                'name' => $userInfo['name'],
                'email' => $userInfo['email'],
                'offer_details' => [
                    'discount_percentage' => $offerInfo['discount_percentage'],
                    'validity_days' => $offerInfo['validity_days'],
                    'continuous_login_days' => $offerInfo['continuous_login_days']
                ]
            ];
        }
    }
}

// Convertir la matriz $eligible_users a formato JSON y devolver como respuesta
echo json_encode($eligible_users);
?>