"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/store/profileSlice";
import { updateProfile } from "@/app/apis/updateProfile";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import CustomImage from "../images/CustomImage";

const ProfileForm = ({ onSubmit, initialData = {} }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [email, setEmail] = useState(initialData.email || profile.email || "");
  const [phone, setPhone] = useState(initialData.phoneNumber || profile.phoneNumber || "");
  const [image, setImage] = useState(null);
  const [name, setName] = useState(initialData.name || profile.name || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
    } else {
      alert("Please upload a valid image file (JPG or PNG).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phoneNumber: phone,
      };
      const res = await updateProfile({ data: payload });
      if (res?.success) {
        dispatch(setProfile(payload));
        toast.success("Profile updated successfully");
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full border border-[#F59A1180] rounded-2xl">
      <div className="p-6 ">
        <span className="text-[24px] font-medium">Personal Details</span>
      </div>
      <div className=" border-b border-[#F59A1180]" />
      <div className="space-y-6 p-6">
        <div>
          <div className="flex gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {image ? (
                  <CustomImage
                    src={URL.createObjectURL(image)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-7 h-7 text-black" />
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <div className="bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                  Change
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-4">
                Profile Picture
              </label>
              <p className="text-sm text-gray-500">
                Picture must be minimum 20 kb
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-[#B3B3B3] bg-[#6A68680D]"
            />
          </div>
          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#B3B3B3] bg-[#6A68680D]"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-[#B3B3B3] bg-[#6A68680D]"
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">CANCEL</Button>
          <Button className="bg-[#F59A11] hover:bg-[#E58A00]" type="submit" disabled={loading}>
            {loading ? "Saving..." : "SAVE"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
