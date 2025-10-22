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
      "When your friend signs up using your referral link and completes their first order, you will receive ₹150 credited to your wallet.",
      "The wallet credit will be added after successful delivery of your friend's first order.",
    ],
  },
  {
    title: "Wallet Usage:",
    content: [
      "You can use up to 15% of your order value from your wallet balance for each purchase.",
      "Wallet balance can be used across multiple orders until exhausted.",
    ],
  },
  {
    title: "Referral Limit:",
    content: "You can invite unlimited friends. There is no limit on the number of referrals or wallet credits you can earn.",
  },
  {
    title: "Order Status:",
    content: "The ₹150 wallet credit will only be issued after your friend's first order is successfully delivered and not cancelled or returned.",
  },
  {
    title: "Non-Transferable:",
    content: "Wallet credits are non-transferable and cannot be withdrawn as cash. They can only be used for purchases on PetCaart.",
  },
  {
    title: "Minimum Order Value:",
    content: "There is no minimum order value to use wallet balance, but you can only use up to 15% of the order total per transaction.",
  },
  {
    title: "Abuse of Program:",
    content: "Any fraudulent activity or misuse of the referral system may lead to disqualification from the program and forfeiture of wallet credits.",
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
