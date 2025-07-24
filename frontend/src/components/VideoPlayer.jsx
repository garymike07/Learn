import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

const VideoPlayer = ({ video, onProgressUpdate, userProgress = 0, completed = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const hideControlsTimeoutRef = useRef(null);

  const embedUrl = `https://www.youtube.com/embed/${video.youtube_id}?enablejsapi=1&origin=${window.location.origin}`;

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        const player = new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          videoId: video.youtube_id,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0
          },
          events: {
            onReady: (event) => {
              setDuration(event.target.getDuration());
              // Set initial progress if user has watched before
              if (userProgress > 0) {
                const startTime = (userProgress / 100) * event.target.getDuration();
                event.target.seekTo(startTime);
                setCurrentTime(startTime);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                startProgressTracking(event.target);
              } else {
                setIsPlaying(false);
                stopProgressTracking();
              }
            }
          }
        });
        
        window.player = player;
      }
    };

    return () => {
      stopProgressTracking();
    };
  }, [video.youtube_id]);

  const progressInterval = useRef(null);

  const startProgressTracking = (player) => {
    progressInterval.current = setInterval(() => {
      if (player && player.getCurrentTime) {
        const current = player.getCurrentTime();
        const total = player.getDuration();
        setCurrentTime(current);
        
        if (total > 0) {
          const progressPercent = (current / total) * 100;
          const isVideoCompleted = progressPercent >= 90; // Consider 90% as completed
          
          // Update progress every 5 seconds or when completed
          if (Math.floor(current) % 5 === 0 || isVideoCompleted) {
            onProgressUpdate && onProgressUpdate({
              progress: progressPercent,
              completed: isVideoCompleted
            });
          }
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const togglePlay = () => {
    if (window.player) {
      if (isPlaying) {
        window.player.pauseVideo();
      } else {
        window.player.playVideo();
      }
    }
  };

  const handleSeek = (e) => {
    if (window.player && duration > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      window.player.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (window.player) {
      if (isMuted) {
        window.player.unMute();
        window.player.setVolume(volume * 100);
      } else {
        window.player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (window.player) {
      window.player.setVolume(newVolume * 100);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetVideo = () => {
    if (window.player) {
      window.player.seekTo(0);
      setCurrentTime(0);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div 
      className="relative w-full bg-black rounded-lg overflow-hidden group"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* YouTube Player */}
      <div ref={playerRef} className="w-full h-full" />
      
      {/* Video Info Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
            <h3 className="text-white font-medium text-sm">{video.title}</h3>
            <p className="text-gray-300 text-xs">{video.duration_minutes} minutes</p>
          </div>
          {completed && (
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              ✓ Completed
            </div>
          )}
        </div>
      </div>

      {/* Custom Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 z-10 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-3 relative"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-blue-500 rounded-full relative"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          {/* User Progress Indicator */}
          {userProgress > 0 && (
            <div 
              className="absolute top-0 h-full w-1 bg-yellow-400 rounded-full"
              style={{ left: `${userProgress}%` }}
              title={`Previously watched: ${userProgress.toFixed(1)}%`}
            />
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button
              onClick={resetVideo}
              className="text-white hover:text-blue-400 transition-colors"
              title="Restart video"
            >
              <RotateCcw size={20} />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-white text-sm">
              Progress: {duration > 0 ? ((currentTime / duration) * 100).toFixed(1) : 0}%
            </div>
            <button
              onClick={() => window.player && window.player.getIframe().requestFullscreen()}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {!window.YT && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Loading video player...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

