import React, { useState, useEffect } from "react";
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  addUser,
} from "../_services/dbFunctions";

function ControlUser({ type }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const [users, setUsers] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsers();
      setUsers(result);
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

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

  const handleUserSelect = async (event) => {
    const selectedUserID = event.target.value;
    setUserID(selectedUserID);

    if (selectedUserID) {
      const selectedUser = await getUser(selectedUserID);
      setUsername(selectedUser.name);
      setEmail(selectedUser.email);
      setRole(selectedUser.role);
    }
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
        await addUser(user);
      } else if (type === "delete") {
        await deleteUser(userID);
      } else if (type === "edit") {
        const updatedUser = {
          email,
          name: username,
          password,
          role,
        };
        await updateUser(userID, updatedUser);
      }
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to submit user action:", error);
    }
  };

  const closeErrorModal = () => setShowErrorModal(false);
  const closeSuccessModal = () => setShowSuccessModal(false);

  return (
    <div className="flex justify-center">
      <div>
        {/* Modal for errors */}
        {showErrorModal && (
          <div className="modal show">
            <div className="modal-content">
              <div className="flex items-center justify-between pb-2">
                <h2 className="font-bold">Errors</h2>
                <span className="close" onClick={closeErrorModal}>
                  &times;
                </span>
              </div>
              <hr />
              <ul className="text-red-500 py-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal for Success */}
        {showSuccessModal && (
          <div
            className={`fixed inset-x-0 bottom-0 flex justify-center transition-transform duration-300 ease-in-out transform ${
              showSuccessModal ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="bg-green-700 paper text-white max-h-10 w-1/5 flex justify-center items-center rounded-t-md">
              <ul className="text-white text-xl py-2">
                Successfully Submitted Data
              </ul>
            </div>
          </div>
        )}
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
          {(type === "delete" || type === "edit") && (
            <div className="flex justify-center items-center mb-4">
              <label className="w-44 font-bold" htmlFor="user-select">
                Select User:
              </label>
              <select
                id="user-select"
                onChange={handleUserSelect}
                className="w-full rounded-md m-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              >
                <option value="">--Select a User--</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {type !== "delete" && (
            <>
              <div className="flex justify-center items-center mb-4">
                <label className="w-28 font-bold" htmlFor="username">
                  Name:
                </label>
                <input
                  className="rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
                  className="rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex justify-center items-center mb-4">
                <label className="w-28 font-bold" htmlFor="role">
                  Role:
                </label>
                <select
                  className="w-56 text-center rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="">--Select Role--</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-center items-center mb-4">
                <label className="w-28 font-bold" htmlFor="email">
                  Email:
                </label>
                <input
                  className="rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
    </div>
  );
}

export default ControlUser;
