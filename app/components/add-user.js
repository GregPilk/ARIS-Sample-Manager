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
      <div className="test-pop px-48 py-4">
        <div className="flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-start paper w-7/12 rounded-md">
          <h2 className="text-3xl">Add User</h2>
        </div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
    </div>
  );
}

export default AddUser;
