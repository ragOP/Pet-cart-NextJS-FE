"use client";
import React, { useState } from "react";
import {
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
  FloatingButton,
} from "./ButtonVariations";

const ButtonShowcase = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const handleButtonClick = (buttonName) => {
    setLoadingStates((prev) => ({ ...prev, [buttonName]: true }));

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [buttonName]: false }));
    }, 2000);
  };

  const buttonDemos = [
    {
      name: "Primary Button",
      component: PrimaryButton,
      key: "primary",
    },
    {
      name: "Outlined Button",
      component: OutlinedButton,
      key: "outlined",
    },
    {
      name: "Gradient Button",
      component: GradientButton,
      key: "gradient",
    },
    {
      name: "Dark Accent Button",
      component: DarkAccentButton,
      key: "darkAccent",
    },
    {
      name: "Pill Button",
      component: PillButton,
      key: "pill",
    },
    {
      name: "3D Pressed Button",
      component: PressedButton,
      key: "pressed",
    },
    {
      name: "Floating Shadow Button",
      component: FloatingButton,
      key: "floating",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buttonDemos.map(
            ({ name, component: ButtonComponent, description, key }) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-md p-8 border"
              >

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Normal State:
                  </p>
                  <ButtonComponent
                    onClick={() => handleButtonClick(`${key}-normal`)}
                    isLoading={loadingStates[`${key}-normal`]}
                  >
                    {name}
                  </ButtonComponent>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Disabled State:
                  </p>
                  <ButtonComponent disabled>Disabled {name}</ButtonComponent>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Click to see loading state:
                  </p>
                  <ButtonComponent
                    onClick={() => handleButtonClick(`${key}-loading`)}
                    isLoading={loadingStates[`${key}-loading`]}
                  >
                    Test Loading State
                  </ButtonComponent>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
