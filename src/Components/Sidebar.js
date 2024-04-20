import React from "react";
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwtAuth");
    navigate("/auth");
  };

  return (
    <div>
      <section className="sidebar_component sticky-top d-none d-md-block">
        <div className="container-fluid pl-5 pt-5 d-flex flex-column justify-content-between" style={{height:"90vh"}}>
          <div>
            <NavLink exact to="/home" className="sidebar_content" activeClassName="active">
              <p>
                <i className="ri-home-3-fill pr-3"></i> Home
              </p>
            </NavLink>
            <NavLink exact to="/trending" className="sidebar_content" activeClassName="active">
              <p>
                <i className="ri-fire-fill pr-3"></i> Trending
              </p>
            </NavLink>
            <NavLink exact to="/gaming" className="sidebar_content" activeClassName="active">
              <p>
                <i className="ri-discord-fill pr-3"></i> Gaming
              </p>
            </NavLink>
            <NavLink exact to="/saved" className="sidebar_content" activeClassName="active">
              <p>
                <i className="ri-save-fill pr-3"></i> Saved
              </p>
            </NavLink>
          </div>
          <div className="sidebar_content" onClick={handleLogout}>
            <p>
              <i className="ri-logout-box-line pr-3"></i> Logout
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default  Sidebar;
