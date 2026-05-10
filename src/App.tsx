import { useEffect, useRef } from 'react';
import AstronautSection from './components/AstronautSection';
import TimelineSlider from './components/TimelineSlider';
import InteractiveGallery from './components/InteractiveGallery';
import './index.css';

function App() {
  const mainRef = useRef<HTMLElement>(null);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  // Feature items for Why Participate section
  const featureItems = [
    {
      title: 'Mentorship',
      content:
        'Get guidance from industry experts and experienced mentors who will help shape your journey and provide invaluable insights throughout the hackathon.',
    },
    {
      title: 'Networking',
      content:
        'Connect with like-minded innovators, potential collaborators, and industry professionals to expand your professional network and build lasting relationships.',
    },
    {
      title: 'Internship Opportunities',
      content:
        'Stand out and unlock exclusive internship opportunities with leading tech companies who actively recruit from our hackathon participants.',
    },
    {
      title: 'Real-World Impact',
      content:
        'Transform your ideas into tangible solutions that address real challenges. See your work make an actual difference in the world.',
    },
  ];

  // Timeline events
  const timelineEvents = [
    {
      title: 'Registrations Open',
      date: 'Thu, Jul 04, 2025',
      status: 'completed' as const,
    },
    {
      title: 'Ideation Phase',
      date: 'Sat, Jul 13, 2025',
      status: 'current' as const,
    },
    {
      title: 'Final Submissions',
      date: 'Thu, Aug 01, 2025',
      status: 'upcoming' as const,
    },
  ];

  // Gallery images
  const galleryImages = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
      alt: 'Team collaboration during hackathon',
      title: 'Team Collaboration',
    },
    {
      id: '2',
      src: 'https://www.shutterstock.com/image-photo/medium-shot-woman-working-developer-260nw-2324952349.jpg?w=400&h=400&fit=crop',
      alt: 'Developers working on code',
      title: 'Coding Session',
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop',
      alt: 'Innovative project presentation',
      title: 'Project Presentation',
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop',
      alt: 'Networking event',
      title: 'Networking Event',
    },
    {
      id: '5',
      src: 'https://img.freepik.com/premium-photo/collaborative-process-indian-business-mans-brainstorming-meeting-officediverse-team_926199-1990227.jpg?w=400&h=400&fit=crop',
      alt: 'Team brainstorming',
      title: 'Brainstorming',
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop',
      alt: 'Award ceremony',
      title: 'Award Ceremony',
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
      alt: 'Development workspace',
      title: 'Development Setup',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-purple-600 focus:text-white focus:p-4 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-purple-500/20">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
            >
              Hack<span className="text-purple-500">Page</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#participate"
                className="text-purple-200 hover:text-white transition-colors"
              >
                Why Participate
              </a>
              <a
                href="#timeline"
                className="text-purple-200 hover:text-white transition-colors"
              >
                Timeline
              </a>
              <a
                href="#gallery"
                className="text-purple-200 hover:text-white transition-colors"
              >
                Gallery
              </a>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
                Register Now
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main ref={mainRef} id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-in-up">
              Hack<span className="text-purple-500">Page</span> 2025
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              Where Innovation Meets Opportunity
            </p>
            <p className="text-lg text-purple-300/80 mb-12 max-w-2xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              Join the ultimate hackathon experience. Build, learn, and network with the brightest minds in tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Get Started
              </button>
              <button className="px-8 py-4 bg-transparent hover:bg-purple-600/20 text-white border border-purple-500 rounded-lg font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Learn More
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Why Participate Section with Astronaut */}
        <section id="participate">
          <AstronautSection items={featureItems} />
        </section>

        {/* Timeline Slider Section */}
        <section id="timeline">
          <TimelineSlider events={timelineEvents} />
        </section>

        {/* Interactive Gallery Section */}
        <section id="gallery">
          <InteractiveGallery images={galleryImages} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050510] border-t border-purple-500/20 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Hack<span className="text-purple-500">Page</span>
              </h3>
              <p className="text-purple-300/70 text-sm">
                Empowering the next generation of innovators and problem solvers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-purple-300/70 hover:text-purple-400 transition-colors text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-300/70 hover:text-purple-400 transition-colors text-sm">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-300/70 hover:text-purple-400 transition-colors text-sm">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-purple-300/70 hover:text-purple-400 transition-colors text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-300/70 hover:text-purple-400 transition-colors text-sm">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-300/70 hover:text-purple-400 transition-colors text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-purple-600/30 hover:bg-purple-600/50 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-purple-600/30 hover:bg-purple-600/50 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-purple-600/30 hover:bg-purple-600/50 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-500/20 text-center">
            <p className="text-purple-300/50 text-sm">
              &copy; {new Date().getFullYear()} HackPage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
