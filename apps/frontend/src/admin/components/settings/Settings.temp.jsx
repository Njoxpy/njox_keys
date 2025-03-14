import React from "react";

const Settings = () => {
  const userEmail = localStorage.getItem("userEmail");
  return <div className="p-4">{userEmail || "No email found"}</div>;
};

export default Settings;
