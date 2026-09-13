import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { mountRepeatReveal } from './RepeatReveal';

gsap.registerPlugin(ScrollTrigger, Flip);
let revealController, activeCleanup;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let gridAnimation;
const query = selector => gsap.utils.toArray(selector);

export function resetMotion() {
  activeCleanup?.();
  activeCleanup = null;
  gsap.killTweensOf('[data-reveal], .hero-johnson, .hero-creative, .hero-introduction, .hero-buttons, .chapter-background');
  gsap.set('[data-reveal], .hero-johnson, .hero-creative, .hero-introduction, .hero-buttons, .chapter-background', { clearProps: 'opacity,visibility,transform' });
}

export function mountMotion() {
  const media = gsap.matchMedia();
  const disposers = [];
  activeCleanup = () => {
    media.revert();
    revealController?.destroy(); revealController = null;
    disposers.splice(0).forEach(fn => fn());
    gridAnimation?.kill();
  };
  media.add({ normal: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)', fine: '(hover: hover) and (pointer: fine)' }, context => {
    if (!context.conditions.normal) return;
    const desktop = context.conditions.desktop;
    const distance = desktop ? 28 : 12;
    const duration = desktop ? .7 : .4;
    const cleaners = [];
    // Register disposal before setup so a partial initialization can also unwind.
    context.add(() => () => {
      cleaners.splice(0).forEach(fn => fn());
      gridAnimation?.progress(1).kill();
    });
    const listen = (el, name, fn, options) => {
      el.addEventListener(name, fn, options);
      cleaners.push(() => el.removeEventListener(name, fn, options));
    };
    const repeat = mountRepeatReveal({ distance, duration });
    revealController = repeat;
    cleaners.push(() => { repeat.destroy(); if (revealController === repeat) revealController = null; });
    const shimmerTargets = query('[data-shimmer]');
    const visibleShimmers = new Set();
    const syncShimmers = () => shimmerTargets.forEach(el => el.classList.toggle('shimmer-running', visibleShimmers.has(el) && !document.hidden));
    const shimmerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) visibleShimmers.add(entry.target); else visibleShimmers.delete(entry.target); });
      syncShimmers();
    });
    shimmerTargets.forEach(el => shimmerObserver.observe(el));
    listen(document, 'visibilitychange', syncShimmers);
    cleaners.push(() => { shimmerObserver.disconnect(); shimmerTargets.forEach(el => el.classList.remove('shimmer-running')); });
    if (desktop && context.conditions.fine) {
      gsap.fromTo('.hero-media', { y: 0 }, { y: 32, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .35 } });
      query('.chapter-background').forEach(el => gsap.fromTo(el, { scale: .985 }, {
        scale: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'top 35%', scrub: .35 },
      }));
    }
    if (context.conditions.fine) {
      query('.project-visual').forEach(el => {
        const cursor = el.querySelector('.project-cursor');
        const x = gsap.quickTo(cursor, 'x', { duration: .22, ease: 'power3.out' });
        const y = gsap.quickTo(cursor, 'y', { duration: .22, ease: 'power3.out' });
        const move = event => {
          if (event.pointerType === 'touch') return;
          const box = el.getBoundingClientRect();
          el.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
          el.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
          const px = Math.max(62, Math.min(box.width - 62, event.clientX - box.left));
          const py = Math.max(28, Math.min(box.height - 28, event.clientY - box.top));
          if (!el.classList.contains('pointer-active')) gsap.set(cursor, { x: px, y: py });
          el.classList.add('pointer-active');
          x(px); y(py);
        };
        const leave = () => el.classList.remove('pointer-active');
        listen(el, 'pointermove', move);
        listen(el, 'pointerleave', leave);
        listen(el, 'blur', leave);
        listen(el, 'click', leave);
        cleaners.push(() => { leave(); x.tween.kill(); y.tween.kill(); gsap.set(cursor, { clearProps: 'transform' }); });
      });
      query('[data-magnet]').forEach(el => {
        const inner = el.querySelector('.magnet-inner');
        if (!inner) return;
        const x = gsap.quickTo(inner, 'x', { duration: .35, ease: 'power3.out' });
        const y = gsap.quickTo(inner, 'y', { duration: .35, ease: 'power3.out' });
        const leave = () => { x(0); y(0); };
        listen(el, 'pointermove', e => {
          if (e.pointerType === 'touch') return;
          const r = el.getBoundingClientRect();
          x(gsap.utils.clamp(-6, 6, (e.clientX - r.left - r.width / 2) * .12));
          y(gsap.utils.clamp(-6, 6, (e.clientY - r.top - r.height / 2) * .18));
        });
        listen(el, 'pointerleave', leave);
        listen(el, 'blur', leave);
        cleaners.push(() => { x.tween.kill(); y.tween.kill(); gsap.set(inner, { clearProps: 'transform' }); });
      });
      const portrait = document.querySelector('.portrait-motion');
      const note = portrait.querySelector('.banknote');
      const rx = gsap.quickTo(note, 'rotationX', { duration: .5, ease: 'power3.out' });
      const ry = gsap.quickTo(note, 'rotationY', { duration: .5, ease: 'power3.out' });
      const reset = () => { rx(0); ry(0); };
      listen(portrait, 'pointermove', e => {
        if (e.pointerType === 'touch') return;
        const r = portrait.getBoundingClientRect();
        rx(gsap.utils.clamp(-3, 3, -(e.clientY - r.top - r.height / 2) / r.height * 6));
        ry(gsap.utils.clamp(-3, 3, (e.clientX - r.left - r.width / 2) / r.width * 6));
      });
      listen(portrait, 'pointerleave', reset);
      cleaners.push(() => { rx.tween.kill(); ry.tween.kill(); gsap.set(note, { clearProps: 'transform' }); });
    }
  });

  // Keep native <details> semantics, including keyboard activation and rapid reversals.
  query('.timeline-item').forEach(details => {
    const summary = details.querySelector('summary');
    let animation, targetOpen = details.open;
    const toggle = e => {
      if (reduced()) return;
      e.preventDefault();
      targetOpen = animation ? !targetOpen : !details.open;
      const start = details.getBoundingClientRect().height;
      animation?.cancel();
      details.style.height = '';
      details.open = true;
      const end = targetOpen ? details.getBoundingClientRect().height : summary.offsetHeight + 2;
      details.style.overflow = 'hidden';
      animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], { duration: 240, easing: 'cubic-bezier(.22,1,.36,1)' });
      animation.onfinish = () => {
        details.open = targetOpen;
        details.style.overflow = '';
        animation = null;
        ScrollTrigger.refresh();
      };
    };
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => {
      if (!animation) return;
      animation.cancel(); animation = null;
      details.open = targetOpen; details.style.overflow = '';
    };
    summary.addEventListener('click', toggle);
    preference.addEventListener('change', stop);
    disposers.push(() => { stop(); summary.removeEventListener('click', toggle); preference.removeEventListener('change', stop); });
  });
  let disposed = false;
  document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  disposers.push(() => { disposed = true; window.removeEventListener('load', refresh); });
  return () => {
    disposed = true;
    activeCleanup?.(); activeCleanup = null;
    window.removeEventListener('load', refresh);
  };
}

