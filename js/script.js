// ------------------------------------------------------------
// Mobile nav toggle
// ------------------------------------------------------------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ------------------------------------------------------------
// Active nav link on scroll
// ------------------------------------------------------------
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((s) => navObserver.observe(s));

// ------------------------------------------------------------
// Reveal-on-scroll for anything with .reveal
// ------------------------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ------------------------------------------------------------
// Typing effect in the hero role line
// ------------------------------------------------------------
const roles = [
  "Electronics & Communication Engineering Student",
  "Exploring AI & Machine Learning",
  "Building with Embedded Systems",
  "Bridging Hardware & Software",
];

const typedEl = document.getElementById("typedRole");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typedEl && !prefersReducedMotion) {
  let roleIndex = 0;
  let charIndex = roles[0].length; // first role is already shown in the HTML
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, 1400); // pause at full word
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }

    typedEl.textContent = roles[roleIndex === 0 && !deleting && charIndex === current.length ? 0 : roleIndex].slice(
      0,
      Math.max(charIndex, 0)
    );

    setTimeout(tick, deleting ? 40 : 70);
  }

  setTimeout(tick, 1800); // wait before the first delete/retype cycle
}

// ------------------------------------------------------------
// Animated skill bars (fill in when scrolled into view)
// ------------------------------------------------------------
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const level = bar.getAttribute("data-level") || "0";
      const fill = bar.querySelector(".bar-fill");
      requestAnimationFrame(() => {
        fill.style.width = `${level}%`;
      });
      obs.unobserve(bar);
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// ------------------------------------------------------------
// Animated counters
// ------------------------------------------------------------
const counters = document.querySelectorAll(".stat-num");

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      const duration = 1200;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((c) => counterObserver.observe(c));

// ------------------------------------------------------------
// Subtle parallax on the background blobs (mouse-driven, desktop only)
// ------------------------------------------------------------
if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const blobs = document.querySelectorAll(".blob");
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    blobs.forEach((blob, i) => {
      const depth = (i + 1) * 0.6;
      blob.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
}

// ------------------------------------------------------------
// Back-to-top button
// ------------------------------------------------------------
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  toTop.classList.toggle("visible", window.scrollY > 500);
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

// ------------------------------------------------------------
// Contact form
// This is a static site, so there's no server to send mail. Swap this
// handler for a real endpoint (Formspree, EmailJS, or your own API)
// when you're ready -- the form fields already match a typical POST body.
// ------------------------------------------------------------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "Thanks! This form isn't wired to a server yet — connect it to Formspree, EmailJS, or your own API to receive messages.";
  formStatus.style.color = "var(--accent)";
});
