
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoTranscriptProps {
  transcript: string;
  summary: string;
}

export const VideoTranscript = ({ transcript, summary }: VideoTranscriptProps) => {
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: 'transcript' | 'summary') => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type === 'transcript' ? 'Full transcript' : 'Summary'} copied to clipboard`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Video Transcript</CardTitle>
            <CardDescription>
              Generated transcript and summary for your video
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => copyToClipboard(transcript, 'transcript')}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Summary</h3>
          <div className="bg-muted p-4 rounded-md relative">
            <p className="text-sm text-muted-foreground">{summary}</p>
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => copyToClipboard(summary, 'summary')}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Full Transcript</h3>
            <Button 
              variant="link" 
              onClick={() => setShowFullTranscript(!showFullTranscript)}
            >
              {showFullTranscript ? "Show Less" : "Show More"}
            </Button>
          </div>
          
          {showFullTranscript ? (
            <ScrollArea className="h-64 rounded-md border p-4">
              <p className="text-sm whitespace-pre-line">{transcript}</p>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground line-clamp-3 p-4 border rounded-md">
              {transcript}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
