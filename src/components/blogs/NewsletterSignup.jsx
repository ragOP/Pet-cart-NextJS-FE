"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const NewsletterSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", { name, email, agreed });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="">
        {/* Header/Title */}
        <h2 className="text-2xl md:text-[32px] font-bold text-[#004E6A]">
          SIGN UP FOR PAW-PICKED PET NEWS & DEALS
        </h2>

        {/* Description/Body Text */}
        <p className="text-gray-600 mb-6 text-[26px] leading-tight ">
          Get Pet Care Tips, Exclusive Offers & Store Updates—Right To Your Inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields and Subscribe Button Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-base bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              required
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              required
            />
            <Button
              type="submit"
              className="h-12 w-[30%] bg-[#F59A11] cursor-pointer hover:bg-[#A36609] text-white px-6 py-3 text-base font-semibold rounded-lg uppercase"
            >
              SUBSCRIBE
            </Button>
          </div>

          {/* Checkbox and Legal Text */}
          <div className="flex items-start gap-3 justify-center">
            <Checkbox
              id="newsletter-agreement"
              checked={agreed}
              onCheckedChange={setAgreed}
              className="mt-1"
              required
            />
            <label htmlFor="newsletter-agreement" className="text-sm text-gray-500 text-left leading-relaxed">
              By checking this box, you confirm that you have read and are agreeing to our terms of use regarding the storage of the data submitted through this form.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup; 