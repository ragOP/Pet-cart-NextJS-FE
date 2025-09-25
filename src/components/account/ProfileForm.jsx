"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, selectUser, selectToken, setUser } from "@/store/authSlice";
import { updateProfile } from "@/app/apis/updateProfile";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import CustomImage from "../images/CustomImage";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser) || {};
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Sync form state with Redux user data
  useEffect(() => {
    setEmail(authUser.email || "");
    setPhone(authUser.phoneNumber || "");
    setName(authUser.name || "");
  }, [authUser]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
  //     setImage(file);
  //   } else {
  //     alert("Please upload a valid image file (JPG or PNG).");
  //   }
  // };

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
      // console.log(res, "res");
      if (res?.success) {
        const updatedUser = res?.data?.data || { ...authUser, ...payload };
        dispatch(setUser(updatedUser));
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
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-3 border-b border-gray-200">
        <span className="text-xl font-semibold text-gray-900">Personal Details</span>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-6">
        <span className="text-[24px] font-medium">Personal Details</span>
      </div>
      <div className="hidden lg:block border-b border-[#F59A1180]" />
      
      <div className="space-y-6 p-4 lg:p-6">
        {/* <div>
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
        </div> */}
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
              disabled
              className="border border-[#B3B3B3] bg-[#6A68680D]"
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Button variant="outline" type="button" className="w-full sm:w-auto">CANCEL</Button>
          <Button className="bg-[#F59A11] hover:bg-[#E58A00] w-full sm:w-auto" type="submit" disabled={loading}>
            {loading ? "Saving..." : "SAVE"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
