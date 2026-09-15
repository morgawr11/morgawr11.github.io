(function () {
  function count(cat) {
    return board.trainees.filter(function (t) { return t.category === cat; }).length;
  }
  function pageGlideHome(now) {
    const today = mondayIndex(now);
    const eventsToday = board.events.filter(function (e) { return e.day === today; });
    const next = eventsToday.find(function (e) { return e.startHour >= now.getHours(); }) || board.events.find(function (e) { return e.day > today; });
    const hour = now.getHours();
    const hello = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const unit = (board.identity && board.identity.unit) || "220th Airlift Wing";
    const behind = board.trainees.filter(function (t) { return t.status === "Behind" || t.status === "Hold"; }).length;
    const sims = board.resources.filter(function (r) { return r.type === "Simulator" && !/FTD/i.test(r.name); }).length;
    const ftd = board.resources.filter(function (r) { return /FTD/i.test(r.name); }).length;
    const pins = [
      { to: "/pilot", title: "Pilot courses", hint: count("Pilot") + " airmen on the book", badge: "Courses", tone: "info", mark: "PC" },
      { to: "/mx", title: "Maintenance courses", hint: count("MX") + " MX upgrade lines", badge: "Courses", tone: "amber", mark: "MX" },
      { to: "/other", title: "Other courses", hint: count("Enlisted Support") + " support / PME", badge: "Courses", tone: "violet", mark: "OT" },
      { to: "/seminars", title: "Seminars", hint: "SME days and stand-downs", badge: "Seminar", tone: "teal", mark: "SM" },
      { to: "/trainings", title: "Trainings", hint: eventsToday.length + " events today", badge: "Live", tone: "ok", mark: "TR" },
      { to: "/sims", title: "Flight simulators", hint: sims + " full-flight / partner sims", badge: "Sims", tone: "info", mark: "FS" },
      { to: "/exercises", title: "Exercises", hint: (board.findings || "0") + " open findings", badge: "EX", tone: "amber", mark: "EX" },
      { to: "/reports", title: "Reports", hint: "Counts the board already has", badge: "KPI", tone: "violet", mark: "RP" },
      { to: "/ftd", title: "Flight training device", hint: ftd + " FTD line", badge: "FTD", tone: "teal", mark: "FD" },
      { to: "/update", title: "Update inputs", hint: "Type captions, logos, people", badge: "Edit", tone: "", mark: "IN" }
    ];
    const liveCrews = (board.kpis[0] && board.kpis[0].value) || "—";
    return '<div class="os-home">' +
      '<div class="os-hello"><h2>' + hello + '</h2><p>' + esc(unit) + ' \u00b7 pinned modules \u00b7 ' + eventsToday.length + ' on today\u2019s book</p></div>' +
      '<div class="os-search-wrap"><input id="homeSearch" type="search" placeholder="Search modules \u2014 pilot, FTD, exercise…" autocomplete="off"></div>' +
      '<div class="os-stats">' +
        '<div class="os-stat"><p class="num">' + esc(liveCrews) + '</p><p class="muted">Mission-ready crews</p></div>' +
        '<div class="os-stat"><p class="num">' + board.trainees.length + '</p><p class="muted">Active trainees</p></div>' +
        '<div class="os-stat"><p class="num">' + eventsToday.length + '</p><p class="muted">Events today</p></div>' +
        '<div class="os-stat"><p class="num">' + behind + '</p><p class="muted">Behind / hold</p></div>' +
      '</div>' +
      '<div><p class="kicker" style="margin:0 0 10px">Pinned apps</p><div class="pin-grid" id="pinGrid">' +
        pins.map(function (p) {
          return '<a class="pin-card" href="#' + p.to + '"><div class="pin-top"><span class="pin-ico ' + p.tone + '">' + p.mark + '</span><span class="chip ' + p.tone + '">' + esc(p.badge) + '</span></div><h3>' + esc(p.title) + '</h3><p>' + esc(p.hint) + '</p></a>';
        }).join("") +
      '</div></div>' +
      '<section class="os-activity"><div class="row" style="border:0;padding-top:12px"><h2>Activity</h2><span class="muted">' + (next ? ('Next: ' + esc(next.title) + ' \u2014 ' + esc(next.sub)) : 'No remaining events') + '</span></div>' +
        board.notices.map(function (n) {
          return '<div class="row"><div><strong>' + esc(n.title) + '</strong><div class="muted">' + esc(n.body) + '</div></div><span class="muted">' + esc(n.ago) + '</span></div>';
        }).join("") +
      '</section></div>';
  }

  const prev = render;
  render = function () {
    prev();
    if (route() === "/") {
      document.getElementById("app").innerHTML = pageGlideHome(new Date());
      document.getElementById("pageTitle").textContent = "HOME";
    }
  };

  document.getElementById("app").addEventListener("input", function (e) {
    if (e.target.id !== "homeSearch") return;
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".pin-card").forEach(function (card) {
      card.style.display = card.textContent.toLowerCase().indexOf(q) >= 0 ? "" : "none";
    });
  });

  render();
})();
