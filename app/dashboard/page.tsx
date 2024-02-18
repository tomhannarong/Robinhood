"use client";

import MainScreen from "../components/MainScreen";

const DashboardPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 sm:p-15">
      <MainScreen />
    </main>
  );
};

export default DashboardPage;
