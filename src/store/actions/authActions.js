export const signUp =
  (data) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    dispatch({ type: "AUTH_START" });
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      await firestore.collection("users").doc(res.user.uid).set({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      dispatch({ type: "AUTH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "AUTH_FAIL", payload: err.message });
    }
    dispatch({ type: "AUTH_END" });
  };

export const signOut =
  () =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

export const signIn =
  (data) =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: "AUTH_START" });
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      dispatch({ type: "AUTH_SUCCESS" });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "AUTH_FAIL", payload: err.message });
    }
    dispatch({ type: "AUTH_END" });
  };

export const cleanUp = () => (dispatch) => {
  dispatch({ type: "CLEAN_UP" });
};
