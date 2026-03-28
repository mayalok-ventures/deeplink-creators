import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollAnimations() {
  // Kill existing instances created by this function to avoid duplicates
  ScrollTrigger.getAll().forEach(st => {
    if (st.vars && st.vars._animLib) st.kill()
  })

  // 1. SECTION HEADINGS — radial gold wipe reveal
  gsap.utils.toArray('[data-anim="heading"]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 28, filter: 'blur(4px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse', _animLib: true }
      }
    )
  })

  // 2. SERVICE / FEATURE CARDS — scale-up from center
  gsap.utils.toArray('[data-anim="card"]').forEach((el, i) => {
    gsap.fromTo(el,
      { scale: 0.87, opacity: 0, y: 22, filter: 'blur(5px)' },
      {
        scale: 1, opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.65, delay: i * 0.09, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse', _animLib: true }
      }
    )
  })

  // 3. SECTION GLOW — radial gold bloom expands from center
  gsap.utils.toArray('[data-anim="section-glow"]').forEach(el => {
    gsap.fromTo(el,
      { '--glow-size': '0%' },
      {
        '--glow-size': '130%',
        scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 30%', scrub: 2.5, _animLib: true }
      }
    )
  })

  // 4. STAT COUNTERS — count up on scroll
  gsap.utils.toArray('[data-anim="counter"]').forEach(el => {
    const target = parseFloat(el.dataset.target || el.innerText)
    const isInt = target % 1 === 0
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: target,
      duration: 2.2,
      ease: 'power2.out',
      snap: { innerText: isInt ? 1 : 0.1 },
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reset', _animLib: true }
    })
  })

  // 5. IMAGES / MEDIA — cinematic zoom-in
  gsap.utils.toArray('[data-anim="img"]').forEach(el => {
    gsap.fromTo(el,
      { scale: 1.1, opacity: 0, filter: 'blur(8px)' },
      {
        scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse', _animLib: true }
      }
    )
  })

  // 6. LIST ITEMS — stagger cascade
  gsap.utils.toArray('[data-anim="list"]').forEach(list => {
    const items = list.querySelectorAll('li, [data-anim-item]')
    gsap.fromTo(items,
      { x: -20, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.1, duration: 0.55, ease: 'power2.out',
        scrollTrigger: { trigger: list, start: 'top 82%', toggleActions: 'play none none reverse', _animLib: true }
      }
    )
  })

  // 7. DIVIDERS — expand from center
  gsap.utils.toArray('[data-anim="divider"]').forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1, opacity: 1, duration: 1.3, ease: 'expo.out',
        transformOrigin: 'center',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse', _animLib: true }
      }
    )
  })

  // 8. CTA SECTIONS — gold pulse ring via box-shadow
  gsap.utils.toArray('[data-anim="cta-pulse"]').forEach(el => {
    gsap.fromTo(el,
      { boxShadow: '0 0 0 0px rgba(201,168,76,0)' },
      {
        boxShadow: '0 0 0 6px rgba(201,168,76,0.22)',
        repeat: -1, yoyo: true, duration: 2.2, ease: 'sine.inOut',
      }
    )
  })

  // 9. HORIZONTAL SPLIT REVEAL — two columns slide in from sides
  gsap.utils.toArray('[data-anim="split-left"]').forEach(el => {
    gsap.fromTo(el,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse', _animLib: true }
      }
    )
  })
  gsap.utils.toArray('[data-anim="split-right"]').forEach(el => {
    gsap.fromTo(el,
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse', _animLib: true }
      }
    )
  })
}
