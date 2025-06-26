import React from "react";

const pawPrint = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="28" rx="6" ry="3" fill="#F59A11"/>
    <ellipse cx="7" cy="19" rx="3" ry="5" fill="#F59A11"/>
    <ellipse cx="25" cy="19" rx="3" ry="5" fill="#F59A11"/>
    <ellipse cx="11" cy="11" rx="2.5" ry="3.5" fill="#F59A11"/>
    <ellipse cx="21" cy="11" rx="2.5" ry="3.5" fill="#F59A11"/>
  </svg>
);

const PrimaryLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-8 animate-fade-in">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`inline-block animate-bounce paw-bounce paw-bounce-${i}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {pawPrint}
          </span>
        ))}
      </div>
      <span className="mt-4 text-[#F59A11] font-semibold text-lg tracking-wide">Loading...</span>
      <style jsx>{`
        @keyframes paw-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .paw-bounce { animation: paw-bounce 1s infinite; }
      `}</style>
    </div>
  );
};

export default PrimaryLoader;
