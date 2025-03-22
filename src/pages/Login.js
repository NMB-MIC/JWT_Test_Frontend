import React from "react";
import { useState, useEffect } from "react";

import httpClient from "../utils/httpClient";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const doLogin = async () => {
    console.log(username);
    let login = await httpClient.post("api/login-jwt", {
      emp_no: username,
      password: password,
    });
    if (String(login.data.result).toUpperCase() === "OK") {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("logged_in", true);
      localStorage.setItem("token", login.data.detail.token);
      await Swal.fire({
        title: "Login Pass",
        icon: "success",
        draggable: true,
      });
      window.location.href = "/page";
    } else {
      console.log(login.data.detail);
      await Swal.fire({
        title: login.data.detail,
        icon: "error",
        draggable: true,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo"></div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span
                      className="toggle-password-login"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3"></div>
                {/* /.col */}
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={doLogin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
