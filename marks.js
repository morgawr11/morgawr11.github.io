(function () {
  function set(id, data) {
    const el = document.getElementById(id);
    if (el && data) el.src = "data:image/jpeg;base64," + data.trim();
  }
  Promise.all([
    fetch("logos/aw220.b64").then(function (r) { return r.ok ? r.text() : ""; }),
    fetch("logos/paf.b64").then(function (r) { return r.ok ? r.text() : ""; }),
    fetch("logos/focus.b64").then(function (r) { return r.ok ? r.text() : ""; }),
  ]).then(function (parts) {
    set("unitLogo", parts[0]);
    set("pafSeal", parts[1]);
    set("focusMark", parts[2]);
  }).catch(function () {});
})();
