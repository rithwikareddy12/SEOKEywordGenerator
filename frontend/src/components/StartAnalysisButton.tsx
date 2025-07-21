
import React from "react";
import { Button } from "@/components/ui/button";

interface StartAnalysisButtonProps {
  onStartAnalysis: () => void;
  isLoading?: boolean;
}

export const StartAnalysisButton = ({ 
  onStartAnalysis, 
  isLoading = false 
}: StartAnalysisButtonProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
      <Button 
        onClick={onStartAnalysis}
        className="bg-brand-purple hover:bg-brand-purple-dark"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Start Analysis"}
      </Button>
      <p className="text-sm text-gray-500 mt-2">
        This will analyze your video using our AI-powered system
      </p>
    </div>
  );
};
