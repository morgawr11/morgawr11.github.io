const KEY = "aw220-training-board-v1";
const TONES = {
  blue: ["#dbeafe", "#1d4ed8"],
  green: ["#d1fae5", "#157347"],
  violet: ["#ede9fe", "#5b4b8a"],
  amber: ["#ffedd5", "#c2410c"],
  teal: ["#ccfbf1", "#0f766e"],
  slate: ["#eef3f8", "#64748b"],
};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const WEEK = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const HOURS = [8,9,10,11,12,14,16,18];
const KIND = { sortie: "info", ground: "violet", mx: "amber", sim: "teal" };

const SEED = {
  kpis: [
    { key: "crews", label: "Mission-ready crews", value: "13", hint: "of 16 required" },
    { key: "trainees", label: "Active trainees", value: "24", hint: "pilot · MX · enlisted" },
    { key: "trainers", label: "Instructors on book", value: "5", hint: "1 over capacity" },
    { key: "events", label: "Events today", value: "7", hint: "sorties, sim, ground" },
  ],
  trainees: [
    { id:"A-001", name:"Reyes, M.", rank:"Maj", category:"Pilot", unit:"220 AS", position:"AC", program:"Aircraft Commander Upgrade", status:"On Track", progress:72, hoursLogged:58, hoursRequired:80, nextEvent:"AC check profile", location:"Home Station", initials:"MR", tone:"blue" },
    { id:"A-002", name:"Nguyen, T.", rank:"Capt", category:"Pilot", unit:"220 AS", position:"CP", program:"Aircraft Commander Upgrade", status:"Behind", progress:41, hoursLogged:33, hoursRequired:80, nextEvent:"Formation block", location:"Home Station", initials:"TN", tone:"green" },
    { id:"A-003", name:"Okoye, C.", rank:"Capt", category:"Pilot", unit:"221 AS", position:"AC", program:"Mission Pilot Initial", status:"On Track", progress:64, hoursLogged:51, hoursRequired:80, nextEvent:"NVG 2", location:"Home Station", initials:"CO", tone:"violet" },
    { id:"A-004", name:"Bennett, S.", rank:"1Lt", category:"Pilot", unit:"221 AS", position:"CP", program:"Mission Pilot Initial", status:"Behind", progress:28, hoursLogged:22.4, hoursRequired:80, nextEvent:"Sim profile 4", location:"FST Abroad", initials:"SB", tone:"amber" },
    { id:"A-012", name:"Chen, W.", rank:"SrA", category:"MX", unit:"220 AMXS", position:"2A5X1", program:"5-level Upgrade", status:"Behind", progress:31, hoursLogged:0, hoursRequired:0, nextEvent:"CDC unit 2 retest", location:"Home Station", initials:"WC", tone:"teal" },
    { id:"A-010", name:"Ibrahim, Y.", rank:"Capt", category:"Pilot", unit:"220 OSS", position:"AC", program:"Weapons / Tactics Qual", status:"Hold", progress:20, hoursLogged:8, hoursRequired:40, nextEvent:"Hold — medical", location:"Home Station", initials:"YI", tone:"slate" },
    { id:"A-005", name:"Kowalski, A.", rank:"Capt", category:"Pilot", unit:"220 AS", position:"AC", program:"Instructor Pilot Upgrade", status:"On Track", progress:81, hoursLogged:48.5, hoursRequired:60, nextEvent:"IP eval", location:"Home Station", initials:"AK", tone:"blue" },
    { id:"A-007", name:"Hughes, P.", rank:"MSgt", category:"Pilot", unit:"220 AS", position:"FE", program:"Flight Engineer Upgrade", status:"Behind", progress:36, hoursLogged:21, hoursRequired:58, nextEvent:"FE sim 3", location:"Home Station", initials:"PH", tone:"amber" },
    { id:"A-014", name:"Singh, N.", rank:"SrA", category:"MX", unit:"220 MXS", position:"2A6X4", program:"5-level Upgrade", status:"Behind", progress:22, hoursLogged:0, hoursRequired:0, nextEvent:"OJT task block C", location:"Home Station", initials:"NS", tone:"green" },
    { id:"A-018", name:"Quinn, H.", rank:"SrA", category:"Enlisted Support", unit:"220 FSS", position:"3F2X1", program:"5-level Education & Training", status:"Behind", progress:40, hoursLogged:0, hoursRequired:0, nextEvent:"CDC volume 2", location:"Home Station", initials:"HQ", tone:"violet" },
    { id:"A-022", name:"Klein, O.", rank:"Capt", category:"Pilot", unit:"221 AS", position:"CP", program:"Mission Pilot Initial", status:"On Track", progress:88, hoursLogged:70.5, hoursRequired:80, nextEvent:"Final check", location:"Exercise", initials:"OK", tone:"teal" },
    { id:"A-025", name:"Varga, S.", rank:"1Lt", category:"Pilot", unit:"220 AS", position:"CP", program:"Mission Pilot Initial", status:"On Track", progress:33, hoursLogged:26.5, hoursRequired:80, nextEvent:"Sim profile 3", location:"FST Abroad", initials:"SV", tone:"blue" },
  ],
  trainers: [
    { id:"t1", name:"Lt Col Park", role:"IP / AC upgrades", status:"Busy", until:"until 1400" },
    { id:"t2", name:"Maj Hale", role:"Mission pilot", status:"Available" },
    { id:"t3", name:"SMSgt Cole", role:"Flight engineer", status:"Available" },
    { id:"t4", name:"MSgt Ruiz", role:"Loadmaster", status:"Busy", until:"until 1100" },
    { id:"t5", name:"TSgt Grant", role:"MX trainer", status:"Unavailable" },
  ],
  resources: [
    { id:"a1", name:"C-130H  #001  (demo)", type:"Aircraft", status:"Available", detail:"100-hr in 18.0h" },
    { id:"a2", name:"C-130H  #002  (demo)", type:"Aircraft", status:"In Training", detail:"Phase in 42.0h" },
    { id:"a3", name:"C-130H  #003  (demo)", type:"Aircraft", status:"Exercise", detail:"Tasked to partner EX" },
    { id:"a4", name:"C-130H  #004  (demo)", type:"Aircraft", status:"Down", detail:"ISO / prop change" },
    { id:"s1", name:"FFS Level D  SIM-1", type:"Simulator", status:"Available", detail:"QTG 28 Sep" },
    { id:"s2", name:"FTD  SIM-2", type:"Simulator", status:"In Training", detail:"Maint 22 Sep" },
    { id:"s3", name:"Partner FFS  Site A", type:"Simulator", status:"FST", detail:"Block ends 30 Sep" },
  ],
  events: [
    { id:"e1", title:"Reyes, M.", sub:"AC sortie", day:0, startHour:10, kind:"sortie" },
    { id:"e2", title:"Nguyen, T.", sub:"Formation", day:0, startHour:14, kind:"sortie" },
    { id:"e3", title:"SIM-1", sub:"Bennett FST", day:0, startHour:8, kind:"sim" },
    { id:"e4", title:"Chen, W.", sub:"CDC retest", day:1, startHour:9, kind:"ground" },
    { id:"e5", title:"#002", sub:"Phase MX", day:1, startHour:11, kind:"mx" },
    { id:"e6", title:"Okoye, C.", sub:"NVG 2", day:2, startHour:10, kind:"sortie" },
    { id:"e7", title:"Ground school", sub:"AC academics", day:2, startHour:14, kind:"ground" },
    { id:"e8", title:"Hughes, P.", sub:"FE sim 3", day:3, startHour:8, kind:"sim" },
    { id:"e9", title:"Kowalski, A.", sub:"IP eval", day:3, startHour:12, kind:"sortie" },
    { id:"e10", title:"#004", sub:"ISO", day:3, startHour:16, kind:"mx" },
    { id:"e11", title:"Klein, O.", sub:"EASTERN BRIDGE", day:4, startHour:8, kind:"sortie" },
    { id:"e12", title:"SIM-2", sub:"FTD block", day:4, startHour:14, kind:"sim" },
    { id:"e13", title:"Quinn, H.", sub:"CDC vol 2", day:5, startHour:10, kind:"ground" },
  ],
  notices: [
    { id:"n1", title:"Currency expired", body:"Hughes, P. — flight physical overdue 15 days", ago:"this morning", kind:"alert" },
    { id:"n2", title:"Upcoming sortie", body:"Reyes, M. — AC check profile today 1000", ago:"10m ago", kind:"event" },
    { id:"n3", title:"Schedule change", body:"Bennett, S. sim delayed — weather at FST Site A", ago:"25m ago", kind:"change" },
    { id:"n4", title:"Aircraft down", body:"#004 (demo) — ISO / prop change in progress", ago:"1h ago", kind:"mx" },
  ],
  currencyRed: "20",
  fstHours: "105 / 240",
  findings: "7",
};

