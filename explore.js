// Explore map: curated places, distances from the two neighborhoods (approximate, straight-line)
(function () {
  var HOODS = [
    { id: 'R', name: 'Rodman House', area: 'Society Hill', lat: 39.9445, lng: -75.1495 },
    { id: 'QV', name: 'Hancock & Catherine', area: 'Queen Village', lat: 39.9390, lng: -75.1485 }
  ];
  var C = { history: 'History', icons: 'Only in Philly', food: 'Food & neighborhoods', water: 'Waterfront', sports: 'Sports' };
  var P = [
    ['history', 'Independence Hall', 'Where the Declaration was adopted and the Constitution drafted.', 39.9489, -75.1500],
    ['history', 'Liberty Bell Center', 'The great symbol of liberty, famous for its crack.', 39.9496, -75.1503],
    ['history', 'National Constitution Center', 'A museum devoted to the U.S. Constitution.', 39.9539, -75.1491],
    ['history', "Elfreth's Alley", "America's oldest continuously inhabited residential street.", 39.9529, -75.1424],
    ['history', 'Pennsylvania Hospital', 'Founded in 1751, the first hospital in America.', 39.9446, -75.1547],
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
    ['sports', 'South Philadelphia Sports Complex arena', 'The arena for Sixers and Flyers games.', 39.9012, -75.1720]
  ];
  function mi(a, b, c, d) {
    var R = 3958.8, r = Math.PI / 180, dLa = (c - a) * r, dLo = (d - b) * r;
    var x = Math.sin(dLa / 2) * Math.sin(dLa / 2) + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function mode(m) { return m <= 0.9 ? 'Easy walk' : m <= 1.7 ? 'Walk or short ride' : m <= 3 ? 'Short ride or bike' : 'Rideshare or transit'; }
  function dist(p) {
    return HOODS.map(function (h) {
      var m = mi(h.lat, h.lng, p[3], p[4]);
      return { h: h, m: m, t: (m < 0.15 ? '0.1' : m.toFixed(1)) + ' mi' };
    });
  }
  var map = L.map('map', { scrollWheelZoom: false }).setView([39.9425, -75.1560], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  HOODS.forEach(function (h) {
    L.marker([h.lat, h.lng], { icon: L.divIcon({ className: '', html: '<div class="pin h">' + (h.id === 'R' ? 'R' : 'H·C') + '</div>', iconSize: [30, 30], iconAnchor: [15, 15] }), zIndexOffset: 1000 })
      .addTo(map).bindPopup('<div class="pop"><b>' + h.name + '</b>' + h.area + ' (approximate location)</div>');
  });
  var layer = L.layerGroup().addTo(map), list = document.getElementById('alist');
  function render(cat) {
    layer.clearLayers(); list.innerHTML = '';
    P.filter(function (p) { return cat === 'all' || p[0] === cat; }).forEach(function (p) {
      var d = dist(p), near = d[0].m < d[1].m ? d[0] : d[1];
      var pop = '<div class="pop"><b>' + p[1] + '</b>' + p[2] + d.map(function (x) { return '<span>' + x.h.area + ': about ' + x.t + '</span>'; }).join('') + '</div>';
      L.marker([p[3], p[4]], { icon: L.divIcon({ className: '', html: '<div class="pin"></div>', iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(layer).bindPopup(pop);
      var row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = '<div class="nm">' + p[1] + '<small>' + p[2] + '</small></div><div class="lb label">' + mode(near.m) + '<br>' + d.map(function (x) { return x.h.area + ' · ' + x.t; }).join('<br>') + '</div>';
      list.appendChild(row);
    });
  }
  document.getElementById('chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
    b.classList.add('on'); render(b.dataset.c);
  });
  map.on('click', function () { map.scrollWheelZoom.enable(); });
  render('all');
})();
