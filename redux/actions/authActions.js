import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const signup = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          email,
          displayName: name, // add fullName field to user object
        };
        const usersRef = doc(db, "users", uid);
        setDoc(usersRef, data)
          .then(() => {
            dispatch({ type: SIGN_UP_SUCCESS, payload: data });
          })
          .catch((error) => {
            dispatch({ type: SIGN_UP_FAILURE, payload: error.message });
          });
      })
      .catch((error) => {
        dispatch({ type: SIGN_UP_FAILURE, payload: error.message });
      });
  };
};

export const login = (email, password) => async (dispatch) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error });
  }
};
