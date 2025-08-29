import React from 'react';

export const PrimaryButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full bg-[#7D7098] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#b1a0d2] active:bg-[#6a5f85] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export const OutlinedButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full bg-transparent border-2 border-[#7D7098] text-[#7D7098] py-3 px-6 rounded-lg font-medium hover:bg-[#7D7098] hover:text-white active:bg-[#6a5f85] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-[#7D7098] border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export const GradientButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full bg-gradient-to-r from-[#7D7098] to-[#b1a0d2] text-white py-3 px-6 rounded-lg font-medium hover:from-[#6a5f85] hover:to-[#9b8bc7] active:from-[#5a5075] active:to-[#8a7ab7] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export const SoftButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full bg-[#f5f3ff] border border-[#e5e1ff] text-[#7D7098] py-3 px-6 rounded-lg font-medium hover:bg-[#ede9ff] hover:border-[#d1c9ff] active:bg-[#e0d9ff] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-[#7D7098] border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export const DarkAccentButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full bg-[#4a3f5c] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#7D7098] active:bg-[#3d3449] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border-l-4 border-[#b1a0d2] transform hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export const PillButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full bg-[#7D7098] text-white py-3 px-8 rounded-full font-medium hover:bg-[#b1a0d2] active:bg-[#6a5f85] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// Button Variation 7: Neon Glow Effect
export const NeonButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full relative bg-[#181818] text-[#7D7098] py-3 px-6 rounded-lg font-medium border-2 border-[#7D7098] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group hover:text-white hover:shadow-[0_0_30px_#7D7098] ${className}`}
      style={{
        boxShadow: '0 0 20px rgba(125, 112, 152, 0.3), inset 0 0 20px rgba(125, 112, 152, 0.1)'
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7D7098]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <div className="absolute inset-0 bg-[#7D7098] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10">
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </span>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

// Button Variation 8: 3D Pressed Effect
export const PressedButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full relative bg-gradient-to-b from-[#b1a0d2] to-[#7D7098] text-white py-3 px-6 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_6px_0_#5a5075,0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_#5a5075,0_6px_10px_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_#5a5075,0_3px_5px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:translate-y-1 ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// Button Variation 9: Liquid Fill Effect
export const LiquidButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full relative bg-transparent border-2 border-[#7D7098] text-[#7D7098] py-3 px-6 rounded-lg font-medium transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group hover:text-white ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-[#7D7098] transition-all duration-700 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#7D7098] to-[#b1a0d2] transition-all duration-700 ease-out transform -translate-y-full group-hover:translate-y-0"></div>
      <span className="relative z-10">
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </span>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

// Button Variation 10: Ripple Effect
export const RippleButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);

    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <>
      <style jsx>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`w-full relative bg-[#7D7098] text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden hover:bg-[#b1a0d2] active:bg-[#6a5f85] shadow-lg hover:shadow-xl ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    </>
  );
};

// Button Variation 11: Morphing Border
export const MorphButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full relative bg-gradient-to-r from-[#f5f3ff] to-[#ede9ff] text-[#7D7098] py-3 px-6 rounded-lg font-medium transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group hover:text-white ${className}`}
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
      }}
      {...props}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#7D7098] to-[#b1a0d2] transition-all duration-500 transform -translate-x-full group-hover:translate-x-0"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
        }}
      ></div>
      <span className="relative z-10">
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </span>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

// Button Variation 12: Floating Shadow
export const FloatingButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full relative bg-white text-[#7D7098] py-3 px-6 rounded-2xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-[#e5e1ff] hover:text-white group ${className}`}
      style={{
        boxShadow: '0 10px 25px rgba(125, 112, 152, 0.2), 0 20px 40px rgba(125, 112, 152, 0.1)'
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7D7098] via-[#b1a0d2] to-[#6a5f85] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
        animation: 'shimmer 2s infinite'
      }}></div>
      <span className="relative z-10">
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </span>
        ) : (
          children
        )}
      </span>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  );
};

export const ButtonVariations = {
  PrimaryButton,
  OutlinedButton,
  GradientButton,
  SoftButton,
  DarkAccentButton,
  PillButton,
  NeonButton,
  PressedButton,
  LiquidButton,
  RippleButton,
  MorphButton,
  FloatingButton
};

export default ButtonVariations;
