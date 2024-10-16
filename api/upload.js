import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { title, authors, albumId, releaseDate, length } = req.body;
    const songFile = req.files.songFile; // Assuming you handle file uploads

    // Handle file upload to Firebase Storage if needed
    // const songFileUrl = await uploadToFirebaseStorage(songFile);

    try {
      const docRef = await addDoc(collection(db, 'songs'), {
        title,
        authors: authors.split(','),
        albumId,
        releaseDate: new Date(releaseDate),
        length,
        // songFileUrl, // Uncomment if you're using Firebase Storage
      });
      res.status(200).json({ message: 'Song uploaded successfully!', songId: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading song' });
    }
  } else if (req.method === 'GET') {
    const songsCollection = collection(db, 'songs');
    const songSnapshot = await getDocs(songsCollection);
    const songData = songSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(songData);
  }
};
