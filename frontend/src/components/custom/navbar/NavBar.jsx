import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavBar = () => {
  return (
    <nav
      className="fixed top-0 z-10 bg-white shadow-sm p-4 flex items-center
      justify-between w-full"
    >
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">My App</div>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};
