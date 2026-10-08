// Explore map: curated places with real walking distances (OpenStreetMap foot routing)
// measured from the middle of each neighborhood, not the front door. "Walkable" = 1 mile or less on foot.
(function () {
  var HOODS = [
    { id: 'R', name: 'Rodman House', area: 'Rodman House', lat: 39.9445, lng: -75.1495 },
    { id: 'QV', name: 'Hancock & Catherine', area: 'Hancock & Catherine', lat: 39.9390, lng: -75.1485 }
  ];
  var WALK = {"Independence Hall": [0.54, 1.08], "Liberty Bell Center": [0.55, 1.15], "National Constitution Center": [0.87, 1.45], "Elfreth's Alley": [1.21, 1.26], "Pennsylvania Hospital": [0.27, 0.94], "A Man Full of Trouble Tavern": [0.64, 0.58], "Gloria Dei (Old Swedes') Church": [0.96, 0.32], "Rocky Statue": [2.67, 3.33], "Philadelphia Museum of Art": [2.74, 3.4], "Reading Terminal Market": [1.17, 1.83], "Philadelphia's Magic Gardens": [0.4, 1.01], "Italian Market": [0.63, 0.81], "South Street": [0.19, 0.5], "Fabric Row (4th Street)": [0.3, 0.39], "Head House Square": [0.44, 0.31], "East Passyunk Avenue": [0.99, 1.14], "Rittenhouse Square": [1.48, 2.15], "Chinatown": [1.01, 1.67], "Kimmel Center & Avenue of the Arts": [0.89, 1.55], "Penn's Landing": [0.91, 0.79], "Spruce Street Harbor Park": [0.98, 0.86], "Cherry Street Pier": [1.46, 1.34], "Citizens Bank Park": [2.7, 2.71], "Lincoln Financial Field": [3.25, 3.09], "Wills Eye Hospital": [0.6, 1.29], "Thomas Jefferson University Hospital": [0.77, 1.44], "Hospital of the University of Pennsylvania (HUP)": [2.45, 3.08], "Children's Hospital of Philadelphia (CHOP)": [2.52, 3.14], "Xfinity Mobile Arena": [3.35, 3.5], "Subaru Park (Chester)": [18.64, 17.73], "Franklin Field": [2.26, 2.89], "The Palestra": [2.4, 3.07], "Liacouras Center": [2.96, 3.61], "Daskalakis Athletic Center (Drexel)": [2.43, 3.11], "Hagan Arena": [7.19, 7.83], "John Glaser Arena (La Salle)": [7.73, 8.24], "Finneran Pavilion and Villanova Stadium": [14.04, 14.68], "University of Pennsylvania": [2.53, 3.16], "Drexel University": [2.43, 3.11], "Temple University": [3.08, 3.74], "Thomas Jefferson University (Center City)": [0.71, 1.38], "Thomas Jefferson University (East Falls)": [7.77, 8.43], "La Salle University": [7.29, 7.8], "Saint Joseph's University": [7.4, 8.04], "Villanova University": [14.25, 14.89], "Haverford College": [11.68, 12.32], "Bryn Mawr College": [12.84, 13.48], "Swarthmore College": [17.87, 16.96]};
  var CAR = {"Independence Hall": [2, 4], "Liberty Bell Center": [2, 4], "National Constitution Center": [3, 5], "Elfreth's Alley": [4, 5], "Pennsylvania Hospital": [2, 4], "A Man Full of Trouble Tavern": [2, 3], "Gloria Dei (Old Swedes') Church": [4, 2], "Rocky Statue": [8, 9], "Philadelphia Museum of Art": [8, 10], "Reading Terminal Market": [4, 6], "Philadelphia's Magic Gardens": [2, 4], "Italian Market": [3, 3], "South Street": [2, 2], "Fabric Row (4th Street)": [2, 2], "Head House Square": [2, 2], "East Passyunk Avenue": [5, 5], "Rittenhouse Square": [4, 6], "Chinatown": [3, 5], "Kimmel Center & Avenue of the Arts": [3, 5], "Penn's Landing": [3, 3], "Spruce Street Harbor Park": [3, 3], "Cherry Street Pier": [4, 5], "Citizens Bank Park": [9, 9], "Lincoln Financial Field": [10, 9], "Wills Eye Hospital": [2, 4], "Thomas Jefferson University Hospital": [3, 4], "Hospital of the University of Pennsylvania (HUP)": [8, 10], "Children's Hospital of Philadelphia (CHOP)": [8, 10], "Xfinity Mobile Arena": [11, 9], "Subaru Park (Chester)": [32, 30], "Franklin Field": [9, 11], "The Palestra": [8, 10], "Liacouras Center": [8, 10], "Daskalakis Athletic Center (Drexel)": [8, 9], "Hagan Arena": [15, 17], "John Glaser Arena (La Salle)": [19, 20], "Finneran Pavilion and Villanova Stadium": [33, 35], "University of Pennsylvania": [7, 9], "Drexel University": [8, 9], "Temple University": [9, 11], "Thomas Jefferson University (Center City)": [3, 5], "Thomas Jefferson University (East Falls)": [19, 21], "La Salle University": [18, 19], "Saint Joseph's University": [16, 17], "Villanova University": [34, 36], "Haverford College": [28, 30], "Bryn Mawr College": [30, 31], "Swarthmore College": [31, 30]};
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
    ['food', 'Kimmel Center & Avenue of the Arts', 'Marian Anderson Hall, home of the Philadelphia Orchestra, and the theaters of South Broad Street.', 39.9467, -75.1649],
    ['water', "Penn's Landing", 'The Delaware River waterfront.', 39.9459, -75.1409],
    ['water', 'Spruce Street Harbor Park', 'A seasonal park on the river with hammocks and lights.', 39.9449, -75.1400],
    ['water', 'Cherry Street Pier', 'A pier of artist studios and food, with river views.', 39.9528, -75.1385],
    ['sports', 'Citizens Bank Park', 'Home of the Phillies.', 39.9061, -75.1665],
    ['sports', 'Lincoln Financial Field', 'Home of the Eagles, and of Temple Owls football.', 39.9008, -75.1675],
    ['medical', 'Wills Eye Hospital', 'A leading eye hospital, on Walnut Street.', 39.9483, -75.1556],
    ['medical', 'Thomas Jefferson University Hospital', 'Jefferson Health\'s main Center City hospital.', 39.9496, -75.1577],
    ['medical', 'Hospital of the University of Pennsylvania (HUP)', 'Penn Medicine, in University City.', 39.9497, -75.1932],
    ['medical', "Children's Hospital of Philadelphia (CHOP)", 'In University City.', 39.9484, -75.1938],
    ['sports', 'Xfinity Mobile Arena', 'The arena for 76ers and Flyers games.', 39.9012, -75.1720],
    ['sports', 'Subaru Park (Chester)', 'Home of the Philadelphia Union (MLS).', 39.8329, -75.3785],
    ['sports', 'Franklin Field', 'Penn Quakers football, and home of the Penn Relays each spring.', 39.9501, -75.1900],
    ['sports', 'The Palestra', 'Penn Quakers basketball, in the historic arena known for Big 5 games.', 39.9514, -75.1886],
    ['sports', 'Liacouras Center', 'Temple Owls basketball. Temple football plays at Lincoln Financial Field.', 39.9798, -75.1586],
    ['sports', 'Daskalakis Athletic Center (Drexel)', "Drexel Dragons basketball, on Drexel's campus.", 39.9545, -75.1866],
    ['sports', 'Hagan Arena', "Saint Joseph's Hawks basketball.", 39.9956, -75.2349],
    ['sports', 'John Glaser Arena (La Salle)', 'La Salle Explorers basketball.', 40.0400, -75.1566],
    ['sports', 'Finneran Pavilion and Villanova Stadium', 'Villanova Wildcats basketball and football, on the Main Line.', 40.0340, -75.3366],
    ['campus', 'University of Pennsylvania', 'Penn Quakers. Ivy League campus in University City.', 39.9522, -75.1932],
    ['campus', 'Drexel University', 'Drexel Dragons. University City campus, known for its co-op program.', 39.9545, -75.1866],
    ['campus', 'Temple University', 'Temple Owls. Main campus in North Philadelphia.', 39.9812, -75.1563],
    ['campus', 'Thomas Jefferson University (Center City)', "Jefferson's Center City campus, beside Thomas Jefferson University Hospital.", 39.9488, -75.1575],
    ['campus', 'Thomas Jefferson University (East Falls)', "Jefferson's East Falls campus, along the Schuylkill.", 40.0232, -75.1917],
    ['campus', 'La Salle University', 'La Salle Explorers. Campus in North Philadelphia.', 40.0376, -75.1540],
    ['campus', "Saint Joseph's University", "Saint Joseph's Hawks. Campus on City Avenue, on the city's western edge.", 39.9958, -75.2380],
    ['campus', 'Villanova University', 'Villanova Wildcats. Main Line campus in Delaware County.', 40.0365, -75.3400],
    ['campus', 'Haverford College', 'Liberal arts college on the Main Line.', 40.0072, -75.3069],
    ['campus', 'Bryn Mawr College', 'Liberal arts college on the Main Line.', 40.0287, -75.3155],
    ['campus', 'Swarthmore College', 'Liberal arts college in Delaware County.', 39.9029, -75.3552],
  ];

  function dist(p) {
    var w = WALK[p[1]] || [null, null];
    var c = CAR[p[1]] || [null, null];
    return HOODS.map(function (h, i) { return { h: h, m: w[i], ok: w[i] !== null && w[i] <= 1.0, car: c[i] }; });
  }
  function fmt(x) { return x.m === null ? 'n/a' : (x.m < 0.15 ? '0.1' : x.m.toFixed(1)) + ' mi'; }
  function tag(x) { return x.h.area + ': ' + fmt(x) + (x.ok ? ' on foot' : (x.car ? ' \u00b7 about ' + x.car + ' min by car' : ' \u00b7 short ride')); }
  function slug(n) { return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function miles(a, b, c, d) {
    var R = 3958.8, r = Math.PI / 180, s1 = Math.sin((c - a) * r / 2), s2 = Math.sin((d - b) * r / 2);
    return 2 * R * Math.asin(Math.sqrt(s1 * s1 + Math.cos(a * r) * Math.cos(c * r) * s2 * s2));
  }
  // Saved places live only in this browser (localStorage); nothing is sent anywhere.
  var KEY = 'hp_saved_places', saved = [], cur = 'all', me = null, meMarker = null, shared = null, pins = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { saved = []; }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
    var n = document.getElementById('savedN'); if (n) n.textContent = saved.length;
  }
  var hm = location.hash.match(/saved=([^&]*)/);
  if (hm) shared = decodeURIComponent(hm[1]).split('~').filter(Boolean);
  function isSaved(p) { return saved.indexOf(slug(p[1])) > -1; }
  function gmaps(p) { return 'https://www.google.com/maps/dir/?api=1&destination=' + p[3] + ',' + p[4]; }
  function amaps(p) { return 'https://maps.apple.com/?daddr=' + p[3] + ',' + p[4] + '&q=' + encodeURIComponent(p[1]); }
  function acts(p) {
    var s = isSaved(p);
    return '<div class="act"><button type="button" class="save" data-k="' + slug(p[1]) + '" aria-pressed="' + s + '">' + (s ? '&#9733; Saved' : '&#9734; Save') + '</button>' +
      '<a href="' + gmaps(p) + '" target="_blank" rel="noopener">Directions</a><a href="' + amaps(p) + '" target="_blank" rel="noopener">Apple Maps</a></div>';
  }
  function away(p) { var m = miles(me[0], me[1], p[3], p[4]); return 'About ' + (m < 0.15 ? '0.1' : m.toFixed(1)) + ' mi from you (straight line)'; }

  var map = L.map('map', { scrollWheelZoom: false }).setView([39.9425, -75.1560], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  HOODS.forEach(function (h) {
    L.marker([h.lat, h.lng], { icon: L.divIcon({ className: '', html: '<div class="pin h">' + (h.id === 'R' ? 'R' : 'H·C') + '</div>', iconSize: [30, 30], iconAnchor: [15, 15] }), zIndexOffset: 1000 })
      .addTo(map).bindPopup('<div class="pop"><b>' + h.name + '</b>Approximate location</div>');
  });
  var layer = L.layerGroup().addTo(map), list = document.getElementById('alist');
  function match(p, cat) {
    if (cat === 'all') return true;
    if (cat === 'saved') return isSaved(p);
    if (cat === 'shared') return shared && shared.indexOf(slug(p[1])) > -1;
    var d = dist(p);
    if (cat === 'walkR') return d[0].ok;
    if (cat === 'walkQV') return d[1].ok;
    return p[0].split(',').indexOf(cat) > -1;
  }
  function render(cat) {
    cur = cat; layer.clearLayers(); list.innerHTML = ''; pins = {};
    var shown = P.filter(function (p) { return match(p, cat); });
    shown.forEach(function (p) {
      var d = dist(p), k = slug(p[1]);
      var pop = '<div class="pop"><b>' + p[1] + '</b>' + p[2] + d.map(function (x) { return '<span>' + tag(x) + '</span>'; }).join('') + (me ? '<span>' + away(p) + '</span>' : '') + acts(p) + '</div>';
      pins[k] = L.marker([p[3], p[4]], { icon: L.divIcon({ className: '', html: '<div class="pin' + (d[0].ok || d[1].ok ? ' w' : '') + (isSaved(p) ? ' sv' : '') + '"></div>', iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(layer).bindPopup(pop);
      var row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = '<div class="nm">' + p[1] + '<small>' + p[2] + '</small>' + acts(p) + '</div><div class="lb label">' +
        d.map(function (x) { return (x.ok ? '&#10003; ' : '') + tag(x); }).join('<br>') + (me ? '<br>' + away(p) : '') + '</div>';
      list.appendChild(row);
    });
    if (cat !== 'all' && shown.length) {
      var b = L.latLngBounds(shown.map(function (p) { return [p[3], p[4]]; }));
      HOODS.forEach(function (h) { b.extend([h.lat, h.lng]); });
      map.fitBounds(b, { padding: [30, 30], maxZoom: 15 });
    } else if (cat === 'all') map.setView([39.9425, -75.1560], 13);
    if (!shown.length) list.innerHTML = '<p class="fine">' + (cat === 'saved' ? 'Nothing saved yet. Tap Save on any place to build your own list.' : 'No places match.') + '</p>';
  }
  document.querySelectorAll('.chips').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
      b.classList.add('on'); render(b.dataset.c);
    });
  });
  // Save / unsave (works in list rows and in map popups)
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.save'); if (!b) return;
    var k = b.dataset.k, i = saved.indexOf(k), on = i === -1;
    if (on) saved.push(k); else saved.splice(i, 1);
    persist();
    document.querySelectorAll('.save[data-k="' + k + '"]').forEach(function (x) { x.setAttribute('aria-pressed', on); x.innerHTML = on ? '&#9733; Saved' : '&#9734; Save'; });
    if (pins[k] && pins[k].getElement()) { var el = pins[k].getElement().querySelector('.pin'); if (el) el.classList.toggle('sv', on); }
    if (cur === 'saved' && !on) render('saved');
  });
  var msg = document.getElementById('toolMsg');
  function say(t) { if (msg) msg.textContent = t; }
  document.getElementById('shareBtn').addEventListener('click', function () {
    if (!saved.length) { say('Save a few places first, then copy your list link.'); return; }
    var url = location.origin + location.pathname + '#saved=' + saved.join('~');
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { say('Link copied. Anyone who opens it will see your list.'); }, function () { say(url); });
    else say(url);
  });
  document.getElementById('locate').addEventListener('click', function () {
    if (!navigator.geolocation) { say('This browser cannot share your location. Directions still work from any place.'); return; }
    say('Finding you...');
    navigator.geolocation.getCurrentPosition(function (pos) {
      me = [pos.coords.latitude, pos.coords.longitude];
      if (meMarker) map.removeLayer(meMarker);
      meMarker = L.marker(me, { icon: L.divIcon({ className: '', html: '<div class="pin me"></div>', iconSize: [16, 16], iconAnchor: [8, 8] }) }).addTo(map)
        .bindPopup('<div class="pop"><b>You are here</b>Your location stays in your browser.</div>');
      say('Showing distances from your location (straight line).');
      render(cur);
    }, function () { say('We could not get your location. You can still tap Directions on any place.'); }, { timeout: 10000 });
  });
  map.on('click', function () { map.scrollWheelZoom.enable(); });
  persist();
  var bar = document.getElementById('sharedBar');
  if (shared && shared.length && bar) {
    bar.hidden = false;
    bar.querySelector('span').textContent = 'Showing a shared list of ' + shared.length + ' place' + (shared.length === 1 ? '' : 's') + '.';
    document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
    document.getElementById('sharedSave').addEventListener('click', function () {
      shared.forEach(function (k) { if (saved.indexOf(k) === -1) saved.push(k); });
      persist(); bar.hidden = true; history.replaceState(null, '', location.pathname);
      document.querySelector('.chip[data-c="saved"]').click();
    });
    document.getElementById('sharedClear').addEventListener('click', function () {
      bar.hidden = true; history.replaceState(null, '', location.pathname);
      document.querySelector('.chip[data-c="all"]').click();
    });
    render('shared');
  } else {
    render('all');
    var hc = location.hash.match(/cat=(\w+)/);
    if (hc) { var chip = document.querySelector('.chip[data-c="' + hc[1] + '"]'); if (chip) chip.click(); }
  }
})();
