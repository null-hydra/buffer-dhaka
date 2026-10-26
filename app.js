const SUPABASE_URL = 'https://bgytmaeijghkgrvdckam.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oRlKp1xnsuCTsJsAk3OWXQ_nMzbU8Kl';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
/* -----------------------------------------
   BUFFER DHAKA TRANSIT DATASET & ALGORITHMS
   ----------------------------------------- */

const CORRIDORS = [
  {
    id: 'mirpur10_banani',
    originShort: 'Mirpur (10 / 11 / 12 / 14)',
    destShort: 'Gulshan / Banani / Mohakhali',
    label: 'Mirpur (10/11/12/14) ➔ Gulshan / Banani / Mohakhali',
    reverseLabel: 'Gulshan / Banani / Mohakhali ➔ Mirpur (10/11/12/14)',
    keywords: ['mirpur', 'gulshan', 'banani', 'kakoli', 'mohakhali', 'ecb', 'kalshi', 'pallabi', 'kazipara'],
    subAreas: [
      { name: 'Mirpur 10 Gol Chattar (Block A/B)', busHub: 'Mirpur 10 Roundabout Stand', busWalk: 5, busRick: 3, busRickFare: 30, metroHub: 'Mirpur 10 MRT Station', metroWalk: 5, metroRick: 3, metroRickFare: 30, hasLeguna: false, legunaFare: 0, legunaMins: 0 },
      { name: 'Mirpur 10 Block C/D / Section 10', busHub: 'Mirpur 10 Gol Chattar Stand', busWalk: 6, busRick: 4, busRickFare: 30, metroHub: 'Mirpur 10 MRT Station', metroWalk: 6, metroRick: 4, metroRickFare: 30, hasLeguna: false, legunaFare: 0, legunaMins: 0 },
      { name: 'Mirpur 11 / Pallabi / Kalshi', busHub: 'Kalshi Flyover Stand', busWalk: 7, busRick: 4, busRickFare: 35, metroHub: 'Pallabi MRT Station', metroWalk: 7, metroRick: 4, metroRickFare: 30, hasLeguna: true, legunaFare: 15, legunaMins: 4 },
      { name: 'Mirpur 12 / Ceramic / Purobi', busHub: 'Purobi / Kalshi Stand', busWalk: 6, busRick: 4, busRickFare: 35, metroHub: 'Mirpur 12 MRT Station', metroWalk: 8, metroRick: 4, metroRickFare: 35, hasLeguna: true, legunaFare: 15, legunaMins: 5 }
    ],
    destSubAreas: [
      { name: 'Gulshan 2 Circle', busHub: 'Kakoli Bus Stand', busWalk: 18, busRick: 12, busRickFare: 70, metroHub: 'Karwan Bazar MRT (Feeder)', metroWalk: 30, metroRick: 20, metroRickFare: 120, hasLeguna: false, legunaFare: 0, legunaMins: 0 },
      { name: 'Gulshan 1 Circle', busHub: 'Mohakhali Bus Stand', busWalk: 20, busRick: 14, busRickFare: 80, metroHub: 'Karwan Bazar MRT (Feeder)', metroWalk: 25, metroRick: 15, metroRickFare: 100, hasLeguna: true, legunaFare: 15, legunaMins: 8 },
      { name: 'Banani Road 11 / Kemal Ataturk', busHub: 'Kakoli Bus Stand', busWalk: 8, busRick: 5, busRickFare: 40, metroHub: 'Agargaon MRT (Feeder)', metroWalk: 25, metroRick: 15, metroRickFare: 90, hasLeguna: true, legunaFare: 15, legunaMins: 6 },
      { name: 'Mohakhali Wireless / DOHS', busHub: 'Mohakhali Stand', busWalk: 10, busRick: 6, busRickFare: 45, metroHub: 'Farmgate MRT (Feeder)', metroWalk: 22, metroRick: 14, metroRickFare: 80, hasLeguna: true, legunaFare: 15, legunaMins: 5 }
    ]
  },
  {
    id: 'uttara_farmgate',
    originShort: 'Uttara (Sectors 1-18)',
    destShort: 'Farmgate / Karwan Bazar',
    label: 'Uttara (Sectors 1-18) ➔ Farmgate / Karwan Bazar',
    reverseLabel: 'Farmgate / Karwan Bazar ➔ Uttara (Sectors 1-18)',
    keywords: ['uttara', 'farmgate', 'karwan bazar', 'airport', 'housebuilding', 'kamarpara', 'diabari'],
    subAreas: [
      { name: 'Uttara Housebuilding (Sector 7 / 9)', busHub: 'Housebuilding Airport Rd Stand', busWalk: 4, busRick: 2, busRickFare: 25, metroHub: 'Uttara North MRT Station', metroWalk: 20, metroRick: 12, metroRickFare: 60, hasLeguna: true, legunaFare: 15, legunaMins: 6 },
      { name: 'Uttara Sector 11 / 13 / 14', busHub: 'Jasimuddin Stand', busWalk: 12, busRick: 8, busRickFare: 50, metroHub: 'Uttara Center MRT Station', metroWalk: 18, metroRick: 10, metroRickFare: 50, hasLeguna: false, legunaFare: 0, legunaMins: 0 },
      { name: 'Uttara Sector 3 / 4 (Mascot Plaza)', busHub: 'Housebuilding Stand', busWalk: 6, busRick: 3, busRickFare: 30, metroHub: 'Uttara North MRT Station', metroWalk: 22, metroRick: 12, metroRickFare: 60, hasLeguna: false, legunaFare: 0, legunaMins: 0 },
      { name: 'Uttara Sector 15 / 16 (Diabari Hub)', busHub: 'Housebuilding Stand (Feeder)', busWalk: 30, busRick: 15, busRickFare: 70, metroHub: 'Uttara North MRT Station', metroWalk: 8, metroRick: 4, metroRickFare: 25, hasLeguna: true, legunaFare: 15, legunaMins: 4 }
    ],
    destSubAreas: [
      { name: 'Farmgate Indira Road', busHub: 'Farmgate Bus Stand', busWalk: 3, busRick: 1, busRickFare: 20, metroHub: 'Farmgate MRT Station', metroWalk: 3, metroRick: 1, metroRickFare: 20, hasLeguna: false, legunaFare: 0, legunaMins: 0 },
      { name: 'Karwan Bazar (Tejgaon / WASA)', busHub: 'Karwan Bazar Bus Stand', busWalk: 5, busRick: 2, busRickFare: 25, metroHub: 'Karwan Bazar MRT Station', metroWalk: 5, metroRick: 2, metroRickFare: 25, hasLeguna: false, legunaFare: 0, legunaMins: 0 }
    ]
  }
];

