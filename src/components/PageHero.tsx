import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface PageHeroProps {
  photoSrc: string;
  photoAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  photoSrc,
  photoAlt,
  eyebrow,
  title,
  subtitle,
  actions,
  children
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax translation: subtle 28% scroll translation with delicate scale
  const parallaxTransform = `translate3d(0, ${Math.min(scrollY * 0.28, 140)}px, 0) scale(${1 + Math.min(scrollY * 0.00025, 0.07)})`;

  return (
    <section className="page-hero" aria-label={title}>
      {/* Background Image Container with Parallax & Cinematic Gradient Overlay */}
      <div className="page-hero-bg-wrapper">
        <img
          src={photoSrc}
          alt={photoAlt}
          className="page-hero-bg-img"
          style={{ transform: parallaxTransform }}
          loading="eager"
        />
        <div className="page-hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="container page-hero-container">
        <div className="page-hero-content">
          <div className="page-hero-badge-strip reveal-fade-up">
            <span className="page-hero-eyebrow">
              <MapPin size={13} style={{ display: 'inline', marginRight: '6px' }} />
              {eyebrow}
            </span>
          </div>

          <h1 className="page-hero-title reveal-fade-up delay-100">
            {title}
          </h1>

          <p className="page-hero-subtitle reveal-fade-up delay-200">
            {subtitle}
          </p>

          {actions && (
            <div className="page-hero-actions reveal-fade-up delay-300">
              {actions}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};
