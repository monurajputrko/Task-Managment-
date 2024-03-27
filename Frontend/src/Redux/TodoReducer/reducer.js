import { GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS, POST_TODO_FAILURE, POST_TODO_SUCCESS } from "./actionTypes";


// Initial State
const initialState = {
  todos: [],
  loading: false,
  error: null,
  success: false, // Add a success field to track success state
};

// Reducer
export const todosReducer = (state = initialState, { type, payload }) => {
  // console.log(payload);
  switch (type) {
    case GET_TODO_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_TODO_SUCCESS: {
      return {
        ...state,
        todos: payload,
        loading: false,
        success: true,
      };
    }
    case GET_TODO_FAILURE: {
      return {
        ...state,
        error: true,
      };
    }

    // case POST_TODO_SUCCESS:
    //   return {
    //     ...state,
    //     todos: payload,
    //     loading: false,
    //     error: null,
    //     success: true,
    //   };
    case POST_TODO_SUCCESS:
      return {
        ...state,
        todos: payload,
        loading: false,
        error: null,
        success: true,
      };

    case POST_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Failed to fetch todos",
        success: false,
      };

    default: {
      return state;
    }
  }
};
