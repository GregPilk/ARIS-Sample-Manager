'use server'
import { signIn, signOut } from "../auth";

export async function doLogout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.error("Logout failed:", error);
    throw error; // Rethrow or handle as needed
  }
}

export async function doCredentialLogin(formData) {
  console.log("formData", formData);

  // Convert FormData to a plain object
  const formObj = Object.fromEntries(formData.entries());

  // Basic validation
  if (!formObj.user || !formObj.password) {
    throw new Error("Both username and password are required");
  }

  try {
    // Perform the sign-in
    const response = await signIn("credentials", {
      user: formObj.user,
      password: formObj.password,
      redirect: false,
    });

    // Check if there's an error
    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (err) {
    console.error("Credential login failed:", err);
    throw err; // Rethrow or handle as needed
  }
}
