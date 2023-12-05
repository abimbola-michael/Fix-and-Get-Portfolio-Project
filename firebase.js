// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getBlob,
  getBytes,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-jCuJh_QnGy5kbGs0lLQbPo1zS9_pT58",
  authDomain: "fixandget.firebaseapp.com",
  projectId: "fixandget",
  storageBucket: "fixandget.appspot.com",
  messagingSenderId: "192638652386",
  appId: "1:192638652386:web:52570ee1bc5fcf62fef3bb",
  measurementId: "G-P56F5G4D6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

// function pathToString(path) {
//   return path.join("/");
// }
export function getId(path) {
  return doc(collection(db, path.join("/"))).id;
}
export async function addValue(value, ...path) {
  try {
    const docRef = await addDoc(collection(db, path.join("/")), value);
  } catch (e) {}
}
export async function setValue(path, value) {
  try {
    const docRef = await setDoc(doc(db, path.join("/")), value);
  } catch (e) {}
}

export async function removeValue(path, value) {
  try {
    const docRef = await deleteDoc(doc(db, path.join("/")), value);
  } catch (e) {}
}

export async function getValue(path) {
  try {
    const docSnapshot = await getDoc(doc(db, path.join("/")));
    return docSnapshot.data();
  } catch (e) {}
}
export function getRealtimeValue(path, callback) {
  try {
    const unSub = onSnapshot(doc(db, path.join("/")), (doc) => {
      callback(doc.data());
    });
    return unSub;
  } catch (e) {}
}

export async function getValues(path) {
  try {
    const querySnapshot = await getDocs(collection(db, path.join("/")));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {}
}
export function getRealtimeValues(path, callback) {
  try {
    const unSub = onSnapshot(
      collection(db, path.join("/")),
      (querySnapshot) => {
        callback(querySnapshot.docs.map((doc) => doc.data()));
      }
    );
    return unSub;
  } catch (e) {}
}

export function getRealtimeValueChanges(path, callback) {
  try {
    const unSub = onSnapshot(
      collection(db, path.join("/")),
      (querySnapshot) => {
        callback(
          querySnapshot.docChanges.map((change) => {
            change.type, change.doc.data();
          })
        );
      }
    );
    return unSub;
  } catch (e) {}
}
export async function getValuesWithCond(
  path,
  { whereClause, orderByClause, limitClause, limitToLastClause }
) {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, path.join("/")),
        where(whereClause[0], whereClause[1], whereClause[2]),
        orderBy(orderByClause[0], orderByClause[1]),
        limitClause ? limit(limitClause) : limitToLast(limitToLastClause)
      )
    );
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (e) {}
}

export async function uploadFile(path, file) {
  try {
    const storageRef = ref(storage, path.join("/"));
    return uploadBytes(storageRef, file);
  } catch (e) {}
}

export async function uploadFileResumable(
  path,
  file,
  onComplete,
  onProgress,
  onPause,
  onRunning
) {
  try {
    const storageRef = ref(storage, path.join("/"));
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
        switch (snapshot.state) {
          case "paused":
            onPause?.();
            break;
          case "running":
            onRunning?.();
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onComplete?.(downloadURL);
        });
      }
    );
    return uploadTask;
  } catch (e) {}
}
export async function downloadFile(path) {
  try {
    const storageRef = ref(storage, path.join("/"));
    return getBlob(storageRef);
  } catch (e) {}
}
export async function deleteFile(path) {
  try {
    const storageRef = ref(storage, path.join("/"));
    return deleteObject(storageRef);
  } catch (e) {}
}
export function pauseUpload(task) {
  task.pause();
}
export function resumeUpload(task) {
  task.resume();
}
export function cancelUpload(task) {
  task.cancel();
}
