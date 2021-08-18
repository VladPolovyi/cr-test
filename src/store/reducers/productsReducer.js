const initialState = {
  error: null,
  loading: false,
  success: false,
  deleteProduct: {
    error: null,
    loading: false,
  },
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `ADD_PRODUCT_START`:
      return { ...state, loading: true };

    case `ADD_PRODUCT_SUCCESS`:
      return { ...state, loading: false, error: false, success: true };

    case `ADD_PRODUCT_FAIL`:
      return { ...state, loading: false, error: payload };

    case `ADD_CLEAN_UP`:
      return { ...state, error: false, success: false };

    case `DELETE_PRODUCT_START`:
      return {
        ...state,
        deleteProduct: { ...state.deleteProduct, loading: true },
      };

    case `DELETE_PRODUCT_SUCCESS`:
      return {
        ...state,
        deleteProduct: { ...state.deleteProduct, loading: false, error: false },
      };

    case `DELETE_PRODUCT_FAIL`:
      return {
        ...state,
        deleteProduct: { ...state.deleteProduct, loading: false, error: payload },
      };

    default:
      return state;
  }
};
export default productsReducer;
