import { useState, useRef, useEffect } from 'react';

interface TimelineEvent {
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TimelineSliderProps {
  events: TimelineEvent[];
}

export default function TimelineSlider({ events }: TimelineSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgress = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    setDragProgress(progress);

    const segmentWidth = 1 / (events.length - 1);
    const newIndex = Math.min(
      events.length - 1,
      Math.floor(progress / segmentWidth)
    );
    setActiveIndex(newIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgress(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleProgress(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleProgress(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleProgress(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (e.key === 'ArrowRight' && activeIndex < events.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    if (!isDragging) {
      setDragProgress(activeIndex / (events.length - 1));
    }
  }, [activeIndex, events.length, isDragging]);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section
      className="relative py-16 md:py-24 px-4 md:px-8 bg-[#0a0a1a]"
      aria-label="Event Timeline"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Event Timeline
        </h2>
        <p className="text-purple-300 text-center mb-12">
          Key milestones for HackPage 2025
        </p>

        {/* Timeline container */}
        <div
          ref={sliderRef}
          className="relative cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={events.length - 1}
          aria-valuenow={activeIndex}
          aria-label="Timeline slider"
        >
          {/* Progress track */}
          <div className="relative h-2 bg-purple-900/50 rounded-full overflow-visible">
            {/* Filled progress */}
            <div
              ref={progressBarRef}
              className="absolute h-full bg-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${dragProgress * 100}%`,
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
              }}
            />

            {/* Segment markers */}
            <div className="absolute inset-0 flex justify-between items-center px-0">
              {events.map((_, index) => (
                <div
                  key={index}
                  className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    index <= activeIndex
                      ? 'bg-purple-500 border-purple-500'
                      : 'bg-transparent border-purple-400/50'
                  } ${index === activeIndex ? 'scale-125' : ''}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {/* Interactive thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg shadow-purple-500/50 transition-all duration-150 ${
              isDragging ? 'scale-150' : 'scale-100'
            }`}
            style={{
              left: `calc(${dragProgress * 100}% - 12px)`,
            }}
            aria-hidden="true"
          />

          {/* Event labels */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative text-center transition-all duration-300 ${
                  index === activeIndex
                    ? 'opacity-100 scale-105'
                    : 'opacity-50 scale-100'
                }`}
              >
                <div
                  className={`text-sm md:text-base font-semibold mb-2 transition-colors duration-300 ${
                    index === activeIndex ? 'text-purple-400' : 'text-white/70'
                  }`}
                >
                  {event.title}
                </div>
                <div className="text-xs md:text-sm text-purple-300/70">
                  {event.date}
                </div>
                {index === activeIndex && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rotate-45" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-3 rounded-full bg-purple-600/30 hover:bg-purple-600/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Previous event"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setActiveIndex(Math.min(events.length - 1, activeIndex + 1))
            }
            disabled={activeIndex === events.length - 1}
            className="p-3 rounded-full bg-purple-600/30 hover:bg-purple-600/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Next event"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
