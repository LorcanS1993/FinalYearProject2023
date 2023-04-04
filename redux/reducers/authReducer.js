const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP_SUCCESS":
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, error: null };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null, error: null };
    case "SIGN_UP_FAILURE":
    case "LOGIN_FAILURE":
    case "LOGOUT_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
