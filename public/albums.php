<?php
require '../init.php';

// Fetch albums with songs
$albums = $pdo->query('SELECT * FROM albums')->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Albums</title>
</head>
<body>
    <h2>Albums</h2>
    <?php foreach ($albums as $album): ?>
        <div>
            <h3><?php echo htmlspecialchars($album['name']); ?></h3>
            <img src="./assets/cover_images/<?php echo htmlspecialchars($album['cover_image']); ?>" alt="Album Cover" width="100">
            <button onclick="toggleSongs(<?php echo $album['id']; ?>)">Show Songs</button>
            <ul id="songs-<?php echo $album['id']; ?>" style="display:none;">
                <?php
                $stmt = $pdo->prepare('SELECT * FROM songs WHERE album_id = ?');
                $stmt->execute([$album['id']]);
                $songs = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach ($songs as $song):
                ?>
                    <li>
                        <strong><?php echo htmlspecialchars($song['name']); ?></strong> by <?php echo htmlspecialchars($song['author']); ?>
                        <audio controls>
                            <source src="./assets/songs/<?php echo htmlspecialchars($song['song_file']); ?>" type="audio/mpeg">
                        </audio>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endforeach; ?>

    <script>
        function toggleSongs(albumId) {
            const songsList = document.getElementById('songs-' + albumId);
            songsList.style.display = songsList.style.display === 'none' ? 'block' : 'none';
        }
    </script>
</body>
</html>
