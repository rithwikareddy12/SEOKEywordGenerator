
import React from "react";

interface VideoPreviewProps {
  videoFile: File;
  videoUrl: string | null;
}

export const VideoPreview = ({ videoFile, videoUrl }: VideoPreviewProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Video Preview</h2>
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <video 
          src={videoUrl || undefined} 
          controls 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="mt-4">
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">File name:</span> {videoFile.name}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-medium">Size:</span> {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
};
