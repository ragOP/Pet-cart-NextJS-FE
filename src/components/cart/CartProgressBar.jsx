import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import DogWalkingAnimation from "../../../public/Dogwalking.json";
import DogSittingAnimation from "../../../public/dogsitting.json";

const CartProgressBar = ({ cartTotal = 0 }) => {
    // Calculate progress based on 2000 Rs target
    const targetAmount = 2000;
    const progress = Math.min(100, (cartTotal / targetAmount) * 100);
    const [showDog, setShowDog] = useState(false);
    const [dogPosition, setDogPosition] = useState(0);
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const currentPositionRef = useRef(0);
    const currentProgressRef = useRef(0);

    // Detect mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Show dog after 2s delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDog(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Animate both dog position and progress bar with racing effect
    useEffect(() => {
        const targetPosition = Math.min(100, Math.max(0, progress));

        if (showDog) {
            const duration = 1500; // 1.5 seconds for racing animation
            const startTime = Date.now();
            const startPosition = currentPositionRef.current; // Start from current position
            const startProgress = currentProgressRef.current; // Start from current progress

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progressRatio = Math.min(elapsed / duration, 1);

                // Easing function for racing effect (ease-out)
                const easeOut = 1 - Math.pow(1 - progressRatio, 3);
                const currentPosition = startPosition + (targetPosition - startPosition) * easeOut;
                const currentProgress = startProgress + (targetPosition - startProgress) * easeOut;

                // Update refs
                currentPositionRef.current = currentPosition;
                currentProgressRef.current = currentProgress;

                // Adjust dog position for mobile/desktop when near the end
                const adjustedPosition = currentPosition >= 100 && isMobile ? 90 : currentPosition >= 100 && !isMobile ? 97 : currentPosition;
                setDogPosition(adjustedPosition);
                setAnimatedProgress(currentProgress);

                if (progressRatio < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Ensure final values are set correctly
                    currentPositionRef.current = targetPosition;
                    currentProgressRef.current = targetPosition;
                    const finalAdjustedPosition = targetPosition >= 100 && isMobile ? 90 : targetPosition >= 100 && !isMobile ? 97 : targetPosition;
                    setDogPosition(finalAdjustedPosition);
                    setAnimatedProgress(targetPosition);
                }
            };

            requestAnimationFrame(animate);
        } else {
            // When dog is not shown yet, set progress directly without animation
            currentPositionRef.current = targetPosition;
            currentProgressRef.current = targetPosition;
            setAnimatedProgress(targetPosition);
            setDogPosition(targetPosition);
        }
    }, [showDog, progress, isMobile]);

    return (
        <div className="w-full mb-6">
            <div className="flex flex-col">
                {/* Dog Image positioned above progress bar based on progress */}
                <div className="relative h-16">
                    {showDog && (
                        <div
                            className="absolute transform top-1 -translate-x-1/2 z-10"
                            style={{ left: `${dogPosition + (isMobile ? 5 : 1.5)}%` }}
                        >
                            <div className={`${cartTotal <= 2000 ? 'w-20 h-20' : 'w-16 h-16'}`}>
                                <Lottie
                                    animationData={cartTotal <= 2000 ? DogWalkingAnimation : DogSittingAnimation}
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
