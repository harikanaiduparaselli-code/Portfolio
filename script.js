/* ==========================================================
   Harika Naidu Paraselli — Portfolio
   Edit CONFIG below to wire up your real details.
   ========================================================== */

const CONFIG = {
  // Where the contact form opens a pre-filled email to. Leave empty until you add yours.
  email: "",
  // Resume file path (put your PDF in /assets with this exact name, or change it here).
  resumePath: "assets/Harika_Naidu_Paraselli_Resume.pdf",
};

document.documentElement.classList.add("js");

(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Icons (Lucide) ---------- */
  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }
  window.addEventListener("load", initIcons);
  document.addEventListener("DOMContentLoaded", initIcons);

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
  }

  document.addEventListener("DOMContentLoaded", () => {
    /* ---------- Header: shadow + scroll progress ---------- */
    const header = $(".site-header");
    const progress = $(".scroll-progress");
    let ticking = false;
    function onScroll() {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    /* ---------- Mobile navigation ---------- */
    const toggle = $(".nav-toggle");
    const menu = $("#nav-menu");
    function setMenu(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open") && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

    /* ---------- Active nav link on scroll ---------- */
    const links = $$(".nav-link");
    const targets = links
      .map((l) => $(l.getAttribute("href")))
      .filter(Boolean);
    // "extras" has no nav link of its own; it belongs with Beyond.
    const idToLink = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
    idToLink.set("extras", idToLink.get("beyond"));
    const spyTargets = [...targets, $("#extras")].filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => { l.classList.remove("active"); l.removeAttribute("aria-current"); });
          const link = idToLink.get(entry.target.id);
          if (link) { link.classList.add("active"); link.setAttribute("aria-current", "true"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spyTargets.forEach((t) => spy.observe(t));
    // Clear the highlight when back at the hero
    const hero = $("#hero");
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) links.forEach((l) => { l.classList.remove("active"); l.removeAttribute("aria-current"); });
    }, { rootMargin: "-40% 0px -40% 0px" }).observe(hero);

    /* ---------- Scroll reveal (with light stagger inside grids) ---------- */
    const groups = [".skill-groups", ".approach-grid", ".project-grid", ".extras-list", ".beyond-grid"];
    groups.forEach((sel) => {
      const parent = $(sel);
      if (parent) $$(".reveal", parent).forEach((el, i) => el.style.setProperty("--d", `${i * 0.08}s`));
    });
    $$(".hero .reveal").forEach((el, i) => el.style.setProperty("--d", `${i * 0.09}s`));

    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("in"); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      $$(".reveal").forEach((el) => io.observe(el));
    } else {
      $$(".reveal").forEach((el) => el.classList.add("in"));
    }

    /* ---------- Profile image fallback ---------- */
    const img = $(".portrait img");
    const fallback = $(".portrait-fallback");
    if (img) {
      const hide = () => { img.style.display = "none"; fallback.style.display = "flex"; };
      const show = () => { fallback.style.display = "none"; };
      img.addEventListener("error", hide);
      img.addEventListener("load", () => { if (img.naturalWidth > 0) show(); });
      if (img.complete) { img.naturalWidth > 0 ? show() : hide(); }
    }

    /* ---------- Skill card spotlight ---------- */
    if (!reduceMotion) {
      $$(".skill-card").forEach((card) => {
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      });
    }

    /* ---------- Resume button ---------- */
    const resumeBtn = $("#resume-btn");
    if (resumeBtn) {
      resumeBtn.setAttribute("href", CONFIG.resumePath);
      resumeBtn.addEventListener("click", async (e) => {
        if (location.protocol === "file:") return; // let the browser handle local files
        e.preventDefault();
        try {
          const res = await fetch(CONFIG.resumePath, { method: "HEAD" });
          if (!res.ok) throw new Error("missing");
          const a = document.createElement("a");
          a.href = CONFIG.resumePath;
          a.download = "";
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch {
          showToast("Resume not added yet. Place your PDF in the assets folder (see README).");
        }
      });
    }

    /* ---------- Placeholder project links ---------- */
    $$("[data-placeholder-link]").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (a.getAttribute("href") === "#") {
          e.preventDefault();
          showToast("Placeholder link. Add your real URL in index.html when the project is ready.");
        }
      });
    });

    /* ---------- Contact email link from CONFIG ---------- */
    if (CONFIG.email) {
      const mail = $("#contact-email");
      if (mail) {
        mail.href = `mailto:${CONFIG.email}`;
        $("span", mail).textContent = CONFIG.email;
      }
    }

    /* ---------- Contact form ---------- */
    const form = $("#contact-form");
    const status = $("#form-status");
    const rules = {
      name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
      message: (v) => (v.trim().length >= 10 ? "" : "Please write a message of at least 10 characters."),
    };
    function validateField(input) {
      const msg = rules[input.name](input.value);
      const field = input.closest(".field");
      field.classList.toggle("invalid", Boolean(msg));
      $(".error", field).textContent = msg;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    }
    $$("input, textarea", form).forEach((el) => {
      el.addEventListener("blur", () => validateField(el));
      el.addEventListener("input", () => { if (el.closest(".field").classList.contains("invalid")) validateField(el); });
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.className = "form-status";
      const fields = $$("input, textarea", form);
      const results = fields.map(validateField);
      if (results.includes(false)) {
        fields[results.indexOf(false)].focus();
        status.textContent = "Please fix the highlighted fields.";
        status.classList.add("warn");
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      if (!CONFIG.email) {
        status.textContent = "Form validated. To receive messages, add your email in script.js (CONFIG.email).";
        status.classList.add("warn");
        return;
      }
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email app to send the message…";
      status.classList.add("ok");
      form.reset();
    });
  });
})();
