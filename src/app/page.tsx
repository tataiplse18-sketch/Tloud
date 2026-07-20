"use client";

import { useAppStore } from "@/store/app-store";
import LandingPage from "@/components/landing/landing-page";
import Dashboard from "@/components/dashboard/dashboard";
import LoginPage from "@/components/dashboard/login-page";

export default function Home() {
  const { isLoggedIn, showLogin } = useAppStore();

  if (isLoggedIn) {
    return <Dashboard />;
  }

  if (showLogin) {
    return <LoginPage />;
  }

  return <LandingPage />;
}
