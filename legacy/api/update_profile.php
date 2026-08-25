<?php
// =========================================================
// update_profile.php - úprava základních údajů profilu
// Vyžaduje hlavičku: Authorization: Bearer <token>
// Očekává POST JSON s libovolnými z těchto polí (jen co se mění):
// real_name, genre, bio, phone, instagram_handle, profile_photo_url,
// logo_url, current_plans, looking_for, music_role, main_instrument,
// art_technique, writing_genre, published_works_count,
// cosplay_characters, offers_costume_rental
// =========================================================

declare(strict_types=1);
require 'config.php';
require 'auth_helper.php';

$pdo    = getDbConnection();
$artist = requireAuth($pdo);

$data = json_decode(file_get_contents('php://input'), true);

// Pole, která smí umělec sám měnit
$allowedFields = [
    'real_name', 'genre', 'bio', 'phone', 'instagram_handle',
    'profile_photo_url', 'logo_url', 'current_plans', 'looking_for',
    'music_role', 'main_instrument', 'art_technique', 'writing_genre',
    'published_works_count', 'cosplay_characters', 'offers_costume_rental',
];

$updates = [];
$params  = ['id' => $artist['id']];

foreach ($allowedFields as $field) {
    if (array_key_exists($field, $data)) {
        $updates[] = "{$field} = :{$field}";
        $params[$field] = $data[$field];
    }
}

if (empty($updates)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nebyla poslána žádná data k úpravě']);
    exit;
}

$sql = 'UPDATE artists SET ' . implode(', ', $updates) . ' WHERE id = :id';
$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode(['success' => true, 'message' => 'Profil upraven']);
