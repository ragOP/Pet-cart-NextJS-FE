"use client";

import React from "react";
import RequireLogin from "@/components/auth/RequireLogin";
import ProfileForm from "@/components/account/ProfileForm";

const ProfilePage = () => {
  const handleSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <RequireLogin>
      <ProfileForm onSubmit={handleSubmit} />
    </RequireLogin>
  );
};

export default ProfilePage;