const ROUTES_DATA = [
  {
    id: 'bus_mirpur_banani',
    corridorId: 'mirpur10_banani',
    reverse: false,
    title: 'Via Direct Bus (Alim, Projoti)',
    mode: 'bus',
    baseDurationMins: 40,
    durations: [35, 45, 50, 42, 65, 38, 55, 48, 70, 41, 44, 52, 49, 61, 37, 43, 56, 47, 68, 53],
    costBdt: 35,
    busOperators: ['Alim Transport', 'Projoti Enterprise'],
    timeline: ['Mirpur 10', 'Kalshi Flyover', 'ECB Chattar', 'Kakoli', 'Mohakhali/Gulshan'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d29204.42858487373!2d90.37523179248443!3d23.801602410313554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x3755c0d6f6b8c2ff%3A0x3b131e548d1073d!2sMirpur%2010%20Roundabout%2C%20Dhaka!3m2!1d23.8069!2d90.3687!4m5!1s0x3755c7a0f70fe839%3A0xad5268cd02ecfa6c!2sBanani%2C%20Dhaka!3m2!1d23.7937!2d90.4066!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd'
  },
  {
    id: 'metro_mirpur_banani',
    corridorId: 'mirpur10_banani',
    reverse: false,
    title: 'Via Metro (MRT-6) + Feeder Connection',
    mode: 'metro',
    baseDurationMins: 25,
    durations: [24, 26, 25, 24, 27, 25, 26, 24, 25, 28, 25, 24, 26, 25, 25, 27, 24, 26, 25, 25],
    costBdt: 50,
    busOperators: ['DMTCL Metro Rail'],
    timeline: ['Mirpur 10 Metro Station', 'Agargaon Station', 'Farmgate Station (Transfer)', 'Gulshan/Banani Feeder Leg'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d29206.87913364955!2d90.36437190000002!3d23.788107699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x3755c0d6f6b8c2ff%3A0x3b131e548d1073d!2sMirpur%2010%20Roundabout%2C%20Dhaka!3m2!1d23.8069!2d90.3687!4m5!1s0x3755c7a0f70fe839%3A0xad5268cd02ecfa6c!2sBanani%2C%20Dhaka!3m2!1d23.7937!2d90.4066!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd'
  },
  {
    id: 'bus_uttara_farmgate',
    corridorId: 'uttara_farmgate',
    reverse: false,
    title: 'Via Express Bus (Ena, Bikash)',
    mode: 'bus',
    baseDurationMins: 55,
    durations: [45, 60, 75, 50, 90, 52, 65, 58, 110, 48, 54, 72, 68, 85, 47, 53, 78, 63, 105, 59],
    costBdt: 45,
    busOperators: ['Ena Transport', 'Bikash Paribahan'],
    timeline: ['Uttara Housebuilding', 'Airport Stand', 'Khilkhet', 'Banani', 'Farmgate'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d58399.19656816041!2d90.36502213123847!3d23.8159336682283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x3755c62fb24dc8c1%3A0x6336e4f3a7431201!2sUttara%2C%20Dhaka!3m2!1d23.8759!2d90.3795!4m5!1s0x3755c77dec2ad661%3A0x1d4a04ed05f63d!2sFarmgate%2C%20Dhaka!3m2!1d23.7561!2d90.3872!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd'
  },
  {
    id: 'metro_uttara_farmgate',
    corridorId: 'uttara_farmgate',
    reverse: false,
    title: 'Via Metro (MRT-6) - Direct High-Speed Rail',
    mode: 'metro',
    baseDurationMins: 20,
    durations: [20, 21, 20, 19, 22, 20, 21, 20, 20, 23, 20, 19, 21, 20, 20, 22, 19, 21, 20, 20],
    costBdt: 60,
    busOperators: ['DMTCL Metro Rail'],
    timeline: ['Uttara North MRT', 'Pallabi Station', 'Mirpur 10 Station', 'Agargaon Station', 'Farmgate MRT Station'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d58399.19656816041!2d90.36502213123847!3d23.8159336682283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x3755c62fb24dc8c1%3A0x6336e4f3a7431201!2sUttara%2C%20Dhaka!3m2!1d23.8759!2d90.3795!4m5!1s0x3755c77dec2ad661%3A0x1d4a04ed05f63d!2sFarmgate%2C%20Dhaka!3m2!1d23.7561!2d90.3872!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd'
  }
];

let selectedCorridorId = 'mirpur10_banani';
let isDirectionReverse = false;
let selectedSubAreaIndex = 0;
let activeModifiers = { rain: false, rush: false };

function initCorridors() {
  const selector = document.getElementById('routeSelector');
  selector.innerHTML = CORRIDORS.map(c => `
    <option value="${c.id}">${isDirectionReverse ? c.reverseLabel : c.label}</option>
  `).join('');
  selector.value = selectedCorridorId;
}

function handleSearchInput() {
  const input = document.getElementById('routeSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const dropdown = document.getElementById('searchResultsDropdown');
  const rawQuery = input.value.trim();
  const q = rawQuery.toLowerCase();

  if (!q) {
    clearBtn.classList.add('hidden');
    dropdown.classList.add('hidden');
    return;
  }
  clearBtn.classList.remove('hidden');

  const matches = [];

  CORRIDORS.forEach(c => {
    const forwardSubMatches = c.subAreas.filter(s => s.name.toLowerCase().includes(q));
    const reverseSubMatches = c.destSubAreas.filter(s => s.name.toLowerCase().includes(q));
    const labelForwardMatch = c.label.toLowerCase().includes(q) || c.originShort.toLowerCase().includes(q) || c.destShort.toLowerCase().includes(q);
    const labelReverseMatch = c.reverseLabel.toLowerCase().includes(q);
    const keywordMatch = c.keywords.some(k => k.includes(q));

    if (labelForwardMatch || forwardSubMatches.length > 0 || keywordMatch) {
      matches.push({
        corridorId: c.id,
        reverse: false,
        title: c.label,
        subtitle: forwardSubMatches.length > 0 ? `Sub-area: ${forwardSubMatches[0].name}` : `Direct Corridor Option`,
        badge: 'Forward A ➔ B'
      });
    }

    if (labelReverseMatch || reverseSubMatches.length > 0) {
      matches.push({
        corridorId: c.id,
        reverse: true,
        title: c.reverseLabel,
        subtitle: reverseSubMatches.length > 0 ? `Sub-area: ${reverseSubMatches[0].name}` : `Reverse Corridor Option`,
        badge: 'Reverse B ➔ A ⇄'
      });
    }
  });

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div class="p-4 text-xs text-slate-500 font-semibold leading-relaxed">
        No exact matches found for "<strong class="text-slate-800">${rawQuery}</strong>".<br>
        <span class="text-[11px] text-slate-400">Please choose one of our major configured corridors from the lists.</span>
      </div>
    `;
  } else {
    dropdown.innerHTML = matches.map(m => `
      <div onclick="selectSearchMatch('${m.corridorId}', ${m.reverse})" class="p-3 text-xs hover:bg-slate-50 cursor-pointer transition flex items-center justify-between">
        <div>
          <div class="font-extrabold text-slate-800">${m.title}</div>
          <div class="text-[11px] text-slate-400 font-semibold mt-0.5">${m.subtitle}</div>
        </div>
        <span class="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase tracking-wider">${m.badge}</span>
      </div>
    `).join('');
  }
  dropdown.classList.remove('hidden');
}

function selectSearchMatch(corridorId, reverse) {
  selectedCorridorId = corridorId;
  isDirectionReverse = reverse;
  document.getElementById('routeSearchInput').value = '';
  document.getElementById('clearSearchBtn').classElement = 'hidden';
  document.getElementById('searchResultsDropdown').classList.add('hidden');
  initCorridors();
  populateSubAreas(0);
}

function clearSearch() {
  document.getElementById('routeSearchInput').value = '';
  document.getElementById('clearSearchBtn').classList.add('hidden');
  document.getElementById('searchResultsDropdown').classList.add('hidden');
}

function populateSubAreas(defaultIndex = 0) {
  const c = CORRIDORS.find(item => item.id === selectedCorridorId);
  const areas = isDirectionReverse ? c.destSubAreas : c.subAreas;
  const selector = document.getElementById('subAreaSelector');

  selector.innerHTML = areas.map((a, idx) => `
    <option value="${idx}">${a.name}</option>
  `).join('');

  selectedSubAreaIndex = defaultIndex;
  selector.value = selectedSubAreaIndex;
  renderApp();
}

function toggleDirection() {
  isDirectionReverse = !isDirectionReverse;
  initCorridors();
  populateSubAreas(0);
}

function onRouteSelect(val) {
  selectedCorridorId = val;
  populateSubAreas(0);
}

function onSubAreaSelect(val) {
  selectedSubAreaIndex = parseInt(val, 10);
  renderApp();
}

function toggleModifier(key) {
  activeModifiers[key] = !activeModifiers[key];
  const btn = document.getElementById(`${key}Toggle`);
  if (activeModifiers[key]) {
    btn.className = "py-2.5 rounded-xl text-xs font-extrabold transition border border-emerald-500 bg-emerald-50 text-emerald-700";
  } else {
    btn.className = "py-2.5 rounded-xl text-xs font-extrabold transition border border-slate-200 bg-slate-50 text-slate-500";
  }
  renderApp();
}

function getPercentile(arr, p) {
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[index];
}

function renderApp() {
  const c = CORRIDORS.find(item => item.id === selectedCorridorId);
  const subAreasList = isDirectionReverse ? c.destSubAreas : c.subAreas;
  const activeSubArea = subAreasList[selectedSubAreaIndex];

  const confType = document.getElementById('confidenceModel').value;
  const percentileTarget = confType === 'p50' ? 50 : (confType === 'p80' ? 80 : 95);

  const matchedRoutes = ROUTES_DATA.filter(r => r.corridorId === selectedCorridorId && r.reverse === isDirectionReverse);
  const resultColumn = document.getElementById('resultColumn');
  resultColumn.innerHTML = '';

  // Calculate Dhaka Multiplier Factor
  let weatherMultiplier = 1.0;
  if (activeModifiers.rain) weatherMultiplier += 0.35; // 35% Monsoon Delay
  if (activeModifiers.rush) weatherMultiplier += 0.25; // 25% Thursday Rush Delay

  matchedRoutes.forEach(r => {
    // 1. Get raw percentile time from historical backtest array
    const rawTransitTime = getPercentile(r.durations, percentileTarget);
    const calculatedTransitTime = Math.round(rawTransitTime * weatherMultiplier);

    // 2. Feeder access Calculations
    const useMetro = r.mode === 'metro';
    const hasFeeder = useMetro && activeSubArea.hasLeguna;

    const feederMins = useMetro ? (hasFeeder ? activeSubArea.legunaMins : activeSubArea.busRick) : activeSubArea.busRick;
    const feederCost = useMetro ? (hasFeeder ? activeSubArea.legunaFare : activeSubArea.busRickFare) : activeSubArea.busRickFare;
    const feederName = useMetro ? (hasFeeder ? 'Shared Leguna / Auto' : 'Reserve Rickshaw') : 'Reserve Rickshaw';

    // 3. Compute Cumulative departure windows
    const totalMinutesNeeded = calculatedTransitTime + feederMins + 5; // adds standard 5 min transfer/buffer

    // Time Math
    const targetInput = document.getElementById('targetTime').value;
    const [h, m] = targetInput.split(':').map(Number);
    const targetDate = new Date();
    targetDate.setHours(h, m, 0, 0);

    const departureDate = new Date(targetDate.getTime() - totalMinutesNeeded * 60000);
    const formattedDeptTime = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // HTML Output Structure
    const card = document.createElement('div');
    card.className = "bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4";
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <h4 class="font-extrabold text-sm text-slate-900">${r.title}</h4>
        <span class="text-[10px] font-extrabold px-2.5 py-1 rounded-full ${r.mode === 'metro' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'} uppercase">
          ${r.mode.toUpperCase()}
        </span>
      </div>

      <!-- Departure Alert Panel -->
      <div class="p-4 rounded-2xl ${r.mode === 'metro' ? 'bg-indigo-50/50 text-indigo-950 border border-indigo-100' : 'bg-emerald-50/50 text-emerald-950 border border-emerald-100'} text-center space-y-1">
        <span class="text-[10px] font-bold uppercase tracking-wider block opacity-75">Leave Doorstep At</span>
        <div class="text-3xl font-black tracking-tight">${formattedDeptTime}</div>
        <p class="text-[11px] leading-relaxed opacity-90 font-medium">To reach your destination with high confidence at <strong>${targetInput}</strong>.</p>
      </div>

      <!-- Travel Time Breakdown -->
      <div class="grid grid-cols-3 gap-2.5 text-center text-xs font-semibold">
        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Feeder Access</span>
          <span class="text-slate-800 text-sm block mt-0.5 font-bold">${feederMins}m</span>
          <span class="text-[9px] text-slate-400 block">${feederName}</span>
        </div>
        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Transit Leg</span>
          <span class="text-slate-800 text-sm block mt-0.5 font-bold">${calculatedTransitTime}m</span>
          <span class="text-[9px] text-slate-400 block">${percentileTarget}th Percentile</span>
        </div>
        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Total Fare</span>
          <span class="text-slate-800 text-sm block mt-0.5 font-bold">৳${r.costBdt + feederCost}</span>
          <span class="text-[9px] text-slate-400 block">৳${feederCost} Feeder + ৳${r.costBdt}</span>
        </div>
      </div>

      <!-- Map embed container -->
      <div class="rounded-2xl overflow-hidden border border-slate-200">
        <iframe src="${r.mapUrl}" class="w-full h-40 border-0" allowfullscreen="" loading="lazy"></iframe>
      </div>
    `;
    resultColumn.appendChild(card);
  });
}

function openModal() {
  const select = document.getElementById('modalRouteSelect');
  select.innerHTML = ROUTES_DATA.map(r => `<option value="${r.id}">${r.title} (৳${r.costBdt})</option>`).join('');
  document.getElementById('logModal').classList.remove('hidden');
  document.getElementById('logModal').classList.add('flex');
}

function closeModal() {
  document.getElementById('logModal').classList.add('hidden');
  document.getElementById('logModal').classList.remove('flex');
}

function async function submitTripLog() {
  const routeId = document.getElementById('modalRouteSelect').value;
  const mins = parseInt(document.getElementById('modalDurationInput').value, 10);

  if (!mins || mins < 5 || mins > 300) {
    alert('Please enter a valid duration between 5 and 300 minutes.');
    return;
  }

  try {
    const isMetro = routeId.includes('metro');
    const { error } = await supabaseClient
      .from('trip_logs')
      .insert([
        {
          corridor_id: routeId,
          duration_mins: mins,
          commute_mode: isMetro ? 'metro' : 'bus',
          weather_condition: document.getElementById('rainToggle')?.checked ? 'rain' : 'normal',
          is_thursday: document.getElementById('thursdayToggle')?.checked || false
        }
      ]);

    if (error) throw error;

    alert('Success! Your commute log has been recorded to the live database.');
    document.getElementById('modalDurationInput').value = '';
    closeModal();
  } catch (err) {
    console.error('Error saving to database:', err);
    alert('Failed to connect to the database. Please check your network connection.');
  }
}
 {
  const routeId = document.getElementById('modalRouteSelect').value;
  const mins = parseInt(document.getElementById('modalDurationInput').value, 10);
  if (!mins || mins < 5) {
    alert('Please enter a valid duration in minutes.');
    return;
  }
  const route = ROUTES_DATA.find(r => r.id === routeId);
  if (route) {
    route.durations.push(mins);
  }
  document.getElementById('modalDurationInput').value = '';
  closeModal();
  renderApp();
}

initCorridors();
populateSubAreas(0);
