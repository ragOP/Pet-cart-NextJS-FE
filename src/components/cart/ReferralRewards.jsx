import React from "react";
import { Users, Gift } from "lucide-react";

const ReferralRewards = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mb-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Invite Friends & Earn Rewards</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">You earn when friend joins</span>
              </div>
              <span className="text-sm font-bold text-green-600">₹150</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Friend gets welcome bonus</span>
              </div>
              <span className="text-sm font-bold text-blue-600">₹75</span>
            </div>
          </div>
          <div className="mt-3">
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium underline">
              Share your referral code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralRewards;
