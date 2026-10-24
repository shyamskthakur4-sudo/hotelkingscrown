import { useEffect } from 'react';

/**
 * Enhanced hook for luxury scroll reveals and element animations.
 * Observes:
 * - .reveal-fade-up
 * - .reveal-fade-in
 * - .reveal-slide-left
 * - .reveal-slide-right
 * - .reveal-scale-up
 * - .stagger-children
 */
export function useScrollReveal(dependencyKey?: unknown) {
  useEffect(() => {
    // Check for user reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(
        '.reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right, .reveal-scale-up, .stagger-children'
      ).forEach((el) => {
        el.classList.add('is-revealed');
        if (el.classList.contains('stagger-children')) {
          Array.from(el.children).forEach((child) => child.classList.add('is-revealed'));
        }
      });
      return;
    }

    // Auto-apply stagger delays to children of .stagger-children
    document.querySelectorAll('.stagger-children').forEach((container) => {
      Array.from(container.children).forEach((child, index) => {
        const el = child as HTMLElement;
        if (!el.style.transitionDelay) {
          el.style.transitionDelay = `${index * 90}ms`;
        }
        if (!el.classList.contains('reveal-fade-up') && !el.classList.contains('reveal-fade-in')) {
          el.classList.add('reveal-fade-up');
        }
      });
    });

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // If it's a stagger container, also reveal its children
          if (entry.target.classList.contains('stagger-children')) {
            Array.from(entry.target.children).forEach((child) => {
              child.classList.add('is-revealed');
            });
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    });

    const targets = document.querySelectorAll(
      '.reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right, .reveal-scale-up, .stagger-children'
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        el.classList.add('is-revealed');
        if (el.classList.contains('stagger-children')) {
          Array.from(el.children).forEach((child) => child.classList.add('is-revealed'));
        }
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
