"use client";

import { useAppStore } from "@/store/app-store";
import LandingPage from "@/components/landing/landing-page";
import Dashboard from "@/components/dashboard/dashboard";

export default function Home() {
  const { isLoggedIn } = useAppStore();

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  return <Dashboard />;
}
