import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getTokenSeconds } from "../utils/jwt";
const Page = () => {
  const [timer, setTimer] = useState(getTokenSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getTokenSeconds());
    }, 500);
    if (getTokenSeconds() === 0) {
      alert("Token has expired! return to login...");
      localStorage.clear();
      window.location.href = "/";
    }
    return () => clearInterval(interval);
  },[]);

  const doLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const viewToken = () => {
    const token = localStorage.getItem("token");
    alert(token);
  };
  const checkTokenTimer = () => {
    const token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token);
    let d = new Date(decodedToken.exp * 1000);
    let currentDate = new Date();
    let seconds = Math.max((d.getTime() - currentDate.getTime()) / 1000, 0);
    alert(seconds);
  };
  const move = () => {
    window.location.href = "/anotherPage";
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Home</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <button
                    className="btn btn-block btn-danger"
                    onClick={doLogout}
                  >
                    Logout
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
        <h3>Token Timer : {parseInt(timer)}</h3>
        <br />
        <button className="btn btn-primary" onClick={viewToken}>
          View Token
        </button>
        <button className="btn btn-danger" onClick={checkTokenTimer}>
          Check token timer
        </button>
          <button className="btn btn-success" onClick={move}>Move to Another Page</button>
      </section>

      <br />
    </div>
  );
};

export default Page;
