import { useState } from "react";

function DeleteUser() {
    const [removeUser, setRemoveUser] = useState("");
    const [password, setPassword] = useState("");
  
    const handleUsernameChange = (event) => {
      setRemoveUser(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    return (
        <div className="mt-6 w-full">
          <div className="flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-center paper w-full rounded-md">
            <h2 className="text-3xl">Delete User</h2>
          </div>
          <div className="border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 paper rounded-md">
            <div className="flex items-center mb-4">
              <label className="w-28 font-bold" htmlFor="username">
                Username:
              </label>
              <input
                className="w-1/2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                type="text"
                id="removeUser"
                value={removeUser}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="w-28 font-bold" htmlFor="password">
                Password:
              </label>
              <input
                className="w-1/2 rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                type="password"
                id="password2"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="submit-button mt-4 w-full bg-red-500 text-white font-bold py-2 rounded-md">
              Delete User
            </button>
          </div>
        </div>
      );
    }

  export default DeleteUser;