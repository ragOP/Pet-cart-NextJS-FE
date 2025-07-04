"use client";

import React from "react";
import ProfileForm from "@/components/account/ProfileForm";

const ProfilePage = () => {
  const handleSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return <ProfileForm onSubmit={handleSubmit} />;
};

export default ProfilePage;
