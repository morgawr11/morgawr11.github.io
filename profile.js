(function () {
  const DEFAULT_IDENTITY = {
    unit: "220th Airlift Wing",
    board: "Training Board",
    banner: "UNCLASSIFIED // TRAINING DEMO // FICTITIOUS DATA",
    foot: "Public demo. Clock is live. Lists save in this browser.",
    logo: "",
  };

  if (!board.identity) board.identity = Object.assign({}, DEFAULT_IDENTITY);
  else board.identity = Object.assign({}, DEFAULT_IDENTITY, board.identity);
  if (!Array.isArray(board.nav)) {
    board.nav = (typeof NAV !== "undefined" ? NAV : []).map(function (row) {
      return { to: row[0], label: row[1] };
    });
  }

  function markSvg() {
    return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M2 16l10-12 10 12h-4l-6-7-6 7H2z"/><path d="M11 16v6h2v-6"/></svg>';
  }

  function applyChrome() {
    if (!board.identity) board.identity = Object.assign({}, DEFAULT_IDENTITY);
    if (!Array.isArray(board.nav)) {
      board.nav = (typeof NAV !== "undefined" ? NAV : []).map(function (row) {
        return { to: row[0], label: row[1] };
      });
    }
    const id = board.identity;
    const banner = document.getElementById("banner");
    const kicker = document.getElementById("brandKicker");
    const name = document.getElementById("brandName");
    const foot = document.getElementById("sidebarFoot");
    const mark = document.getElementById("brandMark");
    if (banner) banner.textContent = id.banner || DEFAULT_IDENTITY.banner;
    if (kicker) kicker.textContent = id.unit || DEFAULT_IDENTITY.unit;
    if (name) name.textContent = id.board || DEFAULT_IDENTITY.board;
    if (foot) foot.textContent = id.foot || DEFAULT_IDENTITY.foot;
    document.title = id.board || DEFAULT_IDENTITY.board;
    if (mark) {
      if (id.logo) {
        mark.classList.add("has-img");
        mark.innerHTML = '<img alt="" src="' + id.logo + '">';
      } else {
        mark.classList.remove("has-img");
        mark.innerHTML = markSvg();
      }
    }
  }

  renderNav = function () {
    const r = route();
    const items = board.nav && board.nav.length ? board.nav : (NAV || []).map(function (row) {
      return { to: row[0], label: row[1] };
    });
    document.getElementById("nav").innerHTML = items.map(function (item) {
      const to = item.to;
      const label = item.label;
      return '<a href="#' + to + '" class="' + (r === to ? "active" : "") + '">' + esc(label) + "</a>";
    }).join("");
  };

  const _render = render;
  render = function () {
    applyChrome();
    _render();
    applyChrome();
    renderNav();
    const r = route();
    const hit = (board.nav || []).find(function (n) { return n.to === r; });
    if (hit) document.getElementById("pageTitle").textContent = hit.label;
  };

  function guide() {
    return '<div class="guide">' +
      '<section class="card"><h2>Type this</h2><p class="muted">Unit name, left-rail captions, logo, tile titles, people. That is the board profile.</p></section>' +
      '<section class="card"><h2>Counts itself</h2><p class="muted">Active trainees, instructors on book, and events today come from the lists. Do not fight those numbers.</p></section>' +
      '<section class="card"><h2>Never type this</h2><p class="muted">Clock and week dates follow this device. They move by themselves.</p></section>' +
      "</div>";
  }

  function tabBar(tab) {
    const tabs = [["look", "1. How it looks"], ["tiles", "2. Tile numbers"], ["people", "3. People on the list"]];
    return '<div class="tabs">' + tabs.map(function (t) {
      return '<button type="button" class="' + (tab === t[0] ? "on" : "") + '" data-tab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";
  }

  pageUpdate = function () {
    const tab = window.__editTab || "look";
    const id = board.identity;
    if (tab === "look") {
      const navFields = (board.nav || []).map(function (n, i) {
        return '<label><span>Left caption ' + (i + 1) + '</span><input class="input" data-k="nav.' + i + '.label" value="' + esc(n.label) + '"></label>';
      }).join("");
      const preview = id.logo ? '<img alt="Current logo" src="' + id.logo + '">' : markSvg();
      return guide() + tabBar(tab) +
        '<section class="card"><h2>Board profile — left rail</h2>' +
        '<p class="muted">These words sit on every page. Type them once. The dashboard copies them.</p>' +
        '<div class="form-grid" style="margin-top:12px">' +
        '<label><span>Unit line (top left, small)</span><input class="input" data-k="identity.unit" value="' + esc(id.unit) + '"></label>' +
        '<label><span>Board name (top left, large)</span><input class="input" data-k="identity.board" value="' + esc(id.board) + '"></label>' +
        '<label><span>Red banner</span><input class="input" data-k="identity.banner" value="' + esc(id.banner) + '"></label>' +
        '<label><span>Footer under the menu</span><input class="input" data-k="identity.foot" value="' + esc(id.foot) + '"></label>' +
        "</div></section>" +
        '<section class="card" style="margin-top:16px"><h2>Logo</h2><div class="logo-row">' +
        '<div class="logo-preview">' + preview + "</div><div>" +
        '<p class="muted">Upload a PNG or JPG you are allowed to post on a public page. Official seals and unit patches have use rules — do not put them here unless command says that public use is approved.</p>' +
        '<p class="file-btn"><input id="logoFile" type="file" accept="image/png,image/jpeg,image/webp"></p>' +
        '<p><button class="btn" id="clearLogo" type="button">Use default mark</button></p>' +
        "</div></div></section>" +
        '<section class="card" style="margin-top:16px"><h2>Left-side captions</h2>' +
        '<p class="muted">Rename the menu. Do not add or remove rows here — that changes the pages themselves.</p>' +
        '<div class="form-grid" style="margin-top:12px">' + navFields + "</div></section>" +
        '<p style="margin-top:16px"><button class="btn" id="resetDemo" type="button">Reset demo data</button></p>';
    }
    if (tab === "tiles") {
      const kpiFields = board.kpis.map(function (k, i) {
        const live = k.key !== "crews";
        return '<div class="block"><p class="muted">Tile ' + (i + 1) + (live ? " — the number is counted live; you only name the tile" : " — type this number") + "</p>" +
          '<div class="form-grid">' +
          '<label><span>Caption on the tile</span><input class="input" data-k="kpis.' + i + '.label" value="' + esc(k.label) + '"></label>' +
          '<label><span>Number</span><input class="input" data-k="kpis.' + i + '.value" value="' + esc(k.value) + '"' + (live ? " disabled" : "") + "></label>" +
          '<label><span>Small line under it</span><input class="input" data-k="kpis.' + i + '.hint" value="' + esc(k.hint) + '"></label>' +
          "</div></div>";
      }).join("");
      return guide() + tabBar(tab) +
        '<section class="card"><h2>Four tiles on Dashboard</h2>' +
        '<p class="muted">Change the words any time. Only Mission-ready crews keeps a typed number.</p>' +
        '<div class="stack" style="margin-top:12px">' + kpiFields + "</div></section>" +
        '<section class="card" style="margin-top:16px"><h2>Report extras</h2><div class="form-grid">' +
        '<label><span>Currency red / expired</span><input class="input" data-k="currencyRed" value="' + esc(board.currencyRed) + '"></label>' +
        '<label><span>FST hours</span><input class="input" data-k="fstHours" value="' + esc(board.fstHours) + '"></label>' +
        '<label><span>Open findings</span><input class="input" data-k="findings" value="' + esc(board.findings) + '"></label>' +
        "</div></section>";
    }
    const people = board.trainees.map(function (t, i) {
      return '<div class="block"><div class="row" style="border:0;padding:0 0 8px"><strong>' + esc(t.id) + '</strong><button class="btn" data-del="' + i + '" type="button">Remove</button></div>' +
        '<div class="form-grid">' +
        '<label><span>Name</span><input class="input" data-k="trainees.' + i + '.name" value="' + esc(t.name) + '"></label>' +
        '<label><span>Rank</span><input class="input" data-k="trainees.' + i + '.rank" value="' + esc(t.rank) + '"></label>' +
        '<label><span>Program / course</span><input class="input" data-k="trainees.' + i + '.program" value="' + esc(t.program) + '"></label>' +
        '<label><span>Status</span><select class="input" data-k="trainees.' + i + '.status">' +
        ["On Track", "Behind", "Hold", "Complete"].map(function (s) {
          return "<option" + (s === t.status ? " selected" : "") + ">" + s + "</option>";
        }).join("") + "</select></label>" +
        '<label><span>Progress %</span><input class="input" type="number" data-k="trainees.' + i + '.progress" value="' + t.progress + '"></label>' +
        '<label><span>Next event</span><input class="input" data-k="trainees.' + i + '.nextEvent" value="' + esc(t.nextEvent) + '"></label>' +
        "</div></div>";
    }).join("");
    return guide() + tabBar(tab) +
      '<p class="note">Use demo names only on this public page. Keep the real 2027/2028 APB roster in the spreadsheet until you have a closed copy of the board.</p>' +
      '<p><button class="btn btn-primary" id="addAirman" type="button">Add airman</button> ' +
      '<button class="btn" id="resetDemo" type="button">Reset demo data</button></p>' +
      '<section class="card"><h2>People the dashboard shows</h2><div class="stack">' + people + "</div></section>";
  };

  function readLogo(file) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = function () {
        const box = 192;
        const scale = Math.min(box / img.width, box / img.height, 1);
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(img.width * scale));
        c.height = Math.max(1, Math.round(img.height * scale));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/png"));
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("bad image"));
      };
      img.src = url;
    });
  }

  const app = document.getElementById("app");
  app.addEventListener("input", function () {
    applyChrome();
    renderNav();
  });
  app.addEventListener("change", function (e) {
    if (e.target.id === "logoFile" && e.target.files && e.target.files[0]) {
      readLogo(e.target.files[0]).then(function (data) {
        board.identity.logo = data;
        save();
        render();
      }).catch(function () {
        alert("That file could not be used as a logo.");
      });
    }
  });
  app.addEventListener("click", function (e) {
    const tab = e.target.closest("[data-tab]");
    if (tab) {
      window.__editTab = tab.dataset.tab;
      render();
    }
    if (e.target.id === "clearLogo") {
      board.identity.logo = "";
      save();
      render();
    }
  });

  applyChrome();
  render();
})();
