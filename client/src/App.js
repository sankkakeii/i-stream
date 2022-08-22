import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index";
import SignUp from "./pages/SignUp/index";
// import Home from "./pages/Home/index";
import "../src/index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import AddVideo from "./pages/addVideo/AddVideo";


function App() {
  // const user = localStorage.getItem("token");
  return (
    <div className="root">
      <BrowserRouter>
      <Routes>
        {/* <Route exact path={"/"} element={<Home />} /> */}
        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/sign-up"} element={<SignUp />} />
        <Route exact path={"/dashboard"} element={<Dashboard />} />
        <Route exact path={"/add-video"} element={<AddVideo />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
