import { ref } from "yup";

//add product
export const addProduct =
  (data) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    dispatch({ type: "ADD_PRODUCT_START" });

    const storage = firebase.storage();

    const uploadTask = storage
      .ref(`images/${data.productImage.name}`)
      .put(data.productImage);

    const ref = firestore.collection("products").doc();

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(data.productImage.name)
          .getDownloadURL()
          .then((url) => {
            console.log("here url");
            console.log(url);

            registerProduct(url, ref);
          });
      }
    );

    const registerProduct = async (url, ref) => {
      try {
        await ref.set({
          id: ref.id,
          title: data.title,
          description: data.description,
          price: data.price,
          endDate: data.endDate,
          discount: data.discount,
          image: url,
          date: new Date().valueOf(),
        });

        dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      } catch (err) {
        dispatch({ type: "ADD_PRODUCT_FAIL", payload: err.message });
      }
    };
  };

export const addCleanUp = () => (dispatch) => {
  dispatch({ type: "ADD_CLEAN_UP" });
};

// Delete Product
export const deleteProduct =
  (id) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    dispatch({ type: `DELETE_PRODUCT_START` });
    try {
      await firestore.collection("products").doc(id).delete();

      console.log("delete product");
      console.log(id);

      dispatch({ type: `DELETE_PRODUCT_SUCCESS` });
    } catch (err) {
      dispatch({ type: `DELETE_PRODUCT_FAIL`, payload: err.message });
    }
  };

export const deleteCleanUp = () => (dispatch) => {
  dispatch({ type: "DELETE_CLEAN_UP" });
};

// edit
export const editProduct =
  (id, data) =>
  async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    console.log(id);
    console.log(data);

    dispatch({ type: `EDIT_PRODUCT_START` });

    const storage = firebase.storage();

    const uploadTask = storage
      .ref(`images/${data.productImage.name}`)
      .put(data.productImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(data.productImage.name)
          .getDownloadURL()
          .then((url) => {
            console.log("here url");
            console.log(url);

            registerProduct(url, ref);
          });
      }
    );

    const registerProduct = async (url, ref) => {
      try {
        await firestore.collection("products").doc(id).update({
          title: data.title,
          description: data.description,
          price: data.price,
          endDate: data.endDate,
          discount: data.discount,
          image: url,
        });

        dispatch({ type: `EDIT_PRODUCT_SUCCESS` });
      } catch (err) {
        dispatch({ type: `EDIT_PRODUCT_FAIL`, payload: err.message });
      }
    };

    // try {
    //   await firestore.collection("products").doc(id).update(data);

    //   dispatch({ type: `EDIT_PRODUCT_SUCCESS` });
    // } catch (err) {
    //   dispatch({ type: `EDIT_PRODUCT_FAIL`, payload: err.message });
    // }
  };

export const editCleanUp = () => (dispatch) => {
  dispatch({ type: "EDIT_CLEAN_UP" });
};
