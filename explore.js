// Explore map: curated places with real walking distances (OpenStreetMap foot routing)
// measured from the middle of each neighborhood, not the front door. "Walkable" = 1 mile or less on foot.
(function () {
  var HOODS = [
    { id: 'R', name: 'Rodman House', area: 'Rodman House', lat: 39.9445, lng: -75.1495 },
    { id: 'QV', name: 'Hancock & Catherine', area: 'Hancock & Catherine', lat: 39.9390, lng: -75.1485 }
  ];
  var WALK = {"Independence Hall": [0.54, 0.9], "Liberty Bell Center": [0.55, 0.97], "National Constitution Center": [0.87, 1.27], "Elfreth's Alley": [1.21, 1.17], "Pennsylvania Hospital": [0.27, 0.71], "A Man Full of Trouble Tavern": [0.64, 0.6], "Gloria Dei (Old Swedes') Church": [0.96, 0.53], "Rocky Statue": [2.67, 3.15], "Philadelphia Museum of Art": [2.74, 3.22], "Reading Terminal Market": [1.17, 1.65], "Philadelphia's Magic Gardens": [0.4, 0.79], "Italian Market": [0.63, 0.65], "South Street": [0.19, 0.27], "Fabric Row (4th Street)": [0.3, 0.16], "Head House Square": [0.44, 0.32], "East Passyunk Avenue": [0.99, 0.99], "Rittenhouse Square": [1.48, 1.92], "Chinatown": [1.01, 1.49], "Kimmel Center & Avenue of the Arts": [0.89, 1.33], "Penn's Landing": [0.91, 0.85], "Spruce Street Harbor Park": [0.98, 0.92], "Cherry Street Pier": [1.46, 1.41], "Citizens Bank Park": [2.7, 2.69], "Lincoln Financial Field": [3.25, 3.24], "Wills Eye Hospital": [0.6, 1.04], "Thomas Jefferson University Hospital": [0.77, 1.26], "Hospital of the University of Pennsylvania (HUP)": [2.45, 2.74], "Children's Hospital of Philadelphia (CHOP)": [2.52, 2.81], "South Philadelphia Sports Complex arena": [3.35, 3.34]};
  var P = [
    ['history', 'Independence Hall', 'Where the Declaration was adopted and the Constitution drafted.', 39.9489, -75.1500],
    ['history', 'Liberty Bell Center', 'The great symbol of liberty, famous for its crack.', 39.9496, -75.1503],
    ['history', 'National Constitution Center', 'A museum devoted to the U.S. Constitution.', 39.9539, -75.1491],
    ['history', "Elfreth's Alley", "America's oldest continuously inhabited residential street.", 39.9529, -75.1424],
    ['history,medical', 'Pennsylvania Hospital', 'Founded in 1751, the first hospital in America.', 39.9446, -75.1547],
    ['history', 'A Man Full of Trouble Tavern', 'A 1759 tavern building, the only one left from pre-Revolutionary Philadelphia.', 39.9448, -75.1445],
    ['history', "Gloria Dei (Old Swedes') Church", 'Completed in 1700, one of the oldest churches in Pennsylvania.', 39.9348, -75.1427],
    ['icons', 'Rocky Statue', 'The statue at the foot of the Art Museum steps, the most photographed spot in town.', 39.9653, -75.1798],
    ['icons', 'Philadelphia Museum of Art', 'Run the "Rocky Steps," then go inside.', 39.9656, -75.1810],
    ['icons', 'Reading Terminal Market', 'A historic indoor market with food from all over the city.', 39.9534, -75.1593],
    ['icons', "Philadelphia's Magic Gardens", 'A mosaic art environment on South Street.', 39.9429, -75.1597],
    ['icons', 'Italian Market', 'Ninth Street, one of the oldest open-air markets in the country.', 39.9372, -75.1580],
    ['food', 'South Street', 'Shops, cheesesteaks and nightlife.', 39.9413, -75.1507],
    ['food', 'Fabric Row (4th Street)', 'Fabric shops, thrift and vintage stores, and coffee houses.', 39.9405, -75.1495],
    ['food', 'Head House Square', 'A public market site since 1745, now restaurants and weekend markets.', 39.9415, -75.1456],
    ['food', 'East Passyunk Avenue', 'A South Philly restaurant row.', 39.9318, -75.1618],
    ['food', 'Rittenhouse Square', 'One of the original squares in William Penn\'s plan, with shops and restaurants around it.', 39.9496, -75.1718],
    ['food', 'Chinatown', 'Dumplings, noodles and bakeries around the Friendship Gate.', 39.9533, -75.1559],
    ['food', 'Kimmel Center & Avenue of the Arts', 'The Philadelphia Orchestra and the theaters of South Broad Street.', 39.9467, -75.1649],
    ['water', "Penn's Landing", 'The Delaware River waterfront.', 39.9459, -75.1409],
    ['water', 'Spruce Street Harbor Park', 'A seasonal park on the river with hammocks and lights.', 39.9449, -75.1400],
    ['water', 'Cherry Street Pier', 'A pier of artist studios and food, with river views.', 39.9528, -75.1385],
    ['sports', 'Citizens Bank Park', 'Home of the Phillies.', 39.9061, -75.1665],
    ['sports', 'Lincoln Financial Field', 'Home of the Eagles.', 39.9008, -75.1675],
    ['medical', 'Wills Eye Hospital', 'A leading eye hospital, on Walnut Street.', 39.9483, -75.1556],
    ['medical', 'Thomas Jefferson University Hospital', 'Jefferson Health\'s main Center City hospital.', 39.9496, -75.1577],
    ['medical', 'Hospital of the University of Pennsylvania (HUP)', 'Penn Medicine, in University City.', 39.9497, -75.1932],
    ['medical', "Children's Hospital of Philadelphia (CHOP)", 'In University City.', 39.9484, -75.1938],
    ['sports', 'South Philadelphia Sports Complex arena', 'The arena for Sixers and Flyers games.', 39.9012, -75.1720]
  ];

  function dist(p) {
    var w = WALK[p[1]] || [null, null];
    return HOODS.map(function (h, i) { return { h: h, m: w[i], ok: w[i] !== null && w[i] <= 1.0 }; });
  }
  function fmt(x) { return x.m === null ? 'n/a' : (x.m < 0.15 ? '0.1' : x.m.toFixed(1)) + ' mi'; }
  function tag(x) { return x.h.area + ': ' + fmt(x) + (x.ok ? ' on foot' : ' · short ride'); }
  var map = L.map('map', { scrollWheelZoom: false }).setView([39.9425, -75.1560], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  HOODS.forEach(function (h) {
    L.marker([h.lat, h.lng], { icon: L.divIcon({ className: '', html: '<div class="pin h">' + (h.id === 'R' ? 'R' : 'H·C') + '</div>', iconSize: [30, 30], iconAnchor: [15, 15] }), zIndexOffset: 1000 })
      .addTo(map).bindPopup('<div class="pop"><b>' + h.name + '</b>Approximate location</div>');
  });
  var layer = L.layerGroup().addTo(map), list = document.getElementById('alist');
  function match(p, cat) {
    var d = dist(p);
    if (cat === 'all') return true;
    if (cat === 'walkR') return d[0].ok;
    if (cat === 'walkQV') return d[1].ok;
    return p[0].split(',').indexOf(cat) > -1;
  }
  function render(cat) {
    layer.clearLayers(); list.innerHTML = '';
    P.filter(function (p) { return match(p, cat); }).forEach(function (p) {
      var d = dist(p);
      var pop = '<div class="pop"><b>' + p[1] + '</b>' + p[2] + d.map(function (x) { return '<span>' + tag(x) + '</span>'; }).join('') + '</div>';
      L.marker([p[3], p[4]], { icon: L.divIcon({ className: '', html: '<div class="pin' + (d[0].ok || d[1].ok ? ' w' : '') + '"></div>', iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(layer).bindPopup(pop);
      var row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = '<div class="nm">' + p[1] + '<small>' + p[2] + '</small></div><div class="lb label">' + d.map(function (x) { return (x.ok ? '&#10003; ' : '') + tag(x); }).join('<br>') + '</div>';
      list.appendChild(row);
    });
  }
  document.querySelectorAll('.chips').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
      b.classList.add('on'); render(b.dataset.c);
    });
  });
  map.on('click', function () { map.scrollWheelZoom.enable(); });
  render('all');
})();
