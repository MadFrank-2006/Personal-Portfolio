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
  getDoc, 
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

const col = collection(db, 'projects');

// Gets all projects
export async function getProjects() {
    try {
        const q = query(col, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
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

// Creates a new project
export async function createProject({ title, description, image = "", url, tags = [], featured = false}) {
    const ref = await addDoc(col, {
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
        url: url.trim(),
        tags: tags.map(tag => tag.trim()).filter(Boolean),
        featured: !!featured,
        createdAt: serverTimestamp()
    });
    return ref.id;
}