export function captureGrid() {
  gridAnimation?.progress(1).kill();
  if (reduced()) return null;
  revealController?.suspendCards();
  return Flip.getState('.project-card');
}

export function animateGrid(state) {
  if (reduced()) { revealController?.resumeCards(); ScrollTrigger.refresh(); return; }
  const cards = query('.project-card');
  // Newly selected cards do not also run a second scroll-entry animation.
  cards.forEach(card => {
    const inner = card.querySelector('[data-reveal]');
    gsap.killTweensOf(inner);
    gsap.set(inner, { clearProps: 'transform,opacity' });
  });
  gridAnimation = Flip.from(state, {
    duration: .3, ease: 'power2.inOut', absoluteOnLeave: true, prune: true,
    onEnter: elements => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: .26, clearProps: 'opacity' }),
    onLeave: elements => gsap.to(elements, { opacity: 0, duration: .18 }),
    onComplete: () => {
      gsap.set(cards, { clearProps: 'opacity,transform' });
      revealController?.resumeCards();
      ScrollTrigger.refresh();
    },
  });
}

export function animateAbility() {
  if (reduced()) return;
  const animation = gsap.fromTo('.ability-content.is-current', { opacity: .25, y: 8 }, { opacity: 1, y: 0, duration: .22, ease: 'power2.out', clearProps: 'transform,opacity' });
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const finish = () => animation.progress(1);
  preference.addEventListener('change', finish);
  return () => { animation.progress(1).kill(); preference.removeEventListener('change', finish); };
}

export function animateDialog() {
  if (reduced()) return;
  const el = document.querySelector('.detail-dialog');
  const animation = el.animate([{ opacity: 0, translate: '0 12px' }, { opacity: 1, translate: '0 0' }], { duration: 220, easing: 'cubic-bezier(.22,1,.36,1)' });
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const finish = () => animation.finish();
  preference.addEventListener('change', finish);
  return () => { animation.cancel(); preference.removeEventListener('change', finish); };
}
