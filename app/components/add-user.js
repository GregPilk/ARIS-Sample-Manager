import React, { useState } from "react";

function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="mt-6 w-full">
      <div className="admin-table-pop p-4">
        <div className="flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-start paper w-7/12 rounded-md">
          <h2 className="text-3xl">Add User</h2>
        </div>
        <div className="flex items-center">
          {" "}
          <label className="w-28" htmlFor="username">
            Username:
          </label>
          <input
            className="w-1/4 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="flex items-center">
          {" "}
          <label className="w-28" htmlFor="password">
            Password:
          </label>
          <input
            className="w-1/4 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
