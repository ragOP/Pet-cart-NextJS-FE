import React, { useEffect } from "react";
import { cn } from "@/lib/utils"; // or use `classnames` npm package

export const Drawer = ({
  open,
  onClose,
  direction = "right",
  width = "50%",
  height = "auto",
  children,
  className = "",
  overlayClassName = "",
}) => {

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  

  return (
    <>
      {open && (
        <>
          {/* Overlay */}
          <div
            onClick={onClose}
            className={cn(
              "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
              overlayClassName
            )}
          />
          {/* Drawer Content */}
          <div
            className={cn(
              "fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out",
              direction === "right" && `top-0 right-0 h-full`,
              direction === "left" && `top-0 left-0 h-full`,
              direction === "top" && `top-0 left-0 w-full`,
              direction === "bottom" && `bottom-0 left-0 w-full`,
              className
            )}
            style={{
              width: ["right", "left"].includes(direction) ? width : "100%",
              height: ["top", "bottom"].includes(direction) ? height : "100%",
              transform: open
                ? "translate(0, 0)"
                : direction === "right"
                ? "translateX(100%)"
                : direction === "left"
                ? "translateX(-100%)"
                : direction === "top"
                ? "translateY(-100%)"
                : "translateY(100%)",
            }}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
};
