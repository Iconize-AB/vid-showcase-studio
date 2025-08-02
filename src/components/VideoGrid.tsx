import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface VideoItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  subtitle?: string;
  tag: {
    text: string;
    color: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'yellow';
  };
}

export interface VideoGridProps {
  videos: VideoItem[];
  layout?: 2 | 3 | 4 | 5;
  playMode?: 'modal' | 'inline';
  className?: string;
}

const getGridLayout = (count: number, layout?: number) => {
  const targetLayout = layout || count;
  
  switch (targetLayout) {
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-3';
    case 4:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2';
    case 5:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';
    default:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  }
};

const VideoThumbnail: React.FC<{
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
  layout: number;
}> = ({ video, onPlay, layout }) => {
  const isLargeLayout = layout >= 4;
  
  return (
    <div
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-lg",
        "transition-all duration-300 ease-out",
        "shadow-lg hover:shadow-xl",
        "transform hover:scale-[1.02]",
        isLargeLayout ? "aspect-video" : "aspect-[4/3]"
      )}
      onClick={() => onPlay(video)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-gray-200"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
      
      {/* Tag */}
      <div className="absolute top-3 left-3">
        <span
          className={cn(
            "px-3 py-1 rounded-full text-white font-medium text-xs",
            `bg-video-tag-${video.tag.color}`
          )}
        >
          {video.tag.text}
        </span>
      </div>
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110">
          <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
        </div>
      </div>
      
      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">
          {video.title}
        </h3>
        {video.subtitle && (
          <p className="text-white/90 text-sm leading-tight">
            {video.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const VideoModal: React.FC<{
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ video, isOpen, onClose }) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-black border-0">
        <div className="relative aspect-video">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <iframe
            src={video.url}
            className="w-full h-full rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InlineVideoPlayer: React.FC<{
  video: VideoItem | null;
  onClose: () => void;
}> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="mt-6 relative">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
        <iframe
          src={video.url}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  layout,
  playMode = 'modal',
  className
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoPlay = (video: VideoItem) => {
    setSelectedVideo(video);
    if (playMode === 'modal') {
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const gridLayout = getGridLayout(videos.length, layout);
  const actualLayout = layout || videos.length;

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("grid gap-4", gridLayout)}>
        {videos.slice(0, layout || videos.length).map((video) => (
          <VideoThumbnail
            key={video.id}
            video={video}
            onPlay={handleVideoPlay}
            layout={actualLayout}
          />
        ))}
      </div>

      {playMode === 'modal' && (
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleClose}
        />
      )}

      {playMode === 'inline' && (
        <InlineVideoPlayer
          video={selectedVideo}
          onClose={handleClose}
        />
      )}
    </div>
  );
};