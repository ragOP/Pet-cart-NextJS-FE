"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const LogoutPage = () => {
  const handleLogout = () => {
    // Handle logout logic
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Log Out</h2>
      <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
      <div className="flex gap-4">
        <Button variant="outline" href="/account">Cancel</Button>
        <Button 
          className="bg-[#F59A11] hover:bg-[#E58A00]"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default LogoutPage;
