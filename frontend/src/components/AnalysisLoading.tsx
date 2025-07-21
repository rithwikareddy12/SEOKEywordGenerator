
import React from "react";
import { Progress } from "@/components/ui/progress";

interface AnalysisLoadingProps {
  currentStep?: string;
  progress?: number;
}

export const AnalysisLoading = ({ 
  currentStep = "Analyzing your video...", 
  progress = 0 
}: AnalysisLoadingProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
      </div>
      <p className="text-lg font-medium mt-4">{currentStep}</p>
      <div className="mt-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm mt-2">{progress}% complete</p>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
        We're extracting audio, generating transcripts, and analyzing keywords using AI models.
      </p>
    </div>
  );
};
