
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VideoUploaderProps {
  onVideoUploaded: (file: File, url: string) => void;
}

export const VideoUploader = ({ onVideoUploaded }: VideoUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.includes("video/")) {
      toast({
        title: "Invalid file",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }

    uploadVideo(file);
  };

  const uploadVideo = (file: File) => {
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API request delay
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // Create a URL for the uploaded video
      const fileUrl = URL.createObjectURL(file);
      
      onVideoUploaded(file, fileUrl);
      
      toast({
        title: "Upload successful",
        description: "Your video has been uploaded and is ready for analysis",
      });
      
      setUploading(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-10 text-center ${
          dragActive ? "border-brand-purple bg-brand-purple/5" : "border-gray-300"
        } transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-brand-purple/10 rounded-full">
            <Upload size={36} className="text-brand-purple" />
          </div>
          <h3 className="text-lg font-medium">Drag and drop your video</h3>
          <p className="text-sm text-gray-500">
            or click to browse your files (MP4, MOV, AVI)
          </p>
          <Button
            onClick={() => inputRef.current?.click()}
            variant="outline"
            className="mt-2"
            disabled={uploading}
          >
            <Video className="w-4 h-4 mr-2" />
            Select Video
          </Button>
          <input
            ref={inputRef}
            type="file"
            onChange={handleChange}
            accept="video/*"
            className="hidden"
            disabled={uploading}
          />
        </div>
      </div>
      
      {uploading && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full h-2" />
        </div>
      )}
    </div>
  );
};
