/* Kausalya static — interactivity */
const WHATSAPP = "919844854287";
const NAV_IDS = ["home","about","amenities","layout","gallery","contact"];

document.addEventListener("DOMContentLoaded", () => {
  // Lucide icons
  if (window.lucide) window.lucide.createIcons();

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const header = document.getElementById("header");
  const progress = document.getElementById("progress-bar");
  const navBtns = document.querySelectorAll("[data-nav]");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuBtn = document.getElementById("menu-btn");

  // Smooth scroll for nav
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-scroll");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior:"smooth", block:"start" });
        mobileMenu.classList.remove("open");
      }
    });
  });

  // Menu toggle
  menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const opened = mobileMenu.classList.contains("open");
    menuBtn.innerHTML = `<i data-lucide="${opened ? "x" : "menu"}" class="svg-icon" style="width:24px;height:24px"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });

  // Scroll: progress + shadow + active
  const onScroll = () => {
    const yy = window.scrollY;
    header.classList.toggle("scrolled", yy > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? Math.min(100, (yy/h)*100) : 0;
    if (progress) progress.style.width = pct + "%";
    let current = "home";
    for (const id of NAV_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    }
    navBtns.forEach(b => {
      b.classList.toggle("is-active", b.getAttribute("data-nav") === current);
    });
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));

  // Contact form → WhatsApp
  const form = document.getElementById("enq-form");
  const sent = document.getElementById("sent-note");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const text = `New Enquiry — Aarha Kausalya%0A%0AName: ${encodeURIComponent(f.get("name")||"")}%0APhone: ${encodeURIComponent(f.get("phone")||"")}%0AEmail: ${encodeURIComponent(f.get("email")||"")}%0AMessage: ${encodeURIComponent(f.get("message")||"")}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    if (sent) { sent.style.display = "block"; setTimeout(() => sent.style.display = "none", 4000); }
  });

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  document.querySelectorAll("[data-lightbox]").forEach(el => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-lightbox");
      lbImg.src = src;
      lb.classList.add("open");
    });
  });
  lb?.addEventListener("click", () => { lb.classList.remove("open"); });
});
