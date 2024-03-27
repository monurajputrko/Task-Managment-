import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";


// Initial State
const initialState = {
  isAuth: false,
  loading: false,
  error: null,
  success: false,
  data: []
};

// Reducer
export const authReducer = (state = initialState, { type, payload }) => {
  // console.log(payload)
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        isAuth: false,
        error: null,
        success: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        loading: false,
        success: true,
        error: null,
        data: payload,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isAuth: false,
        loading: false,
        error: null,
        success: false,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};
