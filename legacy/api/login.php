<?php
// =========================================================
// login.php - přihlášení, vrací token pro další požadavky
// Očekává POST JSON: { "email", "password" }
// =========================================================

declare(strict_types=1);
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Vyplň email a heslo']);
    exit;
}

$pdo = getDbConnection();

$stmt = $pdo->prepare('SELECT * FROM artists WHERE email = :email');
$stmt->execute(['email' => $email]);
$artist = $stmt->fetch();

if (!$artist || !password_verify($password, $artist['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Nesprávný email nebo heslo']);
    exit;
}

// --- Vygenerování nového tokenu, platnost 30 dní ---
$token   = bin2hex(random_bytes(32));
$expires = date('Y-m-d H:i:s', strtotime('+30 days'));

$stmt = $pdo->prepare(
    'UPDATE artists SET auth_token = :token, token_expires = :expires WHERE id = :id'
);
$stmt->execute([
    'token'   => $token,
    'expires' => $expires,
    'id'      => $artist['id'],
]);

echo json_encode([
    'success'     => true,
    'token'       => $token,
    'artist_id'   => $artist['id'],
    'artist_name' => $artist['artist_name'],
]);
