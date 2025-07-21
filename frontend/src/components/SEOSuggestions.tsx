
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SEOSuggestionsProps {
  title: string;
  hashtags: string[];
}

export const SEOSuggestions = ({ title, hashtags }: SEOSuggestionsProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SEO Recommendations</CardTitle>
        <CardDescription>
          Optimize your video with these title and hashtag suggestions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Suggested Title</h3>
          <div className="flex items-start gap-2">
            <div className="bg-muted p-4 rounded-md flex-1">
              <p className="font-medium">{title}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0"
              onClick={() => copyToClipboard(title, 'Title')}
            >
              {copied === 'Title' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recommended Hashtags</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(hashtags.join(' '), 'Hashtags')}
            >
              {copied === 'Hashtags' ? (
                <><Check className="w-4 h-4 mr-2 text-green-500" /> Copied</>
              ) : (
                <><Copy className="w-4 h-4 mr-2" /> Copy All</>
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {hashtags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="text-sm py-1.5 px-3 cursor-pointer hover:bg-secondary/80"
                onClick={() => copyToClipboard(`#${tag}`, `#${tag}`)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
