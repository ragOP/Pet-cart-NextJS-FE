"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

const terms = [
  {
    title: "Eligibility:",
    content: "The offer is valid for registered users who invite friends using their unique referral link.",
  },
  {
    title: "Reward Structure:",
    content: [
      "When your friend signs up using your referral link and places their first order, both of you will receive a 50% discount coupon for your next purchase.",
      "Discount applies to one-time use only and is valid on orders above ₹499.",
    ],
  },
  {
    title: "Referral Limit:",
    content: "You can invite as many friends as you like, but the 50% discount can be earned a maximum of 5 times per user during the offer period.",
  },
  {
    title: "Discount Validity:",
    content: [
      "The discount coupon is valid for 30 days from the date of issue.",
      "Offer not applicable on sale or promotional items.",
    ],
  },
  {
    title: "Order Status:",
    content: "The reward will only be issued after your friend's first order is successfully delivered and not cancelled or returned.",
  },
  {
    title: "Non-Transferable:",
    content: "Referral rewards are non-transferable and cannot be redeemed for cash.",
  },
  {
    title: "Abuse of Program:",
    content: "Any fraudulent activity or misuse of the referral system may lead to disqualification from the program.",
  },
  {
    title: "Modification Rights:",
    content: "We reserve the right to modify or terminate the referral program at any time without prior notice.",
  },
];

export default function TermsDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-3xl rounded-2xl gap-0 p-0 overflow-hidden">
        <DialogHeader className="bg-[#FEF5E7] px-6 py-4">
          <DialogTitle className="text-lg font-medium text-gray-900">Terms and Conditions</DialogTitle>
        </DialogHeader>

        <div className="bg-white px-6 py-4 max-h-[70vh] overflow-y-auto">
          <ol className="list-decimal pl-4 space-y-4 text-gray-800">
            {terms.map((item, idx) => (
              <li key={idx} className="mb-2">
                <span className="font-semibold mr-1 align-top inline-block">{item.title}</span>
                {Array.isArray(item.content) ? (
                  <ul className="list-disc pl-1 mt-0.5">
                    {item.content.map((c, i) => (
                      <li key={i} className="text-gray-600 italic">{c}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-600 italic inline-block align-top">{item.content}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}
