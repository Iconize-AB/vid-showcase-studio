import React, { useState } from 'react';
import { VideoGrid, VideoItem } from './VideoGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample video data based on the image
const sampleVideos: VideoItem[] = [
  {
    id: '1',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1573166364524-d9aca4f06ea0?w=800&h=450&fit=crop',
    title: 'This is how we found the best way...',
    subtitle: 'Medtech | XXX Company',
    tag: {
      text: 'End-Customer training',
      color: 'blue'
    }
  },
  {
    id: '2',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop',
    title: 'If we wouldn\'t have SP CE...',
    subtitle: 'Medtech | XXXX',
    tag: {
      text: 'Share content with partners',
      color: 'green'
    }
  },
  {
    id: '3',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop',
    title: 'What impressed me with SP CE was...',
    subtitle: 'Medtech | XXX',
    tag: {
      text: 'Share content with customers',
      color: 'red'
    }
  },
  {
    id: '4',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop',
    title: 'This is why our customers love it...',
    subtitle: 'Medtech | XXX AI',
    tag: {
      text: 'Share content with customers',
      color: 'red'
    }
  },
  {
    id: '5',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=450&fit=crop',
    title: 'Making partners more successful...',
    subtitle: 'Audio&Video | XXX',
    tag: {
      text: 'Partner Management',
      color: 'purple'
    }
  }
];

export const VideoGridDemo: React.FC = () => {
  const [playMode, setPlayMode] = useState<'modal' | 'inline'>('modal');
  const [currentLayout, setCurrentLayout] = useState<2 | 3 | 4 | 5>(5);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Video Grid Component</h1>
        <p className="text-muted-foreground text-lg">
          Flexible video showcase with customizable layouts and playback modes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Layout</label>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map((layout) => (
                  <Button
                    key={layout}
                    variant={currentLayout === layout ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentLayout(layout as 2 | 3 | 4 | 5)}
                  >
                    {layout} Videos
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Play Mode</label>
              <div className="flex gap-2">
                <Button
                  variant={playMode === 'modal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPlayMode('modal')}
                >
                  Modal
                </Button>
                <Button
                  variant={playMode === 'inline' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPlayMode('inline')}
                >
                  Inline
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="demo" className="space-y-6">
        <TabsList>
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="code">Code Example</TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <VideoGrid
                videos={sampleVideos}
                layout={currentLayout}
                playMode={playMode}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { VideoGrid, VideoItem } from './components/VideoGrid';

const videos: VideoItem[] = [
  {
    id: '1',
    url: 'https://www.youtube.com/embed/VIDEO_ID',
    thumbnail: 'https://example.com/thumbnail.jpg',
    title: 'Video Title',
    subtitle: 'Optional subtitle',
    tag: {
      text: 'Category',
      color: 'blue' // blue, green, red, purple, orange, yellow
    }
  }
  // ... more videos
];

<VideoGrid
  videos={videos}
  layout={5}           // 2, 3, 4, or 5
  playMode="modal"     // 'modal' or 'inline'
  className="my-6"
/>`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WordPress Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  To embed this component in WordPress, you can:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Build the component as a standalone bundle</li>
                  <li>Include the CSS and JS files in your WordPress theme</li>
                  <li>Use a shortcode or custom block to render the component</li>
                  <li>Pass video data through WordPress custom fields or a JSON API</li>
                </ol>
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Example WordPress Shortcode:</p>
                  <code className="text-xs bg-background p-2 rounded block">
                    [video_grid layout="5" play_mode="modal" videos="video_data_json"]
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};