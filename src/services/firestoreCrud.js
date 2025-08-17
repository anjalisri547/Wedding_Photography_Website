import { db, storage } from "../pages/ClientLogin/firebaseConfig";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// --------------------- Generic CRUD ---------------------

// Fetch all documents in a collection
export const fetchCollection = async (collectionName) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add new document (generic)
export const addDocToCollection = async (collectionName, data) => {
  const docRef = doc(db, collectionName, `doc-${Date.now()}`);
  await setDoc(docRef, data);
};

// Update document
export const updateDocInCollection = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
};

// Delete document
export const deleteDocFromCollection = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

// --------------------- Packages ---------------------

/**
 * Add a new Package with optional image upload
 * @param {Object} packageData - { title, price, description, features }
 * @param {File|null} file - optional image file
 */
export const addPackage = async (packageData, file = null) => {
  const { title, price, description, features } = packageData;

  let imageURL = "";
  if (file) {
    const storageRef = ref(storage, `packages/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    imageURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "packages"), {
    title,
    price,
    description,
    features,
    image: imageURL, // optional
  });
};

// --------------------- Testimonials ---------------------

/**
 * Add a new Testimonial with optional image upload
 * @param {Object} testimonialData - { name, role, title, text }
 * @param {File|null} file - optional image file
 */
export const addTestimonial = async (testimonialData, file = null) => {
  const { name, role, title, text } = testimonialData;

  let imageURL = "";
  if (file) {
    const storageRef = ref(storage, `testimonials/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    imageURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "testimonials"), {
    name,
    role,
    title,
    text,
    url: imageURL, // optional
  });
};
