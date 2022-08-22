import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import AddVideoForm from "./components/AddVideoForm";

const AddVideo = () => {
  return (
    <div
      style={{
        height: "100vh",
        minHeight: "70%",
        boxSizing: "border-box",
        backgroundColor: "",
      }}
    >
      <Navbar name="Add Video" />
      <Sidebar />
      <AddVideoForm />

    </div>
  );
};

export default AddVideo;
