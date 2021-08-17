const initialState = {
  error: null,
  loading: false,
  success: false,
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

    default:
      return state;
  }
};
export default productsReducer;
