import React from "react";

const PawLoader = ({ size = 24, color = "#F59A11" }) => {
  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main paw pad - STATIC (always visible) */}
        <ellipse 
          cx="16" 
          cy="28" 
          rx="6" 
          ry="3" 
          fill={color}
        />
        {/* Left toe - appears first */}
        <ellipse 
          cx="7" 
          cy="19" 
          rx="3" 
          ry="5" 
          fill={color}
          className="opacity-0"
          style={{
            animation: 'pawAppear 2s ease-in-out 0s infinite'
          }}
        />
        {/* Left front toe - appears second */}
        <ellipse 
          cx="11" 
          cy="11" 
          rx="2.5" 
          ry="3.5" 
          fill={color}
          className="opacity-0"
          style={{
            animation: 'pawAppear 2s ease-in-out 0.4s infinite'
          }}
        />
        {/* Right front toe - appears third */}
        <ellipse 
          cx="21" 
          cy="11" 
          rx="2.5" 
          ry="3.5" 
          fill={color}
          className="opacity-0"
          style={{
            animation: 'pawAppear 2s ease-in-out 0.8s infinite'
          }}
        />
        {/* Right toe - appears last */}
        <ellipse 
          cx="25" 
          cy="19" 
          rx="3" 
          ry="5" 
          fill={color}
          className="opacity-0"
          style={{
            animation: 'pawAppear 2s ease-in-out 1.2s infinite'
          }}
        />
      </svg>
      
      <style jsx>{`
        @keyframes pawAppear {
          0% { opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PawLoader;
