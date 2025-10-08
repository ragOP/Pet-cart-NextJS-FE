import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import DogWalkingAnimation from "../../../public/Dogwalking.json";

const CartProgressBar = ({ cartTotal = 0 }) => {
    // Calculate progress based on 10,000 Rs target
    const targetAmount = 10000;
    const progress = Math.min(100, (cartTotal / targetAmount) * 100);
    const [showDog, setShowDog] = useState(false);
    const [dogPosition, setDogPosition] = useState(0);
    const [animatedProgress, setAnimatedProgress] = useState(0);

    // Show dog after 2s delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDog(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Animate both dog position and progress bar with racing effect
    useEffect(() => {
        if (showDog) {
            const targetPosition = Math.min(100, Math.max(0, progress));
            const duration = 1500; // 1.5 seconds for racing animation
            const startTime = Date.now();
            const startPosition = 0; // Always start from 0
            const startProgress = 0; // Always start from 0

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progressRatio = Math.min(elapsed / duration, 1);
                
                // Easing function for racing effect (ease-out)
                const easeOut = 1 - Math.pow(1 - progressRatio, 3);
                const currentPosition = startPosition + (targetPosition - startPosition) * easeOut;
                const currentProgress = startProgress + (targetPosition - startProgress) * easeOut;
                
                setDogPosition(currentPosition);
                setAnimatedProgress(currentProgress);
                
                if (progressRatio < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        }
    }, [showDog, progress]);
    
    return (
        <div className="w-full mb-6">
            <div className="flex flex-col">
                {/* Dog Image positioned above progress bar based on progress */}
                <div className="relative h-16">
                    {showDog && (
                        <div 
                            className="absolute transform top-1 -translate-x-1/2 z-10"
                            style={{ left: `${dogPosition + 1.5}%` }}
                        >
                            <div className="w-20 h-20">
                                <Lottie
                                    animationData={DogWalkingAnimation}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Progress Bar Background */}
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    {/* Progress Fill with Diagonal Stripes */}
                    <div
                        className="h-full bg-gradient-to-r from-[#f59a10] to-[#ffb84d] relative"
                        style={{ width: `${Math.min(100, Math.max(0, animatedProgress))}%` }}
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
