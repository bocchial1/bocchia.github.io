/* =========================================================
   Alex & Sky — 5th Anniversary  ♥  interactions
   ========================================================= */

/* ---------------------------------------------------------
   NOTIFY CONFIG  —  how Alex gets pinged on a change request
   ---------------------------------------------------------
   Pick ONE (or leave defaults to use the email fallback):

   1) Web3Forms (recommended — sends straight to your inbox,
      no email app needed, free, no backend):
        • Go to https://web3forms.com, enter your email, get an
          Access Key, and paste it below as web3formsKey.

   2) Formspree (also free):
        • Create a form at https://formspree.io and paste its id
          (the part after /f/) below as formspreeId.

   3) Email fallback (works with zero setup):
        • Set notifyEmail to your address. Clicking "Send" opens
          the visitor's email app with the message pre-filled.
--------------------------------------------------------- */
const NOTIFY_CONFIG = {
  web3formsKey: "",                 // e.g. "abcd1234-..." (preferred)
  formspreeId: "",                  // e.g. "xyzabcd"
  notifyEmail: "alex@example.com",  // <-- change to your real email for the fallback
};

/* ---------------------------------------------------------
   PHOTOS  —  the carousel of you two 💕
   ---------------------------------------------------------
   ✨ EASIEST WAY: just drop image files into the /photos folder
   and commit them — they'll appear here automatically. No code
   editing needed! (The page reads the folder via the GitHub API.)

   The carousel loads photos in this order of preference:
     1. Whatever images live in the /photos folder of your repo
        (auto-detected on the live GitHub Pages site).
     2. A photos/manifest.json list (optional — see README).
     3. The PHOTOS fallback list below.

   Files whose names start with "_" (like the placeholders) are
   treated as placeholders and hidden once you add real photos.

   Note: Google Photos no longer offers a simple, reliable way to
   embed a shared album on a static site, so we read your own
   /photos folder instead. See the README for details.
--------------------------------------------------------- */
const GALLERY_CONFIG = {
  folder: "photos",
  // Auto-detected from the github.io URL; these are used as a fallback:
  user: "bocchial1",
  repo: "bocchia.github.io",
  branch: "", // blank = repo default branch
};

/* These are pretty CSS-only sample slides shown until you add real
   photos to the /photos folder. (No image files needed.) */
const PHOTOS = [
  { placeholder: true, emoji: "💙", title: "Drop photos in /photos", bg: "linear-gradient(135deg,#bfe2ff,#3aa0ff)", caption: "Add your pictures to the /photos folder 💙" },
  { placeholder: true, emoji: "💗", title: "They appear automatically", bg: "linear-gradient(135deg,#ffd6ef,#ff77c2)", caption: "…then they show up here, no code needed 💗" },
  { placeholder: true, emoji: "🥂", title: "Happy 5 Years!", bg: "linear-gradient(135deg,#bfe2ff,#d9c2ff,#ff77c2)", caption: "Twiggy says hi 🐾" },
];

