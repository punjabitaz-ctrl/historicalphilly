document.documentElement.classList.add('js');

// Nav: transparent over hero, solid after scroll; mobile menu
(function () {
  var nav = document.querySelector('.nav'), menu = document.querySelector('.menu'), b = document.querySelector('.burger');
  function on() { nav.classList.toggle('solid', window.scrollY > 40 || document.body.classList.contains('lock')); }
  on(); window.addEventListener('scroll', on, { passive: true });
  if (b) b.addEventListener('click', function () {
    var open = menu.classList.toggle('on');
    document.body.classList.toggle('lock', open);
    b.setAttribute('aria-expanded', open);
    on();
  });
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('on'); document.body.classList.remove('lock'); on(); });
  });
})();

// Fade-up reveal
(function () {
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();

// Lightbox for house galleries
(function () {
  var g = document.querySelectorAll('.gallery button');
  if (!g.length) return;
  var lb = document.createElement('div');
  lb.id = 'lb';
  lb.innerHTML = '<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&#8249;</button><img alt=""><button class="n" aria-label="Next">&#8250;</button>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), i = 0;
  function show(n) {
    i = (n + g.length) % g.length;
    img.src = g[i].dataset.full;
    img.alt = g[i].querySelector('img').alt;
    lb.classList.add('on');
  }
  g.forEach(function (b, n) { b.addEventListener('click', function () { show(n); }); });
  lb.querySelector('.x').onclick = function () { lb.classList.remove('on'); };
  lb.querySelector('.p').onclick = function () { show(i - 1); };
  lb.querySelector('.n').onclick = function () { show(i + 1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('on'); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') lb.classList.remove('on');
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();

// Inline success message after FormSubmit redirect (?sent=1)
(function () {
  if (location.search.indexOf('sent=1') === -1) return;
  document.querySelectorAll('.sent').forEach(function (el) {
    el.style.display = 'block';
    el.scrollIntoView({ block: 'center' });
  });
})();

// Team banner: pause / play control (moving content must be pausable)
(function () {
  var t = document.querySelector('.ticker'), b = document.querySelector('.tpause');
  if (!t || !b) return;
  b.addEventListener('click', function () {
    var p = t.classList.toggle('paused');
    b.textContent = p ? 'Play banner' : 'Pause banner';
    b.setAttribute('aria-pressed', p);
  });
})();
