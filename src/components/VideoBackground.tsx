
import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src="/videos/real-estate-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default VideoBackground;