const NAV = [
  ["/", "Dashboard"],
  ["/airmen", "Airmen"],
  ["/trainers", "Instructors"],
  ["/fleet", "Fleet & sims"],
  ["/schedule", "Schedule"],
  ["/events", "Events"],
  ["/reports", "Reports"],
  ["/types", "Course vs seminar"],
  ["/update", "Update inputs"],
];

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...structuredClone(SEED), ...JSON.parse(raw) };
  } catch {}
  return structuredClone(SEED);
}
function save() { localStorage.setItem(KEY, JSON.stringify(board)); }
let board = load();

function mondayIndex(d) { const x = d.getDay(); return x === 0 ? 6 : x - 1; }
function liveWeek(now) {
  const copy = new Date(now); copy.setHours(0,0,0,0);
  const diff = copy.getDay() === 0 ? -6 : 1 - copy.getDay();
  copy.setDate(copy.getDate() + diff);
  return WEEK.map((label, i) => {
    const d = new Date(copy); d.setDate(copy.getDate() + i);
    const isToday = d.toDateString() === now.toDateString();
    return { label, date: String(d.getDate()), month: MONTHS[d.getMonth()], isToday, index: i };
  });
}
function weekLabel(now) {
  const days = liveWeek(now);
  const y = now.getFullYear();
  return days[0].month === days[6].month
    ? `${days[0].date} – ${days[6].date} ${days[6].month} ${y}`
    : `${days[0].date} ${days[0].month} – ${days[6].date} ${days[6].month} ${y}`;
}
function stamp(now) {
  return now.toLocaleString("en-GB", { weekday:"long", day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false });
}
function hourLabel(h) { if (h===12) return "12 PM"; if (h>12) return `${h-12} PM`; return `${h} AM`; }
function parseUntil(until) {
  if (!until) return null;
  const m = until.match(/(\d{3,4})/);
  return m ? Number(m[1].padStart(4,"0")) : null;
}
function chip(status) {
  const map = {
    "On Track":"ok", Complete:"info", Behind:"warn", Hold:"danger",
    Available:"ok", "In Training":"warn", Down:"danger", FST:"info", Exercise:"teal",
    Busy:"warn", Unavailable:"danger", "Home Station":"", "FST Abroad":"info",
  };
  return `<span class="chip ${map[status]||""}">${esc(status)}</span>`;
}
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, function (c) {
    if (c === "&") return "&" + "amp;";
    if (c === "<") return "&" + "lt;";
    if (c === ">") return "&" + "gt;";
    if (c === '"') return "&" + "quot;";
    return "&#39;";
  });
}
function avatar(t) {
  const [bg, fg] = TONES[t.tone] || TONES.slate;
  return `<span class="avatar" style="background:${bg};color:${fg}">${esc(t.initials)}</span>`;
}
function bar(t) {
  const [, fg] = TONES[t.tone] || TONES.slate;
  return `<div class="bar"><span style="width:${Math.min(100,t.progress)}%;background:${fg}"></span></div>`;
}
function route() {
  const h = (location.hash || "#/").replace(/^#/, "") || "/";
  return h.startsWith("/") ? h : "/" + h;
}

function renderNav() {
  const r = route();
  document.getElementById("nav").innerHTML = NAV.map(([to, label]) =>
    `<a href="#${to}" class="${r===to?"active":""}">${label}</a>`
  ).join("");
}

function liveTrainers(now) {
  const hm = now.getHours()*100 + now.getMinutes();
  return board.trainers.map(t => {
    const until = parseUntil(t.until);
    if (t.status === "Busy" && until != null && hm >= until) return { ...t, status:"Available", until: undefined };
    return t;
  });
}

function pageDashboard(now) {
  const days = liveWeek(now);
  const today = mondayIndex(now);
  const eventsToday = board.events.filter(e => e.day === today);
  const next = eventsToday.find(e => e.startHour >= now.getHours()) || board.events.find(e => e.day > today);
  const trainers = liveTrainers(now);
  const live = {
    trainees: String(board.trainees.length),
    trainers: String(board.trainers.length),
    events: String(eventsToday.length),
  };
  return `
    <div class="now">
      <div>
        <p class="kicker">Now on the board</p>
        <p>${next ? `Next: ${esc(next.title)} — ${esc(next.sub)} at ${next.startHour}:00` : "No remaining events on the live week"}</p>
      </div>
      <p class="muted">${eventsToday.length} event${eventsToday.length===1?"":"s"} today · week auto-advances</p>
    </div>
    <div class="grid kpis">
      ${board.kpis.map((k,i) => {
        const tones = ["info","ok","","amber"];
        const val = live[k.key] ?? k.value;
        const hint = k.key==="events" ? "counted from today’s calendar" : k.hint;
        return `<section class="card kpi"><span class="icon ${tones[i]}">${i+1}</span><div><p class="num">${esc(val)}</p><p>${esc(k.label)}</p><p class="muted">${esc(hint)}</p></div></section>`;
      }).join("")}
    </div>
    <div class="grid two" style="margin-top:20px">
      <section class="card">
        <div class="row" style="border:0;padding-top:0"><h2>Trainee progress</h2><a class="link" href="#/airmen">View all</a></div>
        ${board.trainees.slice(0,6).map(t => `
          <div class="row">
            <div style="display:flex;gap:12px;align-items:center;min-width:0;flex:1.4">
              ${avatar(t)}
              <div style="min-width:0"><strong>${esc(t.rank)} ${esc(t.name)}</strong><div class="muted">${esc(t.program)}</div></div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex:2">${bar(t)}<span style="width:40px;text-align:right">${t.progress}%</span></div>
            <span class="muted">${t.hoursRequired ? t.hoursLogged.toFixed(1) : "—"}</span>
          </div>`).join("")}
      </section>
      <div class="stack">
        <section class="card">
          <div class="row" style="border:0;padding-top:0"><h2>Instructor availability</h2><a class="link" href="#/trainers">View all</a></div>
          ${trainers.map(t => `<div class="row"><div style="display:flex;gap:8px;align-items:center"><span class="dot" style="background:${t.status==="Available"?"var(--ok)":t.status==="Busy"?"var(--warn)":"var(--danger)"}"></span><div><strong>${esc(t.name)}</strong><div class="muted">${esc(t.role)}</div></div></div><span class="muted">${esc(t.status==="Busy"?t.until:t.status)}</span></div>`).join("")}
        </section>
        <section class="card">
          <div class="row" style="border:0;padding-top:0"><h2>Aircraft and sims</h2><a class="link" href="#/fleet">View all</a></div>
          ${board.resources.slice(0,5).map(r => `<div class="row"><div><strong>${esc(r.name)}</strong><div class="muted">${esc(r.detail)}</div></div>${chip(r.status)}</div>`).join("")}
        </section>
      </div>
    </div>
    <div class="grid two" style="margin-top:20px">
      <section class="card cal">
        <div class="row" style="border:0;padding-top:0"><h2>Training week</h2><span class="chip info">Live week · ${esc(weekLabel(now))}</span></div>
        <div class="cal-grid">
          <div></div>
          ${days.map(d => `<div style="text-align:center;padding:8px" class="${d.isToday?"chip info":""}">${d.label}<div>${d.date} ${d.month}</div></div>`).join("")}
          ${HOURS.map(h => `
            <div class="muted" style="text-align:right;padding:8px 8px 0 0;font-size:12px">${hourLabel(h)}</div>
            ${days.map(d => {
              const cell = board.events.filter(e => e.day===d.index && e.startHour===h);
              const past = d.isToday && h < now.getHours();
              return `<div class="cell ${d.isToday?"today-col":""}" style="${past?"opacity:.5":""}">${cell.map(e => `<div class="ev ${KIND[e.kind]}"><strong>${esc(e.title)}</strong><div>${esc(e.sub)}</div></div>`).join("")}</div>`;
            }).join("")}
          `).join("")}
        </div>
        <p class="muted" style="margin-top:12px">Blue sortie · Violet ground · Amber maintenance · Teal sim / FST</p>
      </section>
      <section class="card">
        <h2>Notifications</h2>
        ${board.notices.map(n => `<div class="row"><div><strong>${esc(n.title)}</strong><div class="muted">${esc(n.body)}</div></div><span class="muted">${esc(n.ago)}</span></div>`).join("")}
      </section>
    </div>`;
}

function pageAirmen() {
  const f = window.__filter || "All";
  const rows = f==="All" ? board.trainees : board.trainees.filter(t => t.category===f);
  return `
    <div class="filters">
      ${["All","Pilot","MX","Enlisted Support"].map(x => `<button type="button" class="${f===x?"on":""}" data-filter="${x}">${x}</button>`).join("")}
    </div>
    <section class="card" style="padding:0">
      ${rows.map(t => `<div class="row" style="padding:16px"><div style="display:flex;gap:12px;flex:1.4">${avatar(t)}<div><strong>${esc(t.rank)} ${esc(t.name)}</strong><div class="muted">${esc(t.unit)} · ${esc(t.position)} · ${esc(t.program)}</div></div></div><div style="display:flex;gap:8px;align-items:center;flex:1">${bar(t)}<span>${t.progress}%</span></div>${chip(t.status)}<span class="muted">${esc(t.nextEvent)}</span></div>`).join("")}
    </section>`;
}

function pageTrainers(now) {
  return `<div class="grid kpis">${liveTrainers(now).map(t => `<section class="card"><h2>${esc(t.name)}</h2><p class="muted">${esc(t.role)}</p><div style="margin-top:12px">${chip(t.status)} ${t.until?`<span class="muted">${esc(t.until)}</span>`:""}</div></section>`).join("")}</div>`;
}

function pageFleet() {
  return `<div class="grid" style="grid-template-columns:1fr 1fr">${board.resources.map(r => `<section class="card"><strong>${esc(r.name)}</strong><p class="muted">${esc(r.detail)}</p><p class="muted">${esc(r.type)}</p>${chip(r.status)}</section>`).join("")}</div>`;
}

function pageSchedule(now) {
  const days = liveWeek(now);
  return `<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">${days.map(d => `
    <section class="card ${d.isToday?"today-col":""}">
      <strong>${d.label} ${d.date} ${d.month}${d.isToday?" · today":""}</strong>
      ${board.events.filter(e => e.day===d.index).map(e => `<div class="ev ${KIND[e.kind]}" style="margin-top:8px"><strong>${esc(e.title)}</strong><div>${e.startHour}:00 · ${esc(e.sub)}</div></div>`).join("") || `<p class="muted">No events scheduled</p>`}
    </section>`).join("")}</div>`;
}

function pageEvents(now) {
  const days = liveWeek(now);
  return `<section class="card" style="padding:0;overflow:auto"><table><thead><tr><th>When</th><th>Name</th><th>Activity</th><th>Type</th></tr></thead><tbody>
    ${board.events.map(e => `<tr><td>${days[e.day].label} ${days[e.day].date} ${days[e.day].month} ${e.startHour}:00</td><td><strong>${esc(e.title)}</strong></td><td class="muted">${esc(e.sub)}</td><td class="muted">${esc(e.kind)}</td></tr>`).join("")}
  </tbody></table></section>`;
}

function pageReports() {
  const on = board.trainees.filter(t => t.status==="On Track").length;
  const rate = board.trainees.length ? Math.round(on/board.trainees.length*100) : 0;
  const busy = board.trainers.filter(t => t.status==="Busy").length;
  const cards = [
    [board.kpis[0].label, board.kpis[0].value, board.kpis[0].hint],
    ["On-track rate", rate+"%", `${on} of ${board.trainees.length} airmen on track`],
    ["Currency red / expired", board.currencyRed, "Typed on Update inputs"],
    ["FST hours used", board.fstHours, "Typed on Update inputs"],
    ["Open exercise findings", board.findings, "Typed on Update inputs"],
    ["Instructors busy", String(busy), `of ${board.trainers.length} on the book`],
  ];
  return `<div class="grid kpis">${cards.map(([n,v,note]) => `<section class="card"><p class="muted">${esc(n)}</p><p class="num">${esc(v)}</p><p class="muted">${esc(note)}</p></section>`).join("")}</div>`;
}

function pageTypes() {
  return `
    <section class="card">
      <h2>Training, course, and seminar</h2>
      <p class="muted">They nest. Training is the umbrella. A course and a seminar are two forms of that learning.</p>
      <table style="margin-top:16px">
        <thead><tr><th></th><th>Training</th><th>Course</th><th>Seminar</th></tr></thead>
        <tbody>
          <tr><td>What it is</td><td>Builds a task / skill to a standard</td><td>Numbered syllabus with start/stop</td><td>Short discussion with an SME</td></tr>
          <tr><td>Outcome</td><td>Can do the task (Go / current)</td><td>Graduate, AFSC, qual, course credit</td><td>Attendance; rarely a new qual</td></tr>
          <tr><td>On this board</td><td>Sortie, sim, OJT, exercise</td><td>AC upgrade, 5-level, FST block, ALS</td><td>Professional enhancement, commander SME day</td></tr>
        </tbody>
      </table>
      <p class="muted" style="margin-top:16px">Test: if it has a course number and a graduate, it is a course. If it is discussion and attendance, it is a seminar. If the question is “are they qualified / current?”, it is training.</p>
    </section>`;
}

function pageUpdate() {
  const kpiFields = board.kpis.map((k,i) => `
    <div class="form-grid">
      <label><span>Tile title</span><input class="input" data-k="kpis.${i}.label" value="${esc(k.label)}"></label>
      <label><span>Number (crews only is used; others count live)</span><input class="input" data-k="kpis.${i}.value" value="${esc(k.value)}"></label>
      <label><span>Hint</span><input class="input" data-k="kpis.${i}.hint" value="${esc(k.hint)}"></label>
    </div>`).join("");
  const people = board.trainees.map((t,i) => `
    <div class="block">
      <div class="row" style="border:0;padding:0 0 8px"><strong>${esc(t.id)}</strong><button class="btn" data-del="${i}" type="button">Remove</button></div>
      <div class="form-grid">
        <label><span>Name</span><input class="input" data-k="trainees.${i}.name" value="${esc(t.name)}"></label>
        <label><span>Rank</span><input class="input" data-k="trainees.${i}.rank" value="${esc(t.rank)}"></label>
        <label><span>Program</span><input class="input" data-k="trainees.${i}.program" value="${esc(t.program)}"></label>
        <label><span>Status</span>
          <select class="input" data-k="trainees.${i}.status">${["On Track","Behind","Hold","Complete"].map(s=>`<option ${s===t.status?"selected":""}>${s}</option>`).join("")}</select>
        </label>
        <label><span>Progress %</span><input class="input" type="number" data-k="trainees.${i}.progress" value="${t.progress}"></label>
        <label><span>Hours logged</span><input class="input" type="number" data-k="trainees.${i}.hoursLogged" value="${t.hoursLogged}"></label>
        <label><span>Hours required</span><input class="input" type="number" data-k="trainees.${i}.hoursRequired" value="${t.hoursRequired}"></label>
        <label><span>Next event</span><input class="input" data-k="trainees.${i}.nextEvent" value="${esc(t.nextEvent)}"></label>
      </div>
    </div>`).join("");
  return `
    <p class="muted">Type here. Dashboard, Airmen, and Reports follow these fields. Date and week are live from this device.</p>
    <p><button class="btn btn-primary" id="addAirman" type="button">Add airman</button>
       <button class="btn" id="resetDemo" type="button">Reset demo data</button></p>
    <section class="card"><h2>Four KPI tiles</h2>${kpiFields}</section>
    <section class="card" style="margin-top:16px"><h2>Airmen</h2><div class="stack">${people}</div></section>
    <section class="card" style="margin-top:16px"><h2>Report extras</h2>
      <div class="form-grid">
        <label><span>Currency red / expired</span><input class="input" data-k="currencyRed" value="${esc(board.currencyRed)}"></label>
        <label><span>FST hours</span><input class="input" data-k="fstHours" value="${esc(board.fstHours)}"></label>
        <label><span>Open findings</span><input class="input" data-k="findings" value="${esc(board.findings)}"></label>
      </div>
    </section>`;
}

const TITLES = {
  "/": "Dashboard",
  "/airmen": "Airmen",
  "/trainers": "Instructors",
  "/fleet": "Fleet and simulators",
  "/schedule": "Schedule",
  "/events": "Events",
  "/reports": "Reports",
  "/types": "Course vs seminar",
  "/update": "Update inputs",
};

function render() {
  const now = new Date();
  const r = route();
  document.getElementById("pageTitle").textContent = TITLES[r] || "Dashboard";
  renderNav();
  const app = document.getElementById("app");
  if (r === "/airmen") app.innerHTML = pageAirmen();
  else if (r === "/trainers") app.innerHTML = pageTrainers(now);
  else if (r === "/fleet") app.innerHTML = pageFleet();
  else if (r === "/schedule") app.innerHTML = pageSchedule(now);
  else if (r === "/events") app.innerHTML = pageEvents(now);
  else if (r === "/reports") app.innerHTML = pageReports();
  else if (r === "/types") app.innerHTML = pageTypes();
  else if (r === "/update") app.innerHTML = pageUpdate();
  else app.innerHTML = pageDashboard(now);
}

function setPath(path, value) {
  const parts = path.split(".");
  let cur = board;
  for (let i=0;i<parts.length-1;i++) cur = cur[parts[i]];
  const last = parts[parts.length-1];
  const n = Number(value);
  cur[last] = (typeof cur[last] === "number" && value !== "" && !Number.isNaN(n)) ? n : value;
  save();
}

document.getElementById("app").addEventListener("input", (e) => {
  const el = e.target.closest("[data-k]");
  if (!el) return;
  setPath(el.dataset.k, el.value);
});
document.getElementById("app").addEventListener("change", (e) => {
  const el = e.target.closest("[data-k]");
  if (!el) return;
  setPath(el.dataset.k, el.value);
});
document.getElementById("app").addEventListener("click", (e) => {
  const f = e.target.closest("[data-filter]");
  if (f) { window.__filter = f.dataset.filter; render(); return; }
  const del = e.target.closest("[data-del]");
  if (del) { board.trainees.splice(Number(del.dataset.del), 1); save(); render(); return; }
  if (e.target.id === "resetDemo") { board = structuredClone(SEED); save(); render(); return; }
  if (e.target.id === "addAirman") {
    const n = board.trainees.length + 1;
    board.trainees.push({ id:`A-${String(n).padStart(3,"0")}`, name:"New airman", rank:"Capt", category:"Pilot", unit:"220 AS", position:"CP", program:"New program", status:"On Track", progress:0, hoursLogged:0, hoursRequired:80, nextEvent:"TBD", location:"Home Station", initials:"NA", tone:"blue" });
    save(); render();
  }
});

window.addEventListener("hashchange", render);
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("scrim").hidden = false;
};
document.getElementById("scrim").onclick = () => {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("scrim").hidden = true;
};
document.getElementById("nav").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("scrim").hidden = true;
});

setInterval(() => {
  document.getElementById("clock").textContent = stamp(new Date());
  if (route() === "/" || route() === "/schedule" || route() === "/events" || route() === "/trainers") render();
}, 1000);
document.getElementById("clock").textContent = stamp(new Date());
if (!location.hash) location.hash = "#/";
render();
