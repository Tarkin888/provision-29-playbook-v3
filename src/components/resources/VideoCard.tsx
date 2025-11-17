import { Video } from "@/types/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface VideoCardProps {
  video: Video;
  onPlay: () => void;
}

const VideoCard = ({ video, onPlay }: VideoCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      {/* Thumbnail with Play Button */}
      <div 
        className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg overflow-hidden"
        onClick={onPlay}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {video.duration}
          </Badge>
        </div>
        <div className="text-6xl opacity-20 absolute bottom-4 right-4">🎥</div>
      </div>

      <CardHeader className="flex-1">
        <Badge variant="secondary" className="w-fit mb-2">
          {video.category}
        </Badge>
        <CardTitle className="text-base leading-tight line-clamp-2">
          {video.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">
            For: {video.audience.join(", ")}
          </p>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button className="w-full gap-2" onClick={onPlay}>
          <Play className="w-4 h-4" />
          Watch Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
