// ============================================================
// 下潜效果引擎：背景随滚动从深蓝沉向黑（先慢后快），页眉淡出
// 驱动 CSS 变量 --bg / --card / --border，全站联动
// 依赖：style.css 中 :root 定义了三个变量的起点色
// ============================================================
(function () {
  var root = document.documentElement;
  // 起点（浅水区深蓝）→ 终点（深水区近黑，留一丝蓝底）
  var BG1 = [13, 27, 46], BG2 = [3, 4, 6];       // --bg
  var CD1 = [22, 27, 34], CD2 = [10, 13, 18];    // --card
  var BD1 = [48, 54, 61], BD2 = [26, 31, 38];    // --border
  var HERO_FADE = 0.35; // 前 35% 深度内页眉淡出

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
  function easeIn(p) { return p * p; } // 先慢后快

  function paint() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    p = Math.min(Math.max(p, 0), 1);
    var e = easeIn(p);
    root.style.setProperty('--bg', 'rgb(' + lerp(BG1[0], BG2[0], e) + ',' + lerp(BG1[1], BG2[1], e) + ',' + lerp(BG1[2], BG2[2], e) + ')');
    root.style.setProperty('--card', 'rgb(' + lerp(CD1[0], CD2[0], e) + ',' + lerp(CD1[1], CD2[1], e) + ',' + lerp(CD1[2], CD2[2], e) + ')');
    root.style.setProperty('--border', 'rgb(' + lerp(BD1[0], BD2[0], e) + ',' + lerp(BD1[1], BD2[1], e) + ',' + lerp(BD1[2], BD2[2], e) + ')');
    var hero = document.querySelector('.hero');
    if (hero) hero.style.opacity = Math.max(1 - p / HERO_FADE, 0);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { paint(); ticking = false; });
    }
  }, { passive: true });
  paint();
})();
