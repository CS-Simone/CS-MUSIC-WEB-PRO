<?php
require '../init.php';

$albums = $pdo->query('SELECT * FROM albums')->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Albums</title>
    <style>
        .song-list {
            display: none;
        }
    </style>
</head>
<body>
    <h2>Albums</h2>

    <?php foreach ($albums as $album): ?>
        <div>
            <h3><?php echo htmlspecialchars($album['name']); ?></h3>
            <p>Author: <?php echo htmlspecialchars($album['author']); ?></p>
            <img src="assets/cover_images/<?php echo htmlspecialchars($album['cover_image']); ?>" width="100">
            <button onclick="toggleSongs(<?php echo $album['id']; ?>)">Show Songs</button>
            <ul id="songs-<?php echo $album['id']; ?>" class="song-list">
                <?php
                $songs = $pdo->prepare('SELECT * FROM songs WHERE album_id = ?');
                $songs->execute([$album['id']]);
                foreach ($songs as $song):
                ?>
                    <li>
                        <strong><?php echo htmlspecialchars($song['name']); ?></strong> - 
                        <?php echo htmlspecialchars($song['author']); ?>
                        <audio controls>
                            <source src="assets/songs/<?php echo htmlspecialchars($song['song_file']); ?>" type="audio/mpeg">
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
