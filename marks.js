(function () {
  function set(id, data) {
    const el = document.getElementById(id);
    if (el && data) el.src = "data:image/jpeg;base64," + data.trim();
  }
  function paint(parts) {
    const id = (window.board && board.identity) || {};
    if (!id.logo) set("unitLogo", parts[0]);
    if (!id.pafLogo) set("pafSeal", parts[1]);
    if (!id.focusLogo) set("focusMark", parts[2]);
  }
  function loadMarks() {
    return Promise.all([
      fetch("logos/aw220.b64").then(function (r) { return r.ok ? r.text() : ""; }),
      fetch("logos/paf.b64").then(function (r) { return r.ok ? r.text() : ""; }),
      fetch("logos/focus.b64").then(function (r) { return r.ok ? r.text() : ""; }),
    ]).then(paint);
  }
  window.loadMarks = loadMarks;
  loadMarks();
  window.addEventListener("hashchange", function () { loadMarks(); });
  document.addEventListener("DOMContentLoaded", loadMarks);
})();
