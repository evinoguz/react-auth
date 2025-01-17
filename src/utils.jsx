import { auth } from "./firebase";
import store from "./store";
import { login } from "./store/auth";
import { closeModal, openModal } from "./store/modal";

export const modalClose = () => {
  store.dispatch(closeModal());
};

export const modalOpen = (name, data = false) => {
  store.dispatch(
    openModal({
      name,
      data,
    })
  );
};

export const setUserData = () => {
  store.dispatch(
    login({
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      emailVerified: auth.currentUser.emailVerified,
      photoURL: auth.currentUser.photoURL,
      uid: auth.currentUser.uid,
    })
  );
};
