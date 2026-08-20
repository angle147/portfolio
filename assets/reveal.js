// ============================================================
// 卡片浮现效果：卡片进入视口淡入、离开视口淡出
// 与 dive.js 的页眉淡出呼应，形成滚动时的呼吸感
// 用 scroll + rAF 手算位置（不依赖 IntersectionObserver 时序），
// 初始化立即执行一次，避免卡片区空白；无 JS 环境自动降级可见
// ============================================================
(function () {
  var els = [];

  function refresh() {
    els = Array.prototype.slice.call(document.querySelectorAll('.card, .skill-group, .oss-item'));
    els.forEach(function (el) {
      if (!el.classList.contains('rv')) el.classList.add('rv');
    });
  }

  var style = document.createElement('style');
  style.textContent = '.rv{opacity:0;transition:opacity .5s ease}.rv.in{opacity:1}';
  document.head.appendChild(style);

  function update() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      // 淡入：卡片从底部进入视口（露出约 8% 时浮现）
      // 淡出：卡片滚到顶部、底部还剩约 25% 视口高度时开始消失（在可见区完成淡出）
      var visible = r.top < vh * 0.92 && r.bottom > vh * 0.25;
      el.classList.toggle('in', visible);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.initReveal = function () { refresh(); update(); };

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(window.initReveal, 50);
  });
})();
