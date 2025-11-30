import React from "react";

export default function Loader({ size = "medium", fullScreen = false }) {
  // Size classes
  const sizes = {
    small: "w-5 h-5 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4"
  };

  const Spinner = () => (
    <div 
      className={`
        ${sizes[size]} 
        rounded-full 
        animate-spin 
        border-gray-200 
        border-t-blue-600 
        ease-linear
      `} 
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Spinner />
    </div>
  );
}