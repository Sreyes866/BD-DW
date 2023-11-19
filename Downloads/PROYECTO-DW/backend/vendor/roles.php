<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$roles = [
    'visitor' => ['read'],
    'logged_in_visitor' => ['read', 'comment'],
    'author' => ['read', 'write', 'comment'],
    'moderator' => ['read', 'write', 'comment', 'moderate'],
    'admin' => ['read', 'write', 'comment', 'moderate', 'admin']
];

echo json_encode($roles);
?>