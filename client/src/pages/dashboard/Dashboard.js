import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Box from "../../components/Box";

const Dashboard = () => {
  return (
    <div
      style={{
        height: "100vh",
        minHeight: "70%",
        boxSizing: "border-box",
        backgroundColor: "",
      }}
    >
      <Navbar name="Dashboard" />
      <Sidebar />
      {/* <Box /> */}
    </div>
  );
};

export default Dashboard;
