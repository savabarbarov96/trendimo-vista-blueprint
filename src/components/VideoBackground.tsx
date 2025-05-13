
import React from 'react';
import { AspectRatio } from './ui/aspect-ratio';

const VideoBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-[1]"></div>
      
      {/* Video element */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        poster="/placeholder.svg"
      >
        <source src="/videos/real-estate-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
