import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionType";
import Swal from "sweetalert2";


export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const res = await axios.post(
        `https://green-mentor-h5c2.onrender.com/login`,
        data
      );
      // console.log(res);
      dispatch({ type: LOGIN_SUCCESS, paylod: res });
      // console.log(res.data);
      localStorage.setItem("AuthData", JSON.stringify(res.data));
      sessionStorage.setItem("token", res.data.token);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });

    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      console.log(error);
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
      const res = await axios.post(
        `https://green-mentor-h5c2.onrender.com/signup`,
        data
      );
      // console.log(res);
      dispatch({ type: SIGNUP_SUCCESS, paylod: res });
      // console.log(res);
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE });
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      sessionStorage.removeItem("token");
      localStorage.removeItem("AuthData");
      dispatch({ type: LOGIN_FAILURE, isAuth: false });
    } catch (error) {
      console.log(error);
    }
  };
};
