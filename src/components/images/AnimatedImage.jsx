"use client";

import { useRef } from "react";
import CustomImage from "@/components/images/CustomImage";

const AnimatedImage = ({ className = "", ...props }) => {
  const imgRef = useRef(null);

  return (
    <div
      ref={imgRef}
      className={
        "w-full h-full rounded-md overflow-hidden transition-all duration-300 ease-out " +
        "hover:scale-105 hover:shadow-xl " +
        className
      }
    >
      <CustomImage {...props} className="w-full h-full object-cover" />
    </div>
  );
};

export default AnimatedImage;

// "use client";

// import { useRef, useEffect } from "react";
// import CustomImage from "@/components/images/CustomImage";

// const AnimatedImage = ({ className = "", ...props }) => {
//   const imgRef = useRef(null);
//   const xRef = useRef(0);
//   const yRef = useRef(0);
//   const frameRef = useRef();
//   const divisor = 40; // Higher = subtler movement

//   useEffect(() => {
//     const animate = () => {
//       if (!imgRef.current) return;
//       const x = xRef.current;
//       const y = yRef.current;
//       imgRef.current.style.setProperty("--x", `${x}px`);
//       imgRef.current.style.setProperty("--y", `${y}px`);
//       frameRef.current = requestAnimationFrame(animate);
//     };
//     frameRef.current = requestAnimationFrame(animate);
//     return () => {
//       if (frameRef.current) cancelAnimationFrame(frameRef.current);
//     };
//   }, []);

//   const setXY = (clientX, clientY) => {
//     const el = imgRef.current;
//     if (!el) return;
//     const r = el.getBoundingClientRect();
//     xRef.current = clientX - (r.left + Math.floor(r.width / 2));
//     yRef.current = clientY - (r.top + Math.floor(r.height / 2));
//   };

//   const handleMouseMove = (event) => {
//     setXY(event.clientX, event.clientY);
//   };

//   const handleTouchMove = (event) => {
//     if (event.touches && event.touches.length > 0) {
//       setXY(event.touches[0].clientX, event.touches[0].clientY);
//     }
//   };

//   const handleLeave = () => {
//     xRef.current = 0;
//     yRef.current = 0;
//     if (imgRef.current) imgRef.current.style.setProperty('--scale', '1');
//   };

//   const handleEnter = () => {
//     if (imgRef.current) imgRef.current.style.setProperty('--scale', '1.03');
//   };

//   return (
//     <div
//       ref={imgRef}
//       className={
//         "w-full h-full [perspective:1200px] [transform-style:preserve-3d] transition-all duration-200 ease-out " +
//         className
//       }
//       style={{
//         transform:
//           "scale(var(--scale,1)) translate3d(calc(var(--x, 0px) / " +
//           divisor +
//           "), calc(var(--y, 0px) / " +
//           divisor +
//           "), 0)",
//         willChange: "transform",
//       }}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleLeave}
//       onMouseEnter={handleEnter}
//       onTouchMove={handleTouchMove}
//       onTouchStart={handleEnter}
//       onTouchEnd={handleLeave}
//     >
//       <CustomImage {...props} className="w-full h-full object-cover" />
//     </div>
//   );
// };

// export default AnimatedImage;