const agenda = {
  event_name: "Alex and Sky's 5th Anniversary Date",
  itinerary: [
    { start_time: "15:00", end_time: "16:00", activity: "Drop off dog", location: "Sky's Mom's House", notes: "Sky drops Twiggy off before meeting Alex.", icon: "🐶", theme: "pink" },
    { start_time: "16:00", end_time: "16:30", activity: "Apartment Tour", location: "Prospective Apartment Complex", notes: "Alex and Sky meet up to tour their potential next apartment.", icon: "🏠", theme: "blue" },
    { start_time: "16:30", end_time: "17:00", activity: "Dog Walk & Neighborhood Exploration", location: "New Neighborhood / Sky's Mom's House", notes: "Pick up Twiggy, walk the prospective neighborhood, drop Twiggy back off.", icon: "🐾", theme: "pink" },
    { start_time: "17:00", end_time: "17:15", activity: "Transit", location: "Transit to Downtown Royal Oak", notes: "Drive and find parking near 4th Street.", icon: "🚗", theme: "blue" },
    { start_time: "17:15", end_time: "18:15", activity: "Wheel Throwing Pottery Class", location: "Creative Arts Studio, Royal Oak", notes: "Hands-on anniversary activity. Casual clothing recommended for clay.", icon: "🏺", theme: "pink" },
    { start_time: "18:15", end_time: "18:30", activity: "Transition & Wash Up", location: "Downtown Royal Oak", notes: "Clean up post-pottery and walk 2 minutes to the restaurant.", icon: "🧼", theme: "blue" },
    { start_time: "18:30", end_time: "20:00", activity: "Anniversary Dinner", location: "Trattoria Da Luigi, Royal Oak", notes: "Reservation confirmed for 6:30 PM. Romantic Italian dining.", icon: "🍝", theme: "gold" },
    { start_time: "20:00", end_time: "20:30", activity: "Dessert", location: "Astoria Pastry Shop, Royal Oak", notes: "Walk over from dinner to grab ice cream.", icon: "🍨", theme: "pink" },
    { start_time: "20:30", end_time: null, activity: "Quiet Lounge Nightcap", location: "Downtown Royal Oak Lounge", notes: "Relaxing drinks/mocktails in an intimate setting to conclude the anniversary.", icon: "🍸", theme: "blue" },
  ],
};

/* ---- format 24h "HH:MM" into pretty 12h ---- */
function pretty(time) {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/* ---- build the timeline ---- */
function renderTimeline() {
  const list = document.getElementById("timeline");
  if (!list) return;
  const html = agenda.itinerary.map((item, i) => {
    const start = pretty(item.start_time);
    const end = pretty(item.end_time);
    const timeText = end ? `${start} – ${end}` : `${start} onward ♾`;
    return `
      <li class="event event--${item.theme}" style="animation-delay:${i * 0.07}s">
        <span class="event__dot" aria-hidden="true">${item.icon}</span>
        <div class="event__card">
          <span class="event__time">${timeText}</span>
          <h4 class="event__activity">${item.activity}</h4>
          <p class="event__location">${item.location}</p>
          <p class="event__notes">${item.notes}</p>
        </div>
      </li>`;
  }).join("");
  list.innerHTML = html;
}

/* ---- live clocks ---- */
function tick() {
  const now = new Date();
  const hh = now.getHours();
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const period = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;

  const timeNow = document.getElementById("timeNow");
  if (timeNow) timeNow.textContent = `${h12}:${mm}:${ss} ${period}`;

  const tray = document.getElementById("trayClock");
  if (tray) tray.textContent = `${h12}:${mm} ${period}`;
}

/* ---- floating hearts ---- */
function spawnHearts() {
  const field = document.querySelector(".floaties");
  if (!field) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const symbols = ["💙", "💗", "💖", "✨", "★", "🐾", "🫧"];
  const make = () => {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    h.style.left = Math.random() * 100 + "vw";
    const dur = 8 + Math.random() * 9;
    h.style.animationDuration = dur + "s";
    h.style.fontSize = 14 + Math.random() * 22 + "px";
    field.appendChild(h);
    setTimeout(() => h.remove(), dur * 1000);
  };
  for (let i = 0; i < 8; i++) setTimeout(make, i * 400);
  setInterval(make, 1300);
}

/* ---- start menu toggle ---- */
function wireStartMenu() {
  const btn = document.getElementById("startBtn");
  const menu = document.getElementById("startMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
  });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target)) menu.hidden = true;
  });
}

/* ---- playful window buttons ---- */
function wireWindowButtons() {
  const status = document.getElementById("statusText");
  const say = (msg) => { if (status) { status.textContent = msg; setTimeout(() => status.textContent = "Ready ♥", 2200); } };
  const map = {
    ".winbtn--min": "You can't minimize true love 💕",
    ".winbtn--max": "Already maxed out on love! 💯",
    ".winbtn--close": "Nice try — this love never closes 🔒💖",
  };
  Object.entries(map).forEach(([sel, msg]) => {
    const el = document.querySelector(sel);
    if (el) el.addEventListener("click", () => say(msg));
  });
}

