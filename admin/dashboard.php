<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit;
}

require '../init.php';

// Fetch albums for display
$albums = $pdo->query('SELECT * FROM albums')->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
</head>
<body>
    <h2>Admin Dashboard</h2>
    <a href="create_album.php">Create Album</a>
    <a href="create_song.php">Create Song</a>

    <h3>Albums</h3>
    <?php foreach ($albums as $album): ?>
        <div>
            <h4><?php echo htmlspecialchars($album['name']); ?></h4>
            <p>Author: <?php echo htmlspecialchars($album['author']); ?></p>
            <img src="../public/assets/cover_images/<?php echo htmlspecialchars($album['cover_image']); ?>" alt="Album Cover" width="100">
        </div>
    <?php endforeach; ?>
</body>
</html>
