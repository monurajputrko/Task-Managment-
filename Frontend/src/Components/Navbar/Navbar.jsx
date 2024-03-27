import React, { useState } from "react";
import "./HeaderMegaMenu.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/AuthReducer/action";

export function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

   const dispatch = useDispatch();
  const isAuthenticated = useSelector((store) => store.authReducer.success);
  
  // console.log(isAuthenticated);
   const isAuthenticated1 = useSelector((store) => store.authReducer);
  //  console.log(isAuthenticated1);
   const handleLog = () => {
     dispatch(logout());
   };

  let user = "user";

  if (isAuthenticated) {
    const data = JSON.parse(localStorage.getItem("AuthData"));
     user = data?.is_user?.name;
  }

  return (
    <nav className="nav-bar">
      <div className="icon-nav">
        <i className="fas fa-moon"></i>
        <span className="logo">Task Managment</span>
      </div>

      <ul className={`list-nav-bar ${isActive ? "active" : ""}`}>
        <li className="list-item">
          <Link style={{ color: "black", fontWeight: "800" }} href="#">
            {user}
          </Link>
        </li>
      </ul>

      {isAuthenticated && (
        <button onClick={handleLog} className="button-81">
          Logout
        </button>
      )}
    </nav>
  );
}
