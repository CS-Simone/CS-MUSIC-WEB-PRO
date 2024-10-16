// albums.js
import { db, storage } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, releaseDate } = req.body;
    const coverFile = req.files.coverFile;

    // Upload cover image to Firebase Storage
    const coverImageUrl = await uploadCoverImage(coverFile);

    try {
      const docRef = await addDoc(collection(db, 'albums'), {
        name,
        releaseDate: new Date(releaseDate),
        coverImageUrl,
      });
      res.status(200).json({ message: 'Album created!', albumId: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Error creating album' });
    }
  } else if (req.method === 'GET') {
    // ... Existing GET logic
  }
};

// Function to upload cover image
const uploadCoverImage = async (file) => {
  const storageRef = ref(storage, `covers/${file.originalname}`);
  await uploadBytes(storageRef, file.buffer);
  return await getDownloadURL(storageRef);
};
