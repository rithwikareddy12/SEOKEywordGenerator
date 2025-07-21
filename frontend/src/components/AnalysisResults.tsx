
import React from "react";
import { SEOSuggestions } from "@/components/SEOSuggestions";
import { HashtagChart } from "@/components/HashtagChart";
import { VideoTranscript } from "@/components/VideoTranscript";

interface AnalysisResultsProps {
  analysisContent: {
    title: string;
    hashtags: string[];
    transcript: string;
    summary: string;
    chartData: any[];
  };
}

export const AnalysisResults = ({ analysisContent }: AnalysisResultsProps) => {
  return (
    <div className="space-y-8">
      <SEOSuggestions 
        title={analysisContent.title} 
        hashtags={analysisContent.hashtags} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HashtagChart data={analysisContent.chartData} />
        <VideoTranscript 
          transcript={analysisContent.transcript} 
          summary={analysisContent.summary} 
        />
      </div>
    </div>
  );
};
