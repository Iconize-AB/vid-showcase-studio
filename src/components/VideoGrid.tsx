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
    backgroundColor?: string; // Custom background color for tag
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
      return 'grid-cols-1 md:grid-cols-2 gap-0.5';
    case 3:
      return 'grid-cols-1 md:grid-cols-3 gap-0.5';
    case 4:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0.5';
    case 5:
      return 'five-video-layout';
    default:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5';
  }
};

const VideoThumbnail: React.FC<{
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
  layout: number;
  isMainVideo?: boolean;
  isPlaying?: boolean;
  playMode?: 'modal' | 'inline';
  onClose?: () => void;
}> = ({ video, onPlay, layout, isMainVideo = false, isPlaying = false, playMode = 'modal', onClose }) => {
  const aspectClass = isMainVideo || layout >= 4 ? "aspect-square" : "aspect-[4/3]";
  
  // If playing inline, show the video player instead of thumbnail
  if (isPlaying && playMode === 'inline') {
    return (
      <div className={cn("relative overflow-hidden", aspectClass)}>
        <iframe
          src={video.url}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-6 h-6 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        "relative group cursor-pointer overflow-hidden", // Removed rounded corners
        "transition-all duration-300 ease-out",
        "transform hover:scale-[1.01]",
        aspectClass
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
      
      {/* Tag with custom background and 2px rounded corners */}
      <div className="absolute top-3 left-3">
        <span
          className="px-3 py-1 text-white font-medium text-xs"
          style={{
            backgroundColor: video.tag.backgroundColor || `hsl(var(--video-tag-${video.tag.color}))`,
            borderRadius: '2px'
          }}
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

const FiveVideoLayout: React.FC<{
  videos: VideoItem[];
  onPlay: (video: VideoItem) => void;
  selectedVideo: VideoItem | null;
  playMode: 'modal' | 'inline';
  onClose: () => void;
}> = ({ videos, onPlay, selectedVideo, playMode, onClose }) => {
  return (
    <div className="five-video-layout">
      {/* Main large video */}
      <div className="main-video">
        <VideoThumbnail
          video={videos[0]}
          onPlay={onPlay}
          layout={5}
          isMainVideo={true}
          isPlaying={selectedVideo?.id === videos[0].id}
          playMode={playMode}
          onClose={onClose}
        />
      </div>
      
      {/* Small videos in 2x2 grid */}
      <div className="small-videos">
        <div className="small-video-row">
          <VideoThumbnail
            video={videos[1]}
            onPlay={onPlay}
            layout={5}
            isPlaying={selectedVideo?.id === videos[1].id}
            playMode={playMode}
            onClose={onClose}
          />
          <VideoThumbnail
            video={videos[2]}
            onPlay={onPlay}
            layout={5}
            isPlaying={selectedVideo?.id === videos[2].id}
            playMode={playMode}
            onClose={onClose}
          />
        </div>
        <div className="small-video-row">
          <VideoThumbnail
            video={videos[3]}
            onPlay={onPlay}
            layout={5}
            isPlaying={selectedVideo?.id === videos[3].id}
            playMode={playMode}
            onClose={onClose}
          />
          <VideoThumbnail
            video={videos[4]}
            onPlay={onPlay}
            layout={5}
            isPlaying={selectedVideo?.id === videos[4].id}
            playMode={playMode}
            onClose={onClose}
          />
        </div>
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
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </DialogContent>
    </Dialog>
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

  const actualLayout = layout || videos.length;
  const gridLayout = getGridLayout(videos.length, layout);

  // Special handling for 5-video layout
  if (actualLayout === 5 && videos.length >= 5) {
    return (
      <div className={cn("w-full", className)}>
        <FiveVideoLayout 
          videos={videos} 
          onPlay={handleVideoPlay} 
          selectedVideo={selectedVideo}
          playMode={playMode}
          onClose={handleClose}
        />

        {playMode === 'modal' && (
          <VideoModal
            video={selectedVideo}
            isOpen={isModalOpen}
            onClose={handleClose}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("grid", gridLayout)}>
        {videos.slice(0, layout || videos.length).map((video) => (
          <VideoThumbnail
            key={video.id}
            video={video}
            onPlay={handleVideoPlay}
            layout={actualLayout}
            isPlaying={selectedVideo?.id === video.id}
            playMode={playMode}
            onClose={handleClose}
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
    </div>
  );
};