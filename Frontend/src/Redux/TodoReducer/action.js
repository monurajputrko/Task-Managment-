

import axios from "axios";
import {
  GET_TODO_FAILURE,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  POST_TODO_FAILURE,
  POST_TODO_REQUEST,
  POST_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
} from "./actionTypes";

export const getTodoRequest = () => {
  return { type: GET_TODO_REQUEST };
};

export const getTodoSuccess = (payload) => {
  return { type: GET_TODO_SUCCESS, payload: payload };
};

export const getTodoFailure = () => {
  return { type: GET_TODO_FAILURE };
};
 
export const getDataTodos = () => {
  return async (dispatch) => {
    dispatch(getTodoRequest());
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(
        `https://green-mentor-h5c2.onrender.com/todo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await dispatch(getTodoSuccess(response.data));
    } catch (error) {
      dispatch(getTodoFailure());
      console.log("Failed to fetch todos:", error);
    }
  };
};

// ------------------------ Post Todo ---------------------------------------------------------

export const postTodoRequest = () => {
  return { type: POST_TODO_REQUEST };
};

export const postTodoSuccess = (payload) => {
  return { type: POST_TODO_SUCCESS, payload };
};

export const postTodoFailure = () => {
  return { type: POST_TODO_FAILURE };
};

export const postTodo = (newTodo) => {
  return async (dispatch) => {
    dispatch(postTodoRequest());
 const token = sessionStorage.getItem("token");

    try {
      const resp = await axios.post(
        `https://green-mentor-h5c2.onrender.com/todoadd`,
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await dispatch(postTodoSuccess(resp.data));
      await dispatch(getDataTodos()); 
    } catch (error) {
      dispatch(postTodoFailure());
    }
  };
};

// ---------------------------- Update Todo -----------------------------------------

export const updateTodoRequest = () => {
  return { type: UPDATE_TODO_REQUEST };
};

export const updateTodoSuccess = (payload) => {
  return { type: UPDATE_TODO_SUCCESS, payload };
};

export const updateTodoFailure = () => {
  return { type: UPDATE_TODO_FAILURE };
};

export const updateTodo = (id, updatedTodo) => {
  return async (dispatch) => {
    dispatch(updateTodoRequest());
 const token = sessionStorage.getItem("token");

    try {
      const resp = await axios.put(
        `https://green-mentor-h5c2.onrender.com/todo/${id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await dispatch(updateTodoSuccess(resp.data));
      await dispatch(getDataTodos()); // Fetch todos after updating a todo
    } catch (error) {
      dispatch(updateTodoFailure());
    }
  };
};




export const deleteTodo = (id) => {
  return async (dispatch) => {
    const token = sessionStorage.getItem("token");

    try {
      await axios.delete(`https://green-mentor-h5c2.onrender.com/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await dispatch(getDataTodos()); // Fetch todos after deleting a todo
    } catch (error) {
      console.log(error);
    }
  };
};
