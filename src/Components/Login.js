import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Login.css';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import apilist from "../apilist/apilist";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const token = Cookies.get("jwtAuth");
  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
    }
  }, [navigate, token]);  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( apilist.login, {
        email,
        password,
      });
      const token = response.data.token;
      Cookies.set("jwtAuth", token);
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };
 

  return (
    <>
      <ToastContainer />
      <div className="mainDiv">
        <div className="form_wrapper ">
          <div className="form_container">
            <div className="title_container">
              <h2>Login</h2>
            </div>
            <div className="row clearfix">
              <div className="">
                <form onSubmit={handleLogin}>
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i aria-hidden="true" className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <input className="button" type="submit" value="Login" />
                </form>
 

                <p className="text-center">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <span style={{ color: "#f5ba1a" }}>Signup</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
