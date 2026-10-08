// Medical stays map: hospitals + everyday essentials, with walking distances (OpenStreetMap foot routing)
// measured from the middle of each neighborhood. "Walkable" = 1 mile or less on foot.
(function () {
  var HOODS = [
    { id: 'R', name: 'Rodman House', area: 'Rodman House', lat: 39.9445, lng: -75.1495 },
    { id: 'QV', name: 'Hancock & Catherine', area: 'Hancock & Catherine', lat: 39.9390, lng: -75.1485 }
  ];
  var CAT = { hospital: 'Hospital', pharmacy: 'Pharmacy', grocery: 'Grocery', late: 'Open late', food: 'Restaurant', coffee: 'Coffee', laundry: 'Laundromat' };
  var COL = { hospital: '#a63f2a', pharmacy: '#1f6f5c', grocery: '#6b7a2c', late: '#7a4f9a', food: '#b8975a', coffee: '#7a5a3a', laundry: '#2d6ea3' };
  var P = [["hospital", "Pennsylvania Hospital", "Founded in 1751, the first hospital in America.", 39.9446, -75.1547, "By car (typical): about 2 min from Rodman, 4 min from Hancock &amp; Catherine", [0.27, 0.94]], ["hospital", "Wills Eye Hospital", "Eye care, on Walnut Street.", 39.9483, -75.1556, "By car (typical): about 2 min from Rodman, 4 min from Hancock &amp; Catherine", [0.6, 1.29]], ["hospital", "Thomas Jefferson University Hospital", "Jefferson Health, in Center City.", 39.9496, -75.1577, "By car (typical): about 3 min from Rodman, 4 min from Hancock &amp; Catherine", [0.77, 1.44]], ["hospital", "Hospital of the University of Pennsylvania (HUP)", "Penn Medicine, in University City.", 39.9497, -75.1932, "By car (typical): about 8 min from Rodman, 10 min from Hancock &amp; Catherine", [2.45, 3.08]], ["hospital", "Children's Hospital of Philadelphia (CHOP)", "In University City.", 39.9484, -75.1938, "By car (typical): about 8 min from Rodman, 10 min from Hancock &amp; Catherine", [2.52, 3.14]], ["food", "Royal Sushi & Izakaya", "Chef Jesse Ito, 2026 James Beard winner. Michelin Bib Gourmand.", 39.93804, -75.14652, "", [0.62, 0.07]], ["food", "Provenance", "Michelin star.", 39.9429, -75.14556, "", [0.47, 0.41]], ["food", "Fiorella", "Michelin Bib Gourmand.", 39.93886, -75.15694, "", [0.47, 0.69]], ["food", "Angelo's Pizzeria", "Michelin Bib Gourmand.", 39.9407, -75.15758, "", [0.39, 0.75]], ["food", "Famous 4th Street Delicatessen", "Michelin Bib Gourmand.", 39.9405, -75.14967, "", [0.28, 0.41]], ["food", "Zahav", "Michelin Recommended.", 39.94631, -75.14519, "", [0.68, 0.82]], ["food", "Southwark", "Michelin Recommended.", 39.94045, -75.14926, "", [0.3, 0.38]], ["food", "Roxanne", "Michelin Recommended.", 39.94088, -75.14552, "", [0.43, 0.27]], ["food", "Ambra", "Michelin Recommended.", 39.94033, -75.14936, "", [0.31, 0.37]], ["food", "Mawn", "Chef Phila Lorn, 2025 James Beard Emerging Chef.", 39.93995, -75.15774, "", [0.44, 0.71]], ["food", "Dizengoff", "Michelin Bib Gourmand.", 39.95065, -75.1678, "", [1.31, 1.99]], ["food", "Vetri Cucina", "Michelin Recommended.", 39.94674, -75.16319, "", [0.81, 1.47]], ["food", "Vedge", "Michelin Recommended.", 39.9479, -75.16139, "", [0.81, 1.49]], ["food", "Forsythia", "Michelin Recommended.", 39.94865, -75.1454, "", [0.79, 0.93]], ["food", "High Street", "Michelin Recommended.", 39.94987, -75.14623, "", [0.81, 1.01]], ["pharmacy", "CVS Pharmacy", "Pharmacy, 314 South 5th Street.", 39.9445987, -75.1503103, "Hours per OpenStreetMap: 08:00-20:00", [0.29, 0.76]], ["pharmacy", "CVS Pharmacy", "Pharmacy, 259 Market Street.", 39.950312, -75.1455249, "", [0.88, 1.02]], ["pharmacy", "Walgreens", "Pharmacy.", 39.9476532, -75.1593231, "Hours per OpenStreetMap: Mo-Fr 09:00-21:00; Sa-Su 10:00-18:00", [0.7, 1.37]], ["pharmacy", "CVS Pharmacy", "Pharmacy, 1046 Market Street.", 39.9515179, -75.1581823, "Hours per OpenStreetMap: 08:00-22:00", [0.96, 1.63]], ["grocery", "Acme", "Grocery, 309 South 5th Street.", 39.9443364, -75.1500123, "Hours per OpenStreetMap: Mo-Su 07:00-22:00", [0.26, 0.73]], ["grocery", "Olde City Food Market", "Grocery, 202 Market Street.", 39.9497914, -75.1439995, "Hours per OpenStreetMap: Mo-Fr 08:00-20:00; Sa 10:00-21:00; Su 10:00-20:00", [0.95, 1.03]], ["grocery", "Whole Foods Market", "Grocery, 929 South Street.", 39.9428324, -75.1581249, "Hours per OpenStreetMap: Mo-Su 07:00-22:00", [0.31, 0.93]], ["grocery", "Acme", "Grocery, 1001 South Street.", 39.942934, -75.1587786, "Hours per OpenStreetMap: Mo-Su 07:00-22:00", [0.53, 1.15]], ["grocery", "MOM's Organic Market", "Grocery, 34 South 11th Street.", 39.9509231, -75.1586671, "Hours per OpenStreetMap: Mo-Su 09:00-21:00", [0.93, 1.6]], ["grocery", "Riverwards Produce - Old City", "Grocery, 146 Bread Street.", 39.9535656, -75.1440081, "Hours per OpenStreetMap: Mo-Su 08:00-20:00", [1.16, 1.3]], ["grocery", "Giant", "Grocery, 1403 South Christopher Columbus Boulevard.", 39.9292681, -75.1438145, "Hours per OpenStreetMap: 06:00-22:00", [1.36, 0.71]], ["late", "Wawa", "Convenience store, 150 South Independence Mall West.", 39.9490779, -75.1510749, "Open 24 hours (per OpenStreetMap)", [0.52, 1.13]], ["late", "7-Eleven", "Convenience store, 804 Walnut Street.", 39.9480126, -75.1544541, "Open 24 hours (per OpenStreetMap)", [0.52, 1.21]], ["late", "Wawa", "Convenience store, 912-916 Walnut Street.", 39.9482935, -75.1567637, "Open 24 hours (per OpenStreetMap)", [0.65, 1.32]], ["late", "7-Eleven", "Convenience store, 1034 Washington Avenue.", 39.9367673, -75.1611331, "Open 24 hours (per OpenStreetMap)", [0.83, 0.98]], ["laundry", "Laundromat", "Laundromat, 1153 South 9th Street. Catherine House has no in-home laundry.", 39.9348615, -75.1585822, "Hours per OpenStreetMap: Mo-Su 06:30-23:00", [0.74, 0.89]], ["coffee", "Red Hook Coffee & Tea", "Coffee, 765 South 4th Street.", 39.9385782, -75.1497557, "Hours per OpenStreetMap: Mo-Su 07:00-18:00", [0.44, 0.25]], ["coffee", "Ox Coffee", "Coffee, 616 South 3rd Street.", 39.9409857, -75.1478313, "Hours per OpenStreetMap: Mo-Fr 07:30-13:00; Sa-Su 08:00-14:00", [0.34, 0.36]], ["coffee", "Green Line Cafe", "Coffee, 518 South 4th Street.", 39.9421111, -75.1492773, "Hours per OpenStreetMap: Mo-Su 07:30-18:00", [0.24, 0.52]], ["coffee", "Lombard Cafe", "Coffee, 542 Lombard Street.", 39.942922, -75.152027, "", [0.07, 0.72]], ["pharmacy", "CVS Pharmacy (24 hours)", "Pharmacy, 1500 Spruce Street. Open around the clock.", 39.9469704, -75.1668035, "Open 24 hours (per OpenStreetMap)", [0.98, 1.63]]];
  var map = L.map('mmap', { scrollWheelZoom: false }).setView([39.9440, -75.1560], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  HOODS.forEach(function (h) {
    L.marker([h.lat, h.lng], { icon: L.divIcon({ className: '', html: '<div class="pin h">' + (h.id === 'R' ? 'R' : 'H·C') + '</div>', iconSize: [30, 30], iconAnchor: [15, 15] }), zIndexOffset: 1000 })
      .addTo(map).bindPopup('<div class="pop"><b>' + h.name + '</b>Approximate location</div>');
  });
  function ok(m) { return m !== null && m <= 1.0; }
  function fmt(m) { return m === null ? 'n/a' : (m < 0.15 ? '0.1' : m.toFixed(1)) + ' mi'; }
  function tag(h, m) { return h.area + ': ' + fmt(m) + (ok(m) ? ' on foot' : ' · short ride'); }
  var layer = L.layerGroup().addTo(map), list = document.getElementById('mlist');
  function match(p, c) {
    if (c === 'all') return true;
    if (c === 'walkR') return ok(p[6][0]);
    if (c === 'walkQV') return ok(p[6][1]);
    return p[0] === c;
  }
  function render(c) {
    layer.clearLayers(); list.innerHTML = '';
    var shown = P.filter(function (p) { return match(p, c); });
    var bounds = [];
    shown.forEach(function (p) {
      var pop = '<div class="pop"><b>' + p[1] + '</b>' + p[2] + (p[5] ? '<span>' + p[5] + '</span>' : '') +
        '<span>' + tag(HOODS[0], p[6][0]) + '</span><span>' + tag(HOODS[1], p[6][1]) + '</span></div>';
      L.marker([p[3], p[4]], { icon: L.divIcon({ className: '', html: '<div class="pin" style="background:' + COL[p[0]] + '"></div>', iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(layer).bindPopup(pop);
      bounds.push([p[3], p[4]]);
      var row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = '<div class="nm">' + p[1] + '<small><span class="dot" style="background:' + COL[p[0]] + '"></span>' + CAT[p[0]] + ' · ' + p[2] + (p[5] ? ' ' + p[5] : '') + '</small></div>' +
        '<div class="lb label">' + [[HOODS[0], p[6][0]], [HOODS[1], p[6][1]]].map(function (x) { return (ok(x[1]) ? '&#10003; ' : '') + tag(x[0], x[1]); }).join('<br>') + '</div>';
      list.appendChild(row);
    });
    if (c !== 'all' && bounds.length) { bounds.push([HOODS[0].lat, HOODS[0].lng]); bounds.push([HOODS[1].lat, HOODS[1].lng]); map.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 }); }
    else map.setView([39.9440, -75.1560], 14);
  }
  document.querySelectorAll('#mchips').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      box.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('on'); });
      document.querySelectorAll('#mchips2 .chip').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on'); render(b.dataset.c);
    });
  });
  document.querySelectorAll('#mchips2').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      document.querySelectorAll('#mchips .chip, #mchips2 .chip').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on'); render(b.dataset.c);
    });
  });
  map.on('click', function () { map.scrollWheelZoom.enable(); });
  render('all');
})();
