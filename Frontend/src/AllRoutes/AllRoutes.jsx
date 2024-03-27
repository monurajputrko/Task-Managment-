import { Route, Routes } from "react-router-dom";
import { Login } from "../Components/Auth/Login";
import { Signup } from "../Components/Auth/Sinup";
import Main from "../Components/Todo/main";
import { Error } from "../Components/Error/Error";
import { Loading } from "../Loading";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
