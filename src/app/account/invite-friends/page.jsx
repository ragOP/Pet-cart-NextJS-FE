"use client";

import { Input } from "@/components/ui/input";
import FacebookIcon from "@/icons/FacebookIcon";
import InstagramIcon from "@/icons/InstagramIcon";
import InviteFriendsIcon from "@/icons/InviteFriendsIcon";
import WhatsappIcon from "@/icons/WhatsappIcon";
import { CopyIcon, Link2, Share2Icon, Check } from "lucide-react";
import TermsDialog from "@/components/dialog/TermsDialog";
import { useState } from "react";
import { toast } from "sonner";

const InviteFriendPage = () => {
  const socialMediaLinks = [
    {
      value: "instagram",
      link: "https://www.instagram.com/petcaart",
      icon: InstagramIcon,
    },
    {
      value: "facebook",
      link: "https://www.facebook.com/petcaart",
      icon: FacebookIcon,
    },
    {
      value: "whatsapp",
      link: "https://wa.me/1234567890",
      icon: WhatsappIcon,
    },
  ];

  const [openTerms, setOpenTerms] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://pet-cart-next-js-fe.vercel.app";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">Invite Friends</h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex px-6 py-4 items-center justify-between border-b border-[#F59A1180]">
        <h1 className="text-2xl font-semibold text-gray-900">Invite Friends</h1>
        <button className="bg-[#F59A11] cursor-pointer text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#E08900] transition-colors">
          <Link2 className="h-4 w-4" />
          INVITE A FRIEND
        </button>
      </div>

      <div className="flex flex-col items-center w-full justify-center flex-1 gap-4 px-4 py-6 lg:px-6">
        <InviteFriendsIcon />

        <div className="flex flex-col items-center w-full justify-center gap-4">
          <span className="text-[#6A6868] text-center italic w-full max-w-2xl font-bold text-base sm:text-lg lg:text-[20px] leading-relaxed">
            <span className="text-[#0888B1]">
              Invite your fellow pet lovers
            </span>{" "}
            — you and your friend both get 50% off on your next order.{" "}
            <span className="text-[#0888B1]">
              {" "}
              Because sharing treats (and discounts) is what true pet parents
              do!
            </span>
          </span>

          <button
            className="text-sm sm:text-base font-[300] text-[#6A6868] leading-0 underline-offset-2 hover:underline transition cursor-pointer bg-transparent border-0 p-0"
            type="button"
            onClick={() => setOpenTerms(true)}
          >
            Terms and Conditions
          </button>
        </div>

        {/* Mobile Invite Button */}
        <div className="lg:hidden w-full">
          <button className="w-full bg-[#F59A11] cursor-pointer text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#E08900] transition-colors">
            <Link2 className="h-4 w-4" />
            INVITE A FRIEND
          </button>
        </div>

        {/* Link Box and Buttons */}
        <div className="flex flex-col w-full max-w-2xl gap-3 mt-4">
          <div className="w-full">
            <Input
              className="font-mono text-xs px-3 py-3 sm:px-4 sm:py-4 bg-gray-50 border border-gray-400 rounded-lg w-full"
              value={inviteLink}
              disabled
              readOnly
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              className="flex-1 bg-[#F59A11] cursor-pointer text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#E08900] transition-colors"
              onClick={handleCopy}
              disabled={copied}
            >
              {copied ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              {copied ? "COPIED" : "COPY LINK"}
            </button>
            <button className="flex-1 bg-[#F59A11] cursor-pointer text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#E08900] transition-colors">
              SHARE
              <Share2Icon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 mt-4">
          <span className="text-[#6A6868] text-center italic text-sm sm:text-base">
            SHARE ON SOCIAL MEDIA
          </span>

          <div className="flex flex-row items-center justify-center gap-6">
            {socialMediaLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.value}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 transition-colors p-2 rounded-full"
                >
                  <Icon className="h-6 w-6 text-[#0888B1]" />
                </a>
              );
            })}
          </div>
        </div>

        <TermsDialog open={openTerms} onOpenChange={setOpenTerms} />
      </div>
    </div>
  );
};

export default InviteFriendPage;
