/**
 * ANTARDRISHTI — AI-Powered Weak Signal Intelligence Network
 * Frontend Application Controller
 * Version: 2.0.0 | Hackathon Edition
 *
 * SAFETY NOTE: This system NEVER declares enemy/terrorist/infiltration.
 * All outputs are: anomaly detected, unusual activity, pattern emerging,
 * human verification recommended.
 */

'use strict';

/* ============================================================
   SECTION 1: INITIALISATION
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  gsap.registerPlugin(ScrollTrigger);

  initHeroCanvas();
  initParticles();
  initCounters();
  initLiveFeed();
  initAIWorkflow();
  initMiniMap();
  initMainMap();
  initSignalPieChart();
  initFusionFlow();
  initPatternAnalysis();
  initDigitalTwin();
  initAnomalyCards();
  initCorridorMap();
  initAlertCards();
  initAnalyticsCharts();
  initFutureCards();
  initFinalBannerCanvas();
  initObservationForm();
  initNavHighlight();
  initFilterButtons();
  startRealTimeSim();
});

/* ============================================================
   SECTION 2: HERO CANVAS — India Border Network Animation
============================================================ */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], edges = [], pulses = [];
  let animFrame;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildNodes();
  }

  // India approximate border waypoints (normalized 0-1)
  const BORDER_POINTS = [
    [0.42,0.08],[0.50,0.06],[0.60,0.09],[0.68,0.14],[0.72,0.22],
    [0.75,0.30],[0.78,0.38],[0.80,0.46],[0.76,0.56],[0.72,0.64],
    [0.68,0.70],[0.63,0.78],[0.56,0.84],[0.50,0.90],[0.44,0.85],
    [0.36,0.78],[0.28,0.72],[0.22,0.64],[0.18,0.54],[0.16,0.44],
    [0.18,0.34],[0.22,0.26],[0.28,0.18],[0.35,0.12],[0.42,0.08]
  ];

  function buildNodes() {
    nodes = [];
    edges = [];
    // Create scattered intelligence nodes
    for (let i = 0; i < 55; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        type: Math.random() > 0.8 ? 'alert' : 'normal',
        blink: Math.random() * Math.PI * 2
      });
    }
    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = dist(nodes[i], nodes[j]);
        if (d < 180) edges.push([i, j, d]);
      }
    }
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function spawnPulse() {
    if (nodes.length === 0) return;
    const n = nodes[Math.floor(Math.random() * nodes.length)];
    pulses.push({ x: n.x, y: n.y, r: 0, maxR: 60 + Math.random() * 40, alpha: 1 });
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // Draw border outline
    ctx.beginPath();
    BORDER_POINTS.forEach(([nx, ny], i) => {
      const x = nx * W, y = ny * H;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = 'rgba(0,229,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Edges
    edges.forEach(([i, j, d]) => {
      const a = nodes[i], b = nodes[j];
      const alpha = (1 - d / 180) * 0.15;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    // Pulses
    pulses.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,229,255,${p.alpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      p.r += 1.2;
      p.alpha -= 0.018;
      if (p.alpha <= 0) pulses.splice(idx, 1);
    });

    // Nodes
    nodes.forEach(n => {
      n.blink += 0.02;
      const glow = 0.4 + 0.3 * Math.sin(n.blink);
      const color = n.type === 'alert' ? `rgba(255,77,77,${glow})` : `rgba(0,229,255,${glow})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = n.type === 'alert' ? 12 : 8;
      ctx.shadowColor = n.type === 'alert' ? '#FF4D4D' : '#00E5FF';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Move
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    animFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { cancelAnimationFrame(animFrame); resize(); draw(0); });
  resize();
  draw(0);
  setInterval(spawnPulse, 800);
}

/* ============================================================
   SECTION 3: FLOATING PARTICLES
============================================================ */
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 20 + 15;
    const type = Math.random();
    const color = type > 0.7 ? '#00FF88' : type > 0.4 ? '#00E5FF' : '#FFC107';

    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      bottom: -10px;
      background:${color};
      box-shadow: 0 0 ${size * 3}px ${color};
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
    `;
    container.appendChild(p);
  }
}

/* ============================================================
   SECTION 4: ANIMATED COUNTERS
============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const heroVals = document.querySelectorAll('.stat-val[data-count]');

  const animateCounter = (el, target, duration = 2000) => {
    let start = 0;
    const step = timestamp => {
      if (!step.startTime) step.startTime = timestamp;
      const elapsed = timestamp - step.startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  // IntersectionObserver for KPI counters
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        if (!isNaN(target)) animateCounter(el, target);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => obs.observe(c));

  // Hero stats - animate on load with delay
  heroVals.forEach((el, i) => {
    const target = parseInt(el.dataset.count);
    setTimeout(() => animateCounter(el, target, 2500), 800 + i * 200);
  });
}

/* ============================================================
   SECTION 5: LIVE INTELLIGENCE FEED
============================================================ */
const FEED_DATA = [
  { type: 'drone_sound',    label: 'Drone Sound Detected',     loc: 'Sector 7 / LOC Area',  color: '#FFC107', time: '2m ago' },
  { type: 'dog_barking',    label: 'Continuous Dog Barking',   loc: 'Village Chakpur',       color: '#00E5FF', time: '4m ago' },
  { type: 'strange_lights', label: 'Strange Lights Observed',  loc: 'Borderline Rd. KM 48', color: '#FF4D4D', time: '7m ago' },
  { type: 'tire_tracks',    label: 'Tire Tracks Reported',     loc: 'Forest Path Zone 3',    color: '#FF8C00', time: '12m ago'},
  { type: 'disturbed_soil', label: 'Disturbed Soil Pattern',   loc: 'North Ridge Survey',    color: '#00FF88', time: '15m ago'},
  { type: 'vehicle_sound',  label: 'Unknown Vehicle Sound',    loc: 'Highway 44 Junction',   color: '#FFC107', time: '18m ago'},
  { type: 'smoke_smell',    label: 'Smoke Smell Reported',     loc: 'Pine Forest Zone A',    color: '#FF8C00', time: '22m ago'},
  { type: 'livestock_panic','label': 'Livestock Panic Event',   loc: 'Farmland Sector 12',   color: '#00E5FF', time: '25m ago'},
];

function initLiveFeed() {
  const container = document.getElementById('liveFeed');
  if (!container) return;

  function renderFeed(data) {
    container.innerHTML = '';
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'feed-item';
      div.innerHTML = `
        <span class="feed-dot" style="color:${item.color};background:${item.color}"></span>
        <div style="flex:1">
          <div style="font-size:0.82rem;color:#E2E8F0;font-weight:500">${item.label}</div>
          <div style="font-size:0.72rem;color:#64748B"><i class="bi bi-geo-alt me-1"></i>${item.loc}</div>
        </div>
        <span style="font-size:0.7rem;color:#64748B;white-space:nowrap">${item.time}</span>
      `;
      container.appendChild(div);
    });
  }

  renderFeed(FEED_DATA);

  // Simulate new signal every 8 seconds
  const newSignals = [
    { type: 'broken_fence', label: '⚠ Anomaly Identified — Fence Breach', loc: 'Perimeter Zone Delta', color: '#FF4D4D', time: 'just now' },
    { type: 'drone_sound',  label: '📡 Unusual Activity — Aerial Sound',  loc: 'Sector 11 North',      color: '#FFC107', time: 'just now' },
    { type: 'bird_dist',    label: '🐦 Bird Disturbance Pattern Emerging', loc: 'Valley Corridor B',    color: '#00FF88', time: 'just now' },
  ];
  let si = 0;
  setInterval(() => {
    const newItem = { ...newSignals[si % newSignals.length] };
    FEED_DATA.unshift(newItem);
    if (FEED_DATA.length > 10) FEED_DATA.pop();
    renderFeed(FEED_DATA);
    si++;
    showToast('New Signal', newItem.label, 'info');
  }, 8000);
}

/* ============================================================
   SECTION 6: AI WORKFLOW DIAGRAM
============================================================ */
function initAIWorkflow() {
  const el = document.getElementById('aiWorkflow');
  if (!el) return;

  const steps = [
    { icon: 'bi-person-fill',        label: 'Citizen Observation',  sub: 'Raw signal submission',       active: false },
    { icon: 'bi-cpu',                label: 'AI Verification',      sub: 'Automated quality check',     active: false },
    { icon: 'bi-diagram-2',          label: 'Pattern Detection',    sub: 'ML anomaly scoring',          active: true  },
    { icon: 'bi-broadcast',          label: 'Signal Fusion',        sub: 'Multi-source correlation',    active: false },
    { icon: 'bi-shield-exclamation', label: 'Risk Scoring',         sub: 'Probabilistic assessment',    active: false },
    { icon: 'bi-person-check',       label: 'Human Review',         sub: '⚠ Human decision required',  active: false },
    { icon: 'bi-flag',               label: 'Field Decision',       sub: 'Authorized action',           active: false },
  ];

  el.innerHTML = steps.map(s => `
    <div class="workflow-step">
      <div class="step-icon ${s.active ? 'active-step' : ''}"><i class="bi ${s.icon}"></i></div>
      <div class="step-text">
        <strong>${s.label}</strong>
        ${s.sub}
      </div>
    </div>
  `).join('');

  // Animate active step cycling
  let activeIdx = 2;
  setInterval(() => {
    const icons = el.querySelectorAll('.step-icon');
    icons.forEach((ic, i) => ic.classList.toggle('active-step', i === activeIdx));
    activeIdx = (activeIdx + 1) % steps.length;
  }, 1800);
}

/* ============================================================
   SECTION 7: MAPS — Mini & Main
============================================================ */
let mainMap, miniMap, miniMarker;

function initMiniMap() {
  miniMap = L.map('miniMap', { zoomControl: false, scrollWheelZoom: false }).setView([32.7266, 74.8570], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '', maxZoom: 18
  }).addTo(miniMap);

  miniMarker = L.marker([32.7266, 74.8570], { draggable: true }).addTo(miniMap);

  miniMap.on('click', e => {
    miniMarker.setLatLng(e.latlng);
    document.getElementById('latitude').value  = e.latlng.lat.toFixed(6);
    document.getElementById('longitude').value = e.latlng.lng.toFixed(6);
  });
  miniMarker.on('dragend', e => {
    const pos = e.target.getLatLng();
    document.getElementById('latitude').value  = pos.lat.toFixed(6);
    document.getElementById('longitude').value = pos.lng.toFixed(6);
  });
}

// Dummy observation data for map
const DUMMY_OBSERVATIONS = [
  { lat:32.72, lng:74.85, type:'drone_sound',    label:'Drone Sound',         risk:'high',   conf:82 },
  { lat:33.10, lng:74.20, type:'dog_barking',    label:'Dog Barking',         risk:'medium', conf:67 },
  { lat:32.45, lng:75.10, type:'strange_lights', label:'Strange Lights',      risk:'high',   conf:78 },
  { lat:34.08, lng:74.79, type:'tire_tracks',    label:'Tire Tracks',         risk:'medium', conf:55 },
  { lat:31.63, lng:74.86, type:'vehicle_sound',  label:'Vehicle Sound',       risk:'low',    conf:42 },
  { lat:30.73, lng:76.78, type:'smoke_smell',    label:'Smoke Smell',         risk:'low',    conf:38 },
  { lat:32.90, lng:73.99, type:'footprints',     label:'Footprints',          risk:'medium', conf:61 },
  { lat:33.72, lng:75.14, type:'broken_fence',   label:'Broken Fence',        risk:'high',   conf:88 },
  { lat:32.10, lng:77.05, type:'campfire',       label:'Campfire Observed',   risk:'medium', conf:50 },
  { lat:31.10, lng:77.17, type:'bird_dist',      label:'Bird Disturbance',    risk:'low',    conf:35 },
  { lat:34.50, lng:74.40, type:'drone_sound',    label:'Drone Sound',         risk:'high',   conf:91 },
  { lat:33.30, lng:73.80, type:'livestock',      label:'Livestock Panic',     risk:'medium', conf:60 },
];

const RISK_COLORS = { high: '#FF4D4D', medium: '#FF8C00', low: '#00FF88' };

function createMarkerIcon(risk) {
  const color = RISK_COLORS[risk] || '#00E5FF';
  return L.divIcon({
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${color};
      border:2px solid rgba(255,255,255,0.6);
      box-shadow:0 0 12px ${color};
    "></div>`,
    className: '', iconSize: [14, 14], iconAnchor: [7, 7]
  });
}

function initMainMap() {
  mainMap = L.map('mainMap', { zoomControl: true }).setView([30.5, 77.5], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap', maxZoom: 18
  }).addTo(mainMap);

  DUMMY_OBSERVATIONS.forEach(obs => {
    const marker = L.marker([obs.lat, obs.lng], { icon: createMarkerIcon(obs.risk) }).addTo(mainMap);
    marker.bindPopup(`
      <div style="min-width:160px">
        <div style="color:#00E5FF;font-weight:700;font-size:0.85rem;margin-bottom:4px">
          <i class="bi bi-geo-alt-fill"></i> ${obs.label}
        </div>
        <div style="font-size:0.75rem;margin-bottom:2px">
          📍 ${obs.lat.toFixed(4)}, ${obs.lng.toFixed(4)}
        </div>
        <div style="font-size:0.75rem;margin-bottom:4px">
          🤖 AI Confidence: <strong style="color:#00E5FF">${obs.conf}%</strong>
        </div>
        <div style="background:rgba(255,77,77,0.1);border:1px solid rgba(255,77,77,0.3);
             border-radius:6px;padding:3px 8px;font-size:0.72rem;color:#FF9999;margin-top:4px">
          ⚠ Unusual Activity Detected<br/>Human Verification Recommended
        </div>
      </div>
    `);
  });

  // Populate recent signals panel
  const signalList = document.getElementById('recentSignals');
  if (signalList) {
    DUMMY_OBSERVATIONS.slice(0, 6).forEach(obs => {
      const item = document.createElement('div');
      item.className = 'signal-item';
      item.style.borderLeftColor = RISK_COLORS[obs.risk];
      item.innerHTML = `
        <i class="bi bi-geo-alt" style="color:${RISK_COLORS[obs.risk]}"></i>
        <div>
          <div style="font-size:0.77rem;color:#E2E8F0;font-weight:500">${obs.label}</div>
          <div style="font-size:0.68rem;color:#64748B">${obs.conf}% confidence</div>
        </div>
      `;
      signalList.appendChild(item);
    });
  }
}

