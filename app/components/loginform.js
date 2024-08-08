// Added by: Dawson
// Date: 2024-08-07
// Login form component
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid email or password.");
        return;
      }
      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <div className="mt-8 px-4">
        <div className="flex min-h-screen flex-col">
          <header className="boxless-title pb-6">
            <h1>ARIS SAMPLE MANAGER</h1>
          </header>
          <div className="page-pop px-16 border border-gray-200 rounded-lg bg-white shadow-lg">
            <div className="text-center mt-8"></div>
            <form
              className="mt-2 flex flex-col items-center"
              onSubmit={onSubmit}
            >
              {error && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-slate-300 rounded-lg shadow-lg max-w-md w-full">
                    <div className="bg-red-500 text-white text-lg px-4 py-2 rounded-t-lg">
                      Error
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-red-600 text-lg">{error}</p>
                    </div>
                    <div className="flex justify-end px-4 py-2">
                      <button
                        onClick={() => setError(null)}
                        className="text-gray-200 font-bold text-md px-4 py-1 rounded-lg transition-shadow duration-300 ease-in-out bg-red-500 hover:bg-slate-600 border border-[#1a2431] shadow-sm hover:shadow-lg"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="login-box my-2 w-full max-w-md">
                <div className="flex items-center mb-4 w-full">
                  <label
                    htmlFor="user"
                    className="text-xl font-bold w-32 flex-shrink-0"
                  >
                    Email:
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-500 rounded px-3 py-2 flex-grow"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex items-center w-full">
                  <label
                    htmlFor="password"
                    className="text-xl font-bold w-32 flex-shrink-0"
                  >
                    Password:
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-500 rounded px-3 py-2 flex-grow"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                  />
                </div>
                <div className="flex items-center mt-2 w-full">
                  <input
                    type="checkbox"
                    id="show-password"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="mr-2"
                  />
                  <label
                    htmlFor="show-password"
                    className="text-sm text-gray-700"
                  >
                    Show Password
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-button mt-4">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
