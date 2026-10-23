import { useEffect } from 'react';

/**
 * Custom hook to activate modern IntersectionObserver scroll reveal animations.
 * Automatically watches for elements with classes:
 * - .reveal-fade-up
 * - .reveal-fade-in
 * - .reveal-slide-left
 * - .reveal-slide-right
 * - .reveal-scale
 * 
 * When scrolled into view, it adds the '.is-revealed' class.
 */
export function useScrollReveal(dependencyKey?: unknown) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right, .reveal-scale')
        .forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12,
    });

    const targets = document.querySelectorAll(
      '.reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right, .reveal-scale'
    );

    targets.forEach((el) => {
      // If already in viewport on mount, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [dependencyKey]);
}