let currentLayer = 'markers';
function toggleLayer(layer) {
  currentLayer = layer;
  document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
  event.target.closest('.map-btn').classList.add('active');
  showToast('Map Layer', `Switched to ${layer} view`, 'info');
}

/* ============================================================
   SECTION 8: SIGNAL PIE CHART
============================================================ */
function initSignalPieChart() {
  const ctx = document.getElementById('signalPieChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Sound', 'Environmental', 'Light', 'Animal', 'Smell'],
      datasets: [{
        data: [34, 28, 18, 12, 8],
        backgroundColor: ['#00E5FF','#00FF88','#FFC107','#FF8C00','#A855F7'],
        borderColor: 'rgba(15,23,42,0.8)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#94A3B8', font: { size: 10 }, padding: 8 } }
      },
      cutout: '65%'
    }
  });
}

/* ============================================================
   SECTION 9: SIGNAL FUSION FLOW
============================================================ */
function initFusionFlow() {
  const el = document.getElementById('fusionFlow');
  if (!el) return;

  const nodes = [
    { label: '🔊 Drone Sound Detected',       delay: 0    },
    { label: '🐕 Continuous Dog Barking',      delay: 200  },
    { label: '💡 Strange Lights Observed',     delay: 400  },
    { label: '🚗 Tire Tracks Reported',        delay: 600  },
    { label: '👣 Footprints Found',            delay: 800  },
    { label: '🌿 Disturbed Soil Pattern',      delay: 1000 },
    { isResult: true, label: '🔴 Movement Corridor Detected\nAnomaly Identified — Human Verification Recommended', delay: 1200 }
  ];

  nodes.forEach((n, i) => {
    if (i > 0 && !n.isResult) {
      const arrow = document.createElement('div');
      arrow.className = 'fusion-arrow';
      arrow.innerHTML = '<i class="bi bi-arrow-down"></i>';
      el.appendChild(arrow);
    } else if (n.isResult) {
      const arrow = document.createElement('div');
      arrow.className = 'fusion-arrow';
      arrow.style.color = '#00FF88';
      arrow.innerHTML = '<i class="bi bi-arrow-down"></i>';
      el.appendChild(arrow);
    }
    const node = document.createElement('div');
    node.className = `fusion-node${n.isResult ? ' result-node' : ''}`;
    node.style.opacity = '0';
    node.style.transform = 'translateX(-20px)';
    node.textContent = n.label;
    el.appendChild(node);

    setTimeout(() => {
      node.style.transition = 'all 0.5s ease';
      node.style.opacity = '1';
      node.style.transform = 'translateX(0)';
    }, 800 + n.delay);
  });
}

