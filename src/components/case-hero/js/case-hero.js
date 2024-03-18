import { gsap } from 'gsap';

gsap.to('.js-case-hero-content', {
  marginTop: -200,
  ease: 'none',
  scrollTrigger: {
    start: 0,
    end: +800,
    scrub: true,
  },
});
