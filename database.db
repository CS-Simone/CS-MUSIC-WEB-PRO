CREATE TABLE albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    cover_image TEXT NOT NULL
);

CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    song_file TEXT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id)
);
