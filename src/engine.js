export class FirewallEngine {
  constructor() {
    this.rules = [
      { id: '1', direction: 'inbound', protocol: 'TCP', port: 80, action: 'allow', description: 'HTTP Traffic' },
      { id: '2', direction: 'inbound', protocol: 'TCP', port: 443, action: 'allow', description: 'HTTPS Traffic' },
      { id: '3', direction: 'outbound', protocol: 'ANY', port: 'ANY', action: 'allow', description: 'Allow all outgoing' },
    ];
    this.stats = {
      allowed: 0,
      blocked: 0,
      total: 0
    };
  }

  addRule(rule) {
    const newRule = {
      id: Math.random().toString(36).substr(2, 9),
      ...rule
    };
    this.rules.push(newRule);
    return newRule;
  }

  removeRule(id) {
    this.rules = this.rules.filter(r => r.id !== id);
  }

  checkPacket(packet) {
    this.stats.total++;
    
    // Find matching rule (last match usually wins in some firewalls, but here we scan for first block or last allow)
    // For simplicity: check if any block rule matches, otherwise check if any allow rule matches.
    // Default action: Block if no match (standard security practice)
    
    let action = 'block';
    
    for (const rule of this.rules) {
      if (this.matches(rule, packet)) {
        action = rule.action;
        // If we find a specific rule, we could break, but let's say "specific block" wins
        if (action === 'block') break;
      }
    }

    if (action === 'allow') {
      this.stats.allowed++;
    } else {
      this.stats.blocked++;
    }

    return action;
  }

  matches(rule, packet) {
    if (rule.direction !== 'ANY' && rule.direction !== packet.direction) return false;
    if (rule.protocol !== 'ANY' && rule.protocol !== packet.protocol) return false;
    if (rule.port !== 'ANY' && rule.port.toString() !== packet.port.toString()) return false;
    return true;
  }

  generateCommand(rule) {
    const dir = rule.direction === 'inbound' ? 'in' : 'out';
    const action = rule.action === 'allow' ? 'allow' : 'block';
    const proto = rule.protocol === 'ANY' ? 'any' : rule.protocol;
    const port = rule.port === 'ANY' ? 'any' : rule.port;
    
    return `netsh advfirewall firewall add rule name="Sentinel_${rule.description.replace(/\s/g, '_')}" dir=${dir} action=${action} protocol=${proto} localport=${port}`;
  }
}

export class TrafficSimulator {
  constructor(onPacket) {
    this.onPacket = onPacket;
    this.protocols = ['TCP', 'UDP', 'ICMP'];
    this.ports = [80, 443, 22, 21, 3389, 8080, 53, 123];
    this.ips = ['192.168.1.15', '10.0.0.5', '172.16.0.100', '8.8.8.8', '1.1.1.1'];
  }

  start() {
    this.interval = setInterval(() => {
      const packet = {
        direction: Math.random() > 0.3 ? 'inbound' : 'outbound',
        protocol: this.protocols[Math.floor(Math.random() * this.protocols.length)],
        port: this.ports[Math.floor(Math.random() * this.ports.length)],
        sourceIp: this.ips[Math.floor(Math.random() * this.ips.length)],
        destIp: '127.0.0.1',
        timestamp: new Date().toLocaleTimeString()
      };
      this.onPacket(packet);
    }, 1500);
  }

  stop() {
    clearInterval(this.interval);
  }
}
