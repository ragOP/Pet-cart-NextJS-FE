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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generateReferralCode } from "@/app/apis/generateReferralCode";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "@/store/authSlice";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";

const InviteFriendPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  // Get or generate referral code
  const {
    data: referralData,
    isLoading: isLoadingReferral,
    refetch: refetchReferral,
  } = useQuery({
    queryKey: ["referral-code"],
    queryFn: generateReferralCode,
    select: (res) => res?.data || {},
    retry: false,
    onSuccess: (data) => {
      // Update Redux with the referral code
      if (data?.referralCode && user) {
        const updatedUser = {
          ...user,
          referralCode: data.referralCode,
        };
        dispatch(setUser(updatedUser));
      }
    },
  });

  const referralCode = referralData?.referralCode || user?.referralCode || "";
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://petcaart.com';
  const inviteLink = referralCode ? `${baseUrl}?ref=${referralCode}` : baseUrl;
  const shareMessage = `Hey! Join PetCaart using my referral link and I'll get ₹150 in my wallet when you complete your first order! ${inviteLink}`;

  const socialMediaLinks = [
    {
      value: "instagram",
      link: `https://www.instagram.com/petcaart`,
      icon: InstagramIcon,
    },
    {
      value: "facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`,
      icon: FacebookIcon,
    },
    {
      value: "whatsapp",
      link: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      icon: WhatsappIcon,
    },
  ];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopiedCode(true);
      toast.success("Referral code copied!", {
        position: "top-right",
        duration: 1500,
      });
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join PetCaart",
          text: shareMessage,
          url: inviteLink,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error("Failed to share");
        }
      }
    } else {
      handleCopy();
    }
  };

  if (isLoadingReferral) {
    return (
      <div className="flex items-center justify-center h-full">
        <PrimaryLoader />
      </div>
    );
  }

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
            — you will get{" "}
            <span className="text-[#F59A11]">₹150 in your wallet</span>{" "}
            when your friend completes their first order.{" "}
            <span className="text-[#0888B1]">
              You can use up to 15% from your wallet for each order!
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

        {/* Referral Code Display */}
        {referralCode && (
          <div className="w-full max-w-2xl">
            <p className="text-xs font-medium text-gray-600 mb-1.5">Your Referral Code</p>
            <div className="bg-white border-2 border-[#F59A11]/30 rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg lg:text-xl font-bold text-[#F59A11] tracking-widest font-mono">
                  {referralCode}
                </p>
                <button
                  onClick={handleCopyCode}
                  className="flex-shrink-0 p-2 bg-[#F59A11]/10 hover:bg-[#F59A11]/20 rounded-lg transition-all hover:scale-105"
                  disabled={copiedCode}
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <CopyIcon className="w-4 h-4 text-[#F59A11]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Link Box and Buttons */}
        <div className="flex flex-col w-full max-w-2xl gap-3">
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
            <button
              className="flex-1 bg-[#F59A11] cursor-pointer text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#E08900] transition-colors"
              onClick={handleShare}
            >
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
