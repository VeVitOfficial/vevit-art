<?php
// =========================================================
// social_links.php - přidání nebo smazání sociální sítě
// Vyžaduje hlavičku: Authorization: Bearer <token>
//
// PŘIDÁNÍ - POST JSON: { "action": "add", "platform": "Spotify", "url": "..." }
// SMAZÁNÍ - POST JSON: { "action": "delete", "id": 5 }
//
// TIP: úplně stejným způsobem uděláš portfolio_samples.php,
// experiences.php, collaborations.php, awards.php a education.php -
// stačí změnit název tabulky a sloupce podle potřeby.
// =========================================================

declare(strict_types=1);
require 'config.php';
require 'auth_helper.php';

$pdo    = getDbConnection();
$artist = requireAuth($pdo);

$data   = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($action === 'add') {
    $platform = trim($data['platform'] ?? '');
    $url      = trim($data['url'] ?? '');

    if ($platform === '' || $url === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Vyplň platformu i odkaz']);
        exit;
    }

    $stmt = $pdo->prepare(
        'INSERT INTO social_links (artist_id, platform, url) VALUES (:artist_id, :platform, :url)'
    );
    $stmt->execute([
        'artist_id' => $artist['id'],
        'platform'  => $platform,
        'url'       => $url,
    ]);

    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);

} elseif ($action === 'delete') {
    $id = (int)($data['id'] ?? 0);

    // Kontrola, že si umělec maže SVŮJ vlastní odkaz, ne cizí
    $stmt = $pdo->prepare(
        'DELETE FROM social_links WHERE id = :id AND artist_id = :artist_id'
    );
    $stmt->execute(['id' => $id, 'artist_id' => $artist['id']]);

    echo json_encode(['success' => true]);

} else {
    http_response_code(400);
    echo json_encode(['error' => 'Neplatná akce, použij "add" nebo "delete"']);
}
