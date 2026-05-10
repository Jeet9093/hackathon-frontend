import { useEffect, useRef, useState } from 'react';

interface AstronautSectionProps {
  items: {
    title: string;
    content: string;
  }[];
}

export default function AstronautSection({ items }: AstronautSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 md:px-8"
      aria-label="Why Participate section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d0d20] to-[#0a0a1a]" />

      {/* Animated concentric circles behind astronaut */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-purple-500/30 animate-pulse-ring"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              animationDelay: `${i * 0.5}s`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section title */}
        <h2
          className={`text-center text-3xl md:text-5xl font-bold mb-16 text-purple-400 tracking-tight transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          WHY PARTICIPATE?
        </h2>

        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 items-center">
          {/* Left side content */}
          <div
            className={`space-y-8 lg:pr-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {items.slice(0, 2).map((item, index) => (
              <FeatureCard
                key={index}
                title={item.title}
                content={item.content}
                delay={300 + index * 100}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Center - Astronaut image */}
          <div className="relative flex justify-center items-center order-first lg:order-none mb-8 lg:mb-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Astronaut glow effect */}
              <div
                className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl animate-glow"
                aria-hidden="true"
              />

              {/* Astronaut SVG illustration */}
              <div className="animate-float relative z-10">
                <AstronautIcon />
              </div>

              {/* Mouse cursor indicator */}
              <div
                className="absolute top-1/4 right-1/4 w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-125"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4L10 20L12.5 12.5L20 10L4 4Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right side content */}
          <div
            className={`space-y-8 lg:pl-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {items.slice(2, 4).map((item, index) => (
              <FeatureCard
                key={index + 2}
                title={item.title}
                content={item.content}
                delay={400 + index * 100}
                isVisible={isVisible}
                align="left"
              />
            ))}
          </div>
        </div>

        {/* Connecting bars */}
        <div className="hidden lg:flex justify-between items-center mt-12 px-8">
          <div className="h-1 w-24 bg-purple-600 rounded-full" aria-hidden="true" />
          <div className="h-1 w-24 bg-purple-600 rounded-full" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  content: string;
  delay: number;
  isVisible: boolean;
  align?: 'left' | 'right';
}

function FeatureCard({ title, content, delay, isVisible, align = 'right' }: FeatureCardProps) {
  return (
    <article
      className={`bg-purple-600/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/30 transition-all duration-700 hover:border-purple-500/60 hover:bg-purple-600/40 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${align === 'left' ? 'lg:text-left' : 'lg:text-left'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-purple-200/80 text-sm md:text-base leading-relaxed">{content}</p>
    </article>
  );
}

function AstronautIcon() {
  return (
    <svg
      viewBox="0 0 300 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
      role="img"
      aria-label="Astronaut illustration"
    >
      {/* Helmet */}
      <ellipse cx="150" cy="80" rx="65" ry="70" fill="#e8e8e8" />
      <ellipse cx="150" cy="80" rx="55" ry="60" fill="#2a2a3a" />
      <ellipse cx="150" cy="75" rx="40" ry="35" fill="#4a90a4" opacity="0.8" />

      {/* Body */}
      <path
        d="M90 140 Q90 200 100 250 L200 250 Q210 200 210 140 Z"
        fill="#e8e8e8"
      />
      <rect x="110" y="160" width="80" height="60" rx="10" fill="#3a3a4a" />

      {/* Backpack */}
      <rect x="80" y="150" width="30" height="80" rx="5" fill="#4a4a5a" />

      {/* Left arm */}
      <path
        d="M90 160 Q60 180 50 220 Q45 240 55 250"
        stroke="#e8e8e8"
        strokeWidth="25"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right arm */}
      <path
        d="M210 160 Q240 180 250 220 Q255 240 245 250"
        stroke="#e8e8e8"
        strokeWidth="25"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left leg */}
      <path
        d="M115 250 L105 320 Q100 340 110 345"
        stroke="#e8e8e8"
        strokeWidth="28"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right leg */}
      <path
        d="M185 250 L195 320 Q200 340 190 345"
        stroke="#e8e8e8"
        strokeWidth="28"
        strokeLinecap="round"
        fill="none"
      />

      {/* Highlights */}
      <ellipse cx="130" cy="70" rx="15" ry="10" fill="#ffffff" opacity="0.4" />
      <circle cx="170" cy="80" r="8" fill="#ffffff" opacity="0.3" />

      {/* Chest controls */}
      <rect x="125" y="175" width="50" height="35" rx="3" fill="#2a2a3a" />
      <circle cx="140" cy="190" r="5" fill="#ff6b6b" />
      <circle cx="155" cy="190" r="5" fill="#4ade80" />
      <circle cx="140" cy="205" r="5" fill="#fbbf24" />
      <circle cx="155" cy="205" r="5" fill="#60a5fa" />

      {/* Visor reflection */}
      <path
        d="M120 60 Q150 45 180 60"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
