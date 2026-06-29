/* =========================================================
   Alex & Sky — 5th Anniversary  ♥  interactions
   ========================================================= */

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

/* ---- go ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderTimeline();
  tick();
  setInterval(tick, 1000);
  spawnHearts();
  wireStartMenu();
  wireWindowButtons();
});
