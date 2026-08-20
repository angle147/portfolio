// ============================================================
// 下潜效果引擎（暖色版）：背景随滚动从亮黄绿沉向深墨绿（先慢后快）
// 文字色同步反转（浅底深字 → 深底浅字），保证任意深度可读
// 驱动 CSS 变量 --bg / --card / --border / --text 等，全站联动
// ============================================================
(function () {
  var root = document.documentElement;
  // 起点（浅水区亮黄绿）→ 终点（深水区墨绿，留一丝绿底）
  var BG1 = [232, 243, 210], BG2 = [20, 45, 32];        // --bg
  var CD1 = [255, 255, 255], CD2 = [45, 60, 50];        // --card 深端压暗，与文字拉开亮度
  var CA1 = 0.55, CA2 = 0.55;                            // --card alpha 稳定
  var BD1 = [90, 130, 90], BD2 = [195, 215, 190];       // --border (rgba)
  var BA1 = 0.3, BA2 = 0.25;                             // --border alpha
  var TX1 = [28, 42, 33], TX2 = [248, 250, 247];       // --text 浅端深硬 / 深端近白
  var TS1 = [20, 32, 24], TS2 = [252, 253, 250];        // --text-strong
  var MU1 = [95, 110, 92], MU2 = [190, 200, 190];       // --muted
  var AC1 = [50, 105, 58], AC2 = [150, 215, 158];       // --accent
  var HERO_FADE = 0.35; // 前 35% 深度内页眉淡出

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
  function easeIn(p) { return p * p; } // 背景：先慢后快
  // 文字：分段开关式——前 50% 深度保持深色，50%-80% 快速过渡到浅色，80% 后锁定近白
  function easeText(p) {
    if (p < 0.5) return 0;
    if (p > 0.8) return 1;
    return (p - 0.5) / 0.3;
  }
  function set(name, rgb, alpha) {
    root.style.setProperty(name, alpha != null
      ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha.toFixed(3) + ')'
      : 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')');
  }

  function paint() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    p = Math.min(Math.max(p, 0), 1);
    var e = easeIn(p);
    var et = easeText(p);
    set('--bg', [lerp(BG1[0], BG2[0], e), lerp(BG1[1], BG2[1], e), lerp(BG1[2], BG2[2], e)]);
    set('--card', [lerp(CD1[0], CD2[0], e), lerp(CD1[1], CD2[1], e), lerp(CD1[2], CD2[2], e)], CA1 + (CA2 - CA1) * e);
    set('--border', [lerp(BD1[0], BD2[0], e), lerp(BD1[1], BD2[1], e), lerp(BD1[2], BD2[2], e)], BA1 + (BA2 - BA1) * e);
    set('--text', [lerp(TX1[0], TX2[0], et), lerp(TX1[1], TX2[1], et), lerp(TX1[2], TX2[2], et)]);
    set('--text-strong', [lerp(TS1[0], TS2[0], et), lerp(TS1[1], TS2[1], et), lerp(TS1[2], TS2[2], et)]);
    set('--muted', [lerp(MU1[0], MU2[0], et), lerp(MU1[1], MU2[1], et), lerp(MU1[2], MU2[2], et)]);
    set('--accent', [lerp(AC1[0], AC2[0], et), lerp(AC1[1], AC2[1], et), lerp(AC1[2], AC2[2], et)]);
    var hero = document.querySelector('.hero');
    if (hero) hero.style.opacity = Math.max(1 - p / HERO_FADE, 0);
  }

  window.addEventListener('scroll', paint, { passive: true });
  paint();
})();
