<?php
// =========================================================
// get_profile.php - vrátí kompletní profil přihlášeného umělce
// Vyžaduje hlavičku: Authorization: Bearer <token>
// =========================================================

declare(strict_types=1);
require 'config.php';
require 'auth_helper.php';

$pdo    = getDbConnection();
$artist = requireAuth($pdo); // ověří token, vrátí řádek z artists

// Nikdy neposílat heslo (i zahashované) zpátky do appky
unset($artist['password_hash'], $artist['auth_token']);

$artistId = $artist['id'];

function fetchRelated(PDO $pdo, string $table, int $artistId): array
{
    $stmt = $pdo->prepare("SELECT * FROM {$table} WHERE artist_id = :id");
    $stmt->execute(['id' => $artistId]);
    return $stmt->fetchAll();
}

$response = [
    'profile'         => $artist,
    'social_links'    => fetchRelated($pdo, 'social_links', $artistId),
    'portfolio_samples' => fetchRelated($pdo, 'portfolio_samples', $artistId),
    'experiences'     => fetchRelated($pdo, 'experiences', $artistId),
    'collaborations'  => fetchRelated($pdo, 'collaborations', $artistId),
    'awards'          => fetchRelated($pdo, 'awards', $artistId),
    'education'       => fetchRelated($pdo, 'education', $artistId),
];

echo json_encode($response);
