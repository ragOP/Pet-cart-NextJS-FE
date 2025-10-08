"use client";

import React, { useState } from "react";
import VegSwitchButton from "./VegSwitchButton";

const VegSwitchButtonDemo = () => {
  const [isVeg, setIsVeg] = useState(false);
  const [isVeg2, setIsVeg2] = useState(true);

  return (
    <div className="p-8 space-y-8 bg-gray-50 rounded-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Veg Switch Button Demo</h2>
        
        <div className="space-y-4 bg-white p-6 rounded-lg">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Example 1: Without Label</p>
              <VegSwitchButton value={isVeg} onValueChange={setIsVeg} />
              <p className="text-xs text-gray-500 mt-2">Status: {isVeg ? 'Veg ✓' : 'Non-Veg'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Example 2: With Label</p>
              <VegSwitchButton 
                value={isVeg2} 
                onValueChange={setIsVeg2} 
                label="Vegetarian Only"
              />
              <p className="text-xs text-gray-500 mt-2">Status: {isVeg2 ? 'Veg ✓' : 'Non-Veg'}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Usage:</h3>
          <pre className="text-xs bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
{`import VegSwitchButton from "@/components/common/VegSwitchButton";

const [isVeg, setIsVeg] = useState(false);

<VegSwitchButton 
  value={isVeg} 
  onValueChange={setIsVeg}
  label="Vegetarian" // optional
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default VegSwitchButtonDemo;

