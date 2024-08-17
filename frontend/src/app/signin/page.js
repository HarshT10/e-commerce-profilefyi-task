"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter(); // Use Next.js router for redirection

  const handleAuth = async (e) => {
    e.preventDefault();

    // Check if password length is less than 8 characters
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const url = isSignUp
      ? "https://backend-ecommerce-profilefyi-task.onrender.com/api/users/register"
      : "https://backend-ecommerce-profilefyi-task.onrender.com/api/users/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignUp) {
          setSuccess("Registered successfully! You can now sign in.");
        } else {
          setSuccess("Signed in successfully!");
          document.cookie = `token=${data.token}; path=/; expires=${new Date(
            Date.now() + 3600000
          ).toUTCString()}`;
          document.cookie = `username=${username}; path=/; expires=${new Date(
            Date.now() + 3600000
          ).toUTCString()}`;
          window.localStorage.setItem("username", username);
          window.location.href = "/";
        }
        setError("");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className="md:w-[500px] mx-auto h-[400px] mt-20 p-5">
      <form onSubmit={handleAuth}>
        <div className="flex flex-col gap-5 text-[#10A0A0] bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h1 className="text-4xl text-center font-bold text-[#10A0A0] mb-12">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            <label className="font-semibold">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="text-black w-full p-1 px-2 mt-2 outline-0 border border-[#10A0A0] border-2 rounded-md shadow-lg"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className={`text-black w-full p-1 mt-2 px-2 outline-0 border border-[#10A0A0] border-2 rounded-md shadow-lg ${
                password.length > 0 && password.length < 8
                  ? "border-red-500"
                  : ""
              }`}
              required
            />
            {password.length > 0 && password.length < 8 && (
              <p className="text-red-500">
                Password must be at least 8 characters long.
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              onClick={() => setIsSignUp(true)}
              className="text-white px-4 py-2 rounded w-full bg-[#10A0A0] hover:bg-[#119393] transition-all duration-300 ease-out font-semibold"
            >
              Sign Up
            </button>
            <button
              type="submit"
              onClick={() => setIsSignUp(false)}
              className="text-white px-4 py-2 rounded w-full bg-[#10A0A0] hover:bg-[#119393] transition-all duration-300 ease-out font-semibold"
            >
              Sign In
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