/* ============================================================
   SECTION 10: PATTERN ANALYSIS
============================================================ */
function initPatternAnalysis() {
  const el = document.getElementById('patternAnalysis');
  if (!el) return;

  const metrics = [
    { label: 'Pattern Confidence', val: 82, color: '#FF4D4D', unit: '%' },
    { label: 'Signal Correlation',  val: 78, color: '#FFC107', unit: '%' },
    { label: 'Geo-Temporal Match',  val: 71, color: '#00E5FF', unit: '%' },
    { label: 'Historical Deviation',val: 67, color: '#FF8C00', unit: '%' },
    { label: 'Risk Score',          val: 85, color: '#A855F7', unit: '/100' },
  ];

  el.innerHTML = metrics.map(m => `
    <div class="pattern-metric">
      <span class="pattern-label">${m.label}</span>
      <div class="pattern-bar-wrap">
        <div class="pattern-bar" style="width:0%;background:${m.color}" data-target="${m.val}"></div>
      </div>
      <span class="pattern-val" style="color:${m.color}">${m.val}${m.unit}</span>
    </div>
  `).join('');

  // Animate bars when in viewport
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        el.querySelectorAll('.pattern-bar').forEach(bar => {
          bar.style.width = bar.dataset.target + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  obs.observe(el);
}

/* ============================================================
   SECTION 11: DIGITAL TWIN CHARTS
============================================================ */
function initDigitalTwin() {
  // Radar Chart — Activity Types
  const radarCtx = document.getElementById('radarChart');
  if (radarCtx) {
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Vehicle Activity','Light Activity','Animal Behaviour','Citizen Reports','Historical Obs','Sound Events'],
        datasets: [
          {
            label: 'Normal Baseline',
            data: [65, 59, 72, 81, 88, 55],
            borderColor: '#00FF88',
            backgroundColor: 'rgba(0,255,136,0.08)',
            borderWidth: 2,
            pointBackgroundColor: '#00FF88'
          },
          {
            label: 'Current Reading',
            data: [82, 90, 58, 74, 65, 88],
            borderColor: '#FF4D4D',
            backgroundColor: 'rgba(255,77,77,0.08)',
            borderWidth: 2,
            pointBackgroundColor: '#FF4D4D'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#94A3B8', font: { size: 11 } } } },
        scales: {
          r: {
            angleLines: { color: 'rgba(0,229,255,0.1)' },
            grid:        { color: 'rgba(0,229,255,0.1)' },
            pointLabels: { color: '#94A3B8', font: { size: 10 } },
            ticks:       { display: false }
          }
        }
      }
    });
  }

  // Trend Chart — 24h activity
  const trendCtx = document.getElementById('trendChart');
  if (trendCtx) {
    const hours = Array.from({length: 24}, (_, i) => `${String(i).padStart(2,'0')}:00`);
    const baseline = hours.map(() => 60 + Math.random() * 20);
    const current  = hours.map(() => 40 + Math.random() * 60);

    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [
          {
            label: 'Baseline',
            data: baseline,
            borderColor: '#00FF88',
            backgroundColor: 'rgba(0,255,136,0.05)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0
          },
          {
            label: 'Live',
            data: current,
            borderColor: '#00E5FF',
            backgroundColor: 'rgba(0,229,255,0.05)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 2,
            pointBackgroundColor: '#00E5FF'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#94A3B8', font: { size: 11 } } } },
        scales: {
          x: { ticks: { color: '#64748B', font: { size: 9 }, maxTicksLimit: 8 }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#64748B' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }

  // Animate metric gauges with ring approach
  animateGauges();
}

function animateGauges() {
  // Simple SVG ring gauge injected into each gauge container
  const gauges = [
    { id: 'gaugeNormal',    val: 94.2, color: '#00FF88' },
    { id: 'gaugeCurrent',   val: 71.8, color: '#FFC107' },
    { id: 'gaugeDeviation', val: 22.4, color: '#FF8C00' },
    { id: 'gaugeAnomaly',   val: 8.7,  color: '#FF4D4D' },
  ];

  gauges.forEach(g => {
    const el = document.getElementById(g.id);
    if (!el) return;
    const pct = g.val / 100;
    const r = 32, cx = 40, cy = 40;
    const circ = 2 * Math.PI * r;
    el.innerHTML = `
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="6"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
          stroke="${g.color}" stroke-width="6"
          stroke-dasharray="${circ}"
          stroke-dashoffset="${circ}"
          stroke-linecap="round"
          transform="rotate(-90 ${cx} ${cy})"
          id="ring_${g.id}"
          style="filter:drop-shadow(0 0 6px ${g.color})"
        />
      </svg>`;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const ring = document.getElementById(`ring_${g.id}`);
          if (ring) {
            ring.style.transition = 'stroke-dashoffset 1.5s ease';
            ring.style.strokeDashoffset = circ * (1 - pct);
          }
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
  });
}

/* ============================================================
   SECTION 12: AI ANOMALY CARDS
============================================================ */
const ANOMALY_DATA = [
  {
    id: 'ANM-2847',
    location: 'Sector 7 — LOC, J&K',
    confidence: 82,
    signals: ['Drone Sound', 'Dog Barking', 'Strange Lights', 'Tire Tracks'],
    risk: 'high',
    recommendation: 'Human Verification Recommended',
    time: '14 min ago'
  },
  {
    id: 'ANM-2851',
    location: 'Borderline Rd. KM 48',
    confidence: 71,
    signals: ['Flashing Lights', 'Vehicle Sound', 'Disturbed Soil'],
    risk: 'high',
    recommendation: 'Human Verification Recommended',
    time: '31 min ago'
  },
  {
    id: 'ANM-2839',
    location: 'Pine Forest Zone A',
    confidence: 58,
    signals: ['Campfire', 'Livestock Panic', 'Footprints'],
    risk: 'medium',
    recommendation: 'Pattern Monitoring Advised',
    time: '1h 12m ago'
  },
  {
    id: 'ANM-2831',
    location: 'North Ridge Survey Area',
    confidence: 44,
    signals: ['Broken Fence', 'Bird Disturbance'],
    risk: 'medium',
    recommendation: 'Emerging Pattern — Continue Monitoring',
    time: '2h 05m ago'
  },
  {
    id: 'ANM-2824',
    location: 'Highway 44 Junction',
    confidence: 36,
    signals: ['Unknown Sound', 'Dog Barking'],
    risk: 'low',
    recommendation: 'Anomaly Identified — Low Priority',
    time: '3h 40m ago'
  },
  {
    id: 'ANM-2819',
    location: 'Valley Corridor B',
    confidence: 29,
    signals: ['Bird Disturbance', 'Chemical Odor'],
    risk: 'low',
    recommendation: 'Anomaly Identified — Data Gathering',
    time: '5h 22m ago'
  },
];

function initAnomalyCards() {
  const container = document.getElementById('anomalyCards');
  if (!container) return;

  ANOMALY_DATA.forEach((a, i) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', String(i * 100));

    const riskClass = { high: 'risk-high', medium: 'risk-medium', low: 'risk-low' }[a.risk];
    const confColor = a.confidence > 70 ? '#FF4D4D' : a.confidence > 50 ? '#FF8C00' : '#00E5FF';

    col.innerHTML = `
      <div class="anomaly-card">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="anomaly-id">${a.id}</span>
          <span class="risk-badge ${riskClass}">${a.risk.toUpperCase()} PRIORITY</span>
        </div>
        <div style="font-size:0.8rem;color:#94A3B8;margin-bottom:0.5rem">
          <i class="bi bi-geo-alt me-1 text-cyan"></i>${a.location}
        </div>
        <div class="anomaly-signals">
          ${a.signals.map(s => `<span class="signal-tag">${s}</span>`).join('')}
        </div>
        <div style="font-size:0.75rem;color:#94A3B8;margin-bottom:0.25rem">
          AI Confidence: <span style="color:${confColor};font-weight:700">${a.confidence}%</span>
        </div>
        <div class="confidence-bar">
          <div class="confidence-fill" style="width:0%;background:${confColor}" data-target="${a.confidence}"></div>
        </div>
        <div style="background:rgba(255,193,7,0.06);border:1px solid rgba(255,193,7,0.2);
             border-radius:8px;padding:0.4rem 0.6rem;font-size:0.75rem;color:#FFC107;margin-top:0.5rem">
          <i class="bi bi-exclamation-triangle me-1"></i>${a.recommendation}
        </div>
        <div style="font-size:0.7rem;color:#475569;margin-top:0.5rem">
          <i class="bi bi-clock me-1"></i>${a.time}
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  // Animate confidence bars on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.confidence-fill').forEach(bar => {
          bar.style.transition = 'width 1.2s ease';
          bar.style.width = bar.dataset.target + '%';
        });
      }
    });
  }, { threshold: 0.1 });
  obs.observe(container);
}

/* ============================================================
   SECTION 13: MOVEMENT CORRIDOR MAP
============================================================ */
function initCorridorMap() {
  const el = document.getElementById('corridorMap');
  if (!el) return;

  const cMap = L.map('corridorMap').setView([32.8, 74.5], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '', maxZoom: 18
  }).addTo(cMap);

  const corridors = [
    {
      name: 'Corridor Alpha',
      points: [[33.2, 73.8], [32.9, 74.1], [32.6, 74.5], [32.3, 74.9]],
      color: '#FF4D4D', prob: 78, dir: 'South-East', time: '~6h estimate'
    },
    {
      name: 'Corridor Beta',
      points: [[34.1, 74.2], [33.7, 74.5], [33.3, 74.8], [32.9, 75.2]],
      color: '#FF8C00', prob: 61, dir: 'South-East', time: '~9h estimate'
    },
    {
      name: 'Corridor Gamma',
      points: [[33.5, 73.5], [33.2, 73.9], [32.8, 74.3]],
      color: '#FFC107', prob: 44, dir: 'South', time: '~5h estimate'
    }
  ];

  corridors.forEach(c => {
    const poly = L.polyline(c.points, {
      color: c.color, weight: 3, opacity: 0.8,
      dashArray: '8,6'
    }).addTo(cMap);
    poly.bindPopup(`
      <div>
        <strong style="color:${c.color}">${c.name}</strong><br/>
        Probability: ${c.prob}%<br/>
        Direction: ${c.dir}<br/>
        Timeline: ${c.time}
      </div>
    `);

    // Village node markers
    c.points.forEach((p, i) => {
      L.circleMarker(p, {
        radius: i === 0 ? 8 : 5,
        color: c.color, fillColor: c.color,
        fillOpacity: 0.8, weight: 2
      }).addTo(cMap).bindPopup(`
        <div style="font-size:0.8rem">
          <strong>Village ${String.fromCharCode(65 + i)}</strong><br/>
          <span style="color:${c.color}">${c.name}</span>
        </div>
      `);
    });
  });

  // Populate corridor list
  const listEl = document.getElementById('corridorList');
  if (listEl) {
    corridors.forEach(c => {
      listEl.innerHTML += `
        <div class="corridor-item">
          <div class="d-flex justify-content-between align-items-center">
            <span class="corridor-route" style="color:${c.color}">${c.name}</span>
            <span class="corridor-prob">${c.prob}%</span>
          </div>
          <div class="corridor-meta">
            <i class="bi bi-arrow-right-short"></i>${c.dir} &nbsp;|&nbsp;
            <i class="bi bi-clock me-1"></i>${c.time}
          </div>
          <div style="background:rgba(255,77,77,0.06);border:1px solid rgba(255,77,77,0.15);
               border-radius:6px;padding:3px 8px;font-size:0.7rem;color:#FFA0A0;margin-top:6px">
            ⚠ Emerging Pattern — Human Verification Recommended
          </div>
        </div>
      `;
    });
  }
}

/* ============================================================
   SECTION 14: ALERT MANAGEMENT
============================================================ */
const ALERT_DATA = [
  {
    id: 'ALT-4921', level: 'red', title: 'Unusual Activity Detected',
    loc: 'Sector 7 — LOC Zone', desc: 'Multiple converging signals. Drone sound + Strange lights + Tire tracks. AI pattern confidence: 82%.',
    time: '8 min ago', assigned: 'Unit Bravo-3'
  },
  {
    id: 'ALT-4918', level: 'red', title: 'Anomaly Identified',
    loc: 'Borderline KM 48', desc: 'Flashing light patterns deviating from baseline. Correlation with vehicle sound events.',
    time: '24 min ago', assigned: 'Unit Alpha-1'
  },
  {
    id: 'ALT-4912', level: 'orange', title: 'Emerging Pattern Detected',
    loc: 'Pine Forest Zone A', desc: 'Campfire + livestock panic cluster emerging. Deviation index: 18.4%.',
    time: '1h 05m ago', assigned: 'Under Review'
  },
  {
    id: 'ALT-4907', level: 'orange', title: 'Anomaly Identified',
    loc: 'North Ridge Survey', desc: 'Broken fence + bird disturbance correlation above threshold.',
    time: '2h 30m ago', assigned: 'Patrol-7'
  },
  {
    id: 'ALT-4899', level: 'yellow', title: 'Emerging Pattern Detected',
    loc: 'Highway 44 Junction', desc: 'Repeated unknown sounds over 4h window. Pattern confidence: 44%.',
    time: '4h 15m ago', assigned: 'Monitoring'
  },
  {
    id: 'ALT-4887', level: 'yellow', title: 'Anomaly Identified',
    loc: 'Valley Corridor B', desc: 'Unusual bird disturbance clusters. Low confidence — additional signals needed.',
    time: '6h 50m ago', assigned: 'Monitoring'
  },
  {
    id: 'ALT-4875', level: 'green', title: 'Pattern Under Observation',
    loc: 'Farmland Sector 12', desc: 'Single diesel smell report. Below pattern threshold. Monitoring continued.',
    time: '10h ago', assigned: 'Auto-Monitor'
  },
  {
    id: 'ALT-4861', level: 'green', title: 'Anomaly Identified — Closed',
    loc: 'Forest Path Zone 3', desc: 'Previously flagged tire tracks — verified routine agricultural activity.',
    time: '18h ago', assigned: 'Closed'
  },
];

const LEVEL_META = {
  red:    { color: '#FF4D4D', label: 'CRITICAL' },
  orange: { color: '#FF8C00', label: 'HIGH' },
  yellow: { color: '#FFC107', label: 'MEDIUM' },
  green:  { color: '#00FF88', label: 'LOW' },
};

function initAlertCards() {
  renderAlerts('all');
  document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAlerts(btn.dataset.filter);
    });
  });
}

function renderAlerts(filter) {
  const container = document.getElementById('alertCards');
  if (!container) return;
  container.innerHTML = '';

  const filtered = filter === 'all' ? ALERT_DATA : ALERT_DATA.filter(a => a.level === filter);
  filtered.forEach(a => {
    const meta = LEVEL_META[a.level];
    const col = document.createElement('div');
    col.className = 'col-lg-6 col-xl-3';
    col.innerHTML = `
      <div class="alert-card alert-${a.level}">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="alert-level-dot" style="background:${meta.color};color:${meta.color}"></span>
          <span style="font-size:0.68rem;color:${meta.color};font-weight:700;letter-spacing:1px">${meta.label}</span>
          <span style="font-size:0.68rem;color:#475569;margin-left:auto">${a.id}</span>
        </div>
        <div style="font-size:0.88rem;font-weight:700;color:#E2E8F0;margin-bottom:0.25rem">${a.title}</div>
        <div style="font-size:0.75rem;color:#94A3B8;margin-bottom:0.35rem">
          <i class="bi bi-geo-alt me-1"></i>${a.loc}
        </div>
        <div style="font-size:0.75rem;color:#64748B;line-height:1.4;margin-bottom:0.4rem">${a.desc}</div>
        <div style="font-size:0.7rem;color:#475569">
          <i class="bi bi-clock me-1"></i>${a.time} &nbsp;
          <i class="bi bi-person me-1"></i>${a.assigned}
        </div>
        <div class="alert-actions">
          <button class="btn-alert-action" onclick="alertAction('assign', '${a.id}')"><i class="bi bi-person-plus me-1"></i>Assign</button>
          <button class="btn-alert-action" onclick="alertAction('verify', '${a.id}')"><i class="bi bi-check2-circle me-1"></i>Verify</button>
          <button class="btn-alert-action" onclick="alertAction('patrol', '${a.id}')"><i class="bi bi-send me-1"></i>Patrol</button>
          <button class="btn-alert-action" onclick="alertAction('close', '${a.id}')"><i class="bi bi-x-circle me-1"></i>Close</button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function alertAction(action, id) {
  const msgs = {
    assign: `Officer assigned to ${id}`,
    verify: `Verification requested for ${id}`,
    patrol: `Patrol unit dispatched — ${id}`,
    close:  `Alert ${id} closed`
  };
  showToast('Alert Action', msgs[action], action === 'close' ? 'warning' : 'success');
}

function initFilterButtons() {
  // Filter already initialized in initAlertCards
}

/* ============================================================
   SECTION 15: ANALYTICS CHARTS
============================================================ */
function initAnalyticsCharts() {
  const days = Array.from({length:30}, (_,i) => `Jun ${i+1}`);

  // Trend Line
  const trendCtx = document.getElementById('trendLineChart');
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Observations',
            data: days.map(() => 80 + Math.random() * 120),
            borderColor: '#00E5FF', backgroundColor: 'rgba(0,229,255,0.05)',
            fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0
          },
          {
            label: 'Anomalies',
            data: days.map(() => 5 + Math.random() * 25),
            borderColor: '#FF4D4D', backgroundColor: 'rgba(255,77,77,0.05)',
            fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#94A3B8', font: { size: 11 } } } },
        scales: {
          x: { ticks: { color: '#64748B', font: { size: 9 }, maxTicksLimit: 10 }, grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { ticks: { color: '#64748B' }, grid: { color: 'rgba(255,255,255,0.04)' } }
        }
      }
    });
  }

  // Bar Chart — Signal Distribution
  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Sound', 'Environ', 'Light', 'Animal', 'Smell'],
        datasets: [{
          data: [34, 28, 18, 12, 8],
          backgroundColor: ['#00E5FF','#00FF88','#FFC107','#FF8C00','#A855F7'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#64748B', font: { size: 10 } }, grid: { display: false } },
          y: { ticks: { color: '#64748B' }, grid: { color: 'rgba(255,255,255,0.04)' } }
        }
      }
    });
  }

  // Risk Evolution
  const riskCtx = document.getElementById('riskChart');
  if (riskCtx) {
    new Chart(riskCtx, {
      type: 'line',
      data: {
        labels: days.slice(-14).map((_,i) => `Day ${i+1}`),
        datasets: [
          { label: 'High', data: Array.from({length:14},()=>Math.floor(3+Math.random()*12)), borderColor:'#FF4D4D', borderWidth:2, pointRadius:3, tension:0.4 },
          { label: 'Med',  data: Array.from({length:14},()=>Math.floor(8+Math.random()*20)), borderColor:'#FF8C00', borderWidth:2, pointRadius:3, tension:0.4 },
          { label: 'Low',  data: Array.from({length:14},()=>Math.floor(15+Math.random()*30)),borderColor:'#00FF88', borderWidth:2, pointRadius:3, tension:0.4 }
        ]
      },
      options: { responsive:true, plugins:{legend:{labels:{color:'#94A3B8',font:{size:10}}}}, scales:{x:{ticks:{color:'#64748B',font:{size:9}},grid:{display:false}},y:{ticks:{color:'#64748B'},grid:{color:'rgba(255,255,255,0.04)'}}} }
    });
  }

  // Regional
  const regCtx = document.getElementById('regionalChart');
  if (regCtx) {
    new Chart(regCtx, {
      type: 'bar',
      data: {
        labels: ['J&K', 'Punjab', 'HP', 'Uttarakhand', 'Rajasthan', 'Gujarat'],
        datasets: [{
          label: 'Activity Index',
          data: [88, 62, 45, 51, 38, 29],
          backgroundColor: ['#FF4D4D','#FF8C00','#FFC107','#00E5FF','#00FF88','#A855F7'],
          borderRadius: 6
        }]
      },
      options: { indexAxis:'y', responsive:true, plugins:{legend:{display:false}}, scales:{x:{ticks:{color:'#64748B'},grid:{color:'rgba(255,255,255,0.04)'}},y:{ticks:{color:'#94A3B8',font:{size:10}},grid:{display:false}}} }
    });
  }

  // Hotspot Growth
  const hotCtx = document.getElementById('hotspotChart');
  if (hotCtx) {
    new Chart(hotCtx, {
      type: 'line',
      data: {
        labels: ['W1','W2','W3','W4','W5','W6','W7','W8'],
        datasets: [
          {
            label: 'Hotspot Count',
            data: [12, 15, 18, 22, 19, 28, 35, 47],
            borderColor: '#FF4D4D',
            backgroundColor: 'rgba(255,77,77,0.08)',
            fill: true, tension: 0.4, borderWidth: 2,
            pointBackgroundColor: '#FF4D4D'
          }
        ]
      },
      options: { responsive:true, plugins:{legend:{labels:{color:'#94A3B8',font:{size:11}}}}, scales:{x:{ticks:{color:'#64748B'},grid:{display:false}},y:{ticks:{color:'#64748B'},grid:{color:'rgba(255,255,255,0.04)'}}} }
    });
  }
}

/* ============================================================
   SECTION 16: FUTURE EXPANSION CARDS
============================================================ */
function initFutureCards() {
  const container = document.getElementById('futureCards');
  if (!container) return;

  const cards = [
    { icon: '🛡️', title: 'Defense Intelligence', desc: 'Extended coverage for critical defense infrastructure and military movement correlation.', status: 'planned' },
    { icon: '🌪️', title: 'Disaster Prediction', desc: 'Real-time citizen signals feeding disaster early warning systems for floods, landslides.', status: 'planned' },
    { icon: '🔥', title: 'Forest Fire Detection', desc: 'Smoke smell + animal panic signals fused for early forest fire alerts up to 6h ahead.', status: 'dev' },
    { icon: '🐘', title: 'Wildlife Conflict Prevention', desc: 'Predictive corridors for human-wildlife interface zones using movement pattern AI.', status: 'planned' },
    { icon: '🦠', title: 'Disease Outbreak Monitoring', desc: 'Community health signals and unusual symptom clustering for outbreak early warning.', status: 'planned' },
    { icon: '🌿', title: 'Environmental Intelligence', desc: 'Chemical odor, water quality, air quality anomaly detection via crowd-sourced sensing.', status: 'dev' },
    { icon: '🏗️', title: 'Infrastructure Monitoring', desc: 'Bridge, road, dam anomaly detection via vibration and visual observation crowdsourcing.', status: 'planned' },
    { icon: '🌊', title: 'Coastal Surveillance', desc: 'Marine observation network for coastal anomaly detection and sea-lane monitoring.', status: 'planned' },
  ];

  cards.forEach((c, i) => {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', String((i % 4) * 100));
    col.innerHTML = `
      <div class="future-card">
        <div class="future-icon">${c.icon}</div>
        <div class="future-title">${c.title}</div>
        <div class="future-desc">${c.desc}</div>
        <div class="future-status status-${c.status}">
          ${c.status === 'dev' ? '🚧 In Development' : '📋 Planned'}
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

/* ============================================================
   SECTION 17: FINAL BANNER CANVAS
============================================================ */
function initFinalBannerCanvas() {
  const canvas = document.getElementById('bannerCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, points = [], connAngle = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    points = Array.from({length:30}, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    points.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,229,255,0.5)';
      ctx.fill();
    });
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
        if (d < 160) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${(1 - d/160) * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ============================================================
   SECTION 18: OBSERVATION FORM
============================================================ */
function initObservationForm() {
  const form = document.getElementById('observationForm');
  const success = document.getElementById('obsSuccess');
  const signalId = document.getElementById('signalId');
  const categoryLegend = document.getElementById('categoryLegend');

  // Category legend
  const legendItems = [
    { icon: '🌿', label: 'Environmental' },
    { icon: '💡', label: 'Light Activity' },
    { icon: '🔊', label: 'Sound Activity' },
    { icon: '🐕', label: 'Animal Behaviour' },
    { icon: '👃', label: 'Smell Activity' },
  ];
  if (categoryLegend) {
    categoryLegend.innerHTML = legendItems.map(l => `
      <div class="cat-item"><span class="cat-icon">${l.icon}</span><span>${l.label}</span></div>
    `).join('');
  }

  // Set default datetime to now
  const dtInput = document.getElementById('obsDateTime');
  if (dtInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dtInput.value = now.toISOString().slice(0, 16);
  }

  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitObsBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));

    const id = 'SIG-' + Date.now().toString(36).toUpperCase();
    if (signalId) signalId.textContent = id;
    if (success) success.classList.remove('d-none');

    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Weak Signal';

    showToast('Signal Submitted', `Observation ${id} added to intelligence network`, 'success');

    // Reset after delay
    setTimeout(() => {
      form.reset();
      if (success) success.classList.add('d-none');
      // Reset datetime
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      if (dtInput) dtInput.value = now.toISOString().slice(0, 16);
    }, 5000);
  });
}

/* ============================================================
   SECTION 19: NAVIGATION HIGHLIGHT ON SCROLL
============================================================ */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === '#' + sec.id) l.classList.add('active');
        });
      }
    });
  }, { passive: true });
}

/* ============================================================
   SECTION 20: TOAST NOTIFICATIONS
============================================================ */
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const colors = { success: '#00FF88', info: '#00E5FF', warning: '#FFC107', error: '#FF4D4D' };
  const icons  = { success: 'bi-check-circle-fill', info: 'bi-info-circle-fill', warning: 'bi-exclamation-triangle-fill', error: 'bi-x-circle-fill' };

  const toastEl = document.createElement('div');
  toastEl.className = 'toast show toast-alert';
  toastEl.setAttribute('role', 'alert');
  toastEl.innerHTML = `
    <div class="toast-header" style="background:transparent;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff">
      <i class="bi ${icons[type]} me-2" style="color:${colors[type]}"></i>
      <strong class="me-auto" style="font-size:0.82rem">${title}</strong>
      <button type="button" class="btn-close btn-close-white" onclick="this.closest('.toast').remove()"></button>
    </div>
    <div class="toast-body" style="font-size:0.8rem;color:#94A3B8">${message}</div>
  `;
  container.appendChild(toastEl);
  setTimeout(() => toastEl.remove(), 4000);
}

/* ============================================================
   SECTION 21: REAL-TIME SIMULATION
============================================================ */
function startRealTimeSim() {
  // Randomly update KPI cards
  setInterval(() => {
    const metrics = [
      { selector: '[data-target="124839"]', base: 124839, range: 5 },
      { selector: '[data-target="3847"]',   base: 3847,   range: 3 },
    ];
    metrics.forEach(m => {
      const el = document.querySelector(m.selector);
      if (el) {
        const newVal = m.base + Math.floor(Math.random() * m.range);
        el.textContent = newVal.toLocaleString();
      }
    });
  }, 5000);

  // Pulse anomaly cards periodically
  setInterval(() => {
    const cards = document.querySelectorAll('.anomaly-card');
    if (cards.length === 0) return;
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.style.boxShadow = '0 0 20px rgba(255,77,77,0.3)';
    setTimeout(() => randomCard.style.boxShadow = '', 1000);
  }, 6000);
}
