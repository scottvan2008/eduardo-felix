// A página continua legível sem JavaScript ou IntersectionObserver.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const sections = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.06 });
  for (const section of sections) {
    if (section.getBoundingClientRect().top > window.innerHeight) {
      section.classList.add('reveal-pending');
      observer.observe(section);
    }
  }
  motionPreference.addEventListener('change', (event) => {
    if (event.matches) {
      sections.forEach((section) => section.classList.remove('reveal-pending'));
      observer.disconnect();
    }
  });
}
