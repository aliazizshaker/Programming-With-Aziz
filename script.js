const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .srv-card, .social-icon, .cs-icon, .fs-icon, .contact-item, .abt-stat, .nav-toggle');

hoverTargets.forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursorDot.classList.add('hovered');
    cursorRing.classList.add('hovered');
  });
  el.addEventListener('mouseleave', function() {
    cursorDot.classList.remove('hovered');
    cursorRing.classList.remove('hovered');
  });
});

const typedEl  = document.getElementById('typed');
const words    = ['Frontend Developer', 'UI/UX Designer', 'Creative Blogger', 'Problem Solver'];
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function type() {
  const current = words[wordIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 60 : 110;
  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex  = (wordIndex + 1) % words.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
setTimeout(type, 1000);

const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(function(sec) {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  }

  const total    = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  const bar      = document.getElementById('scrollProgressBar');
  if (bar) bar.style.width = progress + '%';
});

const progressBar = document.createElement('div');
progressBar.id = 'scrollProgressBar';
progressBar.className = 'scroll-progress-bar';
document.body.appendChild(progressBar);

const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

navToggle.addEventListener('click', function() {
  mobileMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

mobLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

document.addEventListener('click', function(e) {
  if (!navbar.contains(e.target)) {
    mobileMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

const revealSelectors = [
  '.sec-heading', '.about-left', '.about-right', '.skill-card',
  '.project-card', '.srv-card', '.srv-step', '.contact-info',
  '.contact-form-wrap', '.footer-brand', '.footer-col',
  '.abt-stat', '.contact-item', '.srv-stat'
];

setTimeout(function() {
  revealSelectors.forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(el, i) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(28px)';
      el.style.transition = 'opacity 0.65s ease ' + (i * 0.08) + 's, transform 0.65s ease ' + (i * 0.08) + 's';
    });
  });

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealSelectors.forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      revealObserver.observe(el);
    });
  });
}, 800);

const barTargets = {
  '.skill-bar--red':    '98%',
  '.skill-bar--blue':   '95%',
  '.skill-bar--orange': '46%'
};

const barObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const bar    = entry.target;
      const target = bar.dataset.width;
      bar.style.width      = '0';
      bar.style.transition = 'none';
      setTimeout(function() {
        bar.style.transition = 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        bar.style.width = target;
      }, 200);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

Object.keys(barTargets).forEach(function(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.dataset.width = barTargets[selector];
    barObserver.observe(el);
  }
});

function animateCounter(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(1800 / target);
  const timer = setInterval(function() {
    count++;
    el.textContent = count + suffix;
    if (count >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, step);
}

const statObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const raw = el.textContent.trim();
      if (raw.endsWith('+')) animateCounter(el, parseInt(raw), '+');
      else if (raw.endsWith('%')) animateCounter(el, parseInt(raw), '%');
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.abt-stat-num, .srv-stat-num').forEach(function(el) {
  statObserver.observe(el);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn      = this.querySelector('.form-submit-btn');
    const original = btn.innerHTML;
    btn.innerHTML  = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    btn.disabled   = true;
    btn.style.opacity = '0.8';
    setTimeout(function() {
      btn.innerHTML          = '<i class="bx bx-check"></i> Message Sent!';
      btn.style.background   = '#00c853';
      btn.style.opacity      = '1';
      setTimeout(function() {
        btn.innerHTML        = original;
        btn.disabled         = false;
        btn.style.background = '';
        btn.style.opacity    = '';
        contactForm.reset();
      }, 3000);
    }, 1800);
  });
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const cx      = rect.width  / 2;
    const cy      = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) *  5;
    card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
  });
  card.addEventListener('mouseleave', function() {
    card.style.transition = 'transform 0.5s ease';
    card.style.transform  = '';
  });
  card.addEventListener('mouseenter', function() {
    card.style.transition = 'transform 0.1s ease';
  });
});

document.querySelectorAll('.srv-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    card.style.backgroundImage = 'radial-gradient(circle 160px at ' + x + 'px ' + y + 'px, rgba(255,0,0,0.06), transparent 80%)';
  });
  card.addEventListener('mouseleave', function() {
    card.style.backgroundImage = '';
  });
});
