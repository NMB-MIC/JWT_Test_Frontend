import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login"
import Page from "./pages/Page"
import AnotherPage from './pages/AnotherPage';
import { verifyTokenTimerIsValid } from "./utils/jwt"

export default function App() {

  const checkIfLoggedIn = (inputPage, pageName) => {
    if (String(localStorage.getItem("logged_in")) !== "true") {
      return (<Login />)
    } else {
      if (verifyTokenTimerIsValid() != null) {
        if (verifyTokenTimerIsValid()) {
          if (pageName === "login") {
            return <Page />
          } else {
            return inputPage
          }
        } else {
          alert("Token has expired! return to login...")
          localStorage.clear()
          window.location.href = "/"
          return (<Login />)
        }
      }
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={checkIfLoggedIn(<Login />, "login")}></Route>
        <Route path="*" element={checkIfLoggedIn(<Login />, "login")}></Route>
        <Route path="page" element={checkIfLoggedIn(<Page />)}></Route>
        <Route path="anotherPage" element={checkIfLoggedIn(<AnotherPage />)}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);