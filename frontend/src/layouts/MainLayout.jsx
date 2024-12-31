import React from "react";

import { Outlet } from "react-router-dom";

import { NavBar } from "@/components/custom/navbar/NavBar";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 space-y-4">
      <NavBar />

      <div className="flex flex-1 gap-4">
        <div
          className={`flex-1 overflow-auto rounded-lg bg-white max-h-[calc(100vh)]
          scrollbar-hide mt-20 transition-all duration-300`}
        >
          <div className="h-full p-6 shadow-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
