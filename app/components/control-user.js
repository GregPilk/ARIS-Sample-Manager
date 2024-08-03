import React, { useState, useEffect } from "react";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../_services/dbFunctions";

function ControlUser({ type }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // Testing Purposes
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   getAllUsers().then((result) => {
  //     setUsers(result);
  //   });
  // }, []);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (type === "add") {
        const user = {
          email,
          name: username,
          password,
          role,
        };
        console.log(`Adding user: ${JSON.stringify(user)}`);
        // await addUser(user);
      } else if (type === "delete") {
        console.log(`Deleting user: ${username}`);
        // Implement delete user logic here
        await deleteUser(userID);
      } else if (type === "edit") {
        console.log(`Editing user: ${username}`);
        // Implement edit user logic here
        // Example: await updateUser(userID, { username, password });
      }
    } catch (error) {
      console.error("Failed to submit user action:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <div
          className={`flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-center paper w-full rounded-md ${
            type === "add" ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          <h2 className="text-3xl">
            {type === "add"
              ? "Add User"
              : type === "edit"
              ? "Update User"
              : "Delete User"}
          </h2>
        </div>
        <div className="border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 paper rounded-md">
          <div className="flex justify-center items-center mb-4">
            <label className="w-28 font-bold" htmlFor="username">
              Name:
            </label>
            <input
              className="w-1/2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-28 font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="w-1/2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {type === "add" && (
            <>
              <div className="flex justify-center items-center mb-4">
                <label className="w-28 font-bold" htmlFor="role">
                  Role:
                </label>
                <select
                  className="w-1/2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-center items-center mb-4">
                <label className="w-28 font-bold" htmlFor="email">
                  Email:
                </label>
                <input
                  className="w-1/2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className={`submit-button mt-4 ${
                type === "add" ? "bg-blue-500" : "bg-red-500"
              } text-white font-bold py-2 rounded-md`}
            >
              {type === "add"
                ? "Add User"
                : type === "edit"
                ? "Update User"
                : "Delete User"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <ul>
          {users.length > 0 && (
            <>
              {users.map((user, index) => (
                <li key={index}>{user.name}</li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ControlUser;
