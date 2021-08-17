//add product

export const addProduct =
  (data) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    dispatch({ type: "ADD_PRODUCT_START" });

    console.log(data.productImage);

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

            registerProduct(url);
          });
      }
    );

    const registerProduct = async (url) => {
      try {
        const newProduct = {
          title: data.title,
          description: data.description,
          price: data.price,
          endDate: data.endDate,
          discount: data.discount,
          image: url,
          date: new Date().valueOf(),
        };

        await firestore.collection("products").add(newProduct);

        dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      } catch (err) {
        dispatch({ type: "ADD_PRODUCT_FAIL", payload: err.message });
      }
    };
  };

export const addCleanUp = () => (dispatch) => {
  dispatch({ type: "ADD_CLEAN_UP" });
};
