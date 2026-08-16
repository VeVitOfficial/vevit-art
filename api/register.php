<?php
// =========================================================
// register.php - založení nového účtu umělce
// Očekává POST JSON: { "artist_name", "email", "password", "field" }
// field musí být jedno z: hudba, vytvarne_umeni, literatura, cosplay, jine
// =========================================================

declare(strict_types=1);
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$artistName = trim($data['artist_name'] ?? '');
$email      = trim($data['email'] ?? '');
$password   = $data['password'] ?? '';
$field      = $data['field'] ?? '';

$allowedFields = ['hudba', 'vytvarne_umeni', 'literatura', 'cosplay', 'jine'];

// --- Základní validace ---
if ($artistName === '' || $email === '' || $password === '' || !in_array($field, $allowedFields, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Vyplň umělecké jméno, email, heslo a platný obor']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['error' => 'Heslo musí mít alespoň 6 znaků']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Neplatný email']);
    exit;
}

$pdo = getDbConnection();

// --- Kontrola, jestli email už není zabraný ---
$stmt = $pdo->prepare('SELECT id FROM artists WHERE email = :email');
$stmt->execute(['email' => $email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['error' => 'Tento email už je zaregistrovaný']);
    exit;
}

// --- Vytvoření účtu (heslo se NIKDY neukládá čitelně) ---
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare(
    'INSERT INTO artists (artist_name, email, password_hash, field)
     VALUES (:artist_name, :email, :password_hash, :field)'
);
$stmt->execute([
    'artist_name'   => $artistName,
    'email'         => $email,
    'password_hash' => $passwordHash,
    'field'         => $field,
]);

echo json_encode([
    'success'   => true,
    'artist_id' => $pdo->lastInsertId(),
    'message'   => 'Účet vytvořen, teď se můžeš přihlásit',
]);
