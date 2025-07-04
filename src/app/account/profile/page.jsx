"use client";

import React from "react";
import ProfileForm from "@/components/account/ProfileForm";
import RequireAuth from "@/components/auth/RequireAuth";

const ProfilePage = () => {
  const handleSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <RequireAuth>
      <ProfileForm onSubmit={handleSubmit} />
    </RequireAuth>
  );
};

export default ProfilePage;
