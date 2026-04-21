import { FirewallEngine, TrafficSimulator } from './engine.js';

const engine = new FirewallEngine();
const logs = document.getElementById('traffic-logs');
const rulesBody = document.getElementById('rules-body');

// Stats Elements
const totalEl = document.querySelector('#stat-total .value');
const allowedEl = document.querySelector('#stat-allowed .value');
const blockedEl = document.querySelector('#stat-blocked .value');

// Modal Elements
const ruleModal = document.getElementById('rule-modal');
const commandModal = document.getElementById('command-modal');
const addRuleForm = document.getElementById('add-rule-form');

function updateStats() {
  totalEl.textContent = engine.stats.total.toLocaleString();
  allowedEl.textContent = engine.stats.allowed.toLocaleString();
  blockedEl.textContent = engine.stats.blocked.toLocaleString();
}

function renderRulesTable() {
  rulesBody.innerHTML = '';
  engine.rules.forEach(rule => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${rule.direction.toUpperCase()}</td>
      <td>${rule.protocol}</td>
      <td>${rule.port}</td>
      <td><span class="badge badge-${rule.action}">${rule.action}</span></td>
      <td>
        <button class="btn-secondary btn-sm cmd-btn" data-id="${rule.id}">📜 Cmd</button>
        <button class="btn-secondary btn-sm delete-btn" data-id="${rule.id}">🗑️</button>
      </td>
    `;
    rulesBody.appendChild(tr);
  });

  // Attach listeners
  document.querySelectorAll('.cmd-btn').forEach(btn => {
    btn.onclick = () => {
      const rule = engine.rules.find(r => r.id === btn.dataset.id);
      showWindowsCommand(rule);
    };
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = () => {
      engine.removeRule(btn.dataset.id);
      renderRulesTable();
    };
  });
}

function addLogEntry(packet, action) {
  const entry = document.createElement('div');
  entry.className = `log-entry ${action === 'allow' ? 'allowed' : 'blocked'}`;
  
  entry.innerHTML = `
    <span class="log-time">${packet.timestamp}</span>
    <span class="log-action" style="color: ${action === 'allow' ? 'var(--success)' : 'var(--danger)'}">${action.toUpperCase()}</span>
    <span class="log-ip">${packet.sourceIp}:${packet.port}</span>
    <span class="log-info">${packet.direction.toUpperCase()} | ${packet.protocol}</span>
  `;

  logs.prepend(entry);
  
  // Keep only last 50 logs
  if (logs.children.length > 50) {
    logs.removeChild(logs.lastChild);
  }
}

function showWindowsCommand(rule) {
  const cmd = engine.generateCommand(rule);
  document.getElementById('generated-command').textContent = cmd;
  commandModal.classList.remove('hidden');
}

const simulator = new TrafficSimulator((packet) => {
  const action = engine.checkPacket(packet);
  addLogEntry(packet, action);
  updateStats();
});

// Event Listeners
document.getElementById('add-rule-btn').onclick = () => ruleModal.classList.remove('hidden');
document.getElementById('close-modal').onclick = () => ruleModal.classList.add('hidden');
document.getElementById('close-command-modal').onclick = () => commandModal.classList.add('hidden');

addRuleForm.onsubmit = (e) => {
  e.preventDefault();
  const rule = {
    description: document.getElementById('rule-desc').value,
    direction: document.getElementById('rule-dir').value,
    protocol: document.getElementById('rule-proto').value,
    port: document.getElementById('rule-port').value,
    action: document.getElementById('rule-action').value,
  };

  engine.addRule(rule);
  renderRulesTable();
  ruleModal.classList.add('hidden');
  addRuleForm.reset();
};

// Start
renderRulesTable();
simulator.start();