/* ---- photo gallery loading (drop-and-go) ---- */
const IMG_RE = /\.(jpe?g|png|gif|webp|avif|bmp|svg)$/i;

function captionFromName(path) {
  let name = String(path).split("/").pop() || "";
  name = name.replace(IMG_RE, "");          // drop extension
  name = name.replace(/^_+/, "");            // drop leading underscores
  name = name.replace(/^\d+[\s._-]+/, "");   // drop ordering prefix like "01-"
  name = name.replace(/[._-]+/g, " ").trim();
  if (!name) return "Alex & Sky 💖";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function detectRepo() {
  const host = location.hostname; // e.g. "bocchial1.github.io"
  let user = "", repo = "";
  if (host.endsWith("github.io")) {
    user = host.split(".")[0];
    const seg = location.pathname.split("/").filter(Boolean)[0];
    repo = seg && !/\.(html?)$/i.test(seg) ? seg : `${user}.github.io`;
  }
  // fall back to configured values when not on github.io (e.g. local dev)
  if (!user) user = GALLERY_CONFIG.user;
  if (!repo) repo = GALLERY_CONFIG.repo;
  return { user, repo };
}

async function fetchGithubPhotos() {
  try {
    const { user, repo } = detectRepo();
    if (!user || !repo) return null;
    let url = `https://api.github.com/repos/${user}/${repo}/contents/${GALLERY_CONFIG.folder}`;
    if (GALLERY_CONFIG.branch) url += `?ref=${encodeURIComponent(GALLERY_CONFIG.branch)}`;
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return null;
    const items = await res.json();
    if (!Array.isArray(items)) return null;
    const imgs = items
      .filter((it) => it.type === "file" && IMG_RE.test(it.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    const real = imgs.filter((it) => !it.name.startsWith("_"));
    const chosen = real.length ? real : imgs;
    if (!chosen.length) return null;
    return chosen.map((it) => ({
      src: it.download_url || `${GALLERY_CONFIG.folder}/${encodeURIComponent(it.name)}`,
      caption: captionFromName(it.name),
    }));
  } catch (e) {
    return null;
  }
}

async function fetchManifest() {
  try {
    const res = await fetch(`${GALLERY_CONFIG.folder}/manifest.json`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const arr = Array.isArray(data) ? data : data && data.photos;
    if (!Array.isArray(arr) || !arr.length) return null;
    return arr.map((p) =>
      typeof p === "string"
        ? { src: p.includes("/") || /^https?:/.test(p) ? p : `${GALLERY_CONFIG.folder}/${p}`, caption: captionFromName(p) }
        : { src: p.src, caption: p.caption || captionFromName(p.src) }
    ).filter((p) => p.src);
  } catch (e) {
    return null;
  }
}

function baseName(s) {
  return String(s).split("?")[0].split("/").pop().toLowerCase();
}

/* Merge manifest (custom captions/order) with the auto folder listing.
   - Manifest entries come first, in the order listed.
   - A manifest entry matching a folder file overrides that file's caption.
   - Any folder images not mentioned in the manifest still appear after. */
function mergePhotos(folder, manifest) {
  const byName = new Map(folder.map((f) => [baseName(f.src), f]));
  const used = new Set();
  const out = [];
  manifest.forEach((m) => {
    const isUrl = /^https?:/i.test(m.src);
    const bn = baseName(m.src);
    if (!isUrl && byName.has(bn)) {
      out.push({ src: byName.get(bn).src, caption: m.caption || byName.get(bn).caption });
      used.add(bn);
    } else {
      out.push({ src: m.src, caption: m.caption || captionFromName(m.src) });
      if (!isUrl) used.add(bn);
    }
  });
  folder.forEach((f) => {
    if (!used.has(baseName(f.src))) out.push(f);
  });
  return out;
}

async function resolvePhotos() {
  const [fromGithub, fromManifest] = await Promise.all([fetchGithubPhotos(), fetchManifest()]);
  if (fromGithub && fromGithub.length) {
    return fromManifest && fromManifest.length ? mergePhotos(fromGithub, fromManifest) : fromGithub;
  }
  if (fromManifest && fromManifest.length) return fromManifest;
  return Array.isArray(PHOTOS) ? PHOTOS.filter((p) => p && (p.src || p.placeholder)) : [];
}

async function initCarousel() {
  const photos = await resolvePhotos();
  renderCarousel(photos);
}

/* ---- photo carousel render ---- */
function renderCarousel(photos) {
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  const caption = document.getElementById("carouselCaption");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  if (!track) return;

  if (!Array.isArray(photos) || photos.length === 0) {
    track.innerHTML = `<div class="carousel__empty">
      <div class="carousel__ph-emoji">📷</div>
      <b>No photos yet</b>
      <small>Drop some images in the /photos folder</small></div>`;
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    return;
  }

  // build slides (DOM nodes so we can attach robust error handling)
  track.innerHTML = "";
  photos.forEach((p, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel__slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${photos.length}`);

    if (p.placeholder) {
      const ph = document.createElement("div");
      ph.className = "carousel__empty";
      ph.style.background = p.bg || "linear-gradient(135deg,#bfe2ff,#ff77c2)";
      ph.innerHTML = `<div class="carousel__ph-emoji">${p.emoji || "💖"}</div>
        <b>${p.title || "Alex & Sky"}</b>`;
      slide.appendChild(ph);
    } else {
      const img = document.createElement("img");
      img.className = "carousel__img";
      img.src = p.src;
      img.alt = p.caption || "Photo of Alex and Sky";
      img.loading = i === 0 ? "eager" : "lazy";
      img.addEventListener("error", () => {
        img.remove();
        const fail = document.createElement("div");
        fail.className = "carousel__empty";
        fail.style.background = "linear-gradient(135deg,#ffe0ef,#cfe6ff)";
        fail.innerHTML = `<div class="carousel__ph-emoji">🖼️</div><b>Photo couldn't load</b><small>${p.src}</small>`;
        slide.appendChild(fail);
      });
      slide.appendChild(img);
    }
    track.appendChild(slide);
  });

  // dots
  if (dotsWrap) {
    dotsWrap.innerHTML = photos
      .map((_, i) => `<button class="carousel__dot" type="button" role="tab" aria-label="Go to photo ${i + 1}"></button>`)
      .join("");
  }
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  let index = 0;
  const total = photos.length;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (caption) caption.textContent = photos[index].caption || "";
    dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === index);
      d.setAttribute("aria-selected", i === index ? "true" : "false");
    });
  };
  const go = (i) => { index = (i + total) % total; update(); };
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { go(i); restart(); }));

  // hide single-photo controls
  if (total <= 1) {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    if (dotsWrap) dotsWrap.style.display = "none";
  }

  // autoplay (respects reduced motion)
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;
  const start = () => { if (!reduce && total > 1) timer = setInterval(next, 4500); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  const restart = () => { stop(); start(); };

  const frame = document.querySelector(".carousel__frame");
  if (frame) {
    frame.addEventListener("mouseenter", stop);
    frame.addEventListener("mouseleave", start);

    // touch swipe for mobile
    let startX = 0, dx = 0, swiping = false;
    frame.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; dx = 0; swiping = true; stop(); }, { passive: true });
    frame.addEventListener("touchmove", (e) => { if (swiping) dx = e.touches[0].clientX - startX; }, { passive: true });
    frame.addEventListener("touchend", () => {
      if (swiping && Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      swiping = false; start();
    });
  }

  update();
  start();
}

