import { useState, useRef, useEffect } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface InteractiveGalleryProps {
  images: GalleryImage[];
}

export default function InteractiveGallery({ images }: InteractiveGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, imageId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveImage(activeImage === imageId ? null : imageId);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#0a0a1a] to-[#0d0d25]"
      onMouseMove={handleMouseMove}
      aria-label="Interactive image gallery"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Explore Our Gallery
        </h2>
        <p className="text-purple-300 text-center mb-12">
          Hover over images to interact with the creative grid system
        </p>

        {/* Grid layout */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          role="list"
          aria-label="Gallery images"
        >
          {images.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              index={index}
              isActive={activeImage === image.id}
              onSelect={() =>
                setActiveImage(activeImage === image.id ? null : image.id)
              }
              onKeySelect={(e) => handleKeyDown(e, image.id)}
            />
          ))}

          {/* Empty placeholder slot */}
          <div
            className="relative aspect-square bg-[#1a1a2e] rounded-lg border-2 border-dashed border-purple-500/30 hover:border-purple-500/60 transition-colors duration-300 flex items-center justify-center cursor-pointer"
            role="listitem"
            tabIndex={0}
            aria-label="Empty placeholder for new image"
          >
            <div className="text-center opacity-50">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-xs text-purple-300">Add Image</span>
            </div>

            {/* Crosshair indicators for placeholder */}
            <CrosshairIndicators />
          </div>
        </div>

        {/* Custom cursor effect overlay */}
        <div
          className="pointer-events-none fixed w-16 h-16 border-2 border-white/50 rounded-full opacity-0 transition-opacity duration-200"
          style={{
            left: cursorPos.x - 32,
            top: cursorPos.y - 32,
            transform: 'translate(0, 0)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onKeySelect: (e: React.KeyboardEvent) => void;
}

function GalleryCard({
  image,
  index,
  isActive,
  onSelect,
  onKeySelect,
}: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`relative aspect-square bg-[#1a1a2e] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group ${
        isActive ? 'ring-2 ring-purple-500 scale-105 z-10' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      onKeyDown={onKeySelect}
      tabIndex={0}
      role="listitem"
      aria-selected={isActive}
      aria-label={`Image: ${image.alt}`}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-purple-600/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Crosshair indicators */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <CrosshairIndicators />
      </div>

      {/* Corner markers */}
      <div
        className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Image title overlay */}
      {image.title && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-sm text-white font-medium truncate">
            {image.title}
          </p>
        </div>
      )}

      {/* Selection indicator */}
      <div
        className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center transition-all duration-300 ${
          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Accessibility: keyboard focus indicator */}
      <div className="sr-only">Press Enter to select this image</div>
    </article>
  );
}

function CrosshairIndicators() {
  return (
    <>
      {/* Top-left crosshair */}
      <svg
        className="absolute top-2 left-2 w-4 h-4 text-white"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 0h4v2h2v4h2v2h-2v4h-2v2h-4v-2h-2v-4h-2v-2h2v-4z" />
      </svg>

      {/* Top-right crosshair */}
      <svg
        className="absolute top-2 right-2 w-4 h-4 text-white"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 0h4v2h2v4h2v2h-2v4h-2v2h-4v-2h-2v-4h-2v-2h2v-4z" />
      </svg>

      {/* Bottom-left crosshair */}
      <svg
        className="absolute bottom-2 left-2 w-4 h-4 text-white"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 0h4v2h2v4h2v2h-2v4h-2v2h-4v-2h-2v-4h-2v-2h2v-4z" />
      </svg>

      {/* Bottom-right crosshair */}
      <svg
        className="absolute bottom-2 right-2 w-4 h-4 text-white"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 0h4v2h2v4h2v2h-2v4h-2v2h-4v-2h-2v-4h-2v-2h2v-4z" />
      </svg>
    </>
  );
}
