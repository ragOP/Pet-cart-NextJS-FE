import React from "react";

const GridSkeleton = ({ columns = 2 }) => {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-8">
        {/* Section Title Skeleton */}
        <div className="text-center mb-6">
          <div className="h-8 bg-gray-300 rounded-lg w-64 mx-auto"></div>
        </div>

        {/* Grid Container Skeleton */}
        <div 
          className="grid gap-4 p-4 rounded-lg bg-gray-100"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {/* Generate skeleton items based on columns */}
          {Array.from({ length: columns }, (_, itemIndex) => (
            <div
              key={itemIndex}
              className="bg-gray-300 rounded-lg h-48 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridSkeleton;