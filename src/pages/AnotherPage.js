import React, { useEffect, useState } from "react";
import httpClient from "../utils/httpClient";
import axios from "axios";
import { getTokenSeconds } from "../utils/jwt";
import "../App.css";
const AnotherPage = () => {
  const [authen, setAuthen] = useState([]);
  const [timer, setTimer] = useState(getTokenSeconds());

  useEffect(() => {
    setInterval(() => {
      setTimer(getTokenSeconds());
    }, 500);
    if (getTokenSeconds() === 0) {
      alert("Token has expired! return to login...");
      localStorage.clear();
      window.location.href = "/";
    }
  });

  const move = () => {
    window.location.href = "/page";
  };
  const getData = async () => {
    let getData = await httpClient.get("api/get_authen_jwt", {});
    console.log(getData);
    // console.log(localStorage.getItem("token"));
    if (getData.data.result === "ng") {
      alert("Token has expired! return to login...");
      localStorage.clear();
      window.location.href = "/";
      setAuthen([]);
    } else {
      setAuthen(getData.data);
    }
  };
  const createTable = (data) => {
    let getKeys = [];
    if (data.length !== 0) {
      getKeys = Object.keys(data[0]);
    }
    return (
      <>
        <div className="card-body">
          <table className="table table-bordered" style={{ width: "100%" }}>
            <tr>
              {getKeys.map((e) => (
                <th>{e}</th>
              ))}
            </tr>
            {data.map((e) => (
              <tr>
                <td>{e.auth_id}</td>
                <td>{e.emp_no}</td>
                <td>{e.password}</td>
                <td>{e.email}</td>
                <td>{e.signup_status}</td>
                <td>{e.createdAt}</td>
                <td>{e.updatedAt}</td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">{/* <h1>Get Data </h1> */}</div>
            </div>
          </div>
          {/* /.container-fluid */}
          <h3>Token Timer : {parseInt(timer)}</h3>
          <br />
          <button className="btn btn-primary" onClick={move}>return to Home</button>
          <button className="btn btn-danger" onClick={getData}>Get Data</button>
        </section>
        <br />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-success ">
                  <div className="card-header">
                    <h3 className="card-title">get Data </h3>
                  </div>
                  <tbody>{createTable(authen)}</tbody>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnotherPage;
