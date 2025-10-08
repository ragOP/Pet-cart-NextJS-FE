import React from "react";

const VegSwitchButton = ({ value, onValueChange, label }) => {
    return (
        <div className="flex items-center gap-2">
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
            <div className="flex items-center px-2 h-9 rounded-md bg-white border-1 border-gray-200">
                <button
                    onClick={() => onValueChange(!value)}
                    className="relative w-[48px] h-8 mt-[3px] cursor-pointer focus:outline-none"
                    type="button"
                    role="switch"
                    aria-checked={value}
                >
                    {/* Track */}
                    <div className={`absolute w-[48px] h-[14px] rounded-xl top-[7.5px] transition-colors duration-300 ${value ? 'bg-[#0a0]' : 'bg-[#ebebeb]'
                        }`} />

                    {/* Thumb */}
                    <div
                        className={`absolute top-[2px] w-6 h-6 rounded-sm border-2 bg-white flex items-center justify-center transition-all duration-300 ease-in-out ${value ? 'left-[24px] border-[#0a0]' : 'left-[-2] border-[#0a0]'
                            }`}
                    >
                        {/* Thumb Inner Circle */}
                        <div
                            className={`w-3 h-3 bg-[#0a0] rounded-full transition-colors duration-300 `}
                        />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default VegSwitchButton;

