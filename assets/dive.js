// ============================================================
// 下潜效果引擎（可读性优先版）：只有背景随滚动从亮黄绿沉向深墨绿
// 文字全程深色、卡片全程亮白（由 style.css :root 固定），任何深度对比度满格
// 驱动 --bg 单一变量，全站联动
// ============================================================
(function () {
  var root = document.documentElement;
  var BG1 = [232, 243, 210], BG2 = [20, 45, 32]; // 亮黄绿 → 深墨绿

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
  function easeIn(p) { return p * p; } // 先慢后快

  function paint() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    p = Math.min(Math.max(p, 0), 1);
    var e = easeIn(p);
    root.style.setProperty('--bg', 'rgb(' + lerp(BG1[0], BG2[0], e) + ',' + lerp(BG1[1], BG2[1], e) + ',' + lerp(BG1[2], BG2[2], e) + ')');
    var hero = document.querySelector('.hero');
    if (hero) hero.style.opacity = Math.max(1 - p / 0.35, 0);
  }

  window.addEventListener('scroll', paint, { passive: true });
  paint();
})();