/* ---- request-a-change modal ---- */
function populateActivityOptions() {
  const sel = document.getElementById("activitySelect");
  if (!sel) return;
  agenda.itinerary.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = `${pretty(item.start_time)} — ${item.activity}`;
    opt.textContent = `${item.icon} ${pretty(item.start_time)} ${item.activity}`;
    sel.appendChild(opt);
  });
}

function openModal() {
  const modal = document.getElementById("requestModal");
  if (!modal) return;
  modal.hidden = false;
  const msg = document.getElementById("requestMessage");
  if (msg) setTimeout(() => msg.focus(), 60);
}
function closeModal() {
  const modal = document.getElementById("requestModal");
  if (modal) modal.hidden = true;
}

async function submitRequest(e) {
  e.preventDefault();
  const statusEl = document.getElementById("requestStatus");
  const sendBtn = document.querySelector(".btn--send");
  const requester = document.getElementById("requester").value;
  const activity = document.getElementById("activitySelect").value;
  const message = document.getElementById("requestMessage").value.trim();

  if (!message) return;

  const subject = `💌 ${requester} requested a change to your anniversary date!`;
  const bodyLines = [
    `${requester} would like to change something about the 5th Anniversary Date.`,
    activity ? `Part of the day: ${activity}` : `Part of the day: (general)`,
    "",
    `Their request:`,
    message,
    "",
    `Sent from your anniversary agenda page ♥`,
  ];
  const body = bodyLines.join("\n");

  const setStatus = (text, kind) => {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.className = "modal__status" + (kind ? " is-" + kind : "");
  };

  // 1) Web3Forms
  if (NOTIFY_CONFIG.web3formsKey) {
    try {
      if (sendBtn) sendBtn.disabled = true;
      setStatus("Sending your request… 💌", "");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: NOTIFY_CONFIG.web3formsKey,
          subject,
          from_name: `${requester} (Anniversary page)`,
          requester,
          part_of_day: activity || "general",
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Sent! Alex will get your request 💙", "ok");
        e.target.reset();
        setTimeout(closeModal, 1800);
      } else {
        throw new Error(data.message || "Web3Forms error");
      }
    } catch (err) {
      setStatus("Couldn't send automatically — opening email instead…", "err");
      setTimeout(() => mailtoFallback(subject, body), 700);
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
    return;
  }

  // 2) Formspree
  if (NOTIFY_CONFIG.formspreeId) {
    try {
      if (sendBtn) sendBtn.disabled = true;
      setStatus("Sending your request… 💌", "");
      const res = await fetch(`https://formspree.io/f/${NOTIFY_CONFIG.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: subject, requester, part_of_day: activity || "general", message }),
      });
      if (res.ok) {
        setStatus("Sent! Alex will get your request 💙", "ok");
        e.target.reset();
        setTimeout(closeModal, 1800);
      } else {
        throw new Error("Formspree error");
      }
    } catch (err) {
      setStatus("Couldn't send automatically — opening email instead…", "err");
      setTimeout(() => mailtoFallback(subject, body), 700);
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
    return;
  }

  // 3) mailto fallback
  mailtoFallback(subject, body);
  setStatus("Opening your email app to send it to Alex ✉️", "ok");
}

function mailtoFallback(subject, body) {
  const to = NOTIFY_CONFIG.notifyEmail || "";
  const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

function wireRequestModal() {
  populateActivityOptions();
  document.querySelectorAll("[data-open-request]").forEach((el) =>
    el.addEventListener("click", openModal)
  );
  document.querySelectorAll("[data-close-request]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );
  const overlay = document.getElementById("requestModal");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  const form = document.getElementById("requestForm");
  if (form) form.addEventListener("submit", submitRequest);

  // open automatically via #request link (e.g. share a direct link)
  if (location.hash.toLowerCase() === "#request") openModal();
}

/* ---- go ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  tick();
  setInterval(tick, 1000);
  spawnHearts();
  wireStartMenu();
  wireWindowButtons();
  wireRequestModal();
  initCarousel();
});
