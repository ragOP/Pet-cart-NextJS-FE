import React from "react";
import Image from "next/image";

const CartProgressBar = ({ cartTotal = 0 }) => {
    // Calculate progress based on 10,000 Rs target
    const targetAmount = 10000;
    const progress = Math.min(100, (cartTotal / targetAmount) * 100);
    
    return (
        <div className="w-full mb-6">
            <div className="flex flex-col">
                {/* Dog Image positioned above progress bar based on progress */}
                <div className="relative h-12">
                    <div 
                        className="absolute top-0 transform -translate-x-1/2 transition-all duration-300 ease-in-out z-10"
                        style={{ left: `${Math.min(100, Math.max(0, progress))}%` }}
                    >
                        <Image
                            src="/cart_running.png"
                            alt="Cart Running"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                </div>
                
                {/* Progress Bar Background */}
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    {/* Progress Fill with Diagonal Stripes */}
                    <div
                        className="h-full bg-gradient-to-r from-[#f59a10] to-[#ffb84d] relative"
                        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    >
                        {/* Diagonal Stripe Pattern */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 16px)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProgressBar;
