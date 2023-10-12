<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Simplemente devolver un mensaje que el frontend usará para limpiar el estado
echo json_encode(['message' => 'Usuario deslogueado']);
?>