import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoggedIn from "@/app/hooks/useLoggedIn";
import { LOCALSTORAGE_RECENT_USER, URL_DASHBOARD } from "@/app/constants";
import { User } from "@/app/types";

interface Props {
  users: User[];
}

const LoginForm: React.FC<Props> = ({ users }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useLoggedIn();
  const router = useRouter();

  useEffect(() => {
    const setRecentUser = async () => {
      const recentUserLocal = localStorage.getItem(LOCALSTORAGE_RECENT_USER);
      if (recentUserLocal) {
        setUsername(recentUserLocal);
      }
    };

    setRecentUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Set loading to true while processing login
    if (username && password) {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        setLoading(true);
        login(username);

        localStorage.setItem(LOCALSTORAGE_RECENT_USER, username); // Set recentUser in localStorage
        router.push(URL_DASHBOARD);
      } else {
        alert("Invalid username or password");
        setLoading(false);
      }
    } else {
      alert("Please enter username and password");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md"
        >
          <h2 className="text-2xl mb-4 font-bold">Task Management Login</h2>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              data-testid="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              data-testid="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            data-testid="submit"
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
};

export default LoginForm;
