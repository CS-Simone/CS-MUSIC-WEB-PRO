<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit;
}

require '../init.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $author = $_POST['author'];
    $coverImage = $_FILES['cover_image']['name'];

    // Save the cover image
    $target_dir = "../public/assets/cover_images/";
    $target_file = $target_dir . basename($coverImage);
    move_uploaded_file($_FILES['cover_image']['tmp_name'], $target_file);

    // Insert into database
    $stmt = $pdo->prepare('INSERT INTO albums (name, author, cover_image) VALUES (?, ?, ?)');
    $stmt->execute([$name, $author, $coverImage]);

    header('Location: dashboard.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Album</title>
</head>
<body>
    <h2>Create New Album</h2>
    <form action="create_album.php" method="POST" enctype="multipart/form-data">
        <input type="text" name="name" placeholder="Album Name" required>
        <input type="text" name="author" placeholder="Author" required>
        <input type="file" name="cover_image" required>
        <button type="submit">Create Album</button>
    </form>
</body>
</html>
