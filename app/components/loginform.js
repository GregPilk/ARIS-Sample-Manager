// app/components/loginform.js
"use client";

// import { signIn } from "next-auth/react"; // Use client-side signIn
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            // Convert FormData to plain object
            const formObj = Object.fromEntries(formData.entries());

            // Use client-side signIn method
            const response = await signIn("credentials", {
                user: formObj.user,
                password: formObj.password,
                redirect: false,
            });

            if (response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/home");
            }
        } catch (e) {
            console.error(e);
            setError("Check your Credentials");
        }
    }

    return (
<div className="flex items-center justify-center min-h-screen flex-col">
  <header className="boxless-title pb-6">
    <h1>ARIS SAMPLE MANAGER</h1>
  </header>
  <div className="page-pop px-16 border border-gray-200 rounded-md bg-white shadow-lg">
    <form className="mt-2 flex flex-col items-center" onSubmit={onSubmit}>
      {error && <div className="text-xl text-red-500 pt-10">{error}</div>}
      <div className="login-box my-2 w-full max-w-md">
        <div className="flex items-center mb-4 w-full">
          <label htmlFor="user" className="text-xl font-bold w-32 flex-shrink-0">Username:</label>
          <input className="border border-gray-500 rounded px-3 py-2 flex-grow" type="text" name="user" id="user" />
        </div>
        <div className="flex items-center w-full">
          <label htmlFor="password" className="text-xl font-bold w-32 flex-shrink-0">Password:</label>
          <input className="border border-gray-500 rounded px-3 py-2 flex-grow" type="password" name="password" id="password" />
        </div>
      </div>
      <button type="submit" className="submit-button mt-4">
        Login
      </button>
    </form>
  </div>
</div>
      );
};

export default LoginForm;