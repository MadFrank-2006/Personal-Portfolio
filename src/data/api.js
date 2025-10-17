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
import { ref, uploadString, getDownloadURL, deleteObject, getStorage, uploadBytes } from 'firebase/storage';
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
export async function createProject({ title, description, file, url, tags = [], featured = false}) {
    const imageUrl = file ? await uploadImageFile(file) : "";
    
    const ref = await addDoc(col, {
        title: title.trim(),
        description: description.trim(),
        image: imageUrl,
        url: url.trim(),
        tags: tags.map(tag => tag.trim()).filter(Boolean),
        featured: !!featured,
        createdAt: serverTimestamp()
    });
    return ref.id;
}

// Updates an existing project
export async function updateProject( id, patch) {
    const ref = doc(db, "projects", id);
    // Normalize patch data
    const norm = { ...patch };

    if (patch.file) {
        norm.image = await uploadImageFile(patch.file, currentData.image);
    }

    if (norm.title) norm.title = norm.title.trim();
    if (norm.description) norm.description = norm.description.trim();
    if (norm.url) norm.url = norm.url.trim();
    if (Array.isArray(norm.tags)) { norm.tags = norm.tags.map(tag => tag.trim()).filter(Boolean); }
    if (norm.featured !== undefined) norm.featured = !!norm.featured;
    norm.updatedAt = serverTimestamp();
    await updateDoc(ref, norm);
}

// Deletes a project
export async function deleteProject(id) {
    await deleteDoc(doc(db, "projects", id));
}

// Set featured project, ensures only one project is featured at a time. Function is atomic, uses batch so it either fully completes or fully fails.
export async function setFeatured(id) {
    const q = query(col);
    const snap = await getDocs(q);
    const batch = writeBatch(db);
    snap.forEach(doc => {
        const isTarget = doc.id === id;
        batch.update(doc(db, "projects", doc.id), { featured: isTarget });
    });
    await batch.commit();
}

export async function uploadImageFile(file, existingUrl = null) {
  if (!file) return existingUrl; // If no new file, keep old URL

  const storageRef = ref(storage, `projects/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  // If replacing, delete old file
  if (existingUrl) {
    try {
      const oldRef = ref(storage, existingUrl);
      await deleteObject(oldRef);
    } catch (e) {
      console.warn('Old image not found or already deleted.');
    }
  }

  return url;
}
