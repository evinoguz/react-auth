import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import store from "./store";
import { logout as logoutHandle } from "./store/auth";
import { setTodos } from "./store/todos";
import { modalOpen, setUserData } from "./utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ID,
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Kayıt başarılı");
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Giriş başarılı");
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const reAuth = async (password) => {
  try {
    const credential = await EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    const { user } = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    toast.success("Giriş başarılı");
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Çıkış yapıldı");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil başarıyla güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Parolanız başarıyla güncellendi");
    return true;
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      modalOpen("re-auth-modal", true);
    }
    toast.error(error.message);
  }
};

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Doğrulama linki, ${auth.currentUser.email} adresine gönderilmiştir.`
    );
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUserData();
    onSnapshot(
      query(
        collection(db, "todos"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      ),
      (doc) => {
        store.dispatch(
          setTodos(
            doc.docs.reduce(
              (todos, todo) => [...todos, { ...todo.data(), id: todo.id }],
              []
            )
          )
        );
      }
    );
  } else {
    store.dispatch(logoutHandle());
  }
});

export const addTodo = async (data) => {
  try {
    data.createdAt = serverTimestamp();
    const result = await addDoc(collection(db, "todos"), data);
    toast.success("Todo başarıyla eklendi.");
    return result.id;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateTodo = async (id, data) => {
  try {
    data.createdAt = serverTimestamp();
    const todoRef = await doc(db, "todos", id);
    await updateDoc(todoRef, data);
    toast.success("Todo başarıyla güncellendi.");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteTodo = async (id) => {
  try {
    const result = await deleteDoc(doc(db, "todos", id));
    toast.success("Todo başarıyla silindi.");
    return result;
  } catch (error) {
    toast.error(error.message);
  }
};

export default app;
