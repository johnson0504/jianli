import { gsap } from 'gsap';

// One scroll callback; measure document geometry only after layout changes.
export function mountRepeatReveal({ distance, duration }) {
  let frame = 0, disposed = false, layoutDirty = true, previousY = scrollY;
  let holdSection = null, holdTimer;
  const hero = document.querySelector('.hero');
  const heroParts = '.hero-johnson,.hero-creative,.hero-introduction,.hero-buttons,.hero-field-note';
  let heroTimeline, heroReady = true;
  const entries = [...document.querySelectorAll('[data-reveal]')].map(el => ({
    el, card: el.closest('.project-card'), section: el.closest('main > section'),
    state: 'ready', animation: null, top: 0, height: 0, hidden: false, suspended: false,
  }));
  function show(entry) {
    entry.animation?.kill(); entry.animation = null;
    gsap.set(entry.el, { clearProps: 'opacity,transform' });
    entry.state = 'shown'; entry.el.dataset.revealState = 'shown';
  }
  function reset(entry) {
    if (entry.state === 'ready') return;
    entry.animation?.kill(); entry.animation = null;
    gsap.set(entry.el, { y: distance, opacity: 0 });
    entry.state = 'ready'; entry.el.dataset.revealState = 'ready';
  }
  function play(entry) {
    entry.state = 'playing'; entry.el.dataset.revealState = 'playing';
    entry.animation = gsap.fromTo(entry.el, { y: distance, opacity: 0 }, {
      y: 0, opacity: 1, duration, delay: Number(entry.el.dataset.reveal || 0) * .08,
      ease: 'power3.out', overwrite: true,
      onComplete: () => show(entry),
    });
  }
  function showHero() {
    heroTimeline?.kill(); gsap.set(heroParts, { clearProps: 'transform,opacity' });
    heroReady = false; hero.dataset.revealState = 'shown';
  }
  function playHero() {
    heroTimeline?.kill(); heroReady = false; hero.dataset.revealState = 'playing';
    heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' }, onComplete: () => { hero.dataset.revealState = 'shown'; } })
      .fromTo('.hero-johnson', { yPercent: 108 }, { yPercent: 0, duration: .85 }, 0)
      .fromTo('.hero-creative', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .6 }, .12)
      .fromTo('.hero-introduction', { y: distance, opacity: 0 }, { y: 0, opacity: 1, duration: .65 }, .2)
      .fromTo('.hero-buttons', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .55 }, .38)
      .fromTo('.hero-field-note', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .6 }, .3);
  }
  function measure() {
    entries.forEach(entry => {
      const anchor = entry.card || entry.el;
      const r = anchor.getBoundingClientRect();
      entry.top = r.top + scrollY - (entry.card ? 0 : Number(gsap.getProperty(entry.el, 'y')) || 0);
      entry.height = r.height;
      entry.hidden = !anchor.getClientRects().length;
    });
    layoutDirty = false;
  }
  function update() {
    frame = 0; if (disposed) return;
    if (layoutDirty) measure();
    const y = scrollY, goingUp = y < previousY; previousY = y;
    entries.forEach(entry => {
      if (entry.suspended || entry.hidden || entry.section?.id === holdSection) return;
      const top = entry.top - y, bottom = top + entry.height;
      if (entry.el.contains(document.activeElement) && document.activeElement.matches(':focus-visible')) { show(entry); return; }
      if (bottom < -24 || top > innerHeight + 24) { reset(entry); return; }
      if (entry.state === 'ready' && bottom > 0 && top < innerHeight * (goingUp ? 1 : .85)) play(entry);
    });
    if (holdSection !== 'home') {
      const r = hero.getBoundingClientRect();
      if (r.bottom < -24) {
        if (!heroReady) { heroTimeline?.kill(); heroReady = true; hero.dataset.revealState = 'ready'; }
      } else if (heroReady && r.bottom > 80 && y < hero.offsetHeight - 80) playHero();
    }
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  function refresh() { layoutDirty = true; schedule(); }
  function release() { holdSection = null; clearTimeout(holdTimer); schedule(); }
  function navigate(event) {
    const id = event.detail.id;
    holdSection = id; clearTimeout(holdTimer);
    entries.filter(entry => entry.section?.id === id).forEach(show);
    if (id === 'home') showHero();
    holdTimer = setTimeout(release, 1800);
  }
  function focus(event) {
    if (!event.target.matches(':focus-visible')) return;
    entries.filter(entry => entry.el.contains(event.target)).forEach(show);
    if (hero.contains(event.target)) showHero();
  }
  measure();
  entries.forEach(entry => {
    const top = entry.top - scrollY, bottom = top + entry.height;
    if (top < innerHeight * .85 && bottom > 0) show(entry);
    else { entry.state = 'shown'; reset(entry); }
  });
  if (location.hash) navigate({ detail: { id: location.hash.slice(1) } });
  if (!location.hash && scrollY < 80) playHero(); else if (scrollY < hero.offsetHeight) showHero();
  const resize = new ResizeObserver(refresh); resize.observe(document.querySelector('main'));
  entries.forEach(entry => resize.observe(entry.el));
  const imageLoaded = () => refresh();
  document.addEventListener('load', imageLoaded, true);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', refresh);
  window.addEventListener('scrollend', release);
  window.addEventListener('wheel', release, { passive: true });
  window.addEventListener('touchstart', release, { passive: true });
  window.addEventListener('portfolio:navigate', navigate);
  document.addEventListener('focusin', focus);
  document.fonts.ready.then(() => { if (!disposed) refresh(); });
  schedule();
  return {
    suspendCards() { entries.filter(e => e.card).forEach(e => { e.suspended = true; show(e); }); },
    resumeCards() { entries.filter(e => e.card).forEach(e => { e.suspended = false; }); refresh(); },
    destroy() {
      disposed = true; cancelAnimationFrame(frame); clearTimeout(holdTimer); resize.disconnect();
      entries.forEach(show); showHero();
      entries.forEach(e => delete e.el.dataset.revealState); delete hero.dataset.revealState;
      document.removeEventListener('load', imageLoaded, true);
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', refresh);
      window.removeEventListener('scrollend', release); window.removeEventListener('wheel', release);
      window.removeEventListener('touchstart', release); window.removeEventListener('portfolio:navigate', navigate);
      document.removeEventListener('focusin', focus);
    },
  };
}
