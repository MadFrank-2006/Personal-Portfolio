import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy,
  where,
  getDoc
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

export async function getProjects() {
    try {
        const snapshot = await getDocs(collection(db, 'projects'));
        const projects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return projects;
    } catch (err) {
        console.error("Error fetching projects:", err);
        return [];
    }
}