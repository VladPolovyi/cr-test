const initialState = {
  error: null,
  loading: false,
  success: false,
  deleteProduct: {
    error: null,
    loading: false,
    success: false,
  },
  editProduct: {
    error: null,
    loading: false,
    success: false,
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
        deleteProduct: {
          ...state.deleteProduct,
          loading: false,
          error: false,
          success: true,
        },
      };

    case `DELETE_PRODUCT_FAIL`:
      return {
        ...state,
        deleteProduct: {
          ...state.deleteProduct,
          loading: false,
          error: payload,
        },
      };

    case `DELETE_CLEAN_UP`:
      return {
        ...state,
        deleteProduct: {
          ...state.deleteProduct,
          error: false,
          success: false,
        },
      };

    case `EDIT_PRODUCT_START`:
      return {
        ...state,
        editProduct: { ...state.editProduct, loading: true },
      };

    case `EDIT_PRODUCT_SUCCESS`:
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          loading: false,
          error: false,
          success: true,
        },
      };

    case `EDIT_PRODUCT_FAIL`:
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          loading: false,
          error: payload,
        },
      };


      case `EDIT_CLEAN_UP`:
        return {
          ...state,
          editProduct: {
            ...state.editProduct,
            error: false,
            success: false,
          },
        };

    default:
      return state;
  }
};
export default productsReducer;
