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
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Login</h2>
            </div>
            <form
              className="mt-2 flex flex-col items-center"
              onSubmit={onSubmit}
            >
              {error && (
                <div className="text-xl text-red-500 pt-10">{error}</div>
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
