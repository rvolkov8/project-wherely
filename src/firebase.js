// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCSNBecauaHF0ZRwHKBqDXJu1X4wbccIdw',
  authDomain: 'wherely-67d43.firebaseapp.com',
  projectId: 'wherely-67d43',
  storageBucket: 'wherely-67d43.appspot.com',
  messagingSenderId: '755469953058',
  appId: '1:755469953058:web:1534ab6b8bd34c6e07427b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);

// const n64ImgRef = ref(storage, 'n64/n64.jpg');
// const downloadImage = async (ref) => {
//   try {
//     const url = await getDownloadURL(ref);
//     console.log(url);
//   } catch (error) {
//     console.log(error);
//   }
// };
