"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import useLoggedIn from "@/app/hooks/useLoggedIn";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn } = useLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  const usersLogin = [
    { username: "sivensyM", password: "QntaH3bw250h" },
    { username: "piezyGLe", password: "1hOP5WG2UAsn" },
  ];

  return (
    <main className="">
      <LoginForm users={usersLogin} />
    </main>
  );
}
