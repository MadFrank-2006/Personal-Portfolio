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
  serverTimestamp,
  writeBatch
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
export async function updateProject(id, patch) {
    const ref = doc(db, "projects", id);
    const docSnap = await getDoc(ref);
    const currentData = docSnap.data();
    // Normalize patch data
    const norm = { };

    if (patch.title) norm.title = patch.title.trim();
    if (patch.description) norm.description = patch.description.trim();
    if (patch.url) norm.url = patch.url.trim();

    // Strict tag formatting
    if (patch.tags) {
        norm.tags = Array.isArray(patch.tags)
            ? patch.tags.map(tag => tag.trim()).filter(Boolean)
            : [];
    }

    // Boolean field
    if (typeof patch.featured === "boolean") {
        norm.featured = patch.featured;
    }

    // Handle image only if a new file was selected
    if (patch.file instanceof File) {
        norm.image = await uploadImageFile(patch.file, currentData.image);
    } else {
        // Keep current image if no new file provided
        norm.image = currentData.image;
    }

    // Prevent raw `file` key from being stored in Firestore
    delete norm.file;
    
    norm.updatedAt = serverTimestamp();
    await updateDoc(ref, norm);
}

// Deletes a project
export async function deleteProject(id) {
    if (!id || typeof id !== "string") {
        console.error("Invalid ID passed to deleteProject", id);
        return;
    }
    const ref = doc(db, "projects", id);
    await deleteDoc(ref);
}


// Set featured project, ensures only one project is featured at a time. Function is atomic, uses batch so it either fully completes or fully fails.
export async function setFeatured(id) {
    const snap = await getDocs(col);      // get all projects
    const batch = writeBatch(db);         // create a batch

    snap.forEach(projectDoc => {
        const isTarget = projectDoc.id === id;
        const projectRef = doc(db, "projects", projectDoc.id);
        batch.update(projectRef, { featured: isTarget });
    });

    await batch.commit();
}


export async function uploadImageFile(file, existingUrl = null) {
  // No new file? Keep the old image URL safely.
  if (!file) return existingUrl;

  // Upload new file to Firebase Storage
  const storageRef = ref(storage, `projects/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);
  const newUrl = await getDownloadURL(storageRef);

  // Try deleting the old image ONLY if we can convert its URL
  if (existingUrl && existingUrl.includes("https://")) {
    try {
      // Convert public URL to a valid storage path
      const path = existingUrl.split("/o/")[1]?.split("?")[0];
      if (path) {
        const oldRef = ref(storage, decodeURIComponent(path));
        await deleteObject(oldRef);
      }
    } catch (e) {
      console.warn("Could not delete old image:", e);
    }
  }

  return newUrl;
}

