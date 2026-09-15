(function () {
  const DEFAULT_IDENTITY = {
    unit: "220th Airlift Wing",
    board: "Training Board",
    banner: "UNCLASSIFIED // TRAINING DEMO // FICTITIOUS DATA",
    foot: "Philippine Air Force \u00b7 220th Airlift Wing \u00b7 FOCUS PAF",
    logo: "",
    pafLogo: "",
    focusLogo: "",
  };

  if (!board.identity) board.identity = Object.assign({}, DEFAULT_IDENTITY);
  else board.identity = Object.assign({}, DEFAULT_IDENTITY, board.identity);

  const NEW_NAV = [
    ["/", "HOME"],
    ["/pilot", "PILOT COURSES"],
    ["/mx", "MAINTENANCE COURSES"],
    ["/other", "OTHER COURSES"],
    ["/seminars", "SEMINARS"],
    ["/trainings", "TRAININGS"],
    ["/sims", "FLIGHT SIMULATORS"],
    ["/exercises", "EXERCISES"],
    ["/reports", "REPORTS"],
    ["/ftd", "FLIGHT TRAINING DEVICE"],
    ["/update", "UPDATE INPUTS"],
  ];
  NAV.splice(0, NAV.length);
  NEW_NAV.forEach(function (row) { NAV.push(row); });

  const CATALOG = {
    pilot: [
      { code:"AC-UPG", name:"Aircraft Commander Upgrade", kind:"Course", owner:"220 AS", next:"AC check profile", status:"Running" },
      { code:"MP-INIT", name:"Mission Pilot Initial", kind:"Course", owner:"221 AS", next:"Sim profile 4", status:"Running" },
      { code:"IP-UPG", name:"Instructor Pilot Upgrade", kind:"Course", owner:"220 AS", next:"IP eval", status:"Running" },
      { code:"FE-UPG", name:"Flight Engineer Upgrade", kind:"Course", owner:"220 AS", next:"FE sim 3", status:"Running" },
      { code:"WTQ", name:"Weapons / Tactics Qual", kind:"Course", owner:"220 OSS", next:"Hold \u2014 medical", status:"Hold" }
    ],
    mx: [
      { code:"2A5-5LVL", name:"5-level Upgrade \u2014 2A5X1", kind:"Course", owner:"220 AMXS", next:"CDC unit 2 retest", status:"Behind" },
      { code:"2A6-5LVL", name:"5-level Upgrade \u2014 2A6X4", kind:"Course", owner:"220 MXS", next:"OJT task block C", status:"Behind" }
    ],
    other: [
      { code:"3F2-5LVL", name:"5-level Education & Training", kind:"Course", owner:"220 FSS", next:"CDC volume 2", status:"Behind" },
      { code:"ALS-D", name:"Airman Leadership School (demo)", kind:"Course", owner:"PME", next:"Class start TBD", status:"Scheduled" }
    ],
    seminars: [
      { code:"SME-01", name:"Commander SME day", kind:"Seminar", owner:"WG/CC", next:"Fri 0900", status:"Scheduled" },
      { code:"PE-04", name:"Professional enhancement", kind:"Seminar", owner:"220 OSS", next:"Wed 1400", status:"Scheduled" },
      { code:"SAFE-SD", name:"Safety stand-down brief", kind:"Seminar", owner:"SE", next:"Monthly", status:"Recurring" }
    ],
    trainings: [
      { code:"NVG-2", name:"NVG 2", kind:"Training", owner:"221 AS", next:"Tue 1000", status:"On book" },
      { code:"FORM-BLK", name:"Formation block", kind:"Training", owner:"220 AS", next:"Today 1400", status:"On book" },
      { code:"OJT-C", name:"OJT task block C", kind:"Training", owner:"220 MXS", next:"This week", status:"Behind" },
      { code:"CDC-R2", name:"CDC unit 2 retest", kind:"Training", owner:"220 AMXS", next:"Mon 0900", status:"Behind" }
    ],
    exercises: [
      { code:"EB-26", name:"EASTERN BRIDGE (demo)", kind:"Exercise", owner:"221 AS", next:"Fri 0800", status:"Tasked" },
      { code:"PX-03", name:"Partner EX \u2014 #003 tasked", kind:"Exercise", owner:"220 AW", next:"On station", status:"Tasked" }
    ]
  };

  function pageCatalog(title, blurb, rows, peopleFilter) {
    const people = peopleFilter ? board.trainees.filter(peopleFilter) : [];
    return '<section class="card"><h2>' + esc(title) + '</h2><p class="muted">' + esc(blurb) + '</p>' +
      '<table style="margin-top:16px"><thead><tr><th>Code</th><th>Name</th><th>Type</th><th>Owner</th><th>Next</th><th>Status</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><td>' + esc(r.code) + '</td><td><strong>' + esc(r.name) + '</strong></td><td class="muted">' + esc(r.kind) + '</td><td class="muted">' + esc(r.owner) + '</td><td class="muted">' + esc(r.next) + '</td><td>' + chip(r.status) + '</td></tr>';
      }).join("") + "</tbody></table></section>" +
      (people.length ? '<section class="card" style="margin-top:16px;padding:0"><div class="row" style="border:0;padding:16px 16px 0"><h2>People on these lines</h2></div>' +
        people.map(function (t) {
          return '<div class="row" style="padding:16px"><div style="display:flex;gap:12px;flex:1.4">' + avatar(t) + '<div><strong>' + esc(t.rank) + " " + esc(t.name) + '</strong><div class="muted">' + esc(t.program) + "</div></div></div><div style=\"display:flex;gap:8px;align-items:center;flex:1\">' + bar(t) + "<span>" + t.progress + "%</span></div>" + chip(t.status) + "</div>";
        }).join("") + "</section>" : "");
  }

  function pageSims(kind) {
    const rows = board.resources.filter(function (r) {
      if (r.type !== "Simulator") return false;
      const isFtd = /FTD/i.test(r.name);
      return kind === "ftd" ? isFtd : !isFtd;
    });
    const blurb = kind === "ftd" ? "FTD lines only. Full-flight sims sit under Flight Simulators." : "Full-flight and partner sims. The FTD is on its own page.";
    return '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">' +
      (rows.map(function (r) {
        return '<section class="card"><strong>' + esc(r.name) + '</strong><p class="muted">' + esc(r.detail) + "</p>" + chip(r.status) + "</section>";
      }).join("") || '<section class="card"><p class="muted">No lines on the book.</p></section>') +
      '</div><p class="muted" style="margin-top:12px">' + esc(blurb) + "</p>";
  }

  if (!Array.isArray(board.nav) || board.nav.length !== NAV.length) {
    board.nav = NAV.map(function (row) { return { to: row[0], label: row[1] }; });
  }

  function applyChrome() {
    if (!board.identity) board.identity = Object.assign({}, DEFAULT_IDENTITY);
    const id = board.identity;
    const banner = document.getElementById("banner");
    const kicker = document.getElementById("brandKicker");
    const name = document.getElementById("brandName");
    const foot = document.getElementById("sidebarFoot");
    if (banner) banner.textContent = id.banner || DEFAULT_IDENTITY.banner;
    if (kicker) kicker.textContent = id.unit || DEFAULT_IDENTITY.unit;
    if (name) name.textContent = id.board || DEFAULT_IDENTITY.board;
    if (foot) foot.textContent = id.foot || DEFAULT_IDENTITY.foot;
    document.title = (id.unit || DEFAULT_IDENTITY.unit) + " \u00b7 " + (id.board || DEFAULT_IDENTITY.board);
    function paint(elId, custom) {
      const el = document.getElementById(elId);
      if (el && custom) el.src = custom;
    }
    paint("unitLogo", id.logo);
    paint("pafSeal", id.pafLogo);
    paint("focusMark", id.focusLogo);
    if ((!id.logo || !id.pafLogo || !id.focusLogo) && typeof window.loadMarks === "function") window.loadMarks();
  }

  renderNav = function () {
    const r = route();
    const items = board.nav && board.nav.length ? board.nav : NAV.map(function (row) { return { to: row[0], label: row[1] }; });
    document.getElementById("nav").innerHTML = items.map(function (item) {
      return '<a href="#' + item.to + '" class="' + (r === item.to ? "active" : "") + '">' + esc(item.label) + "</a>";
    }).join("");
  };

  const _render = render;
  render = function () {
    applyChrome();
    _render();
    const now = new Date();
    const r = route();
    const appEl = document.getElementById("app");
    if (r === "/pilot" || r === "/airmen") appEl.innerHTML = pageCatalog("Pilot courses", "Numbered syllabi that produce a pilot / FE qualification.", CATALOG.pilot, function (t) { return t.category === "Pilot"; });
    else if (r === "/mx") appEl.innerHTML = pageCatalog("Maintenance courses", "AFSC upgrade and qualification courses on the MX side.", CATALOG.mx, function (t) { return t.category === "MX"; });
    else if (r === "/other") appEl.innerHTML = pageCatalog("Other courses", "Support, PME, and courses that are not pilot or MX.", CATALOG.other, function (t) { return t.category === "Enlisted Support"; });
    else if (r === "/seminars" || r === "/types") appEl.innerHTML = pageCatalog("Seminars", "Short SME discussion. Attendance, not a new qualification.", CATALOG.seminars);
    else if (r === "/trainings") appEl.innerHTML = pageCatalog("Trainings", "Task / skill work to a standard.", CATALOG.trainings) + (typeof pageSchedule === "function" ? pageSchedule(now) : "");
    else if (r === "/sims" || r === "/fleet") appEl.innerHTML = pageSims("ffs");
    else if (r === "/ftd") appEl.innerHTML = pageSims("ftd");
    else if (r === "/exercises") appEl.innerHTML = pageCatalog("Exercises", "Partner and wing exercises on the live week.", CATALOG.exercises) + (typeof pageEvents === "function" ? pageEvents(now) : "");
    applyChrome();
    renderNav();
    const hit = (board.nav || []).find(function (n) { return n.to === r; });
    if (hit) document.getElementById("pageTitle").textContent = hit.label;
  };

  function guide() {
    return '<div class="guide">' +
      '<section class="card"><h2>Type this</h2><p class="muted">Unit name, left-rail captions, and the three logos.</p></section>' +
      '<section class="card"><h2>Counts itself</h2><p class="muted">Active trainees and events today come from the lists.</p></section>' +
      '<section class="card"><h2>Never type this</h2><p class="muted">Clock and week dates follow this device.</p></section></div>';
  }
  function tabBar(tab) {
    const tabs = [["look", "1. How it looks"], ["tiles", "2. Tile numbers"], ["people", "3. People on the list"]];
    return '<div class="tabs">' + tabs.map(function (t) {
      return '<button type="button" class="' + (tab === t[0] ? "on" : "") + '" data-tab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";
  }
  function preview(src, alt) {
    if (src) return '<img alt="' + esc(alt) + '" src="' + src + '">';
    return '<span class="muted">Default mark</span>';
  }

  pageUpdate = function () {
    const tab = window.__editTab || "look";
    const id = board.identity;
    if (tab === "look") {
      const navFields = (board.nav || []).map(function (n, i) {
        return '<label><span>Left caption ' + (i + 1) + '</span><input class="input" data-k="nav.' + i + '.label" value="' + esc(n.label) + '"></label>';
      }).join("");
      return guide() + tabBar(tab) +
        '<section class="card"><h2>Board profile</h2><p class="muted">These words sit on every page.</p>' +
        '<div class="form-grid" style="margin-top:12px">' +
        '<label><span>Unit line (top left, small)</span><input class="input" data-k="identity.unit" value="' + esc(id.unit) + '"></label>' +
        '<label><span>Board name (top left, large)</span><input class="input" data-k="identity.board" value="' + esc(id.board) + '"></label>' +
        '<label><span>Red banner</span><input class="input" data-k="identity.banner" value="' + esc(id.banner) + '"></label>' +
        '<label><span>Footer under the menu</span><input class="input" data-k="identity.foot" value="' + esc(id.foot) + '"></label></div></section>' +
        '<section class="card" style="margin-top:16px"><h2>Logos \u2014 choose file</h2>' +
        '<p class="muted">Left rail = 220th. Header right = PAF seal. Footer = FOCUS PAF. PNG or JPG. Stays in this browser.</p>' +
        '<div class="logo-slots" style="margin-top:12px">' +
          '<div class="logo-slot"><h3>Left \u2014 220th AW</h3><p class="muted">Rail mark</p>' +
            '<div class="logo-preview">' + preview(id.logo || (document.getElementById("unitLogo") && document.getElementById("unitLogo").src), "220th") + '</div>' +
            '<p class="file-btn"><input id="logoUnit" type="file" accept="image/png,image/jpeg,image/webp"></p>' +
            '<p><button class="btn" data-clear-logo="logo" type="button">Use default 220th mark</button></p></div>' +
          '<div class="logo-slot"><h3>Right \u2014 PAF seal</h3><p class="muted">Header, beside LIVE</p>' +
            '<div class="logo-preview">' + preview(id.pafLogo || (document.getElementById("pafSeal") && document.getElementById("pafSeal").src), "PAF") + '</div>' +
            '<p class="file-btn"><input id="logoPaf" type="file" accept="image/png,image/jpeg,image/webp"></p>' +
            '<p><button class="btn" data-clear-logo="pafLogo" type="button">Use default PAF seal</button></p></div>' +
          '<div class="logo-slot"><h3>Footer \u2014 FOCUS PAF</h3><p class="muted">Banner under the page</p>' +
            '<div class="logo-preview wide">' + preview(id.focusLogo || (document.getElementById("focusMark") && document.getElementById("focusMark").src), "FOCUS PAF") + '</div>' +
            '<p class="file-btn"><input id="logoFocus" type="file" accept="image/png,image/jpeg,image/webp"></p>' +
            '<p><button class="btn" data-clear-logo="focusLogo" type="button">Use default FOCUS bar</button></p></div></div></section>' +
        '<section class="card" style="margin-top:16px"><h2>Left-side captions</h2>' +
        '<p class="muted">Rename a line any time. The page behind the line stays the same.</p>' +
        '<div class="form-grid" style="margin-top:12px">' + navFields + '</div></section>' +
        '<p style="margin-top:16px"><button class="btn" id="resetDemo" type="button">Reset demo data</button></p>';
    }
    if (tab === "tiles") {
      const kpiFields = board.kpis.map(function (k, i) {
        const live = k.key !== "crews";
        return '<div class="block"><p class="muted">Tile ' + (i + 1) + (live ? " \u2014 counted live; you only name the tile" : " \u2014 type this number") + '</p><div class="form-grid">' +
          '<label><span>Caption on the tile</span><input class="input" data-k="kpis.' + i + '.label" value="' + esc(k.label) + '"></label>' +
          '<label><span>Number</span><input class="input" data-k="kpis.' + i + '.value" value="' + esc(k.value) + '"' + (live ? " disabled" : "") + '></label>' +
          '<label><span>Small line under it</span><input class="input" data-k="kpis.' + i + '.hint" value="' + esc(k.hint) + '"></label></div></div>';
      }).join("");
      return guide() + tabBar(tab) + '<section class="card"><h2>Four tiles on HOME</h2><div class="stack" style="margin-top:12px">' + kpiFields + '</div></section>' +
        '<section class="card" style="margin-top:16px"><h2>Report extras</h2><div class="form-grid">' +
        '<label><span>Currency red / expired</span><input class="input" data-k="currencyRed" value="' + esc(board.currencyRed) + '"></label>' +
        '<label><span>FST hours</span><input class="input" data-k="fstHours" value="' + esc(board.fstHours) + '"></label>' +
        '<label><span>Open findings</span><input class="input" data-k="findings" value="' + esc(board.findings) + '"></label></div></section>';
    }
    const people = board.trainees.map(function (t, i) {
      return '<div class="block"><div class="row" style="border:0;padding:0 0 8px"><strong>' + esc(t.id) + '</strong><button class="btn" data-del="' + i + '" type="button">Remove</button></div><div class="form-grid">' +
        '<label><span>Name</span><input class="input" data-k="trainees.' + i + '.name" value="' + esc(t.name) + '"></label>' +
        '<label><span>Rank</span><input class="input" data-k="trainees.' + i + '.rank" value="' + esc(t.rank) + '"></label>' +
        '<label><span>Program / course</span><input class="input" data-k="trainees.' + i + '.program" value="' + esc(t.program) + '"></label>' +
        '<label><span>Status</span><select class="input" data-k="trainees.' + i + '.status">' +
        ["On Track", "Behind", "Hold", "Complete"].map(function (s) { return "<option" + (s === t.status ? " selected" : "") + ">" + s + "</option>"; }).join("") + '</select></label>' +
        '<label><span>Progress %</span><input class="input" type="number" data-k="trainees.' + i + '.progress" value="' + t.progress + '"></label>' +
        '<label><span>Next event</span><input class="input" data-k="trainees.' + i + '.nextEvent" value="' + esc(t.nextEvent) + '"></label></div></div>';
    }).join("");
    return guide() + tabBar(tab) + '<p class="note">Use demo names only on this public page.</p>' +
      '<p><button class="btn btn-primary" id="addAirman" type="button">Add airman</button> <button class="btn" id="resetDemo" type="button">Reset demo data</button></p>' +
      '<section class="card"><h2>People the dashboard shows</h2><div class="stack">' + people + '</div></section>';
  };

  function readLogo(file, box) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = function () {
        const scale = Math.min(box / img.width, box / img.height, 1);
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.width * scale));
        c.height = Math.max(1, Math.round(img.height * scale));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/png"));
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("bad image")); };
      img.src = url;
    });
  }

  const LOGO_INPUTS = {
    logoUnit: { key: "logo", box: 192 },
    logoPaf: { key: "pafLogo", box: 192 },
    logoFocus: { key: "focusLogo", box: 640 }
  };

  const app = document.getElementById("app");
  app.addEventListener("input", function () { applyChrome(); renderNav(); });
  app.addEventListener("change", function (e) {
    const spec = LOGO_INPUTS[e.target.id];
    if (spec && e.target.files && e.target.files[0]) {
      readLogo(e.target.files[0], spec.box).then(function (data) {
        board.identity[spec.key] = data; save(); render();
      }).catch(function () { alert("That file could not be used as a logo."); });
    }
  });
  app.addEventListener("click", function (e) {
    const tab = e.target.closest("[data-tab]");
    if (tab) { window.__editTab = tab.dataset.tab; render(); }
    const clear = e.target.closest("[data-clear-logo]");
    if (clear) { board.identity[clear.getAttribute("data-clear-logo")] = ""; save(); render(); }
  });

  applyChrome();
  render();
})();
