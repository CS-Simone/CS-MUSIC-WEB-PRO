import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, releaseDate } = req.body;
    const coverFile = req.files.coverFile; // Assuming you handle file uploads

    // Handle file upload to Firebase Storage if needed
    // const coverImageUrl = await uploadToFirebaseStorage(coverFile);

    try {
      const docRef = await addDoc(collection(db, 'albums'), {
        name,
        releaseDate: new Date(releaseDate),
        // coverImageUrl, // Uncomment if you're using Firebase Storage
      });
      res.status(200).json({ message: 'Album created!', albumId: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Error creating album' });
    }
  } else if (req.method === 'GET') {
    const albumsCollection = collection(db, 'albums');
    const albumSnapshot = await getDocs(albumsCollection);
    const albumData = albumSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(albumData);
  }
};
