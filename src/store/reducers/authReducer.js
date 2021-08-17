const initialState = {
  error: null,
  loading: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case `AUTH_START`:
      return { ...state, loading: true };

    case `AUTH_END`:
      return { ...state, loading: false };

    case `AUTH_FAIL`:
      return { ...state, error: payload };

    case `AUTH_SUCCESS`:
      return { ...state, error: false };

    case `CLEAN_UP`:
      return { ...state, error: false };

    default:
      return state;
  }
};
export default authReducer;
