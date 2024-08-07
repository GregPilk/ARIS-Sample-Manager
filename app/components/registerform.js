"use client";

// import { signIn } from "next-auth/react"; // Use client-side signIn
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log("Name:", name);
  console.log("User:", user);
  console.log("Password:", password);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !user || !password) {
      setError("All fields must be filled out.");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, user, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
      } else {
        console.log("User Registration Failed");
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
    //   async function onSubmit(event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     const formObj = Object.fromEntries(formData.entries());

    //     if (!formObj.name || !formObj.user || !formObj.password) {
    //       setError("All fields must be filled out.");
    //       return;
    //     }

    //     // Password validation
    //     const password = formObj.password;
    //     const passwordValid =
    //       /[A-Z]/.test(password) &&
    //       /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
    //       password.length > 7;

    //     if (!passwordValid) {
    //       setError(
    //         "Password must contain at least one capital letter, one special character, and be more than 7 characters long."
    //       );
    //       return;
    //     }

    //     try {
    //       // Replace this with your registration logic
    //       // await registerUser(formObj);

    //       setSuccess("Registration successful! Please log in.");
    //       setTimeout(() => {
    //         router.push("/"); // Redirect to login page after successful registration
    //       }, 2000); // Delay for 2 seconds to show the success message
    //     } catch (e) {
    //       console.error(e);
    //       setError("An error occurred during registration.");
    //     }
    //   }
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
              <h2 className="text-2xl font-bold">Register</h2>
            </div>
            <form
              className="mt-2 flex flex-col items-center"
              onSubmit={onSubmit}
            >
              {error && (
                <div className="text-xl text-red-500 pt-10">{error}</div>
              )}
              {success && (
                <div className="text-xl text-green-500 pt-10">{success}</div>
              )}
              <div className="login-box my-2 w-full max-w-md">
                <div className="flex items-center mb-4 w-full">
                  <label
                    htmlFor="name"
                    className="text-xl font-bold w-32 flex-shrink-0"
                  >
                    Name:
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-500 rounded px-3 py-2 flex-grow"
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                </div>
                <div className="flex items-center mb-4 w-full">
                  <label
                    htmlFor="user"
                    className="text-xl font-bold w-32 flex-shrink-0"
                  >
                    Username:
                  </label>
                  <input
                    onChange={(e) => setUser(e.target.value)}
                    className="border border-gray-500 rounded px-3 py-2 flex-grow"
                    type="text"
                    name="user"
                    id="user"
                    required
                  />
                </div>
                <div className="flex items-center mb-4 w-full">
                  <label
                    htmlFor="password"
                    className="text-xl font-bold w-32 flex-shrink-0"
                  >
                    Password:
                  </label>
                  <div className="relative w-full">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-gray-500 rounded px-3 py-2 flex-grow"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 py-2 flex items-center"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>
              <button type="submit" className="submit-button mt-4">
                Register
              </button>
            </form>
            <div className="text-center mt-4">
              <p>
                <a href="/login" className="text-blue-500 hover:underline">
                  Back to Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
