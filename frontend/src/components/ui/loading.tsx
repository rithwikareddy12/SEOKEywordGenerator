import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-transparent border-solid rounded-full border-blue-600" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
