(function () {
  const FILTERS = [
    {
      id: 'projects',
      label: '项目列表',
      icon: 'project',
      action: 'projects',
    },
    {
      id: 'github',
      label: 'GitHub 导入',
      icon: 'github',
      action: 'github-ui',
    },
    {
      id: 'docker',
      label: 'Docker 镜像',
      icon: 'docker',
      action: 'docker-ui',
    },
    {
      id: 'database',
      label: '创建数据库',
      icon: 'database',
      action: 'database-ui',
    },
    {
      id: 'app',
      label: '应用模板',
      icon: 'widgets',
      action: 'app-ui',
    },
    {
      id: 'devbox',
      label: 'DevBox',
      icon: 'vscode',
      action: 'devbox-ui',
    },
  ];

  const APP_LIBRARY = [
    {
      id: 'fastgpt',
      name: 'FastGPT',
      mark: 'FG',
      accent: '#6bdcff',
      description: '知识库、工作流和 AI 应用编排。',
      stack: 'Web / API / MongoDB',
    },
    {
      id: 'dify',
      name: 'Dify',
      mark: 'Df',
      accent: '#78f0a2',
      description: 'LLM 应用平台，支持 prompt、workflow 和运营配置。',
      stack: 'Web / API / PostgreSQL',
    },
    {
      id: 'n8n',
      name: 'n8n',
      mark: 'n8n',
      accent: '#ff9b67',
      description: '自动化工作流和 webhook 编排引擎。',
      stack: 'Editor / Worker / PostgreSQL',
    },
    {
      id: 'metabase',
      name: 'Metabase',
      mark: 'MB',
      accent: '#f6cb62',
      description: '数据看板与分析查询应用。',
      stack: 'Dashboard / API / PostgreSQL',
    },
  ];

  const DEVBOX_TEMPLATES = [
    {
      id: 'nodejs',
      name: 'Node.js',
      mark: 'JS',
      accent: '#8ddf65',
      type: 'Language',
      description: 'pnpm / TS',
      toolchain: 'Node.js 22 / pnpm / TypeScript / Docker CLI',
      defaultPort: '3000',
      versions: ['22', '20', '18'],
    },
    {
      id: 'python',
      name: 'Python',
      mark: 'Py',
      accent: '#ffd45f',
      type: 'Language',
      description: 'uv / API',
      toolchain: 'Python 3.12 / uv / pip / FastAPI / Jupyter',
      defaultPort: '8000',
      versions: ['3.12', '3.11', '3.10'],
    },
    {
      id: 'go',
      name: 'Go',
      mark: 'Go',
      accent: '#75dcff',
      type: 'Language',
      description: 'Air / Delve',
      toolchain: 'Go 1.24 / Air / Delve / Docker CLI',
      defaultPort: '8080',
      versions: ['1.24', '1.23', '1.22'],
    },
    {
      id: 'rust',
      name: 'Rust',
      mark: 'Rs',
      accent: '#f6aa65',
      type: 'Language',
      description: 'Cargo / Clippy',
      toolchain: 'Rust / Cargo / Clippy / rust-analyzer',
      defaultPort: '8080',
      versions: ['stable', '1.78', 'nightly'],
    },
    {
      id: 'cpp',
      name: 'C++',
      mark: 'C++',
      icon: 'cpp',
      accent: '#6fa8ff',
      type: 'Language',
      description: 'CMake / GDB',
      toolchain: 'C++ / Clang / GCC / CMake / GDB',
      defaultPort: '8080',
      versions: ['23', '20', '17'],
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      mark: 'Nx',
      accent: '#b2b9ff',
      type: 'Framework',
      description: 'React / SSR',
      toolchain: 'Node.js 22 / Next.js / React / pnpm',
      defaultPort: '3000',
      versions: ['15', '14', '13'],
    },
    {
      id: 'react',
      name: 'React',
      mark: 'Re',
      accent: '#65dfff',
      type: 'Framework',
      description: 'Vite / SPA',
      toolchain: 'Node.js 22 / React / Vite / pnpm',
      defaultPort: '5173',
      versions: ['19', '18'],
    },
    {
      id: 'vue',
      name: 'Vue',
      mark: 'Vu',
      accent: '#7bf0af',
      type: 'Framework',
      description: 'Vite / SPA',
      toolchain: 'Node.js 22 / Vue / Vite / pnpm',
      defaultPort: '5173',
      versions: ['3.5', '3.4', '2.7'],
    },
    {
      id: 'django',
      name: 'Django',
      mark: 'Dj',
      accent: '#73e1c6',
      type: 'Framework',
      description: 'Gunicorn / Admin',
      toolchain: 'Python 3.12 / Django / Gunicorn / uv',
      defaultPort: '8000',
      versions: ['5.1', '5.0', '4.2'],
    },
  ];

  const DEVBOX_IDE_CLIENTS = [
    {
      id: 'vscode',
      name: 'VS Code',
      mark: 'VS',
      accent: '#3ea6ff',
      note: 'Remote SSH',
    },
    {
      id: 'cursor',
      name: 'Cursor',
      mark: 'Cu',
      accent: '#7b89ff',
      note: 'Remote SSH',
    },
    {
      id: 'windsurf',
      name: 'Windsurf',
      mark: 'Ws',
      accent: '#63d8ff',
      note: 'Remote SSH',
    },
    {
      id: 'jetbrains',
      name: 'JetBrains',
      mark: 'JB',
      accent: '#ff7ad9',
      note: 'Gateway',
    },
  ];

  const dom = {
    navFilters: document.getElementById('navFilters'),
    nodeLayer: document.getElementById('nodeLayer'),
    edgeLayer: document.getElementById('edgeLayer'),
    canvasStage: document.getElementById('canvasStage'),
    canvasWorld: document.getElementById('canvasWorld'),
    canvasWorkspace: document.getElementById('canvasWorkspace'),
    chatTitle: document.getElementById('chatTitle'),
    chatScroll: document.getElementById('chatScroll'),
    chatContext: document.getElementById('chatContext'),
    chatLog: document.getElementById('chatLog'),
    chatForm: document.getElementById('chatForm'),
    chatInput: document.getElementById('chatInput'),
    agentBadge: document.getElementById('agentBadge'),
    agentMode: document.getElementById('agentMode'),
    domainCount: document.getElementById('domainCount'),
    instanceCount: document.getElementById('instanceCount'),
  };

  const state = {
    filter: 'all',
    nodes: [],
    edges: [],
    messages: [],
    timeline: [],
    selectedNodeId: null,
    dragging: null,
    agentBusy: false,
    currentTask: '待命',
    lastIssue: null,
    databaseView: null,
    entryView: null,
    containerView: null,
    devboxView: null,
    suppressClickNodeId: null,
  };

  let rafHandle = 0;
  const DEFAULT_CHAT_PLACEHOLDER = '输入 GitHub 仓库、镜像、数据库需求，或让 Agent 修复部署失败';

  function createId(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function slugifyText(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'workspace';
  }

  function normalizeStringList(value) {
    const items = Array.isArray(value) ? value : String(value || '').split(/[\n,]/);

    return [...new Set(items.map((item) => String(item || '').trim()).filter(Boolean))];
  }

  function entryToken(text) {
    return slugifyText(text).replace(/_/g, '-');
  }

  function defaultEntryWhitelist() {
    return ['203.0.113.24', '198.51.100.18', '192.0.2.44/32'];
  }

  function normalizeEntryHealth(value) {
    return String(value || '').toLowerCase() === 'issue' ? 'issue' : 'healthy';
  }

  function createEntryConfig(options = {}) {
    const externalDomain = String(options.externalDomain || options.domain || '').trim();
    const target = String(options.target || '').trim() || externalDomain || 'Workspace Entry';

    return {
      target,
      externalDomain,
      internalDomain: String(options.internalDomain || `${entryToken(target)}.region.internal`).trim(),
      cnameHost: String(options.cnameHost || externalDomain).trim(),
      cnameTarget: String(options.cnameTarget || 'gateway.sealos.run').trim(),
      whitelist: normalizeStringList(options.whitelist || defaultEntryWhitelist()),
      externalStatus: normalizeEntryHealth(options.externalStatus),
      internalStatus: normalizeEntryHealth(options.internalStatus),
    };
  }

  function syncEntryNode(node) {
    if (!node || node.type !== 'entry') {
      return node;
    }

    const details = node.details || {};
    const config = createEntryConfig({
      target: (node.entryConfig && node.entryConfig.target) || details.target || node.title,
      externalDomain:
        (node.entryConfig && node.entryConfig.externalDomain) || details.externalDomain || details.domain || node.title,
      internalDomain: (node.entryConfig && node.entryConfig.internalDomain) || details.internalDomain,
      cnameHost: (node.entryConfig && node.entryConfig.cnameHost) || details.cnameHost,
      cnameTarget: (node.entryConfig && node.entryConfig.cnameTarget) || details.cnameTarget,
      whitelist: (node.entryConfig && node.entryConfig.whitelist) || details.whitelist,
      externalStatus: (node.entryConfig && node.entryConfig.externalStatus) || details.externalStatus,
      internalStatus: (node.entryConfig && node.entryConfig.internalStatus) || details.internalStatus,
    });

    node.status = 'Accessible';
    node.subtitle = '';
    node.tags = [];
    node.entryConfig = config;
    node.details = {
      ...details,
      target: config.target,
      domain: config.externalDomain,
      externalDomain: config.externalDomain,
      internalDomain: config.internalDomain,
      cnameHost: config.cnameHost,
      cnameTarget: config.cnameTarget,
      whitelist: [...config.whitelist],
      externalStatus: config.externalStatus,
      internalStatus: config.internalStatus,
    };

    return node;
  }

  function trimNumeric(value, digits = 1) {
    return String(Number(Number(value || 0).toFixed(digits)));
  }

  function parseMemoryValue(value) {
    const match = String(value || '').trim().match(/^(\d+(?:\.\d+)?)(Mi|Gi)$/i);
    if (!match) {
      return null;
    }

    return {
      amount: Number(match[1]),
      unit: match[2],
    };
  }

  function parseCpuValue(value) {
    const amount = Number(String(value || '').trim());
    return Number.isFinite(amount) ? amount : 0;
  }

  function parseCapacityValue(value) {
    const match = String(value || '').trim().match(/^(\d+(?:\.\d+)?)(Mi|Gi|Ti)$/i);
    if (!match) {
      return null;
    }

    const amount = Number(match[1]);
    const unit = match[2];
    const factor =
      {
        Mi: 1,
        Gi: 1024,
        Ti: 1024 * 1024,
      }[unit] || 1;

    return {
      amount,
      unit,
      baseMi: amount * factor,
    };
  }

  function resourceUsagePercent(used, total, kind = 'capacity') {
    const totalAmount = kind === 'cpu' ? parseCpuValue(total) : (parseCapacityValue(total) || {}).baseMi;
    const usedAmount = kind === 'cpu' ? parseCpuValue(used) : (parseCapacityValue(used) || {}).baseMi;

    if (!Number.isFinite(totalAmount) || !Number.isFinite(usedAmount) || totalAmount <= 0) {
      return 0;
    }

    return Math.max(0, Math.min(100, Math.round((usedAmount / totalAmount) * 100)));
  }

  function estimateUsedCpu(cpu) {
    const amount = Number(String(cpu || '1').trim());
    if (!Number.isFinite(amount) || amount <= 0) {
      return '0.4';
    }

    return trimNumeric(Math.max(0.2, amount * 0.42), amount < 1 ? 2 : 1);
  }

  function estimateUsedMemory(memory) {
    const parsed = parseMemoryValue(memory);
    if (!parsed) {
      return '420Mi';
    }

    if (parsed.unit.toLowerCase() === 'gi') {
      return `${trimNumeric(Math.max(0.5, parsed.amount * 0.46))}Gi`;
    }

    return `${Math.max(128, Math.round(parsed.amount * 0.46))}Mi`;
  }

  function estimateUsedDisk(diskSize) {
    const parsed = parseCapacityValue(diskSize);
    if (!parsed) {
      return '8Gi';
    }

    if (parsed.unit.toLowerCase() === 'ti') {
      return `${trimNumeric(Math.max(0.2, parsed.amount * 0.38))}Ti`;
    }

    if (parsed.unit.toLowerCase() === 'gi') {
      return `${trimNumeric(Math.max(2, parsed.amount * 0.38))}Gi`;
    }

    return `${Math.max(512, Math.round(parsed.amount * 0.38))}Mi`;
  }

  function inferContainerReplicas(node, fallback) {
    const text = [node && node.subtitle, ...(node && node.tags ? node.tags : [])].join(' ');
    const match = String(text).match(/(\d+)\s*副本/);
    return match ? match[1] : String(fallback || '1');
  }

  function createContainerConfig(options = {}) {
    const cpu = String(options.cpu || '1').trim();
    const memory = String(options.memory || '1Gi').trim();
    const stateful =
      typeof options.stateful === 'boolean' ? options.stateful : Boolean(options.mountDisk);

    return {
      image: String(options.image || 'registry.local/container:latest').trim(),
      replicas: String(options.replicas || '1').trim(),
      cpu,
      memory,
      quotaCpu: String(options.quotaCpu || cpu).trim(),
      quotaMemory: String(options.quotaMemory || memory).trim(),
      usedCpu: String(options.usedCpu || estimateUsedCpu(options.quotaCpu || cpu)).trim(),
      usedMemory: String(options.usedMemory || estimateUsedMemory(options.quotaMemory || memory)).trim(),
      envVars: String(options.envVars || '').trim(),
      startArgs: String(options.startArgs || '').trim(),
      stateful,
      mountDisk: stateful,
      diskSize: String(options.diskSize || (stateful ? '20Gi' : '')).trim(),
      diskUsed: String(options.diskUsed || (stateful ? estimateUsedDisk(options.diskSize || '20Gi') : '')).trim(),
      mountPath: String(options.mountPath || (stateful ? '/data' : '')).trim(),
    };
  }

  function syncContainerNode(node) {
    if (!node || node.type !== 'container') {
      return node;
    }

    const details = node.details || {};
    const nextConfig = {
      ...createContainerConfig({
        image: details.image,
        replicas: inferContainerReplicas(node, '1'),
        cpu: details.cpu || '1',
        memory: details.memory || '1Gi',
        quotaCpu: details.quotaCpu || details.cpu,
        quotaMemory: details.quotaMemory || details.memory,
        usedCpu: details.usedCpu,
        usedMemory: details.usedMemory,
        envVars: details.envVars,
        startArgs: details.entrypoint || details.startArgs,
        stateful: details.stateful,
        mountDisk: details.mountDisk,
        diskSize: details.diskSize,
        diskUsed: details.diskUsed,
        mountPath: details.mountPath,
      }),
      ...(node.containerConfig || {}),
    };

    nextConfig.stateful =
      typeof nextConfig.stateful === 'boolean' ? nextConfig.stateful : Boolean(nextConfig.mountDisk);
    nextConfig.mountDisk = Boolean(nextConfig.stateful || nextConfig.mountDisk);
    if (!nextConfig.quotaCpu) {
      nextConfig.quotaCpu = nextConfig.cpu;
    }
    if (!nextConfig.quotaMemory) {
      nextConfig.quotaMemory = nextConfig.memory;
    }
    if (!nextConfig.usedCpu) {
      nextConfig.usedCpu = estimateUsedCpu(nextConfig.quotaCpu);
    }
    if (!nextConfig.usedMemory) {
      nextConfig.usedMemory = estimateUsedMemory(nextConfig.quotaMemory);
    }
    if (nextConfig.mountDisk && !nextConfig.diskSize) {
      nextConfig.diskSize = '20Gi';
    }
    if (nextConfig.mountDisk && !nextConfig.diskUsed) {
      nextConfig.diskUsed = estimateUsedDisk(nextConfig.diskSize);
    }
    if (nextConfig.mountDisk && !nextConfig.mountPath) {
      nextConfig.mountPath = '/data';
    }

    node.containerConfig = nextConfig;
    node.subtitle = '';
    node.tags = [];
    node.details = {
      ...details,
      image: nextConfig.image,
      replicas: `${nextConfig.replicas} 副本`,
      cpu: nextConfig.cpu,
      memory: nextConfig.memory,
      quotaCpu: nextConfig.quotaCpu,
      quotaMemory: nextConfig.quotaMemory,
      usedCpu: nextConfig.usedCpu,
      usedMemory: nextConfig.usedMemory,
      quota: `${nextConfig.quotaCpu} CPU / ${nextConfig.quotaMemory}`,
      used: `${nextConfig.usedCpu} CPU / ${nextConfig.usedMemory}`,
      envVars: nextConfig.envVars,
      entrypoint: nextConfig.startArgs,
      stateful: nextConfig.mountDisk,
      diskSize: nextConfig.diskSize,
      diskUsed: nextConfig.diskUsed,
      mountPath: nextConfig.mountPath,
      runtime: `${nextConfig.cpu} CPU / ${nextConfig.memory}`,
    };

    return node;
  }

  function defaultDevboxStartCommand(template, port) {
    const normalizedPort = String(port || (template && template.defaultPort) || '3000').replace(/\/tcp$/i, '');
    const templateId = template && template.id;

    if (templateId === 'python') {
      return 'uv run main.py';
    }

    if (templateId === 'go') {
      return 'air';
    }

    if (templateId === 'rust') {
      return 'cargo run';
    }

    if (templateId === 'cpp') {
      return './build/app';
    }

    if (templateId === 'django') {
      return `uv run manage.py runserver 0.0.0.0:${normalizedPort}`;
    }

    if (templateId === 'nextjs' || templateId === 'react' || templateId === 'vue' || templateId === 'nodejs') {
      return `pnpm dev --host 0.0.0.0 --port ${normalizedPort}`;
    }

    return 'sleep infinity';
  }

  function createDevboxConfig(options = {}) {
    const template =
      getDevboxTemplateById(options.templateId) ||
      getDevboxTemplateById(options.templateName) ||
      resolveDevboxTemplate(options.templateName || options.title || 'nodejs');
    const cpu = String(options.cpu || '4').trim();
    const memory = String(options.memory || '8Gi').trim();
    const diskSize = String(options.diskSize || '50Gi').trim();
    const port = String(options.port || (template && template.defaultPort) || '3000')
      .trim()
      .replace(/\/tcp$/i, '');

    return {
      templateId: template ? template.id : 'nodejs',
      templateName: template ? template.name : 'Node.js',
      version: String(options.version || defaultDevboxVersion(template)).trim(),
      cpu,
      memory,
      quotaCpu: String(options.quotaCpu || cpu).trim(),
      quotaMemory: String(options.quotaMemory || memory).trim(),
      usedCpu: String(options.usedCpu || estimateUsedCpu(options.quotaCpu || cpu)).trim(),
      usedMemory: String(options.usedMemory || estimateUsedMemory(options.quotaMemory || memory)).trim(),
      diskSize,
      diskUsed: String(options.diskUsed || estimateUsedDisk(diskSize)).trim(),
      startCommand: String(options.startCommand || defaultDevboxStartCommand(template, port)).trim(),
      port,
    };
  }

  function syncDevboxNode(node) {
    if (!node || node.type !== 'devbox') {
      return node;
    }

    const details = node.details || {};
    const nextConfig = {
      ...createDevboxConfig({
        templateId: details.templateId,
        templateName: details.templateName || details.template,
        version: details.version,
        cpu: details.cpu,
        memory: details.memory,
        quotaCpu: details.quotaCpu || details.cpu,
        quotaMemory: details.quotaMemory || details.memory,
        usedCpu: details.usedCpu,
        usedMemory: details.usedMemory,
        diskSize: details.diskSize,
        diskUsed: details.diskUsed,
        startCommand: details.startCommand,
        port: details.port,
        title: node.title,
      }),
      ...(node.devboxConfig || {}),
    };

    if (!nextConfig.quotaCpu) {
      nextConfig.quotaCpu = nextConfig.cpu;
    }
    if (!nextConfig.quotaMemory) {
      nextConfig.quotaMemory = nextConfig.memory;
    }
    if (!nextConfig.usedCpu) {
      nextConfig.usedCpu = estimateUsedCpu(nextConfig.quotaCpu);
    }
    if (!nextConfig.usedMemory) {
      nextConfig.usedMemory = estimateUsedMemory(nextConfig.quotaMemory);
    }
    if (!nextConfig.diskSize) {
      nextConfig.diskSize = '50Gi';
    }
    if (!nextConfig.diskUsed) {
      nextConfig.diskUsed = estimateUsedDisk(nextConfig.diskSize);
    }

    node.devboxConfig = nextConfig;
    node.subtitle = '';
    node.tags = [];
    node.details = {
      ...details,
      templateId: nextConfig.templateId,
      templateName: nextConfig.templateName,
      version: nextConfig.version,
      cpu: nextConfig.cpu,
      memory: nextConfig.memory,
      quotaCpu: nextConfig.quotaCpu,
      quotaMemory: nextConfig.quotaMemory,
      usedCpu: nextConfig.usedCpu,
      usedMemory: nextConfig.usedMemory,
      diskSize: nextConfig.diskSize,
      diskUsed: nextConfig.diskUsed,
      startCommand: nextConfig.startCommand,
      port: nextConfig.port,
    };

    return node;
  }

  function databaseFlavorFromNode(node) {
    const connect = String(node && node.details && node.details.connect ? node.details.connect : '').toLowerCase();
    const title = String(node && node.title ? node.title : '').toLowerCase();

    if (connect.startsWith('postgres') || /postgres|pgsql/.test(title)) {
      return 'PostgreSQL';
    }

    if (connect.startsWith('mysql') || /mysql/.test(title)) {
      return 'MySQL';
    }

    if (connect.startsWith('redis') || /redis/.test(title)) {
      return 'Redis';
    }

    if (connect.startsWith('mongodb') || /mongo/.test(title)) {
      return 'MongoDB';
    }

    return 'PostgreSQL';
  }

  function supportsDatabaseWorkspace(node) {
    return Boolean(node && node.type === 'database' && databaseFlavorFromNode(node) === 'PostgreSQL');
  }

  function databaseSpecProfile(instanceSpec) {
    const profiles = {
      'db.mysql.small': { cpu: '1', memory: '2Gi' },
      'db.mysql.medium': { cpu: '2', memory: '4Gi' },
      'db.mysql.large': { cpu: '4', memory: '8Gi' },
      'db.pg.small': { cpu: '2', memory: '4Gi' },
      'db.pg.medium': { cpu: '4', memory: '8Gi' },
      'db.pg.large': { cpu: '8', memory: '16Gi' },
      'db.redis.small': { cpu: '1', memory: '2Gi' },
      'db.redis.medium': { cpu: '2', memory: '4Gi' },
      'db.redis.large': { cpu: '4', memory: '8Gi' },
      'db.mongo.small': { cpu: '2', memory: '4Gi' },
      'db.mongo.medium': { cpu: '4', memory: '8Gi' },
      'db.mongo.large': { cpu: '8', memory: '16Gi' },
    };

    return profiles[instanceSpec] || { cpu: '2', memory: '4Gi' };
  }

  function defaultDatabaseVersion(flavor) {
    if (flavor === 'PostgreSQL') {
      return '16.4';
    }

    if (flavor === 'MySQL') {
      return '8.4';
    }

    if (flavor === 'Redis') {
      return '7.2';
    }

    if (flavor === 'MongoDB') {
      return '7.0';
    }

    return 'latest';
  }

  function inferDatabaseReplicas(node, fallback) {
    const text = [node && node.subtitle, ...(node && node.tags ? node.tags : [])].join(' ');
    const match = String(text).match(/(\d+)\s*副本/);
    return match ? match[1] : String(fallback || '2');
  }

  function inferDatabaseInstanceSpec(node, flavor) {
    const text = [node && node.subtitle, ...(node && node.tags ? node.tags : [])].join(' ');
    const match = String(text).match(/db\.[a-z.]+/i);
    if (match) {
      return match[0];
    }

    if (flavor === 'PostgreSQL') {
      return /ha/i.test(String(node && node.title ? node.title : '')) ? 'db.pg.large' : 'db.pg.medium';
    }

    if (flavor === 'MySQL') {
      return 'db.mysql.medium';
    }

    if (flavor === 'Redis') {
      return 'db.redis.medium';
    }

    if (flavor === 'MongoDB') {
      return 'db.mongo.medium';
    }

    return 'db.pg.medium';
  }

  function inferDatabaseName(node) {
    const connect = String(node && node.details && node.details.connect ? node.details.connect : '');
    const connectMatch = connect.match(/\/([a-z0-9_]+)$/i);
    if (connectMatch) {
      return connectMatch[1];
    }

    const title = String(node && node.title ? node.title : '');
    if (/orders/i.test(title)) {
      return 'orders';
    }
    if (/dify/i.test(title)) {
      return 'dify';
    }
    if (/n8n/i.test(title)) {
      return 'n8n';
    }
    if (/metabase/i.test(title)) {
      return 'metabase';
    }

    return slugifyText(title.replace(/\b(cluster|data|postgresql|ha)\b/gi, '')) || 'workspace';
  }

  function createDatabaseConfig(flavor, options = {}) {
    const instanceSpec = options.instanceSpec || inferDatabaseInstanceSpec(options.node, flavor);
    const profile = databaseSpecProfile(instanceSpec);

    return {
      flavor,
      version: options.version || defaultDatabaseVersion(flavor),
      instanceSpec,
      cpu: String(options.cpu || profile.cpu),
      memory: String(options.memory || profile.memory),
      usedCpu: String(options.usedCpu || estimateUsedCpu(options.cpu || profile.cpu)),
      usedMemory: String(options.usedMemory || estimateUsedMemory(options.memory || profile.memory)),
      replicas: String(options.replicas || inferDatabaseReplicas(options.node, '2')),
      storage: String(options.storage || (flavor === 'PostgreSQL' ? '200Gi' : '100Gi')),
      backupPolicy: String(
        options.backupPolicy ||
          ((options.node && options.node.details && options.node.details.backup) || 'PITR / Hourly')
      ),
    };
  }

  function createWorkspaceTable(name, columns, rows, indexes) {
    const ddl = [
      `CREATE TABLE public.${name} (`,
      columns
        .map((column) => {
          const parts = [`  ${column.name} ${column.type}`];
          if (column.constraints) {
            parts.push(column.constraints);
          }
          if (column.default) {
            parts.push(`DEFAULT ${column.default}`);
          }
          return parts.join(' ');
        })
        .join(',\n'),
      ');',
    ].join('\n');

    return {
      id: name,
      name,
      rowCount: rows.length,
      columns,
      rows,
      indexes,
      ddl,
    };
  }

  function postgresCatalogPreset(databaseName) {
    const base = databaseName.toLowerCase();

    if (base.includes('orders')) {
      return [
        createWorkspaceTable(
          'users',
          [
            { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', default: 'gen_random_uuid()' },
            { name: 'email', type: 'text', constraints: 'NOT NULL UNIQUE' },
            { name: 'role', type: 'text', constraints: 'NOT NULL' },
            { name: 'created_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
          ],
          [
            { id: 'usr_001', email: 'alice@orders.dev', role: 'admin', created_at: '2026-03-28 10:12' },
            { id: 'usr_002', email: 'ops@orders.dev', role: 'operator', created_at: '2026-03-29 09:04' },
            { id: 'usr_003', email: 'finance@orders.dev', role: 'viewer', created_at: '2026-03-30 16:21' },
          ],
          [
            { name: 'users_pkey', type: 'btree', unique: true, columns: 'id', size: '24 kB' },
            { name: 'users_email_key', type: 'btree', unique: true, columns: 'email', size: '32 kB' },
          ],
        ),
        createWorkspaceTable(
          'orders',
          [
            { name: 'id', type: 'bigserial', constraints: 'PRIMARY KEY' },
            { name: 'user_id', type: 'uuid', constraints: 'NOT NULL' },
            { name: 'status', type: 'text', constraints: 'NOT NULL', default: "'paid'" },
            { name: 'amount', type: 'numeric(10,2)', constraints: 'NOT NULL' },
            { name: 'created_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
          ],
          [
            { id: 1012, user_id: 'usr_001', status: 'paid', amount: '329.00', created_at: '2026-03-31 09:15' },
            { id: 1013, user_id: 'usr_002', status: 'pending', amount: '120.50', created_at: '2026-03-31 09:34' },
            { id: 1014, user_id: 'usr_003', status: 'paid', amount: '54.00', created_at: '2026-03-31 10:11' },
          ],
          [
            { name: 'orders_pkey', type: 'btree', unique: true, columns: 'id', size: '16 kB' },
            { name: 'orders_created_at_idx', type: 'btree', unique: false, columns: 'created_at DESC', size: '24 kB' },
          ],
        ),
        createWorkspaceTable(
          'payments',
          [
            { name: 'id', type: 'bigserial', constraints: 'PRIMARY KEY' },
            { name: 'order_id', type: 'bigint', constraints: 'NOT NULL' },
            { name: 'provider', type: 'text', constraints: 'NOT NULL' },
            { name: 'paid_at', type: 'timestamptz' },
            { name: 'meta', type: 'jsonb', constraints: 'NOT NULL', default: "'{}'::jsonb" },
          ],
          [
            { id: 8801, order_id: 1012, provider: 'stripe', paid_at: '2026-03-31 09:16', meta: '{"fee":"3.2"}' },
            { id: 8802, order_id: 1014, provider: 'paypal', paid_at: '2026-03-31 10:13', meta: '{"fee":"2.1"}' },
          ],
          [
            { name: 'payments_pkey', type: 'btree', unique: true, columns: 'id', size: '16 kB' },
            { name: 'payments_order_id_idx', type: 'btree', unique: false, columns: 'order_id', size: '16 kB' },
          ],
        ),
      ];
    }

    if (base.includes('dify')) {
      return [
        createWorkspaceTable(
          'apps',
          [
            { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', default: 'gen_random_uuid()' },
            { name: 'name', type: 'text', constraints: 'NOT NULL' },
            { name: 'mode', type: 'text', constraints: 'NOT NULL' },
            { name: 'created_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
          ],
          [
            { id: 'app_01', name: '客服助手', mode: 'chat', created_at: '2026-03-30 08:20' },
            { id: 'app_02', name: '文档问答', mode: 'workflow', created_at: '2026-03-31 09:48' },
          ],
          [{ name: 'apps_pkey', type: 'btree', unique: true, columns: 'id', size: '16 kB' }],
        ),
        createWorkspaceTable(
          'conversations',
          [
            { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY' },
            { name: 'app_id', type: 'uuid', constraints: 'NOT NULL' },
            { name: 'user_id', type: 'uuid', constraints: 'NOT NULL' },
            { name: 'message_count', type: 'integer', constraints: 'NOT NULL', default: '0' },
            { name: 'updated_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
          ],
          [
            { id: 'conv_01', app_id: 'app_01', user_id: 'usr_11', message_count: 18, updated_at: '2026-03-31 10:02' },
            { id: 'conv_02', app_id: 'app_02', user_id: 'usr_12', message_count: 6, updated_at: '2026-03-31 10:10' },
          ],
          [{ name: 'conversations_pkey', type: 'btree', unique: true, columns: 'id', size: '16 kB' }],
        ),
      ];
    }

    if (base.includes('n8n')) {
      return [
        createWorkspaceTable(
          'workflows',
          [
            { name: 'id', type: 'bigserial', constraints: 'PRIMARY KEY' },
            { name: 'name', type: 'text', constraints: 'NOT NULL' },
            { name: 'active', type: 'boolean', constraints: 'NOT NULL', default: 'false' },
            { name: 'updated_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
          ],
          [
            { id: 11, name: 'Slack Intake', active: true, updated_at: '2026-03-31 09:11' },
            { id: 12, name: 'CRM Sync', active: false, updated_at: '2026-03-31 08:54' },
          ],
          [{ name: 'workflows_pkey', type: 'btree', unique: true, columns: 'id', size: '16 kB' }],
        ),
        createWorkspaceTable(
          'executions',
          [
            { name: 'id', type: 'bigserial', constraints: 'PRIMARY KEY' },
            { name: 'workflow_id', type: 'bigint', constraints: 'NOT NULL' },
            { name: 'status', type: 'text', constraints: 'NOT NULL' },
            { name: 'started_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
          ],
          [
            { id: 201, workflow_id: 11, status: 'success', started_at: '2026-03-31 09:59' },
            { id: 202, workflow_id: 11, status: 'success', started_at: '2026-03-31 10:07' },
            { id: 203, workflow_id: 12, status: 'failed', started_at: '2026-03-31 10:09' },
          ],
          [{ name: 'executions_workflow_id_idx', type: 'btree', unique: false, columns: 'workflow_id', size: '24 kB' }],
        ),
      ];
    }

    return [
      createWorkspaceTable(
        'accounts',
        [
          { name: 'id', type: 'uuid', constraints: 'PRIMARY KEY', default: 'gen_random_uuid()' },
          { name: 'name', type: 'text', constraints: 'NOT NULL' },
          { name: 'plan', type: 'text', constraints: 'NOT NULL', default: "'pro'" },
          { name: 'created_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
        ],
        [
          { id: 'acc_01', name: 'Acme', plan: 'pro', created_at: '2026-03-25 09:00' },
          { id: 'acc_02', name: 'Northwind', plan: 'enterprise', created_at: '2026-03-28 14:20' },
        ],
        [{ name: 'accounts_pkey', type: 'btree', unique: true, columns: 'id', size: '16 kB' }],
      ),
      createWorkspaceTable(
        'audit_logs',
        [
          { name: 'id', type: 'bigserial', constraints: 'PRIMARY KEY' },
          { name: 'actor', type: 'text', constraints: 'NOT NULL' },
          { name: 'action', type: 'text', constraints: 'NOT NULL' },
          { name: 'created_at', type: 'timestamptz', constraints: 'NOT NULL', default: 'now()' },
        ],
        [
          { id: 901, actor: 'system', action: 'scale_up', created_at: '2026-03-31 08:00' },
          { id: 902, actor: 'admin', action: 'rotate_password', created_at: '2026-03-31 09:20' },
        ],
        [{ name: 'audit_logs_created_at_idx', type: 'btree', unique: false, columns: 'created_at DESC', size: '16 kB' }],
      ),
    ];
  }

  function buildDatabaseWorkspace(node, config) {
    const databaseName = inferDatabaseName(node);
    const primaryTables = postgresCatalogPreset(databaseName);
    const analyticsTables = [
      createWorkspaceTable(
        'daily_metrics',
        [
          { name: 'day', type: 'date', constraints: 'PRIMARY KEY' },
          { name: 'reads', type: 'integer', constraints: 'NOT NULL' },
          { name: 'writes', type: 'integer', constraints: 'NOT NULL' },
          { name: 'storage_gib', type: 'numeric(8,2)', constraints: 'NOT NULL' },
        ],
        [
          { day: '2026-03-29', reads: 182340, writes: 23980, storage_gib: '18.2' },
          { day: '2026-03-30', reads: 191008, writes: 25112, storage_gib: '18.4' },
          { day: '2026-03-31', reads: 204993, writes: 26440, storage_gib: '18.6' },
        ],
        [{ name: 'daily_metrics_pkey', type: 'btree', unique: true, columns: 'day', size: '16 kB' }],
      ),
    ];

    return {
      engine: 'PostgreSQL',
      version: config.version,
      databases: [
        {
          id: `${databaseName}-primary`,
          name: databaseName,
          owner: `${databaseName}_app`,
          size: '18.6 GiB',
          tables: primaryTables,
        },
        {
          id: `${databaseName}-analytics`,
          name: `${databaseName}_analytics`,
          owner: 'analytics',
          size: '6.4 GiB',
          tables: analyticsTables,
        },
      ],
    };
  }

  function syncDatabaseNode(node) {
    if (!node || node.type !== 'database') {
      return node;
    }

    const flavor = node.databaseConfig && node.databaseConfig.flavor ? node.databaseConfig.flavor : databaseFlavorFromNode(node);
    const nextConfig = {
      ...createDatabaseConfig(flavor, { node }),
      ...(node.databaseConfig || {}),
    };

    node.databaseConfig = nextConfig;
    node.details = {
      ...(node.details || {}),
      backup: nextConfig.backupPolicy,
      runtime: `${nextConfig.cpu} CPU / ${nextConfig.memory} RAM`,
      version: nextConfig.version,
      storage: nextConfig.storage,
      replicas: `${nextConfig.replicas} 副本`,
      usedCpu: nextConfig.usedCpu,
      usedMemory: nextConfig.usedMemory,
    };

    node.subtitle = '';
    node.tags = [];

    if (supportsDatabaseWorkspace(node) && !node.databaseWorkspace) {
      node.databaseWorkspace = buildDatabaseWorkspace(node, nextConfig);
    }

    if (node.databaseWorkspace) {
      node.databaseWorkspace.engine = flavor;
      node.databaseWorkspace.version = nextConfig.version;
    }

    return node;
  }

  function hydrateNode(node) {
    if (node.type === 'entry') {
      return syncEntryNode(node);
    }

    if (node.type === 'container') {
      return syncContainerNode(node);
    }

    if (node.type === 'devbox') {
      return syncDevboxNode(node);
    }

    if (node.type === 'database') {
      return syncDatabaseNode(node);
    }

    return node;
  }

  function openDatabaseWorkspace(nodeId) {
    const node = getNodeById(nodeId);
    if (!supportsDatabaseWorkspace(node)) {
      state.databaseView = null;
      return;
    }

    syncDatabaseNode(node);
    const current = state.databaseView && state.databaseView.nodeId === nodeId ? state.databaseView : null;
    const databases = (node.databaseWorkspace && node.databaseWorkspace.databases) || [];
    const selectedDatabaseId =
      current && databases.some((database) => database.id === current.databaseId)
        ? current.databaseId
        : databases[0] && databases[0].id;
    const selectedDatabase = databases.find((database) => database.id === selectedDatabaseId) || databases[0];
    const tables = (selectedDatabase && selectedDatabase.tables) || [];
    const selectedTableId =
      current && tables.some((table) => table.id === current.tableId)
        ? current.tableId
        : '';

    state.databaseView = {
      nodeId,
      databaseId: selectedDatabaseId || '',
      tableId: selectedTableId || '',
      tab: current ? current.tab : 'rows',
      configDraft: current ? { ...current.configDraft } : { ...node.databaseConfig },
      saveState: current ? current.saveState : 'idle',
      error: current ? current.error : '',
      importOpen: current ? current.importOpen : false,
      importMethod: current ? current.importMethod : 'csv',
      importDraft: current
        ? { ...current.importDraft }
        : {
            csvName: `${selectedDatabase ? selectedDatabase.name : 'database'}.csv`,
            dmpName: `${selectedDatabase ? selectedDatabase.name : 'database'}.dmp`,
            sourceUrl: 'postgres://readonly@public.example.com:5432/source_db',
          },
      importStatus: current ? current.importStatus : 'idle',
      importError: current ? current.importError : '',
    };
  }

  function closeDatabaseWorkspace() {
    state.databaseView = null;
  }

  function activeDatabaseContext() {
    if (!state.databaseView || state.databaseView.nodeId !== state.selectedNodeId) {
      return null;
    }

    const node = getNodeById(state.databaseView.nodeId);
    if (!supportsDatabaseWorkspace(node) || !node.databaseWorkspace) {
      return null;
    }

    const databases = node.databaseWorkspace.databases || [];
    const database =
      databases.find((item) => item.id === state.databaseView.databaseId) ||
      databases[0];
    const tables = (database && database.tables) || [];
    const table =
      tables.find((item) => item.id === state.databaseView.tableId) ||
      null;

    if (!database) {
      return null;
    }

    return {
      node,
      workspace: node.databaseWorkspace,
      database,
      table,
      view: state.databaseView,
    };
  }

  function openEntryContext(nodeId) {
    const node = getNodeById(nodeId);
    if (!node || node.type !== 'entry') {
      state.entryView = null;
      return;
    }

    syncEntryNode(node);
    const current = state.entryView && state.entryView.nodeId === nodeId ? state.entryView : null;

    state.entryView = {
      nodeId,
      configDraft: current
        ? {
            ...current.configDraft,
            whitelist: normalizeStringList(current.configDraft && current.configDraft.whitelist),
          }
        : {
            ...node.entryConfig,
            whitelist: [...node.entryConfig.whitelist],
          },
      whitelistDraft: current ? current.whitelistDraft : '',
      saveState: current ? current.saveState : 'idle',
      error: current ? current.error : '',
      info: current ? current.info : '',
    };
  }

  function closeEntryContext() {
    state.entryView = null;
  }

  function activeEntryContext() {
    if (!state.entryView || state.entryView.nodeId !== state.selectedNodeId) {
      return null;
    }

    const node = getNodeById(state.entryView.nodeId);
    if (!node || node.type !== 'entry') {
      return null;
    }

    syncEntryNode(node);

    return {
      node,
      entry: node.entryConfig,
      view: state.entryView,
    };
  }

  function openContainerContext(nodeId) {
    const node = getNodeById(nodeId);
    if (!node || node.type !== 'container') {
      state.containerView = null;
      return;
    }

    syncContainerNode(node);
    const current = state.containerView && state.containerView.nodeId === nodeId ? state.containerView : null;

    state.containerView = {
      nodeId,
      configDraft: current ? { ...current.configDraft } : { ...node.containerConfig },
      saveState: current ? current.saveState : 'idle',
      error: current ? current.error : '',
      info: current ? current.info : '',
    };
  }

  function closeContainerContext() {
    state.containerView = null;
  }

  function activeContainerContext() {
    if (!state.containerView || state.containerView.nodeId !== state.selectedNodeId) {
      return null;
    }

    const node = getNodeById(state.containerView.nodeId);
    if (!node || node.type !== 'container') {
      return null;
    }

    syncContainerNode(node);

    return {
      node,
      container: node.containerConfig,
      view: state.containerView,
    };
  }

  function openDevboxContext(nodeId) {
    const node = getNodeById(nodeId);
    if (!node || node.type !== 'devbox') {
      state.devboxView = null;
      return;
    }

    syncDevboxNode(node);
    const current = state.devboxView && state.devboxView.nodeId === nodeId ? state.devboxView : null;

    state.devboxView = {
      nodeId,
      configDraft: current ? { ...current.configDraft } : { ...node.devboxConfig },
      saveState: current ? current.saveState : 'idle',
      error: current ? current.error : '',
      info: current ? current.info : '',
    };
  }

  function closeDevboxContext() {
    state.devboxView = null;
  }

  function activeDevboxContext() {
    if (!state.devboxView || state.devboxView.nodeId !== state.selectedNodeId) {
      return null;
    }

    const node = getNodeById(state.devboxView.nodeId);
    if (!node || node.type !== 'devbox') {
      return null;
    }

    syncDevboxNode(node);

    return {
      node,
      devbox: node.devboxConfig,
      view: state.devboxView,
    };
  }

  function inferDatabaseRelations(database) {
    const tables = database && Array.isArray(database.tables) ? database.tables : [];
    const tableNames = tables.map((table) => table.name);

    return tables.flatMap((table) =>
      table.columns
        .filter((column) => /_id$/i.test(column.name))
        .map((column) => {
          const base = column.name.replace(/_id$/i, '').toLowerCase();
          const candidates = [
            base,
            `${base}s`,
            `${base}es`,
            base.endsWith('y') ? `${base.slice(0, -1)}ies` : '',
          ].filter(Boolean);
          const target = candidates.find((candidate) => tableNames.includes(candidate));

          if (!target) {
            return null;
          }

          return {
            from: table.name,
            to: target,
            column: column.name,
          };
        })
        .filter(Boolean),
    );
  }

  function erLayoutForTables(tables) {
    const presets = {
      1: [{ x: 96, y: 92 }],
      2: [
        { x: 72, y: 92 },
        { x: 380, y: 92 },
      ],
      3: [
        { x: 56, y: 64 },
        { x: 356, y: 64 },
        { x: 208, y: 276 },
      ],
      4: [
        { x: 40, y: 54 },
        { x: 336, y: 54 },
        { x: 40, y: 274 },
        { x: 336, y: 274 },
      ],
    };

    const positions = presets[tables.length];
    if (positions) {
      return positions;
    }

    return tables.map((_, index) => ({
      x: 40 + (index % 2) * 296,
      y: 54 + Math.floor(index / 2) * 220,
    }));
  }

  function erBoundaryPoint(rect, target) {
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    const dx = target.x - centerX;
    const dy = target.y - centerY;
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    if (dx === 0 && dy === 0) {
      return { x: centerX, y: centerY };
    }

    if (Math.abs(dx) * halfHeight > Math.abs(dy) * halfWidth) {
      return {
        x: centerX + Math.sign(dx || 1) * halfWidth,
        y: centerY + (dy * halfWidth) / Math.max(Math.abs(dx), 1),
      };
    }

    return {
      x: centerX + (dx * halfHeight) / Math.max(Math.abs(dy), 1),
      y: centerY + Math.sign(dy || 1) * halfHeight,
    };
  }

  function erConnectionGeometry(from, to) {
    const fromCenter = {
      x: from.x + from.width / 2,
      y: from.y + from.height / 2,
    };
    const toCenter = {
      x: to.x + to.width / 2,
      y: to.y + to.height / 2,
    };
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    const start = erBoundaryPoint(from, toCenter);
    const end = erBoundaryPoint(to, fromCenter);

    if (Math.abs(dx) >= Math.abs(dy)) {
      const curve = Math.max(52, Math.abs(end.x - start.x) * 0.35);
      const direction = end.x >= start.x ? 1 : -1;

      return {
        path: `M ${start.x} ${start.y} C ${start.x + curve * direction} ${start.y}, ${end.x - curve * direction} ${end.y}, ${end.x} ${end.y}`,
        labelX: (start.x + end.x) / 2,
        labelY: (start.y + end.y) / 2 - 10,
      };
    }

    const curve = Math.max(52, Math.abs(end.y - start.y) * 0.35);
    const direction = end.y >= start.y ? 1 : -1;

    return {
      path: `M ${start.x} ${start.y} C ${start.x} ${start.y + curve * direction}, ${end.x} ${end.y - curve * direction}, ${end.x} ${end.y}`,
      labelX: (start.x + end.x) / 2 + 8,
      labelY: (start.y + end.y) / 2 - 8,
    };
  }

  function renderDatabaseErPanel(database) {
    const tables = database.tables || [];
    const layout = erLayoutForTables(tables);
    const relations = inferDatabaseRelations(database);
    const width = 640;
    const height = Math.max(360, Math.max(...layout.map((item) => item.y), 0) + 188);
    const cardWidth = 228;
    const cardHeight = 132;
    const positionMap = Object.fromEntries(
      tables.map((table, index) => [table.name, { ...layout[index], width: cardWidth, height: cardHeight }]),
    );

    return `
      <div class="db-panel db-er-panel">
        <div class="db-er-stage" style="height:${height}px;">
          <svg class="db-er-layer" viewBox="0 0 ${width} ${height}" aria-hidden="true">
            ${relations
              .map((relation) => {
                const from = positionMap[relation.from];
                const to = positionMap[relation.to];
                if (!from || !to) {
                  return '';
                }
                const geometry = erConnectionGeometry(from, to);

                return `
                  <path class="db-er-path" d="${geometry.path}"></path>
                  <text class="db-er-label" x="${geometry.labelX}" y="${geometry.labelY}" text-anchor="middle">${escapeHtml(relation.column)}</text>
                `;
              })
              .join('')}
          </svg>

          ${tables
            .map((table, index) => {
              const position = layout[index];
              return `
                <div class="db-er-card" style="left:${position.x}px; top:${position.y}px;">
                  <div class="db-er-card-head">
                    <span class="material-symbols-outlined db-entity-icon">table_rows</span>
                    <strong>${escapeHtml(table.name)}</strong>
                  </div>
                  <div class="db-er-columns">
                    ${table.columns
                      .slice(0, 4)
                      .map(
                        (column) => `
                          <div class="db-er-column">
                            <span>${escapeHtml(column.name)}</span>
                            <em>${escapeHtml(column.type)}</em>
                          </div>
                        `,
                      )
                      .join('')}
                    ${
                      table.columns.length > 4
                        ? `<div class="db-er-more">+ ${table.columns.length - 4} columns</div>`
                        : ''
                    }
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  function renderDatabaseImportPanel(database, view) {
    const method = ['csv', 'dmp', 'url'].includes(view.importMethod) ? view.importMethod : 'csv';
    const draft = view.importDraft || {};
    const statusClass = view.importError ? 'error' : view.importStatus === 'done' ? 'saved' : view.importStatus === 'running' ? 'pending' : '';
    const statusText = view.importError
      ? view.importError
      : view.importStatus === 'done'
      ? '导入任务已提交'
      : view.importStatus === 'running'
      ? '正在准备导入任务'
      : `导入目标：${database.name}`;

    return `
      <div class="db-import-panel">
        <div class="db-import-head">
          <strong>导入数据</strong>
          <span>CSV / DMP / 公开数据库地址</span>
        </div>

        <div class="db-import-methods">
          <button
            type="button"
            class="db-import-method ${method === 'csv' ? 'active' : ''}"
            data-db-action="set-import-method"
            data-import-method="csv"
          >
            CSV
          </button>
          <button
            type="button"
            class="db-import-method ${method === 'dmp' ? 'active' : ''}"
            data-db-action="set-import-method"
            data-import-method="dmp"
          >
            DMP
          </button>
          <button
            type="button"
            class="db-import-method ${method === 'url' ? 'active' : ''}"
            data-db-action="set-import-method"
            data-import-method="url"
          >
            公开地址
          </button>
        </div>

        <div class="db-import-grid">
          ${
            method === 'csv'
              ? `<label class="db-config-label">
                  <span>CSV 文件</span>
                  <label class="db-file-picker">
                    <input
                      class="db-file-input"
                      type="file"
                      accept=".csv,text/csv"
                      data-db-import-upload="csvName"
                    />
                    <span class="db-file-trigger">上传 CSV</span>
                  </label>
                  <div class="db-file-name ${draft.csvName ? 'selected' : ''}">
                    ${escapeHtml(draft.csvName || '未选择文件')}
                  </div>
                </label>`
              : method === 'dmp'
              ? `<label class="db-config-label">
                  <span>DMP 文件</span>
                  <label class="db-file-picker">
                    <input
                      class="db-file-input"
                      type="file"
                      accept=".dmp,.dump,application/octet-stream"
                      data-db-import-upload="dmpName"
                    />
                    <span class="db-file-trigger">上传 DMP</span>
                  </label>
                  <div class="db-file-name ${draft.dmpName ? 'selected' : ''}">
                    ${escapeHtml(draft.dmpName || '未选择文件')}
                  </div>
                </label>`
              : `<label class="db-config-label">
                  <span>公开数据库地址</span>
                  <input
                    class="agui-input"
                    type="text"
                    value="${escapeHtml(draft.sourceUrl || '')}"
                    placeholder="postgres://readonly@public.example.com:5432/source_db"
                    data-db-import-field="sourceUrl"
                  />
                </label>`
          }
        </div>

        <div class="db-import-footer">
          <div class="db-config-status ${statusClass}">${escapeHtml(statusText)}</div>
          <button type="button" class="db-primary-button" data-db-action="execute-import">
            开始导入
          </button>
        </div>
      </div>
    `;
  }

  function databaseConfigChanged(node, draft) {
    const fields = ['instanceSpec', 'cpu', 'memory', 'replicas', 'storage', 'backupPolicy'];
    return fields.some((field) => String((node.databaseConfig || {})[field]) !== String((draft || {})[field]));
  }

  function entryConfigFingerprint(config) {
    return JSON.stringify({
      externalDomain: String((config && config.externalDomain) || '').trim(),
      internalDomain: String((config && config.internalDomain) || '').trim(),
      cnameHost: String((config && config.cnameHost) || '').trim(),
      cnameTarget: String((config && config.cnameTarget) || '').trim(),
      whitelist: normalizeStringList(config && config.whitelist),
    });
  }

  function entryConfigChanged(node, draft) {
    return entryConfigFingerprint(node.entryConfig || {}) !== entryConfigFingerprint(draft || {});
  }

  function containerConfigFingerprint(config) {
    return JSON.stringify({
      image: String((config && config.image) || '').trim(),
      replicas: String((config && config.replicas) || '').trim(),
      cpu: String((config && config.cpu) || '').trim(),
      memory: String((config && config.memory) || '').trim(),
      envVars: String((config && config.envVars) || '').trim(),
      startArgs: String((config && config.startArgs) || '').trim(),
      mountDisk: Boolean(config && config.mountDisk),
      diskSize: String((config && config.diskSize) || '').trim(),
      diskUsed: String((config && config.diskUsed) || '').trim(),
      mountPath: String((config && config.mountPath) || '').trim(),
    });
  }

  function containerConfigChanged(node, draft) {
    return containerConfigFingerprint(node.containerConfig || {}) !== containerConfigFingerprint(draft || {});
  }

  function devboxConfigFingerprint(config) {
    return JSON.stringify({
      templateId: String((config && config.templateId) || '').trim(),
      version: String((config && config.version) || '').trim(),
      cpu: String((config && config.cpu) || '').trim(),
      memory: String((config && config.memory) || '').trim(),
      diskSize: String((config && config.diskSize) || '').trim(),
      diskUsed: String((config && config.diskUsed) || '').trim(),
      startCommand: String((config && config.startCommand) || '').trim(),
      port: String((config && config.port) || '').trim(),
    });
  }

  function devboxConfigChanged(node, draft) {
    return devboxConfigFingerprint(node.devboxConfig || {}) !== devboxConfigFingerprint(draft || {});
  }

  function saveDatabaseConfig() {
    const context = activeDatabaseContext();
    if (!context) {
      return;
    }

    const { node, view } = context;
    const draft = view.configDraft || {};

    if (!draft.instanceSpec || !draft.cpu || !draft.memory || !draft.replicas) {
      state.databaseView.error = '请先补全数据库规格、CPU、内存和副本数。';
      renderSidebarContext();
      return;
    }

    node.databaseConfig = {
      ...node.databaseConfig,
      ...draft,
      usedCpu: estimateUsedCpu(draft.cpu || node.databaseConfig.cpu),
      usedMemory: estimateUsedMemory(draft.memory || node.databaseConfig.memory),
    };
    syncDatabaseNode(node);
    state.databaseView.configDraft = { ...node.databaseConfig };
    state.databaseView.saveState = 'done';
    state.databaseView.error = '';

    addMessage(
      'assistant',
      `数据库配置已更新：${node.title} 调整为 ${node.databaseConfig.instanceSpec}，${node.databaseConfig.cpu} CPU / ${node.databaseConfig.memory}，${node.databaseConfig.replicas} 副本。`,
    );
    renderAll();
  }

  function saveEntryConfig() {
    const context = activeEntryContext();
    if (!context) {
      return;
    }

    const { node, view } = context;
    const draft = {
      ...(view.configDraft || {}),
      externalDomain: String((view.configDraft && view.configDraft.externalDomain) || '').trim(),
      internalDomain: String((view.configDraft && view.configDraft.internalDomain) || '').trim(),
      cnameHost: String((view.configDraft && view.configDraft.cnameHost) || '').trim(),
      cnameTarget: String((view.configDraft && view.configDraft.cnameTarget) || '').trim(),
      whitelist: normalizeStringList(view.configDraft && view.configDraft.whitelist),
    };

    if (!draft.externalDomain || !draft.internalDomain || !draft.cnameHost || !draft.cnameTarget) {
      state.entryView.error = '请先补全内网域名、外网域名和 CNAME 配置。';
      state.entryView.info = '';
      renderSidebarContext();
      return;
    }

    node.entryConfig = {
      ...node.entryConfig,
      ...draft,
      whitelist: [...draft.whitelist],
    };
    syncEntryNode(node);
    state.entryView.configDraft = {
      ...node.entryConfig,
      whitelist: [...node.entryConfig.whitelist],
    };
    state.entryView.saveState = 'done';
    state.entryView.error = '';
    state.entryView.info = `${node.entryConfig.cnameHost} -> ${node.entryConfig.cnameTarget}`;

    renderAll();
  }

  function saveContainerConfig() {
    const context = activeContainerContext();
    if (!context) {
      return;
    }

    const { node, view } = context;
    const draft = {
      ...(view.configDraft || {}),
      image: String((view.configDraft && view.configDraft.image) || '').trim(),
      replicas: String((view.configDraft && view.configDraft.replicas) || '').trim(),
      cpu: String((view.configDraft && view.configDraft.cpu) || '').trim(),
      memory: String((view.configDraft && view.configDraft.memory) || '').trim(),
      envVars: String((view.configDraft && view.configDraft.envVars) || '').trim(),
      startArgs: String((view.configDraft && view.configDraft.startArgs) || '').trim(),
      mountDisk: Boolean(view.configDraft && view.configDraft.mountDisk),
      diskSize: String((view.configDraft && view.configDraft.diskSize) || '').trim(),
      diskUsed: String((view.configDraft && view.configDraft.diskUsed) || '').trim(),
      mountPath: String((view.configDraft && view.configDraft.mountPath) || '').trim(),
    };

    if (!draft.image || !draft.replicas || !draft.cpu || !draft.memory) {
      state.containerView.error = '请先补全镜像、副本数、CPU 和内存。';
      state.containerView.info = '';
      renderSidebarContext();
      return;
    }

    if (draft.mountDisk && (!draft.diskSize || !draft.mountPath)) {
      state.containerView.error = '有状态实例需要磁盘大小和挂载路径。';
      state.containerView.info = '';
      renderSidebarContext();
      return;
    }

    node.containerConfig = {
      ...node.containerConfig,
      ...draft,
      stateful: draft.mountDisk,
      quotaCpu: draft.cpu,
      quotaMemory: draft.memory,
      usedCpu: estimateUsedCpu(draft.cpu),
      usedMemory: estimateUsedMemory(draft.memory),
      diskUsed: draft.mountDisk ? draft.diskUsed || estimateUsedDisk(draft.diskSize) : '',
    };
    syncContainerNode(node);
    state.containerView.configDraft = { ...node.containerConfig };
    state.containerView.saveState = 'done';
    state.containerView.error = '';
    state.containerView.info = `${node.containerConfig.replicas} 副本 / ${node.containerConfig.cpu} CPU / ${node.containerConfig.memory}`;

    addMessage(
      'assistant',
      `容器配置已更新：${node.title} 调整为 ${node.containerConfig.replicas} 副本，${node.containerConfig.cpu} CPU / ${node.containerConfig.memory}。`,
    );
    renderAll();
  }

  function saveDevboxConfig() {
    const context = activeDevboxContext();
    if (!context) {
      return;
    }

    const { node, view } = context;
    const draft = {
      ...(view.configDraft || {}),
      cpu: String((view.configDraft && view.configDraft.cpu) || '').trim(),
      memory: String((view.configDraft && view.configDraft.memory) || '').trim(),
      diskSize: String((view.configDraft && view.configDraft.diskSize) || '').trim(),
      diskUsed: String((view.configDraft && view.configDraft.diskUsed) || '').trim(),
      startCommand: String((view.configDraft && view.configDraft.startCommand) || '').trim(),
      port: String((view.configDraft && view.configDraft.port) || '').trim(),
    };

    if (!draft.cpu || !draft.memory || !draft.diskSize) {
      state.devboxView.error = '请先补全 CPU、内存和磁盘大小。';
      state.devboxView.info = '';
      renderSidebarContext();
      return;
    }

    node.devboxConfig = {
      ...node.devboxConfig,
      ...draft,
      quotaCpu: draft.cpu,
      quotaMemory: draft.memory,
      usedCpu: estimateUsedCpu(draft.cpu),
      usedMemory: estimateUsedMemory(draft.memory),
      diskUsed: estimateUsedDisk(draft.diskSize),
      startCommand: draft.startCommand || defaultDevboxStartCommand(getDevboxTemplateById(node.devboxConfig.templateId), draft.port),
    };
    syncDevboxNode(node);
    state.devboxView.configDraft = { ...node.devboxConfig };
    state.devboxView.saveState = 'done';
    state.devboxView.error = '';
    state.devboxView.info = `${node.devboxConfig.cpu} CPU / ${node.devboxConfig.memory} / ${node.devboxConfig.diskSize}`;

    addMessage(
      'assistant',
      `开发环境配置已更新：${cardTitleForNode(node)} 调整为 ${node.devboxConfig.cpu} CPU / ${node.devboxConfig.memory}，磁盘 ${node.devboxConfig.diskSize}。`,
    );
    renderAll();
  }

  function maskConnectionString(value) {
    const raw = String(value || '').trim();
    if (!raw) {
      return '';
    }

    const maskChunk = (input, options = {}) => {
      const text = String(input || '');
      if (!text) {
        return '';
      }

      const lead = options.lead == null ? 1 : options.lead;
      const tail = options.tail == null ? 1 : options.tail;
      if (text.length <= lead + tail) {
        return '••••';
      }

      return `${text.slice(0, lead)}••••${tail ? text.slice(-tail) : ''}`;
    };

    try {
      const parsed = new URL(raw);
      const username = parsed.username ? maskChunk(decodeURIComponent(parsed.username), { lead: 1, tail: 0 }) : '';
      const password = parsed.password ? '••••' : '';
      const auth = username ? `${username}${password ? `:${password}` : ''}@` : '';
      const host = parsed.hostname
        .split('.')
        .filter(Boolean)
        .map((part, index, items) =>
          index === items.length - 1 && part.length <= 4
            ? part
            : maskChunk(part, { lead: Math.min(2, Math.max(1, part.length - 1)), tail: 0 }),
        )
        .join('.');
      const pathname =
        parsed.pathname && parsed.pathname !== '/'
          ? `/${parsed.pathname
              .slice(1)
              .split('/')
              .filter(Boolean)
              .map((part) => maskChunk(part, { lead: 1, tail: 0 }))
              .join('/')}`
          : '';
      const search = parsed.search
        ? `?${[...parsed.searchParams.keys()].map((key) => `${key}=••••`).join('&')}`
        : '';

      return `${parsed.protocol}//${auth}${host}${parsed.port ? `:${parsed.port}` : ''}${pathname}${search}`;
    } catch (_error) {
      return raw
        .replace(/:\/\/([^:@/]+):([^@/]+)@/, (_match, user) => `://${maskChunk(user, { lead: 1, tail: 0 })}:••••@`)
        .replace(/@([^/:?#]+)(:\d+)?/, (_match, host, port = '') => `@${maskChunk(host, { lead: 2, tail: 0 })}${port}`)
        .replace(/\/([^/?#]+)/, (_match, path) => `/${maskChunk(path, { lead: 1, tail: 0 })}`)
        .replace(/([?&](?:password|pwd|token|apikey|api_key)=)([^&]+)/gi, '$1••••');
    }
  }

  async function copyToClipboard(value) {
    const text = String(value || '');
    if (!text) {
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch (_error) {
      // Fall through to the execCommand fallback.
    }

    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', 'readonly');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  function renderContainerMeter(label, used, total, options = {}) {
    const percent = resourceUsagePercent(used, total, options.kind || 'capacity');
    const icon = options.icon
      ? `<span class="material-symbols-outlined container-meter-icon">${options.icon}</span>`
      : '';

    return `
      <div class="container-meter">
        <div class="container-meter-head">
          <span class="container-meter-label">${icon}<span>${escapeHtml(label)}</span></span>
          <span class="container-meter-meta">
            <span class="container-meter-value">${escapeHtml(`${used} / ${total}`)}</span>
            <strong>${percent}%</strong>
          </span>
        </div>
        <div class="container-meter-track">
          <span class="container-meter-fill" style="width:${percent}%"></span>
        </div>
      </div>
    `;
  }

  function showEntryCnameInfo() {
    const context = activeEntryContext();
    if (!context) {
      return;
    }

    const draft = {
      ...context.entry,
      ...(context.view.configDraft || {}),
      cnameHost: String(
        (context.view.configDraft && context.view.configDraft.cnameHost) || context.entry.cnameHost || '',
      ).trim(),
      cnameTarget: String(
        (context.view.configDraft && context.view.configDraft.cnameTarget) || context.entry.cnameTarget || '',
      ).trim(),
    };

    state.entryView.info = `${draft.cnameHost || '-'} -> ${draft.cnameTarget || '-'}`;
    state.entryView.error = '';
    renderSidebarContext();
  }

  function addEntryWhitelistItem() {
    const context = activeEntryContext();
    if (!context) {
      return;
    }

    const nextValue = String(context.view.whitelistDraft || '').trim();
    if (!nextValue) {
      state.entryView.error = '请输入 IP 地址或 CIDR 网段。';
      state.entryView.info = '';
      renderSidebarContext();
      return;
    }

    state.entryView.configDraft.whitelist = normalizeStringList([
      ...((state.entryView.configDraft && state.entryView.configDraft.whitelist) || []),
      nextValue,
    ]);
    state.entryView.whitelistDraft = '';
    state.entryView.saveState = 'editing';
    state.entryView.error = '';
    state.entryView.info = '';
    renderSidebarContext();
  }

  function removeEntryWhitelistItem(index) {
    const context = activeEntryContext();
    if (!context) {
      return;
    }

    state.entryView.configDraft.whitelist = normalizeStringList(
      ((state.entryView.configDraft && state.entryView.configDraft.whitelist) || []).filter(
        (_item, itemIndex) => itemIndex !== index,
      ),
    );
    state.entryView.saveState = 'editing';
    state.entryView.error = '';
    state.entryView.info = '';
    renderSidebarContext();
  }

  function openDomainTarget(value) {
    const raw = String(value || '').trim();
    if (!raw) {
      return;
    }

    const href = /^https?:\/\//i.test(raw)
      ? raw
      : /cluster\.local|\.svc(?:\.|$)|\.internal(?:$|[:/])/i.test(raw)
      ? `http://${raw}`
      : `https://${raw}`;

    window.open(href, '_blank', 'noopener,noreferrer');
  }

  function executeDatabaseImport() {
    const context = activeDatabaseContext();
    if (!context) {
      return;
    }

    const { database, view } = context;
    const method = ['csv', 'dmp', 'url'].includes(view.importMethod) ? view.importMethod : 'csv';
    const draft = view.importDraft || {};
    const csvName = String(draft.csvName || '').trim();
    const dmpName = String(draft.dmpName || '').trim();
    const sourceUrl = String(draft.sourceUrl || '').trim();

    if (method === 'csv' && !csvName) {
      state.databaseView.importStatus = 'idle';
      state.databaseView.importError = '请填写 CSV 文件名。';
      renderCanvasWorkspace();
      return;
    }

    if (method === 'dmp' && !dmpName) {
      state.databaseView.importStatus = 'idle';
      state.databaseView.importError = '请填写 DMP 文件名。';
      renderCanvasWorkspace();
      return;
    }

    if (method === 'url' && !sourceUrl) {
      state.databaseView.importStatus = 'idle';
      state.databaseView.importError = '请填写公开数据库地址。';
      renderCanvasWorkspace();
      return;
    }

    const sourceLabel =
      method === 'csv'
        ? `CSV 文件 ${csvName}`
        : method === 'dmp'
        ? `DMP 文件 ${dmpName}`
        : `公开数据库 ${sourceUrl}`;

    state.databaseView.importStatus = 'done';
    state.databaseView.importError = '';
    addMessage('assistant', `已为 ${database.name} 创建导入任务，来源：${sourceLabel}。`);
    renderAll();
  }

  function getInitialGraph() {
    return {
      nodes: [
        {
          id: 'entry-demo',
          type: 'entry',
          title: 'orders.demo.sealos.run',
          subtitle: '内网域名 / 外网域名',
          status: 'Accessible',
          tags: [],
          x: 96,
          y: 110,
          details: {
            target: 'orders-api',
            externalDomain: 'orders.demo.sealos.run',
            internalDomain: 'orders-api.region.internal',
            cnameHost: 'orders.demo.sealos.run',
            cnameTarget: 'gateway.sealos.run',
            whitelist: ['203.0.113.24', '198.51.100.18', '192.0.2.44/32'],
          },
          operations: ['查看路由', '替换域名', '暂停入口'],
        },
        {
          id: 'container-demo',
          type: 'container',
          title: 'orders-api',
          subtitle: '',
          status: 'Running',
          tags: [],
          x: 370,
          y: 230,
          details: {
            image: 'ghcr.io/sealai/orders-api:2026.03.31',
            envVars: 'PORT=3000\nDATABASE_URL=postgres://orders:••••@pg-ha.internal:5432/orders',
          },
          containerConfig: {
            image: 'ghcr.io/sealai/orders-api:2026.03.31',
            replicas: '2',
            cpu: '2',
            memory: '4Gi',
            quotaCpu: '2',
            quotaMemory: '4Gi',
            usedCpu: '0.9',
            usedMemory: '1.8Gi',
            envVars: 'PORT=3000\nDATABASE_URL=postgres://orders:••••@pg-ha.internal:5432/orders',
            mountDisk: true,
            stateful: true,
            diskSize: '20Gi',
            mountPath: '/var/lib/orders',
          },
          operations: ['查看日志', '回滚版本', '扩容副本'],
        },
        {
          id: 'db-demo',
          type: 'database',
          title: 'PostgreSQL',
          subtitle: '',
          status: 'Protected',
          tags: [],
          x: 700,
          y: 355,
          details: {
            connect: 'postgres://orders:••••@pg-ha.internal:5432/orders',
            backup: '每小时快照 + PITR',
            metrics: 'QPS 120 / 复制延迟 30ms',
          },
          databaseConfig: {
            flavor: 'PostgreSQL',
            version: '16.4',
            instanceSpec: 'db.pg.large',
            cpu: '8',
            memory: '16Gi',
            usedCpu: '3.4',
            usedMemory: '7.1Gi',
            replicas: '2',
            storage: '200Gi',
            backupPolicy: 'PITR / Hourly',
          },
          operations: ['查看连接串', '创建备份', '打开监控'],
        },
        {
          id: 'devbox-demo',
          type: 'devbox',
          title: 'Alice',
          subtitle: '',
          status: 'Ready',
          tags: [],
          x: 712,
          y: 92,
          details: {
            access: 'code-server.sealos.run/devbox/alice',
            templateId: 'nodejs',
            templateName: 'Node.js',
            version: '22',
            cpu: '4',
            memory: '8Gi',
            usedCpu: '1.4',
            usedMemory: '3.6Gi',
            diskSize: '50Gi',
            diskUsed: '18Gi',
            startCommand: 'pnpm dev --host 0.0.0.0 --port 3000',
            port: '3000/TCP',
          },
          operations: ['复制连接地址', '重启环境', '挂载仓库'],
        },
      ],
      edges: [
        { id: 'edge-demo-1', from: 'entry-demo', to: 'container-demo', label: '443' },
        { id: 'edge-demo-2', from: 'container-demo', to: 'db-demo', label: 'DATABASE_URL' },
        { id: 'edge-demo-3', from: 'devbox-demo', to: 'container-demo', label: 'Debug Tunnel' },
      ],
      messages: [
        {
          id: createId('msg'),
          role: 'assistant',
          text:
            '这是一个围绕云操作系统的原型：左侧是对象导航，中间是拓扑画布，右侧是 Agent 会话。你可以直接输入 GitHub 仓库、Docker 镜像、数据库需求或 DevBox 请求。',
        },
        {
          id: createId('msg'),
          role: 'assistant',
          text:
            '当前画布已放入一组示例对象，用于展示入口域名、运行实例、数据库和开发环境之间的关系。点击卡片可查看详情，拖拽可调整布局。',
        },
      ],
      timeline: [
        {
          id: createId('step'),
          title: '初始化原型画布',
          detail: '加载示例对象与关系线，等待新的自然语言任务。',
          status: 'done',
        },
      ],
      selectedNodeId: 'container-demo',
    };
  }

  function resetState() {
    const initial = getInitialGraph();
    state.nodes = initial.nodes.map((node) => hydrateNode(node));
    state.edges = initial.edges;
    state.messages = initial.messages;
    state.timeline = initial.timeline;
    state.selectedNodeId = initial.selectedNodeId;
    state.agentBusy = false;
    state.currentTask = '待命';
    state.databaseView = null;
    state.entryView = null;
    state.containerView = null;
    state.devboxView = null;
    state.lastIssue = {
      title: 'FastGPT 启动失败',
      reason: '后端实例缺少 `OPENAI_API_KEY`，入口健康检查连续失败。',
    };
    renderAll();
  }

  function addMessage(role, text) {
    const message = {
      id: createId('msg'),
      role,
      text,
      kind: 'text',
    };
    state.messages.push(message);
    renderChat();
    return message;
  }

  function addAguiMessage(ui, payload) {
    const message = {
      id: createId('msg'),
      role: 'assistant',
      kind: 'agui',
      ui,
      payload,
    };
    state.messages.push(message);
    renderChat();
    return message;
  }

  function pushTimeline(title, detail, status) {
    state.timeline.unshift({
      id: createId('step'),
      title,
      detail,
      status,
    });
    state.timeline = state.timeline.slice(0, 6);
    renderTimeline();
  }

  function setAgentState(busy, task) {
    state.agentBusy = busy;
    state.currentTask = task || (busy ? '执行中' : '待命');
    if (dom.agentBadge) {
      dom.agentBadge.textContent = busy ? 'Running' : 'Idle';
      dom.agentBadge.className = `header-badge ${busy ? 'busy' : 'idle'}`;
    }
    if (dom.agentMode) {
      dom.agentMode.textContent = state.currentTask;
    }
  }

  function getNodeById(id) {
    return state.nodes.find((node) => node.id === id);
  }

  function renderNav() {
    dom.navFilters.innerHTML = FILTERS.map((filter) => {
      const isActive =
        filter.id === 'projects' && collectProjectNodes().some((node) => node.id === state.selectedNodeId);

      return `
        <button
          class="rail-icon-button ${isActive ? 'active' : ''}"
          type="button"
          data-rail-action="${filter.action || 'prompt'}"
          ${filter.prompt ? `data-shortcut-prompt="${filter.prompt}"` : ''}
          data-label="${filter.label}"
          ${filter.icon === 'docker' ? 'data-accent="docker"' : ''}
          ${filter.icon === 'github' ? 'data-accent="github"' : ''}
          ${filter.icon === 'vscode' ? 'data-accent="vscode"' : ''}
          title="${filter.label}"
          aria-label="${filter.label}"
        >
          ${iconMarkup(filter.icon)}
        </button>
      `;
    }).join('');
  }

  function renderCanvas() {
    dom.nodeLayer.innerHTML = '';
    const visibleNodes = state.nodes;
    const dragThreshold = 8;

    visibleNodes.forEach((node) => {
      const summary = nodeSummary(node);
      const tags = node.type === 'devbox' ? [] : Array.isArray(node.tags) ? node.tags.filter(Boolean) : [];
      const entryConfig = node.type === 'entry' ? syncEntryNode(node).entryConfig : null;
      const containerConfig = node.type === 'container' ? syncContainerNode(node).containerConfig : null;
      const databaseConfig = node.type === 'database' ? syncDatabaseNode(node).databaseConfig : null;
      const devboxConfig = node.type === 'devbox' ? syncDevboxNode(node).devboxConfig : null;
      const displayTitle = cardTitleForNode(node);
      const typeLabel = node.type === 'database' || node.type === 'devbox' ? '' : `<span class="node-type">${labelForType(node.type)}</span>`;
      const titleMarkup =
        node.type === 'database'
          ? `
              <div class="node-title-row">
                <h3 class="node-title">${escapeHtml(displayTitle)}</h3>
                <span class="node-arch-chip">${escapeHtml(databaseTopologyLabel(databaseConfig))}</span>
              </div>
            `
          : `<h3 class="node-title">${escapeHtml(displayTitle)}</h3>`;
      const headingMarkup =
        node.type === 'devbox'
          ? ''
          : `
              <div class="node-heading">
                <div class="node-icon material-symbols-outlined">${iconForType(node.type)}</div>
                <div class="node-heading-copy">
                  ${typeLabel}
                  ${titleMarkup}
                </div>
              </div>
            `;
      const entryDomains =
        node.type === 'entry'
          ? `
              <div class="node-domain-stack">
                <div class="node-domain-row" data-node-domain="${escapeHtml(entryConfig.externalDomain)}">
                  <span class="node-domain-label">外网域名</span>
                  <span class="node-domain-main">
                    <span class="node-domain-value">${escapeHtml(entryConfig.externalDomain)}</span>
                    <span
                      class="node-domain-health ${entryConfig.externalStatus === 'issue' ? 'issue' : 'healthy'}"
                      title="${entryConfig.externalStatus === 'issue' ? '不正常' : '健康'}"
                    ></span>
                  </span>
                </div>
                <div class="node-domain-row" data-node-domain="${escapeHtml(entryConfig.internalDomain)}">
                  <span class="node-domain-label">内网域名</span>
                  <span class="node-domain-main">
                    <span class="node-domain-value">${escapeHtml(entryConfig.internalDomain)}</span>
                    <span
                      class="node-domain-health ${entryConfig.internalStatus === 'issue' ? 'issue' : 'healthy'}"
                      title="${entryConfig.internalStatus === 'issue' ? '不正常' : '健康'}"
                    ></span>
                  </span>
                </div>
              </div>
            `
          : '';
      const containerCard =
        node.type === 'container'
          ? `
              <div class="node-container-head">
                <span class="node-container-label">镜像</span>
                <span class="node-container-replicas">${escapeHtml(containerConfig.replicas)} 副本</span>
              </div>
              <div class="node-container-image">${escapeHtml(containerConfig.image)}</div>
              <div class="node-container-meters">
                ${renderContainerMeter('CPU', containerConfig.usedCpu, containerConfig.quotaCpu, { kind: 'cpu' })}
                ${renderContainerMeter('内存', containerConfig.usedMemory, containerConfig.quotaMemory)}
                ${
                  containerConfig.mountDisk
                    ? renderContainerMeter('磁盘', containerConfig.diskUsed || estimateUsedDisk(containerConfig.diskSize), containerConfig.diskSize, {
                        kind: 'capacity',
                        icon: 'storage',
                      })
                    : ''
                }
              </div>
            `
          : '';
      const databaseCard =
        node.type === 'database'
          ? `
              <div class="node-database-meters">
                ${renderContainerMeter('CPU', databaseConfig.usedCpu || estimateUsedCpu(databaseConfig.cpu), databaseConfig.cpu, { kind: 'cpu' })}
                ${renderContainerMeter('内存', databaseConfig.usedMemory || estimateUsedMemory(databaseConfig.memory), databaseConfig.memory)}
              </div>
              <div class="node-db-connect">
                <span class="node-container-label">连接地址</span>
                <div class="node-db-connect-row">
                  <span class="node-db-connect-value">${escapeHtml(maskConnectionString((node.details && node.details.connect) || ''))}</span>
                  <span
                    class="node-inline-action"
                    role="button"
                    tabindex="-1"
                    data-node-copy="${escapeHtml((node.details && node.details.connect) || '')}"
                    title="复制连接地址"
                  >
                    复制
                  </span>
                </div>
              </div>
            `
          : '';
      const devboxCard = node.type === 'devbox' ? renderNodeDevboxCard(node, devboxConfig) : '';
      const topIndicators = node.type === 'database' || node.type === 'devbox' ? '' : '<div class="node-led"></div>';
      const badgeMarkup =
        node.type === 'database'
          ? ''
          : `
              <div class="node-badge-row">
                <div class="node-badge">${node.status}</div>
                ${node.type === 'devbox' ? '<div class="node-kind-badge">开发环境</div>' : ''}
              </div>
            `;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `node-card ${node.id === state.selectedNodeId ? 'active' : ''}`;
      card.dataset.nodeId = node.id;
      card.dataset.type = node.type;
      card.style.left = `${node.x}px`;
      card.style.top = `${node.y}px`;
      card.innerHTML = `
        ${badgeMarkup}
        ${
          headingMarkup || topIndicators
            ? `
                <div class="node-top ${node.type === 'database' ? 'node-top-compact' : ''}">
                  ${headingMarkup}
                  ${topIndicators}
                </div>
              `
            : ''
        }
        ${node.subtitle && node.type !== 'devbox' ? `<p class="node-subtitle">${escapeHtml(node.subtitle)}</p>` : ''}
        ${entryDomains}
        ${containerCard}
        ${databaseCard}
        ${devboxCard}
        ${node.type !== 'container' && node.type !== 'devbox' && tags.length ? `<div class="node-footer">${tags.map((tag) => `<span class="node-tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
        ${summary ? `<div class="node-summary">${escapeHtml(summary)}</div>` : ''}
      `;

      card.addEventListener('click', async (event) => {
        if (state.suppressClickNodeId === node.id) {
          state.suppressClickNodeId = null;
          return;
        }

        const copyTarget = event.target.closest('[data-node-copy]');
        if (copyTarget) {
          await copyToClipboard(copyTarget.dataset.nodeCopy || '');
          return;
        }

        const domainTarget = event.target.closest('[data-node-domain]');
        if (domainTarget && node.type === 'entry') {
          state.selectedNodeId = node.id;
          closeDatabaseWorkspace();
          closeContainerContext();
          closeDevboxContext();
          openEntryContext(node.id);
          openDomainTarget(domainTarget.dataset.nodeDomain || '');
          renderAll();
          return;
        }

        state.selectedNodeId = node.id;
        if (supportsDatabaseWorkspace(node)) {
          openDatabaseWorkspace(node.id);
          closeEntryContext();
          closeContainerContext();
          closeDevboxContext();
        } else if (node.type === 'container') {
          closeDatabaseWorkspace();
          closeEntryContext();
          closeDevboxContext();
          openContainerContext(node.id);
        } else if (node.type === 'entry') {
          closeDatabaseWorkspace();
          closeContainerContext();
          closeDevboxContext();
          openEntryContext(node.id);
        } else if (node.type === 'devbox') {
          closeDatabaseWorkspace();
          closeEntryContext();
          closeContainerContext();
          openDevboxContext(node.id);
        } else {
          closeDatabaseWorkspace();
          closeEntryContext();
          closeContainerContext();
          closeDevboxContext();
        }
        renderAll();
      });

      card.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) {
          return;
        }

        if (event.target.closest('[data-node-domain]') || event.target.closest('[data-node-copy]')) {
          return;
        }

        const rect = dom.canvasWorld.getBoundingClientRect();
        state.dragging = {
          nodeId: node.id,
          offsetX: event.clientX - rect.left - node.x,
          offsetY: event.clientY - rect.top - node.y,
          startX: event.clientX,
          startY: event.clientY,
          moved: false,
        };
        card.classList.add('dragging');
        card.setPointerCapture(event.pointerId);
      });

      card.addEventListener('pointermove', (event) => {
        if (!state.dragging || state.dragging.nodeId !== node.id) {
          return;
        }

        if (
          !state.dragging.moved &&
          Math.hypot(event.clientX - state.dragging.startX, event.clientY - state.dragging.startY) > dragThreshold
        ) {
          state.dragging.moved = true;
        }

        const rect = dom.canvasWorld.getBoundingClientRect();
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        node.x = clamp(
          event.clientX - rect.left - state.dragging.offsetX,
          20,
          dom.canvasWorld.clientWidth - width - 20,
        );
        node.y = clamp(
          event.clientY - rect.top - state.dragging.offsetY,
          20,
          dom.canvasWorld.clientHeight - height - 30,
        );
        card.style.left = `${node.x}px`;
        card.style.top = `${node.y}px`;
        scheduleEdgeRender();
      });

      card.addEventListener('pointerup', (event) => {
        if (!state.dragging || state.dragging.nodeId !== node.id) {
          return;
        }

        if (state.dragging.moved) {
          state.suppressClickNodeId = node.id;
          window.setTimeout(() => {
            if (state.suppressClickNodeId === node.id) {
              state.suppressClickNodeId = null;
            }
          }, 220);
        }

        state.dragging = null;
        card.classList.remove('dragging');
        card.releasePointerCapture(event.pointerId);
        scheduleEdgeRender();
      });

      card.addEventListener('pointercancel', () => {
        if (!state.dragging || state.dragging.nodeId !== node.id) {
          return;
        }

        state.dragging = null;
        card.classList.remove('dragging');
      });

      dom.nodeLayer.appendChild(card);
    });
    scheduleEdgeRender();
    updateSummary();
  }

  function renderCanvasWorkspace() {
    if (!dom.canvasWorkspace || !dom.canvasStage) {
      return;
    }

    const context = activeDatabaseContext();
    dom.canvasStage.classList.toggle('workspace-mode', Boolean(context));

    if (!context) {
      dom.canvasWorkspace.hidden = true;
      dom.canvasWorkspace.className = 'canvas-workspace';
      dom.canvasWorkspace.innerHTML = '';
      return;
    }

    const { node, workspace, database, table, view } = context;
    const activeTab = ['rows', 'schema', 'indexes'].includes(view.tab) ? view.tab : 'rows';
    const tableContent = table
      ? activeTab === 'schema'
        ? renderDatabaseSchemaPanel(table)
        : activeTab === 'indexes'
        ? renderDatabaseIndexesPanel(table)
        : renderDatabaseRowsPanel(table)
      : renderDatabaseErPanel(database);

    dom.canvasWorkspace.hidden = false;
    dom.canvasWorkspace.className = 'canvas-workspace active';
    dom.canvasWorkspace.innerHTML = `
      <div class="db-workspace-header">
        <div class="db-workspace-copy">
          <h2 class="db-workspace-title">${escapeHtml(node.title)}</h2>
        </div>
        <div class="db-workspace-actions">
          <button type="button" class="db-ghost-button" data-db-action="toggle-import">
            ${view.importOpen ? '收起导入' : '导入数据'}
          </button>
          <button type="button" class="db-ghost-button" data-db-action="close-workspace">返回画布</button>
        </div>
      </div>

      <div class="db-workspace-body">
        <aside class="db-nav">
          <div class="db-nav-label">Databases</div>
          <div class="db-database-list">
            ${workspace.databases
              .map(
                (item) => `
                  <div class="db-database-group">
                    <button
                      type="button"
                      class="db-database-button ${item.id === database.id ? 'active' : ''}"
                      data-db-action="select-database"
                      data-database-id="${item.id}"
                    >
                      <strong class="db-entity-label">
                        <span class="material-symbols-outlined db-entity-icon">database</span>
                        <span>${escapeHtml(item.name)}</span>
                      </strong>
                    </button>
                    ${
                      item.id === database.id
                        ? `<div class="db-table-list">
                            ${item.tables
                              .map(
                                (entry) => `
                                  <button
                                    type="button"
                                    class="db-table-button ${table && entry.id === table.id ? 'active' : ''}"
                                    data-db-action="select-table"
                                    data-table-id="${entry.id}"
                                  >
                                    <strong class="db-entity-label">
                                      <span class="material-symbols-outlined db-entity-icon">table_rows</span>
                                      <span>${escapeHtml(entry.name)}</span>
                                    </strong>
                                  </button>
                                `,
                              )
                              .join('')}
                          </div>`
                        : ''
                    }
                  </div>
                `,
              )
              .join('')}
          </div>
        </aside>

        <section class="db-main">
          ${view.importOpen ? renderDatabaseImportPanel(database, view) : ''}
          <div class="db-main-header">
            <div>
              <h3 class="db-main-title">
                <span class="material-symbols-outlined db-entity-icon">${table ? 'table_rows' : 'account_tree'}</span>
                <span>${escapeHtml(table ? table.name : database.name)}</span>
              </h3>
            </div>
          </div>

          ${
            table
              ? `<div class="db-tabs">
                  <button
                    type="button"
                    class="db-tab-button ${activeTab === 'rows' ? 'active' : ''}"
                    data-db-action="select-tab"
                    data-tab="rows"
                  >
                    Rows
                  </button>
                  <button
                    type="button"
                    class="db-tab-button ${activeTab === 'schema' ? 'active' : ''}"
                    data-db-action="select-tab"
                    data-tab="schema"
                  >
                    Schema
                  </button>
                  <button
                    type="button"
                    class="db-tab-button ${activeTab === 'indexes' ? 'active' : ''}"
                    data-db-action="select-tab"
                    data-tab="indexes"
                  >
                    Indexes
                  </button>
                </div>`
              : ''
          }

          ${tableContent}
        </section>
      </div>
    `;
  }

  function renderDatabaseRowsPanel(table) {
    return `
      <div class="db-panel">
        <div class="db-panel-inner">
          <table class="db-data-table">
            <thead>
              <tr>
                ${table.columns.map((column) => `<th>${escapeHtml(column.name)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${table.rows
                .map(
                  (row) => `
                    <tr>
                      ${table.columns
                        .map((column) => `<td>${escapeHtml(formatDatabaseCell(row[column.name]))}</td>`)
                        .join('')}
                    </tr>
                  `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderDatabaseSchemaPanel(table) {
    return `
      <div class="db-panel">
        <div class="db-panel-inner">
          <table class="db-schema-table">
            <thead>
              <tr>
                <th>Column</th>
                <th>Type</th>
                <th>Constraints</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              ${table.columns
                .map(
                  (column) => `
                    <tr>
                      <td>${escapeHtml(column.name)}</td>
                      <td>${escapeHtml(column.type)}</td>
                      <td>${escapeHtml(column.constraints || '-')}</td>
                      <td>${escapeHtml(column.default || '-')}</td>
                    </tr>
                  `,
                )
                .join('')}
            </tbody>
          </table>
          <div class="db-sql-block">
            <pre>${escapeHtml(table.ddl)}</pre>
          </div>
        </div>
      </div>
    `;
  }

  function renderDatabaseIndexesPanel(table) {
    return `
      <div class="db-panel">
        <div class="db-index-list">
          ${table.indexes.length
            ? table.indexes
                .map(
                  (index) => `
                    <div class="db-index-row">
                      <strong>${escapeHtml(index.name)}</strong>
                      <span>${escapeHtml(index.type)} / ${index.unique ? 'unique' : 'non-unique'}</span>
                      <span>${escapeHtml(index.columns)} / ${escapeHtml(index.size)}</span>
                    </div>
                  `,
                )
                .join('')
            : '<div class="db-empty-state">当前表没有额外索引。</div>'}
        </div>
      </div>
    `;
  }

  function renderSidebarContext() {
    if (!dom.chatTitle || !dom.chatContext || !dom.chatInput) {
      return;
    }

    const dbContext = activeDatabaseContext();
    if (dbContext) {
      const { node, database, view } = dbContext;
      const draft = view.configDraft || { ...node.databaseConfig };
      const changed = databaseConfigChanged(node, draft);
      const statusClass = view.error ? 'error' : changed ? 'pending' : view.saveState === 'done' ? 'saved' : '';
      const statusText = view.error
        ? view.error
        : changed
        ? '配置有未保存修改'
        : view.saveState === 'done'
        ? '配置已同步到数据库工作区'
        : '当前配置已生效';

      dom.chatTitle.textContent = '数据库配置';
      dom.chatContext.hidden = false;
      dom.chatContext.className = 'chat-context active';
      dom.chatInput.placeholder = '继续询问数据库操作、表结构调整，或让 Agent 生成 SQL';
      dom.chatContext.innerHTML = `
        <div class="db-config-card">
          <div class="db-config-header">
            <div>
              <strong>${escapeHtml(node.title)}</strong>
              <span>${escapeHtml(database.name)} / ${escapeHtml(node.databaseConfig.flavor)} ${escapeHtml(node.databaseConfig.version)}</span>
            </div>
            <div class="db-chip">${escapeHtml(node.databaseConfig.instanceSpec)}</div>
          </div>

          <section class="db-config-section">
            <div class="db-config-copy">扩缩容与数据库规格。</div>
            <div class="db-config-grid">
              <label class="db-config-label">
                <span>Instance</span>
                <select class="agui-select" data-db-config-field="instanceSpec">
                  ${selectOptions(databaseSpecOptions(node.databaseConfig.flavor), draft.instanceSpec || node.databaseConfig.instanceSpec)}
                </select>
              </label>
              <label class="db-config-label">
                <span>Replicas</span>
                <select class="agui-select" data-db-config-field="replicas">
                  ${selectOptions(['1', '2', '3', '5'], String(draft.replicas || node.databaseConfig.replicas))}
                </select>
              </label>
              <label class="db-config-label">
                <span>CPU</span>
                <select class="agui-select" data-db-config-field="cpu">
                  ${selectOptions(['1', '2', '4', '8', '16'], String(draft.cpu || node.databaseConfig.cpu))}
                </select>
              </label>
              <label class="db-config-label">
                <span>Memory</span>
                <select class="agui-select" data-db-config-field="memory">
                  ${selectOptions(['2Gi', '4Gi', '8Gi', '16Gi', '32Gi'], String(draft.memory || node.databaseConfig.memory))}
                </select>
              </label>
            </div>
          </section>

          <section class="db-config-section">
            <div class="db-config-copy">存储与备份策略。</div>
            <div class="db-config-grid">
              <label class="db-config-label">
                <span>Storage</span>
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(String(draft.storage || node.databaseConfig.storage))}"
                  data-db-config-field="storage"
                />
              </label>
              <label class="db-config-label">
                <span>Backup</span>
                <select class="agui-select" data-db-config-field="backupPolicy">
                  ${selectOptions(['PITR / Hourly', 'Snapshot / 6h', 'Daily Snapshot'], String(draft.backupPolicy || node.databaseConfig.backupPolicy))}
                </select>
              </label>
            </div>
          </section>

          <div class="db-config-footer">
            <div class="db-config-status ${statusClass}">${escapeHtml(statusText)}</div>
            <button type="button" class="db-primary-button" data-db-config-action="save">保存配置</button>
          </div>
        </div>
      `;
      return;
    }

    const containerContext = activeContainerContext();
    if (containerContext) {
      const { node, container, view } = containerContext;
      const draft = {
        ...container,
        ...(view.configDraft || {}),
        image: String(((view.configDraft && view.configDraft.image) || container.image) || '').trim(),
        replicas: String(((view.configDraft && view.configDraft.replicas) || container.replicas) || '').trim(),
        cpu: String(((view.configDraft && view.configDraft.cpu) || container.cpu) || '').trim(),
        memory: String(((view.configDraft && view.configDraft.memory) || container.memory) || '').trim(),
        envVars: String(((view.configDraft && view.configDraft.envVars) || container.envVars) || '').trim(),
        startArgs: String(((view.configDraft && view.configDraft.startArgs) || container.startArgs) || '').trim(),
        mountDisk:
          typeof (view.configDraft && view.configDraft.mountDisk) === 'boolean'
            ? view.configDraft.mountDisk
            : Boolean(container.mountDisk),
        diskSize: String(((view.configDraft && view.configDraft.diskSize) || container.diskSize) || '').trim(),
        mountPath: String(((view.configDraft && view.configDraft.mountPath) || container.mountPath) || '').trim(),
      };
      const changed = containerConfigChanged(node, draft);
      const statusClass = view.error ? 'error' : changed ? 'pending' : view.saveState === 'done' ? 'saved' : '';
      const statusText = view.error
        ? view.error
        : view.info
        ? view.info
        : changed
        ? '容器配置有未保存修改'
        : '当前配置已生效';

      dom.chatTitle.textContent = '容器配置';
      dom.chatContext.hidden = false;
      dom.chatContext.className = 'chat-context active';
      dom.chatInput.placeholder = '继续描述副本、资源、环境变量或镜像启动参数';
      dom.chatContext.innerHTML = `
        <div class="db-config-card">
          <div class="db-config-header">
            <div>
              <strong>${escapeHtml(cardTitleForNode(node))}</strong>
              <span>${escapeHtml(draft.image)}</span>
            </div>
            <div class="db-chip">${escapeHtml(draft.replicas)} 副本</div>
          </div>

          <section class="db-config-section">
            <div class="db-config-copy">副本数与容器资源。</div>
            <div class="db-config-grid">
              <label class="db-config-label">
                <span>Replicas</span>
                <select class="agui-select" data-container-config-field="replicas">
                  ${selectOptions(['1', '2', '3', '5'], draft.replicas || '1')}
                </select>
              </label>
              <label class="db-config-label">
                <span>CPU</span>
                <select class="agui-select" data-container-config-field="cpu">
                  ${selectOptions(['0.5', '1', '2', '4', '8'], draft.cpu || '1')}
                </select>
              </label>
              <label class="db-config-label">
                <span>Memory</span>
                <select class="agui-select" data-container-config-field="memory">
                  ${selectOptions(['512Mi', '1Gi', '2Gi', '4Gi', '8Gi', '16Gi'], draft.memory || '1Gi')}
                </select>
              </label>
            </div>
            <div class="container-runtime-copy">
              ${renderContainerMeter('CPU', draft.usedCpu || estimateUsedCpu(draft.cpu), draft.cpu, { kind: 'cpu' })}
              ${renderContainerMeter('内存', draft.usedMemory || estimateUsedMemory(draft.memory), draft.memory)}
              ${
                draft.mountDisk
                  ? renderContainerMeter(
                      '磁盘',
                      draft.diskUsed || estimateUsedDisk(draft.diskSize || '20Gi'),
                      draft.diskSize || '20Gi',
                      { kind: 'capacity', icon: 'storage' },
                    )
                  : ''
              }
            </div>
          </section>

          <section class="db-config-section">
            <div class="db-config-copy">镜像与启动参数。</div>
            <div class="db-config-grid">
              <label class="db-config-label">
                <span>Image</span>
                <input class="agui-input" type="text" value="${escapeHtml(draft.image)}" data-container-config-field="image" />
              </label>
              <label class="db-config-label">
                <span>Start Args</span>
                <input class="agui-input" type="text" value="${escapeHtml(draft.startArgs)}" data-container-config-field="startArgs" />
              </label>
            </div>
          </section>

          <section class="db-config-section">
            <div class="db-config-copy">环境变量。</div>
            <textarea class="agui-textarea" data-container-config-field="envVars" placeholder="KEY=value&#10;API_KEY=***">${escapeHtml(draft.envVars)}</textarea>
          </section>

          <section class="db-config-section">
            <div class="db-config-copy">持久化磁盘。</div>
            <label class="agui-checkline">
              <input type="checkbox" ${draft.mountDisk ? 'checked' : ''} data-container-config-field="mountDisk" />
              <span>有状态容器，挂载磁盘</span>
            </label>
            ${
              draft.mountDisk
                ? `<div class="db-config-grid">
                    <label class="db-config-label">
                      <span>Disk</span>
                      <input class="agui-input" type="text" value="${escapeHtml(draft.diskSize)}" data-container-config-field="diskSize" />
                    </label>
                    <label class="db-config-label">
                      <span>Used</span>
                      <input class="agui-input" type="text" value="${escapeHtml(draft.diskUsed || estimateUsedDisk(draft.diskSize || '20Gi'))}" data-container-config-field="diskUsed" />
                    </label>
                    <label class="db-config-label">
                      <span>Mount Path</span>
                      <input class="agui-input" type="text" value="${escapeHtml(draft.mountPath)}" data-container-config-field="mountPath" />
                    </label>
                  </div>`
                : ''
            }
          </section>

          <div class="db-config-footer">
            <div class="db-config-status ${statusClass}">${escapeHtml(statusText)}</div>
            <button type="button" class="db-primary-button" data-container-config-action="save">保存配置</button>
          </div>
        </div>
      `;
      return;
    }

    const entryContext = activeEntryContext();
    if (entryContext) {
      const { node, entry, view } = entryContext;
      const draft = {
        ...entry,
        ...(view.configDraft || {}),
        whitelist: normalizeStringList((view.configDraft && view.configDraft.whitelist) || entry.whitelist),
      };
      const changed = entryConfigChanged(node, draft);
      const statusClass = view.error ? 'error' : changed ? 'pending' : view.saveState === 'done' ? 'saved' : '';
      const statusText = view.error
        ? view.error
        : view.info
        ? view.info
        : changed
        ? '域名配置有未保存修改'
        : view.saveState === 'done'
        ? '域名配置已更新'
        : '当前入口可访问';

      dom.chatTitle.textContent = '域名配置';
      dom.chatContext.hidden = false;
      dom.chatContext.className = 'chat-context active';
      dom.chatInput.placeholder = '继续描述域名策略、白名单规则，或让 Agent 调整入口配置';
      dom.chatContext.innerHTML = `
        <div class="entry-config-card">
          <div class="entry-config-header">
            <div>
              <strong>${escapeHtml(draft.externalDomain || node.title)}</strong>
              <span>CNAME / Whitelist</span>
            </div>
            <div class="db-chip">Accessible</div>
          </div>

          <section class="entry-config-section">
            <div class="db-config-copy">点击域名可直接打开。</div>
            <div class="entry-domain-list">
              <button
                type="button"
                class="entry-domain-button"
                data-entry-config-action="open-domain"
                data-entry-domain="${escapeHtml(draft.externalDomain)}"
              >
                <span>外网域名</span>
                <strong class="entry-domain-main">
                  <span>${escapeHtml(draft.externalDomain)}</span>
                  <span
                    class="node-domain-health ${draft.externalStatus === 'issue' ? 'issue' : 'healthy'}"
                    title="${draft.externalStatus === 'issue' ? '不正常' : '健康'}"
                  ></span>
                </strong>
              </button>
              <button
                type="button"
                class="entry-domain-button"
                data-entry-config-action="open-domain"
                data-entry-domain="${escapeHtml(draft.internalDomain)}"
              >
                <span>内网域名</span>
                <strong class="entry-domain-main">
                  <span>${escapeHtml(draft.internalDomain)}</span>
                  <span
                    class="node-domain-health ${draft.internalStatus === 'issue' ? 'issue' : 'healthy'}"
                    title="${draft.internalStatus === 'issue' ? '不正常' : '健康'}"
                  ></span>
                </strong>
              </button>
            </div>
          </section>

          <section class="entry-config-section">
            <div class="db-config-copy">CNAME 配置。</div>
            <div class="db-config-grid">
              <label class="db-config-label">
                <span>CNAME Host</span>
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(draft.cnameHost || '')}"
                  data-entry-config-field="cnameHost"
                />
              </label>
              <label class="db-config-label">
                <span>CNAME Target</span>
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(draft.cnameTarget || '')}"
                  data-entry-config-field="cnameTarget"
                />
              </label>
            </div>
            <div class="entry-config-actions">
              <button type="button" class="db-ghost-button" data-entry-config-action="view-cname">查看 CNAME</button>
              <button type="button" class="db-primary-button" data-entry-config-action="save">更新 CNAME</button>
            </div>
          </section>

          <section class="entry-config-section">
            <div class="db-config-copy">IP公网地址列表。</div>
            <div class="entry-whitelist-list">
              ${
                draft.whitelist.length
                  ? draft.whitelist
                      .map(
                        (item, index) => `
                          <div class="entry-whitelist-item">
                            <span>${escapeHtml(item)}</span>
                            <button
                              type="button"
                              class="entry-whitelist-remove"
                              data-entry-config-action="remove-whitelist"
                              data-entry-whitelist-index="${index}"
                            >
                              删除
                            </button>
                          </div>
                        `,
                      )
                      .join('')
                  : '<div class="agui-empty">当前没有白名单条目。</div>'
              }
            </div>
            <div class="entry-whitelist-editor">
              <input
                class="agui-input"
                type="text"
                value="${escapeHtml(view.whitelistDraft || '')}"
                placeholder="203.0.113.24"
                data-entry-config-field="whitelistDraft"
              />
              <button type="button" class="db-primary-button" data-entry-config-action="add-whitelist">添加</button>
            </div>
          </section>

          <div class="db-config-footer">
            <div class="db-config-status ${statusClass}">${escapeHtml(statusText)}</div>
          </div>
        </div>
      `;
      return;
    }

    const devboxContext = activeDevboxContext();
    if (devboxContext) {
      const { node, devbox, view } = devboxContext;
      const draft = {
        ...devbox,
        ...(view.configDraft || {}),
        cpu: String(((view.configDraft && view.configDraft.cpu) || devbox.cpu) || '').trim(),
        memory: String(((view.configDraft && view.configDraft.memory) || devbox.memory) || '').trim(),
        diskSize: String(((view.configDraft && view.configDraft.diskSize) || devbox.diskSize) || '').trim(),
        startCommand: String(((view.configDraft && view.configDraft.startCommand) || devbox.startCommand) || '').trim(),
        port: String(((view.configDraft && view.configDraft.port) || devbox.port) || '').trim(),
      };
      const template = getDevboxTemplateById(draft.templateId) || resolveDevboxNodeTemplate(node);
      const stack = devboxTemplateStack(template);
      const changed = devboxConfigChanged(node, draft);
      const statusClass = view.error ? 'error' : changed ? 'pending' : view.saveState === 'done' ? 'saved' : '';
      const statusText = view.error
        ? view.error
        : view.info
        ? view.info
        : changed
        ? '开发环境配置有未保存修改'
        : '当前配置已生效';

      dom.chatTitle.textContent = '开发环境';
      dom.chatContext.hidden = false;
      dom.chatContext.className = 'chat-context active';
      dom.chatInput.placeholder = '继续描述开发环境模板、资源规格或启动命令';
      dom.chatContext.innerHTML = `
        <div class="db-config-card">
          <div class="db-config-header">
            <div>
              <strong>${escapeHtml(cardTitleForNode(node) || 'Workspace')}</strong>
              <span>开发环境</span>
            </div>
            <div class="db-chip">${escapeHtml(template ? template.name : 'DevBox')}</div>
          </div>

          <section class="db-config-section">
            <div class="db-config-copy">当前工作区模板。</div>
            <div class="devbox-stack-row">
              ${stack.map((item) => renderTemplateBadge(item, 'devbox-template-badge')).join('')}
            </div>
            <div class="devbox-meta-row">
              ${draft.version ? `<span class="devbox-meta-chip">v${escapeHtml(draft.version)}</span>` : ''}
            </div>
          </section>

          <section class="db-config-section">
            <div class="db-config-copy">资源规格。</div>
            <div class="container-runtime-copy">
              ${renderContainerMeter('CPU', draft.usedCpu || estimateUsedCpu(draft.cpu || '4'), draft.cpu || '4', { kind: 'cpu' })}
              ${renderContainerMeter('内存', draft.usedMemory || estimateUsedMemory(draft.memory || '8Gi'), draft.memory || '8Gi')}
              ${renderContainerMeter('磁盘', draft.diskUsed || estimateUsedDisk(draft.diskSize || '50Gi'), draft.diskSize || '50Gi', {
                kind: 'capacity',
                icon: 'storage',
              })}
            </div>
            <div class="db-config-grid">
              <label class="db-config-label">
                <span>CPU</span>
                <select class="agui-select" data-devbox-config-field="cpu">
                  ${selectOptions(['2', '4', '8', '16'], draft.cpu || '4')}
                </select>
              </label>
              <label class="db-config-label">
                <span>Memory</span>
                <select class="agui-select" data-devbox-config-field="memory">
                  ${selectOptions(['4Gi', '8Gi', '16Gi', '32Gi'], draft.memory || '8Gi')}
                </select>
              </label>
              <label class="db-config-label">
                <span>Disk</span>
                <input class="agui-input" type="text" value="${escapeHtml(draft.diskSize || '50Gi')}" data-devbox-config-field="diskSize" />
              </label>
            </div>
          </section>

          <section class="db-config-section">
            <div class="db-config-copy">启动命令。</div>
            <input class="agui-input" type="text" value="${escapeHtml(draft.startCommand || '')}" data-devbox-config-field="startCommand" />
          </section>

          <section class="db-config-section">
            <div class="db-config-copy">可直接通过本地 IDE 连接当前开发环境。</div>
            <div class="devbox-ide-grid">
              ${DEVBOX_IDE_CLIENTS.map(
                (ide) => `
                  <div class="devbox-ide-item">
                    <span class="devbox-ide-icon" style="--ide-accent:${ide.accent};">${escapeHtml(ide.mark)}</span>
                    <div class="devbox-ide-copy">
                      <strong>${escapeHtml(ide.name)}</strong>
                      <span>${escapeHtml(ide.note)}</span>
                    </div>
                  </div>
                `,
              ).join('')}
            </div>
            <div class="devbox-connect-hint">打开本地 IDE 后，可使用 Remote SSH、Gateway 或同类远程方式连接这个工作区。</div>
          </section>

          <div class="db-config-footer">
            <div class="db-config-status ${statusClass}">${escapeHtml(statusText)}</div>
            <button type="button" class="db-primary-button" data-devbox-config-action="save">保存配置</button>
          </div>
        </div>
      `;
      return;
    }

    dom.chatTitle.textContent = '聊天';
    dom.chatContext.hidden = true;
    dom.chatContext.className = 'chat-context';
    dom.chatContext.innerHTML = '';
    dom.chatInput.placeholder = DEFAULT_CHAT_PLACEHOLDER;
  }

  function formatDatabaseCell(value) {
    if (value === null || value === undefined) {
      return '-';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  function renderEdges() {
    const stageRect = dom.canvasWorld.getBoundingClientRect();
    const selectedId = state.selectedNodeId;
    const edgeFragments = state.edges
      .map((edge) => {
        const fromEl = dom.nodeLayer.querySelector(`[data-node-id="${edge.from}"]`);
        const toEl = dom.nodeLayer.querySelector(`[data-node-id="${edge.to}"]`);
        if (!fromEl || !toEl) {
          return '';
        }

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const start = {
          x: fromRect.left - stageRect.left + fromRect.width / 2,
          y: fromRect.top - stageRect.top + fromRect.height / 2,
        };
        const end = {
          x: toRect.left - stageRect.left + toRect.width / 2,
          y: toRect.top - stageRect.top + toRect.height / 2,
        };

        const delta = Math.abs(end.x - start.x);
        const curvature = Math.max(48, delta * 0.32);
        const path = `M ${start.x} ${start.y} C ${start.x + curvature} ${start.y}, ${end.x - curvature} ${end.y}, ${end.x} ${end.y}`;
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2 - 8;
        const highlight = edge.from === selectedId || edge.to === selectedId;

        return `
          <path class="edge-line-back" d="${path}"></path>
          <path class="edge-line ${highlight ? 'highlight' : ''}" d="${path}"></path>
          <text class="edge-label" x="${midX}" y="${midY}" text-anchor="middle">${edge.label}</text>
        `;
      })
      .join('');

    const defs = dom.edgeLayer.querySelector('defs');
    dom.edgeLayer.innerHTML = '';
    dom.edgeLayer.appendChild(defs);
    dom.edgeLayer.insertAdjacentHTML('beforeend', edgeFragments);
  }

  function scheduleEdgeRender() {
    window.cancelAnimationFrame(rafHandle);
    rafHandle = window.requestAnimationFrame(renderEdges);
  }

  function renderInspector() {
    if (!dom.inspectorTitle || !dom.inspectorType || !dom.inspectorBody) {
      return;
    }

    const node = getNodeById(state.selectedNodeId);

    if (!node) {
      dom.inspectorTitle.textContent = '选择一个对象';
      dom.inspectorType.textContent = 'Overview';
      dom.inspectorBody.innerHTML = `
        <div class="empty-inspector">
          选择画布中的任意对象，可查看连接方式、运行信息、运维动作和上下游关系。
        </div>
      `;
      return;
    }

    dom.inspectorTitle.textContent = node.title;
    dom.inspectorType.textContent = labelForType(node.type);

    const relations = collectRelations(node.id);
    dom.inspectorBody.innerHTML = `
      <section class="inspector-section">
        <h3>对象信息</h3>
        <div class="fact-list">
          ${Object.entries(node.details)
            .map(
              ([key, value]) => `
                <div class="fact-item">
                  <span class="fact-key">${humanizeKey(key)}</span>
                  <span class="fact-value">${value}</span>
                </div>
              `,
            )
            .join('')}
        </div>
      </section>

      <section class="inspector-section">
        <h3>关系</h3>
        <div class="relation-list">
          ${
            relations.length
              ? relations
                  .map(
                    (item) => `
                      <div class="relation-item">
                        <span class="relation-key">${item.direction}</span>
                        <span class="relation-value">${item.target} / ${item.label}</span>
                      </div>
                    `,
                  )
                  .join('')
              : '<div class="empty-inspector">当前对象还没有与其他对象建立连接。</div>'
          }
        </div>
      </section>

      <section class="inspector-section">
        <h3>可执行动作</h3>
        <div class="action-list">
          ${node.operations.map((item) => `<div class="action-chip">${item}</div>`).join('')}
        </div>
      </section>
    `;
  }

  function renderChat() {
    if (!dom.chatLog) {
      return;
    }

    dom.chatLog.innerHTML = state.messages
      .map((message) => {
        if (message.kind === 'agui') {
          return renderAguiMessage(message);
        }

        return `
          <div class="chat-message ${message.role}">
            <div class="chat-avatar">${message.role === 'assistant' ? 'AI' : 'YOU'}</div>
            <div class="chat-bubble">${escapeHtml(message.text)}</div>
          </div>
        `;
      })
      .join('');

    if (dom.chatScroll) {
      dom.chatScroll.scrollTop = dom.chatScroll.scrollHeight;
      return;
    }

    dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
  }

  function renderTimeline() {
    if (!dom.timelineList) {
      return;
    }

    dom.timelineList.innerHTML = state.timeline
      .map(
        (item) => `
          <div class="timeline-item ${item.status}">
            <div class="timeline-pin"></div>
            <div class="timeline-copy">
              <strong>${item.title}</strong>
              <span>${item.detail}</span>
            </div>
          </div>
        `,
      )
      .join('');
  }

  function renderQuickPrompts() {
    if (!dom.quickPrompts) {
      return;
    }

    dom.quickPrompts.innerHTML = QUICK_PROMPTS.map(
      (text) => `<button class="suggestion-chip" data-quick-prompt="${text}">${text}</button>`,
    ).join('');
  }

  function updateSummary() {
    if (dom.domainCount) {
      dom.domainCount.textContent = String(state.nodes.filter((node) => node.type === 'entry').length);
    }
    if (dom.instanceCount) {
      dom.instanceCount.textContent = String(
        state.nodes.filter((node) => ['container', 'database', 'app', 'devbox'].includes(node.type)).length,
      );
    }
  }

  function renderAll() {
    renderNav();
    renderCanvas();
    renderCanvasWorkspace();
    renderSidebarContext();
    renderChat();
    setAgentState(state.agentBusy, state.currentTask);
  }

  function bindEvents() {
    dom.navFilters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-rail-action]');
      if (!button) {
        return;
      }

      if (button.dataset.railAction === 'projects') {
        const firstProject = collectProjectNodes()[0] || state.nodes[0];
        if (firstProject) {
          state.selectedNodeId = firstProject.id;
          closeDatabaseWorkspace();
          closeEntryContext();
          closeContainerContext();
          if (supportsDatabaseWorkspace(firstProject)) {
            openDatabaseWorkspace(firstProject.id);
          } else if (firstProject.type === 'container') {
            openContainerContext(firstProject.id);
          } else if (firstProject.type === 'entry') {
            openEntryContext(firstProject.id);
          }
          renderAll();
        }
        return;
      }

      if (button.dataset.railAction === 'github-ui') {
        openGithubImportUi();
        return;
      }

      if (button.dataset.railAction === 'docker-ui') {
        openDockerDeployUi();
        return;
      }

      if (button.dataset.railAction === 'database-ui') {
        openDatabaseDeployUi();
        return;
      }

      if (button.dataset.railAction === 'app-ui') {
        openAppStoreUi();
        return;
      }

      if (button.dataset.railAction === 'devbox-ui') {
        openDevboxDeployUi();
        return;
      }

      dom.chatInput.value = button.dataset.shortcutPrompt || '';
      dom.chatInput.focus();
    });

    dom.chatLog.addEventListener('input', (event) => {
      const input = event.target.closest('[data-agui-field]');
      if (!input) {
        return;
      }

      const message = getMessageById(input.dataset.messageId);
      if (!message || message.kind !== 'agui') {
        return;
      }

      message.payload[input.dataset.aguiField] = input.value;
      message.payload.error = '';

      if (message.ui === 'app-store' && input.dataset.aguiField === 'search') {
        const matches = filterAppCatalog(message.payload.search);
        if (!matches.some((app) => app.id === message.payload.selectedApp)) {
          message.payload.selectedApp = matches[0] ? matches[0].id : '';
        }
        renderChat();
        focusAguiField(message.id, 'search');
      }
    });

    dom.chatLog.addEventListener('change', (event) => {
      const input = event.target.closest('[data-agui-field]');
      if (!input) {
        return;
      }

      const message = getMessageById(input.dataset.messageId);
      if (!message || message.kind !== 'agui') {
        return;
      }

      message.payload[input.dataset.aguiField] = input.type === 'checkbox' ? input.checked : input.value;
      message.payload.error = '';

      if (message.ui === 'database-deploy' && input.dataset.aguiField === 'dbType') {
        const nextSpecs = databaseSpecOptions(message.payload.dbType);
        message.payload.instanceSpec = nextSpecs[0] || '';
      }

      renderChat();
    });

    dom.chatLog.addEventListener('click', (event) => {
      const button = event.target.closest('[data-agui-action]');
      if (!button) {
        return;
      }

      const message = getMessageById(button.dataset.messageId);
      if (!message || message.kind !== 'agui') {
        return;
      }

      if (message.ui === 'github-import' && button.dataset.aguiAction === 'github-auth') {
        message.payload.authConnected = true;
        message.payload.selectedRepo = 'fanux/sealai';
        message.payload.error = '';
        renderChat();
        return;
      }

      if (message.ui === 'github-import' && button.dataset.aguiAction === 'github-deploy') {
        void deployGithubFromAgui(message.id);
        return;
      }

      if (message.ui === 'docker-deploy' && button.dataset.aguiAction === 'docker-deploy') {
        void deployDockerFromAgui(message.id);
        return;
      }

      if (message.ui === 'app-store' && button.dataset.aguiAction === 'app-select') {
        message.payload.selectedApp = button.dataset.appId || '';
        message.payload.error = '';
        renderChat();
        return;
      }

      if (message.ui === 'app-store' && button.dataset.aguiAction === 'app-deploy') {
        void deployAppFromAgui(message.id);
        return;
      }

      if (message.ui === 'devbox-deploy' && button.dataset.aguiAction === 'devbox-select') {
        const template = getDevboxTemplateById(button.dataset.templateId);
        if (!template) {
          return;
        }

        message.payload.templateId = template.id;
        message.payload.version = defaultDevboxVersion(template);
        message.payload.port = template.defaultPort;
        message.payload.error = '';
        renderChat();
        return;
      }

      if (message.ui === 'devbox-deploy' && button.dataset.aguiAction === 'devbox-deploy') {
        void deployDevboxFromAgui(message.id);
        return;
      }

      if (message.ui === 'database-deploy' && button.dataset.aguiAction === 'database-deploy') {
        void deployDatabaseFromAgui(message.id);
      }
    });

    if (dom.canvasWorkspace) {
      dom.canvasWorkspace.addEventListener('click', (event) => {
        const button = event.target.closest('[data-db-action]');
        if (!button || !state.databaseView) {
          return;
        }

        if (button.dataset.dbAction === 'close-workspace') {
          closeDatabaseWorkspace();
          renderAll();
          return;
        }

        if (button.dataset.dbAction === 'select-database') {
          state.databaseView.databaseId = button.dataset.databaseId || '';
          state.databaseView.tableId = '';
          state.databaseView.tab = 'rows';
          renderAll();
          return;
        }

        if (button.dataset.dbAction === 'select-table') {
          state.databaseView.tableId = button.dataset.tableId || '';
          renderAll();
          return;
        }

        if (button.dataset.dbAction === 'select-tab') {
          state.databaseView.tab = button.dataset.tab || 'rows';
          renderAll();
          return;
        }

        if (button.dataset.dbAction === 'toggle-import') {
          state.databaseView.importOpen = !state.databaseView.importOpen;
          state.databaseView.importError = '';
          renderCanvasWorkspace();
          return;
        }

        if (button.dataset.dbAction === 'set-import-method') {
          state.databaseView.importMethod = button.dataset.importMethod || 'csv';
          state.databaseView.importStatus = 'idle';
          state.databaseView.importError = '';
          renderCanvasWorkspace();
          return;
        }

        if (button.dataset.dbAction === 'execute-import') {
          executeDatabaseImport();
        }
      });

      dom.canvasWorkspace.addEventListener('input', (event) => {
        const input = event.target.closest('[data-db-import-field]');
        if (!input || !state.databaseView) {
          return;
        }

        state.databaseView.importDraft[input.dataset.dbImportField] = input.value;
        state.databaseView.importStatus = 'idle';
        state.databaseView.importError = '';
      });

      dom.canvasWorkspace.addEventListener('change', (event) => {
        const input = event.target.closest('[data-db-import-upload]');
        if (!input || !state.databaseView) {
          return;
        }

        const field = input.dataset.dbImportUpload;
        const file = input.files && input.files[0];
        state.databaseView.importDraft[field] = file ? file.name : '';
        state.databaseView.importStatus = 'idle';
        state.databaseView.importError = '';
        renderCanvasWorkspace();
      });
    }

    if (dom.chatContext) {
      const updateDatabaseConfigDraft = (event) => {
        const input = event.target.closest('[data-db-config-field]');
        if (!input || !state.databaseView) {
          return false;
        }

        state.databaseView.configDraft[input.dataset.dbConfigField] = input.value;
        state.databaseView.saveState = 'editing';
        state.databaseView.error = '';

        if (input.dataset.dbConfigField === 'instanceSpec') {
          const profile = databaseSpecProfile(input.value);
          state.databaseView.configDraft.cpu = profile.cpu;
          state.databaseView.configDraft.memory = profile.memory;
        }

        return true;
      };

      const updateContainerConfigDraft = (event) => {
        const input = event.target.closest('[data-container-config-field]');
        if (!input || !state.containerView) {
          return false;
        }

        const field = input.dataset.containerConfigField;
        state.containerView.configDraft[field] = input.type === 'checkbox' ? input.checked : input.value;
        state.containerView.saveState = 'editing';
        state.containerView.error = '';
        state.containerView.info = '';

        if (field === 'cpu') {
          state.containerView.configDraft.quotaCpu = input.value;
          state.containerView.configDraft.usedCpu = estimateUsedCpu(input.value);
        }

        if (field === 'memory') {
          state.containerView.configDraft.quotaMemory = input.value;
          state.containerView.configDraft.usedMemory = estimateUsedMemory(input.value);
        }

        if (field === 'mountDisk' && !input.checked) {
          state.containerView.configDraft.diskSize = '';
          state.containerView.configDraft.diskUsed = '';
          state.containerView.configDraft.mountPath = '';
        }

        if (field === 'mountDisk' && input.checked) {
          state.containerView.configDraft.diskSize = state.containerView.configDraft.diskSize || '20Gi';
          state.containerView.configDraft.diskUsed =
            state.containerView.configDraft.diskUsed || estimateUsedDisk(state.containerView.configDraft.diskSize);
          state.containerView.configDraft.mountPath = state.containerView.configDraft.mountPath || '/data';
        }

        return true;
      };

      const updateEntryConfigDraft = (event) => {
        const input = event.target.closest('[data-entry-config-field]');
        if (!input || !state.entryView) {
          return false;
        }

        const field = input.dataset.entryConfigField;
        if (field === 'whitelistDraft') {
          state.entryView.whitelistDraft = input.value;
        } else {
          state.entryView.configDraft[field] = input.value;
        }

        state.entryView.saveState = 'editing';
        state.entryView.error = '';
        state.entryView.info = '';
        return true;
      };

      const updateDevboxConfigDraft = (event) => {
        const input = event.target.closest('[data-devbox-config-field]');
        if (!input || !state.devboxView) {
          return false;
        }

        const field = input.dataset.devboxConfigField;
        state.devboxView.configDraft[field] = input.value;
        state.devboxView.saveState = 'editing';
        state.devboxView.error = '';
        state.devboxView.info = '';

        if (field === 'cpu') {
          state.devboxView.configDraft.quotaCpu = input.value;
          state.devboxView.configDraft.usedCpu = estimateUsedCpu(input.value);
        }

        if (field === 'memory') {
          state.devboxView.configDraft.quotaMemory = input.value;
          state.devboxView.configDraft.usedMemory = estimateUsedMemory(input.value);
        }

        if (field === 'diskSize') {
          state.devboxView.configDraft.diskUsed = estimateUsedDisk(input.value || '50Gi');
        }

        return true;
      };

      dom.chatContext.addEventListener('input', (event) => {
        if (updateDatabaseConfigDraft(event)) {
          renderSidebarContext();
          return;
        }

        if (updateContainerConfigDraft(event)) {
          return;
        }

        if (updateEntryConfigDraft(event)) {
          return;
        }

        updateDevboxConfigDraft(event);
      });

      dom.chatContext.addEventListener('change', (event) => {
        if (updateDatabaseConfigDraft(event)) {
          renderSidebarContext();
          return;
        }

        if (updateContainerConfigDraft(event)) {
          renderSidebarContext();
          return;
        }

        if (updateEntryConfigDraft(event)) {
          renderSidebarContext();
          return;
        }

        if (updateDevboxConfigDraft(event)) {
          renderSidebarContext();
        }
      });

      dom.chatContext.addEventListener('click', (event) => {
        const dbButton = event.target.closest('[data-db-config-action]');
        if (dbButton && state.databaseView && dbButton.dataset.dbConfigAction === 'save') {
          saveDatabaseConfig();
          return;
        }

        const containerButton = event.target.closest('[data-container-config-action]');
        if (containerButton && state.containerView && containerButton.dataset.containerConfigAction === 'save') {
          saveContainerConfig();
          return;
        }

        const devboxConfigButton = event.target.closest('[data-devbox-config-action]');
        if (devboxConfigButton && state.devboxView && devboxConfigButton.dataset.devboxConfigAction === 'save') {
          saveDevboxConfig();
          return;
        }

        const entryButton = event.target.closest('[data-entry-config-action]');
        if (entryButton && state.entryView) {
          if (entryButton.dataset.entryConfigAction === 'open-domain') {
            openDomainTarget(entryButton.dataset.entryDomain || '');
            return;
          }

          if (entryButton.dataset.entryConfigAction === 'view-cname') {
            showEntryCnameInfo();
            return;
          }

          if (entryButton.dataset.entryConfigAction === 'save') {
            saveEntryConfig();
            return;
          }

          if (entryButton.dataset.entryConfigAction === 'add-whitelist') {
            addEntryWhitelistItem();
            return;
          }

          if (entryButton.dataset.entryConfigAction === 'remove-whitelist') {
            removeEntryWhitelistItem(Number(entryButton.dataset.entryWhitelistIndex || '-1'));
            return;
          }
        }

      });
    }

    dom.chatForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const input = dom.chatInput.value.trim();
      if (!input) {
        return;
      }

      await handleUserPrompt(input);
      dom.chatInput.value = '';
    });

    window.addEventListener('resize', scheduleEdgeRender);
  }

  async function handleUserPrompt(input) {
    addMessage('user', input);

    if (state.agentBusy) {
      addMessage('assistant', '上一条任务仍在执行中。原型先串行处理，请等待当前编排完成后再继续。');
      return;
    }

    const intent = detectIntent(input);

    if (intent === 'github') {
      await runGithubFlow(input);
      return;
    }

    if (intent === 'image') {
      await runImageFlow(input);
      return;
    }

    if (intent === 'database') {
      await runDatabaseFlow(input);
      return;
    }

    if (intent === 'app') {
      await runAppFlow(input);
      return;
    }

    if (intent === 'devbox') {
      await runDevboxFlow(input);
      return;
    }

    if (intent === 'repair') {
      await runRepairFlow(input);
      return;
    }

    addMessage(
      'assistant',
      '我识别到了自然语言需求，但当前原型只演示五类任务：源码部署、镜像运行、数据库创建、应用商店模板、DevBox，以及部署修复。你可以直接输入对应目标。',
    );
  }

  function detectIntent(input) {
    const lower = input.toLowerCase();

    if (/(github\.com|仓库|源码)/.test(lower)) {
      return 'github';
    }

    if (/(docker|镜像|ghcr\.io|docker\.io|image)/.test(lower)) {
      return 'image';
    }

    if (/(postgres|pgsql|mysql|mongo|redis|数据库)/.test(lower)) {
      return 'database';
    }

    if (/(fastgpt|dify|n8n|metabase|应用商店|模板|app store)/.test(lower)) {
      return 'app';
    }

    if (/(devbox|开发环境|cursor|vscode|code server)/.test(lower)) {
      return 'devbox';
    }

    if (/(修复|失败|恢复|诊断)/.test(lower)) {
      return 'repair';
    }

    return 'unknown';
  }

  async function deployGithubFromAgui(messageId) {
    const message = getMessageById(messageId);
    if (!message || message.kind !== 'agui' || message.ui !== 'github-import') {
      return;
    }

    if (state.agentBusy) {
      message.payload.error = '当前已有任务在执行，请等待完成后再发起 Deploy。';
      renderChat();
      return;
    }

    const draft = (message.payload.urlDraft || '').trim();
    const repoUrl = draft || (message.payload.authConnected ? `https://github.com/${message.payload.selectedRepo}` : '');

    if (!repoUrl) {
      message.payload.error = '请输入 GitHub 仓库地址，或先完成 GitHub 授权。';
      renderChat();
      return;
    }

    message.payload.error = '';
    message.payload.deployState = 'deploying';
    message.payload.lastRepoUrl = repoUrl;
    renderChat();

    await runGithubFlow(`分析这个 GitHub 项目并部署：${repoUrl}`);

    message.payload.deployState = 'done';
    message.payload.lastRepoUrl = repoUrl;
    renderChat();
  }

  async function runGithubFlow(input) {
    const url = extractUrl(input) || 'https://github.com/example/project';
    const project = deriveProjectName(url);
    const baseX = 180 + Math.floor(Math.random() * 90);
    const baseY = 140 + Math.floor(Math.random() * 120);

    setAgentState(true, '源码部署');
    addMessage('assistant', `已接收源码任务，开始分析仓库：${url}`);
    pushTimeline('识别仓库', `读取 ${project} 的运行时、依赖图和启动命令。`, 'running');
    await wait(900);

    pushTimeline('生成交付物', '未发现现成镜像，自动生成 Dockerfile 并构建镜像。', 'done');
    addMessage('assistant', `Agent 已完成依赖分析，并为 ${project} 生成 Dockerfile。`);
    await wait(900);

    const entryId = createId('entry');
    const appId = createId('container');

    state.nodes.push({
      id: entryId,
      type: 'entry',
      title: `${project}.cloud.sealos.run`,
      subtitle: '内网域名 / 外网域名',
      status: 'Accessible',
      tags: [],
      x: baseX,
      y: baseY - 70,
      details: {
        target: project,
        externalDomain: `${project}.cloud.sealos.run`,
        internalDomain: `${project}-runtime.region.internal`,
        cnameHost: `${project}.cloud.sealos.run`,
        cnameTarget: 'gateway.sealos.run',
        whitelist: defaultEntryWhitelist(),
        source: url,
        route: `指向 ${project}`,
      },
      operations: ['查看入口', '切换灰度', '复制域名'],
    });

    state.nodes.push({
      id: appId,
      type: 'container',
      title: project,
      subtitle: '',
      status: 'Running',
      tags: [],
      x: baseX + 260,
      y: baseY + 40,
      details: {
        image: `registry.local/${project}:latest`,
        envVars: 'PORT=3000',
      },
      containerConfig: {
        image: `registry.local/${project}:latest`,
        replicas: '2',
        cpu: '2',
        memory: '2Gi',
        envVars: 'PORT=3000',
      },
      operations: ['查看日志', '回滚', '扩容'],
    });

    state.edges.push({
      id: createId('edge'),
      from: entryId,
      to: appId,
      label: '443',
    });

    state.selectedNodeId = appId;
    addMessage(
      'assistant',
      `部署完成。画布中新增了入口域名和应用实例，你可以继续要求我挂接数据库、补齐环境变量，或修复部署问题。`,
    );
    pushTimeline('完成部署', `源码已转换为运行实例，并暴露入口 ${project}.cloud.sealos.run。`, 'done');
    setAgentState(false, '待命');
    renderAll();
  }

  async function runImageFlow(input, options = {}) {
    const image = options.image || extractImage(input) || 'ghcr.io/example/app:latest';
    const name = image.split('/').pop().replace(/[:.]/g, '-').slice(0, 18);
    const domain = (options.domain || '').trim() || `${name}.edge.sealos.run`;
    const port = String(options.port || inferPortFromInput(input) || '3000');
    const envSummary = summarizeEnvVars(options.envVars || '');
    const runtimeSummary = summarizeRuntimeOptions(options);

    setAgentState(true, '镜像运行');
    addMessage('assistant', `收到镜像任务：${image}`);
    pushTimeline('解析镜像', '分析 Exposed Ports、Entrypoint、环境变量约束。', 'running');
    await wait(800);

    pushTimeline('创建实例', '按照解析结果在云操作系统中拉起运行实例。', 'done');
    await wait(800);

    const entryId = createId('entry');
    const containerId = createId('container');
    const x = 250 + Math.floor(Math.random() * 90);
    const y = 250 + Math.floor(Math.random() * 110);

    state.nodes.push({
      id: entryId,
      type: 'entry',
      title: domain,
      subtitle: '内网域名 / 外网域名',
      status: 'Accessible',
      tags: [],
      x,
      y: y - 82,
      details: {
        target: name,
        externalDomain: domain,
        internalDomain: `${entryToken(name)}.region.internal`,
        cnameHost: domain,
        cnameTarget: 'gateway.sealos.run',
        whitelist: defaultEntryWhitelist(),
        image,
      },
      operations: ['复制域名', '查看路由', '暂停入口'],
    });

    state.nodes.push({
      id: containerId,
      type: 'container',
      title: name,
      subtitle: '',
      status: 'Running',
      tags: [],
      x: x + 260,
      y,
      details: {
        image,
        envVars: options.envVars || '',
        route: `${domain} -> ${port}/TCP`,
      },
      containerConfig: {
        image,
        replicas: '1',
        cpu: String(options.cpu || '1'),
        memory: String(options.memory || '1Gi'),
        envVars: options.envVars || '',
        startArgs: options.startArgs || '',
        mountDisk: Boolean(options.mountDisk),
        stateful: Boolean(options.mountDisk),
        diskSize: options.diskSize || '10Gi',
        mountPath: options.mountPath || '/data',
      },
      operations: ['追加环境变量', '查看日志', '重启'],
    });

    state.edges.push({
      id: createId('edge'),
      from: entryId,
      to: containerId,
      label: `${port}/TCP`,
    });

    state.selectedNodeId = containerId;
    addMessage(
      'assistant',
      `镜像已转化为一个可运行实例。入口域名为 ${domain}，容器端口使用 ${port}/TCP。`,
    );
    setAgentState(false, '待命');
    renderAll();
  }

  async function runDatabaseFlow(input, options = {}) {
    const lower = input.toLowerCase();
    const flavor =
      options.dbType ||
      (lower.includes('mysql')
        ? 'MySQL'
        : lower.includes('mongo')
        ? 'MongoDB'
        : lower.includes('redis')
        ? 'Redis'
        : 'PostgreSQL');
    const instanceSpec = options.instanceSpec || databaseSpecOptions(flavor)[0] || 'db.mysql.small';
    const replicas = String(options.replicas || '2');
    const x = 520 + Math.floor(Math.random() * 120);
    const y = 240 + Math.floor(Math.random() * 140);
    const id = createId('db');

    setAgentState(true, '数据库创建');
    addMessage('assistant', `开始创建 ${flavor} 实例，规格 ${instanceSpec}，副本数 ${replicas}。`);
    pushTimeline('创建数据库', `${flavor} 集群初始化、实例规格下发和副本编排。`, 'running');
    await wait(1000);

    const databaseNode = syncDatabaseNode({
      id,
      type: 'database',
      title: `${flavor}`,
      subtitle: '',
      status: 'Protected',
      tags: [],
      x,
      y,
      details: {
        connect: databaseConnectString(flavor),
        backup: '快照 + 恢复点',
        observability: `${instanceSpec} / ${replicas} 副本 / 监控开启`,
      },
      operations: ['复制连接串', '创建只读副本', '打开备份'],
      databaseConfig: createDatabaseConfig(flavor, {
        instanceSpec,
        replicas,
      }),
    });
    state.nodes.push(databaseNode);

    const lastContainer = [...state.nodes].reverse().find((node) => node.type === 'container');
    if (lastContainer) {
      state.edges.push({
        id: createId('edge'),
        from: lastContainer.id,
        to: id,
        label: databaseConnectionLabel(flavor),
      });
    }

    state.selectedNodeId = id;
    addMessage(
      'assistant',
      `${flavor} 已上线，并以卡片形式展示在画布中。点击该卡片可以查看连接方式、备份和监控等详细信息。`,
    );
    setAgentState(false, '待命');
    renderAll();
  }

  async function runAppFlow(input, options = {}) {
    const appTemplate = resolveAppTemplate(input, options);
    const appName = appTemplate.name;
    const offset = Math.floor(Math.random() * 90);
    const baseX = 160 + offset;
    const baseY = 320;

    setAgentState(true, '模板应用部署');
    addMessage('assistant', `正在从应用商店定位 ${appName}，准备拉起其依赖栈。`);
    pushTimeline('检索模板', `${appName} 模板已命中，展开前端、后端与数据库依赖。`, 'running');
    await wait(850);

    const frontId = createId('app');
    const backId = createId('container');
    const dbId = createId('db');
    const entryId = createId('entry');

    const appDatabaseNode = syncDatabaseNode({
      id: dbId,
      type: 'database',
      title: `${appName} DB`,
      subtitle: '',
      status: 'Protected',
      tags: [],
      x: baseX + 545,
      y: baseY + 136,
      details: {
        connect: appTemplate.databaseConnect,
        backup: appTemplate.databaseBackup,
        ops: appTemplate.databaseOps,
      },
      operations: ['查看连接串', '创建备份', '扩容存储'],
    });

    state.nodes.push(
      {
        id: entryId,
        type: 'entry',
        title: `${appTemplate.slug}.suite.sealos.run`,
        subtitle: '内网域名 / 外网域名',
        status: 'Accessible',
        tags: [],
        x: baseX,
        y: baseY - 120,
        details: {
          target: `${appName} Frontend`,
          externalDomain: `${appTemplate.slug}.suite.sealos.run`,
          internalDomain: `${appTemplate.slug}-frontend.region.internal`,
          cnameHost: `${appTemplate.slug}.suite.sealos.run`,
          cnameTarget: 'gateway.sealos.run',
          whitelist: defaultEntryWhitelist(),
          route: 'Frontend Gateway',
        },
        operations: ['切换域名', '查看流量', '暂停入口'],
      },
      {
        id: frontId,
        type: 'app',
        title: `${appName} Frontend`,
        subtitle: appTemplate.frontendSubtitle,
        status: 'Running',
        tags: appTemplate.frontendTags,
        x: baseX + 250,
        y: baseY - 16,
        details: {
          bundle: 'Template Runtime',
          config: appTemplate.frontendConfig,
          delivery: 'CDN + Runtime 混合',
        },
        operations: ['查看模板参数', '重建前端', '打开预览'],
      },
      {
        id: backId,
        type: 'container',
        title: `${appName} Backend`,
        subtitle: '',
        status: 'Running',
        tags: [],
        x: baseX + 250,
        y: baseY + 168,
        details: {
          image: `registry.local/templates/${appTemplate.slug}-backend:latest`,
          envVars: `${appTemplate.databaseEnv}=••••`,
        },
        containerConfig: {
          image: `registry.local/templates/${appTemplate.slug}-backend:latest`,
          replicas: '2',
          cpu: '2',
          memory: '4Gi',
          envVars: `${appTemplate.databaseEnv}=••••`,
        },
        operations: ['查看日志', '更改密钥', '重启'],
      },
      appDatabaseNode,
    );

    state.edges.push(
      { id: createId('edge'), from: entryId, to: frontId, label: '443' },
      { id: createId('edge'), from: frontId, to: backId, label: 'API Traffic' },
      { id: createId('edge'), from: backId, to: dbId, label: appTemplate.databaseEnv },
    );

    state.selectedNodeId = frontId;
    state.lastIssue = {
      title: `${appName} 启动失败`,
      reason: `${appName} Backend ${appTemplate.issueReason}`,
    };

    addMessage(
      'assistant',
      `${appName} 模板已展开到画布：入口、前端、后端和数据库均作为关键原子单元展示。`,
    );
    setAgentState(false, '待命');
    renderAll();
  }

  async function runDevboxFlow(input = '', options = {}) {
    const template = resolveDevboxTemplate(input, options);
    const version = String(options.version || defaultDevboxVersion(template));
    const cpu = String(options.cpu || '2');
    const memory = String(options.memory || '4Gi');
    const port = String(options.port || template.defaultPort || inferPortFromInput(input) || '3000');
    const owner = randomName();
    const workspaceCode = Math.floor(Math.random() * 900 + 100);
    const domain =
      String(options.domain || '').trim() || `${template.id}-devbox-${workspaceCode}.cloud.sealos.run`;
    const entryId = createId('entry');
    const id = createId('devbox');
    const x = 530 + Math.floor(Math.random() * 90);
    const y = 110 + Math.floor(Math.random() * 100);

    setAgentState(true, 'DevBox 创建');
    addMessage(
      'assistant',
      `开始创建 ${template.name} ${version} DevBox，资源配置 ${cpu} CPU / ${memory}，将暴露 ${port}/TCP。`,
    );
    pushTimeline('创建 DevBox', `准备 ${template.name} ${version} 模板、工具链镜像和远程访问入口。`, 'running');
    await wait(900);

    state.nodes.push(
      {
        id: entryId,
        type: 'entry',
        title: domain,
        subtitle: '内网域名 / 外网域名',
        status: 'Accessible',
        tags: [],
        x: x - 250,
        y: y - 48,
        details: {
          target: owner,
          externalDomain: domain,
          internalDomain: `${template.id}-devbox.region.internal`,
          cnameHost: domain,
          cnameTarget: 'gateway.sealos.run',
          whitelist: defaultEntryWhitelist(),
          port: `${port}/TCP`,
        },
        operations: ['复制域名', '替换域名', '暂停入口'],
      },
      {
        id,
        type: 'devbox',
        title: owner,
        subtitle: '',
        status: 'Ready',
        tags: [],
        x,
        y,
        details: {
          access: domain,
          templateId: template.id,
          templateName: template.name,
          version,
          cpu,
          memory,
          usedCpu: estimateUsedCpu(cpu),
          usedMemory: estimateUsedMemory(memory),
          diskSize: '50Gi',
          diskUsed: estimateUsedDisk('50Gi'),
          startCommand: defaultDevboxStartCommand(template, port),
          port: `${port}/TCP`,
        },
        operations: ['复制访问地址', '挂载仓库', '重启容器'],
      },
    );

    state.edges.push({
      id: createId('edge'),
      from: entryId,
      to: id,
      label: `${port}/TCP`,
    });

    state.selectedNodeId = id;
    addMessage(
      'assistant',
      `DevBox 已就绪。模板为 ${template.name} ${version}，访问域名为 ${domain}，端口使用 ${port}/TCP。`,
    );
    setAgentState(false, '待命');
    renderAll();
    return {
      template,
      version,
      domain,
      port,
    };
  }

  async function runRepairFlow() {
    setAgentState(true, '部署修复');
    const issue =
      state.lastIssue ||
      ({
        title: '实例不可用',
        reason: '入口健康检查异常，实例缺少关键环境变量。',
      });

    addMessage('assistant', `诊断开始：${issue.title}。问题原因：${issue.reason}`);
    pushTimeline('回放失败链路', '检查入口、实例日志和配置差异，锁定根因。', 'running');
    await wait(900);

    const container = [...state.nodes].reverse().find((node) => node.type === 'container');
    const entry = [...state.nodes].reverse().find((node) => node.type === 'entry');

    if (container) {
      container.status = 'Recovered';
      container.tags = uniqueTags(container.tags.concat(['配置已修复']));
      container.details.env = '关键环境变量已补齐';
      state.selectedNodeId = container.id;
    }

    if (entry) {
      entry.status = 'Accessible';
      syncEntryNode(entry);
    }

    addMessage(
      'assistant',
      '修复已完成：我补齐了缺失配置并触发实例滚动恢复，入口健康检查已恢复。画布中对应对象状态也已同步更新。',
    );
    pushTimeline('恢复完成', '入口重新可访问，实例状态恢复为健康。', 'done');
    state.lastIssue = null;
    setAgentState(false, '待命');
    renderAll();
  }

  function extractUrl(text) {
    const match = text.match(/https?:\/\/[^\s]+/i);
    return match ? match[0] : '';
  }

  function extractImage(text) {
    const match = text.match(/(?:ghcr\.io|docker\.io|[\w.-]+\/[\w./-]+):[\w.-]+/i);
    return match ? match[0] : '';
  }

  function deriveProjectName(url) {
    const clean = url.replace(/\/$/, '');
    const name = clean.split('/').pop() || 'project';
    return name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  }

  function collectRelations(nodeId) {
    return state.edges.flatMap((edge) => {
      if (edge.from === nodeId) {
        const target = getNodeById(edge.to);
        return target
          ? [{ direction: '下游', target: target.title, label: edge.label }]
          : [];
      }

      if (edge.to === nodeId) {
        const source = getNodeById(edge.from);
        return source
          ? [{ direction: '上游', target: source.title, label: edge.label }]
          : [];
      }

      return [];
    });
  }

  function labelForType(type) {
    return {
      entry: '入口域名',
      container: '容器实例',
      database: '数据库',
      app: '封装应用',
      devbox: '开发环境',
    }[type];
  }

  function iconForType(type) {
    return {
      entry: 'router',
      container: 'inventory_2',
      database: 'storage',
      app: 'widgets',
      devbox: 'terminal',
    }[type];
  }

  function colorForType(type) {
    return {
      entry: '#a3a6ff',
      container: '#53ddfc',
      database: '#ffb874',
      app: '#ff6f98',
      devbox: '#6bff8f',
    }[type];
  }

  function metricForNode(node) {
    return {
      Accessible: 92,
      Running: 78,
      Protected: 88,
      Ready: 85,
      Recovered: 81,
    }[node.status] || 64;
  }

  function nodeSummary(node) {
    if (node.type === 'entry' || node.type === 'container' || node.type === 'database' || node.type === 'devbox') {
      return '';
    }

    const detail = node.details || {};

    return (
      detail.domain ||
      detail.image ||
      detail.connect ||
      detail.access ||
      detail.route ||
      detail.config ||
      detail.runtime ||
      detail.bundle ||
      node.subtitle
    );
  }

  function inferPortFromInput(input) {
    const match = String(input || '').match(/\b(\d{2,5})\b/);
    return match ? match[1] : '';
  }

  function summarizeEnvVars(envText) {
    const lines = String(envText || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (!lines.length) {
      return '未设置环境变量';
    }

    return `${lines.length} vars configured`;
  }

  function summarizeRuntimeOptions(options) {
    const parts = [`${options.cpu || '1'} CPU`, `${options.memory || '1Gi'} RAM`];

    if (options.mountDisk) {
      parts.push(`Disk ${options.diskSize || '10Gi'} @ ${options.mountPath || '/data'}`);
    }

    return parts.join(' / ');
  }

  function buildDockerTags(options) {
    const tags = ['镜像直启', `${options.cpu || '1'} CPU`, `${options.memory || '1Gi'} RAM`];

    if (options.mountDisk) {
      tags.push('持久磁盘');
    }

    if (options.envVars && String(options.envVars).trim()) {
      tags.push('Env 已配置');
    }

    return tags;
  }

  function databaseSpecOptions(dbType) {
    const flavor = String(dbType || '').toLowerCase();

    if (flavor === 'mysql') {
      return ['db.mysql.small', 'db.mysql.medium', 'db.mysql.large'];
    }

    if (flavor === 'postgresql') {
      return ['db.pg.small', 'db.pg.medium', 'db.pg.large'];
    }

    if (flavor === 'redis') {
      return ['db.redis.small', 'db.redis.medium', 'db.redis.large'];
    }

    if (flavor === 'mongodb') {
      return ['db.mongo.small', 'db.mongo.medium', 'db.mongo.large'];
    }

    return ['db.mysql.small', 'db.mysql.medium', 'db.mysql.large'];
  }

  function databaseConnectString(flavor) {
    const normalized = String(flavor || '').toLowerCase();

    if (normalized === 'mysql') {
      return 'mysql://admin:••••@mysql.internal:3306/app';
    }

    if (normalized === 'postgresql') {
      return 'postgres://app:••••@pgsql.internal:5432/app';
    }

    if (normalized === 'redis') {
      return 'redis://default:••••@redis.internal:6379';
    }

    if (normalized === 'mongodb') {
      return 'mongodb://admin:••••@mongo.internal:27017/app';
    }

    return 'postgres://app:••••@pgsql.internal:5432/app';
  }

  function databaseConnectionLabel(flavor) {
    const normalized = String(flavor || '').toLowerCase();

    if (normalized === 'mysql') {
      return 'MYSQL_URL';
    }

    if (normalized === 'postgresql') {
      return 'DATABASE_URL';
    }

    if (normalized === 'redis') {
      return 'REDIS_URL';
    }

    if (normalized === 'mongodb') {
      return 'MONGO_URL';
    }

    return 'DATABASE_URL';
  }

  function shortCode(text) {
    return text
      .split(/[\s/.-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0])
      .join('')
      .toUpperCase();
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function humanizeKey(key) {
    return {
      domain: '域名',
      target: '目标',
      policy: '策略',
      image: '镜像',
      runtime: '运行时',
      release: '发布策略',
      connect: '连接方式',
      backup: '备份',
      metrics: '监控',
      access: '访问地址',
      toolchain: '工具链',
      workspace: '工作区',
      source: '源码',
      route: '路由',
      entrypoint: '启动参数',
      env: '环境变量',
      observability: '可观测性',
      bundle: '交付形态',
      config: '配置',
      delivery: '交付',
      template: '模板',
      port: '端口',
      ops: '运维',
      client: '连接客户端',
      version: '版本',
      storage: '存储',
      replicas: '副本',
      scaling: '伸缩',
    }[key] || key;
  }

  function randomName() {
    const names = ['Alice', 'Mika', 'Chen', 'Aster', 'Nova', 'Rin'];
    return names[Math.floor(Math.random() * names.length)];
  }

  function uniqueTags(tags) {
    return [...new Set(tags)];
  }

  function getDevboxTemplateById(id) {
    return DEVBOX_TEMPLATES.find((template) => template.id === id) || null;
  }

  function defaultDevboxVersion(template) {
    return (template && Array.isArray(template.versions) && template.versions[0]) || 'latest';
  }

  function cardTitleForNode(node) {
    const title = String((node && node.title) || '').trim();
    if (!title) {
      return '';
    }

    if (node.type === 'container') {
      if (title === '容器示例') {
        const image = String((node.details && node.details.image) || '').trim();
        const imageName = image ? image.split('/').pop().replace(/[:.].*$/, '') : '';
        return imageName || '';
      }

      return title.replace(/\s+container$/i, '').trim();
    }

    if (node.type === 'devbox') {
      return title.replace(/^devbox\s*\/\s*/i, '').trim();
    }

    return title;
  }

  function databaseTopologyLabel(config) {
    const replicas = Number(String((config && config.replicas) || '1').trim());
    return Number.isFinite(replicas) && replicas > 1 ? '高可用' : '单副本';
  }

  function resolveDevboxNodeTemplate(node) {
    if (!node || node.type !== 'devbox') {
      return null;
    }

    const details = node.details || {};
    const explicit = getDevboxTemplateById(details.templateId);
    if (explicit) {
      return explicit;
    }

    const hint = [details.templateName, details.template, details.toolchain, node.title, node.subtitle]
      .filter(Boolean)
      .join(' ');

    return resolveDevboxTemplate(hint || 'nodejs');
  }

  function devboxTemplateStack(template) {
    if (!template) {
      return [];
    }

    const stackMap = {
      nextjs: ['nextjs', 'nodejs'],
      react: ['react', 'nodejs'],
      vue: ['vue', 'nodejs'],
      django: ['django', 'python'],
    };
    const ids = stackMap[template.id] || [template.id];

    return ids
      .map((id) => getDevboxTemplateById(id))
      .filter(Boolean)
      .filter((item, index, list) => list.findIndex((current) => current.id === item.id) === index);
  }

  function renderTemplateBadge(template, className = 'node-devbox-badge') {
    if (!template) {
      return '';
    }

    return `
      <span class="${className}" style="--template-accent:${template.accent};" title="${escapeHtml(template.name)}">
        ${renderDevboxTemplateIcon(template)}
      </span>
    `;
  }

  function renderNodeDevboxCard(node, config) {
    const template = resolveDevboxNodeTemplate(node);
    const stack = devboxTemplateStack(template);
    const current = config || (node && node.devboxConfig) || {};

    return `
      <div class="node-devbox-head">
        <div class="node-devbox-stack">
          ${stack.map((item) => renderTemplateBadge(item)).join('')}
          <strong class="node-devbox-owner">${escapeHtml(cardTitleForNode(node) || 'Workspace')}</strong>
        </div>
        <div class="node-led"></div>
      </div>
      <div class="node-container-meters">
        ${renderContainerMeter('CPU', current.usedCpu || estimateUsedCpu(current.cpu || '4'), current.cpu || '4', { kind: 'cpu' })}
        ${renderContainerMeter('内存', current.usedMemory || estimateUsedMemory(current.memory || '8Gi'), current.memory || '8Gi')}
        ${renderContainerMeter('磁盘', current.diskUsed || estimateUsedDisk(current.diskSize || '50Gi'), current.diskSize || '50Gi', {
          kind: 'capacity',
          icon: 'storage',
        })}
      </div>
    `;
  }

  function renderDevboxTemplateIcon(template) {
    if (!template) {
      return '';
    }

    if (template.icon === 'cpp' || template.id === 'cpp') {
      return `
        <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
          <polygon points="14,2.6 23.2,7.9 23.2,20.1 14,25.4 4.8,20.1 4.8,7.9" fill="none" stroke="currentColor" stroke-width="1.5"></polygon>
          <text x="11.2" y="17.3" text-anchor="middle" font-size="11" font-weight="700" font-family="JetBrains Mono, monospace" fill="currentColor">C</text>
          <text x="18.1" y="13.3" text-anchor="middle" font-size="7.2" font-weight="700" font-family="JetBrains Mono, monospace" fill="currentColor">+</text>
          <text x="18.1" y="19.2" text-anchor="middle" font-size="7.2" font-weight="700" font-family="JetBrains Mono, monospace" fill="currentColor">+</text>
        </svg>
      `;
    }

    return `<span class="agui-template-mark">${escapeHtml(template.mark)}</span>`;
  }

  function getAppById(id) {
    return APP_LIBRARY.find((app) => app.id === id) || null;
  }

  function filterAppCatalog(search) {
    const query = String(search || '').trim().toLowerCase();
    if (!query) {
      return APP_LIBRARY;
    }

    return APP_LIBRARY.filter((app) =>
      [app.name, app.description, app.stack]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }

  function resolveAppTemplate(input, options = {}) {
    const explicit = getAppById(options.appId);
    if (explicit) {
      return appTemplateProfile(explicit.id);
    }

    const lower = String(input || '').toLowerCase();

    if (lower.includes('fastgpt')) {
      return appTemplateProfile('fastgpt');
    }

    if (lower.includes('dify')) {
      return appTemplateProfile('dify');
    }

    if (lower.includes('n8n')) {
      return appTemplateProfile('n8n');
    }

    if (lower.includes('metabase')) {
      return appTemplateProfile('metabase');
    }

    return appTemplateProfile('fastgpt');
  }

  function resolveDevboxTemplate(input, options = {}) {
    const explicit = getDevboxTemplateById(options.templateId);
    if (explicit) {
      return explicit;
    }

    const lower = String(input || '').toLowerCase();

    for (const template of DEVBOX_TEMPLATES) {
      if (
        lower &&
        (
          lower.includes(template.id) ||
          lower.includes(template.name.toLowerCase()) ||
          template.description.toLowerCase().includes(lower)
        )
      ) {
        return template;
      }
    }

    if (lower.includes('next')) {
      return getDevboxTemplateById('nextjs') || DEVBOX_TEMPLATES[0];
    }

    if (lower.includes('react')) {
      return getDevboxTemplateById('react') || DEVBOX_TEMPLATES[0];
    }

    if (lower.includes('vue')) {
      return getDevboxTemplateById('vue') || DEVBOX_TEMPLATES[0];
    }

    if (lower.includes('python')) {
      return getDevboxTemplateById('python') || DEVBOX_TEMPLATES[0];
    }

    if (lower.includes('go')) {
      return getDevboxTemplateById('go') || DEVBOX_TEMPLATES[0];
    }

    if (lower.includes('rust')) {
      return getDevboxTemplateById('rust') || DEVBOX_TEMPLATES[0];
    }

    if (lower.includes('c++') || lower.includes('cpp')) {
      return getDevboxTemplateById('cpp') || DEVBOX_TEMPLATES[0];
    }

    if (lower.includes('django')) {
      return getDevboxTemplateById('django') || DEVBOX_TEMPLATES[0];
    }

    return getDevboxTemplateById('nextjs') || DEVBOX_TEMPLATES[0];
  }

  function appTemplateProfile(id) {
    if (id === 'dify') {
      return {
        id: 'dify',
        name: 'Dify',
        slug: 'dify',
        frontendSubtitle: 'LLM 应用平台与运营工作台',
        frontendTags: ['模板实例', 'PromptOps', '自动连后端'],
        frontendConfig: '应用配置 / Prompt / Workflow',
        backendSubtitle: 'API 服务、Worker 与插件执行层',
        backendTags: ['API', 'Worker', '已注入配置'],
        runtime: 'Container Runtime / Celery Worker',
        backendConfig: '模型提供商、插件与队列配置已注入',
        scaling: 'API 与 Worker 分层扩缩容',
        databaseSubtitle: '模板依赖 PostgreSQL 主库',
        databaseTags: ['自动备份', '可视化连接'],
        databaseConnect: 'postgres://dify:••••@pg.internal:5432/dify',
        databaseBackup: '每日快照 + 7 天保留',
        databaseOps: '备份 / 监控 / 只读副本',
        databaseEnv: 'DATABASE_URL',
        issueReason: '缺少模型提供商密钥，健康检查进入降级模式。',
      };
    }

    if (id === 'n8n') {
      return {
        id: 'n8n',
        name: 'n8n',
        slug: 'n8n',
        frontendSubtitle: '自动化流程编辑器和任务入口',
        frontendTags: ['模板实例', 'Workflow', '自动连后端'],
        frontendConfig: '工作流编辑器 / Webhook / 凭据入口',
        backendSubtitle: '队列执行器与 Webhook 处理层',
        backendTags: ['Worker', 'Webhook', '已注入配置'],
        runtime: 'Container Runtime / Queue Worker',
        backendConfig: 'Webhook、队列与执行器参数已注入',
        scaling: 'Worker 可独立扩容',
        databaseSubtitle: '模板依赖 PostgreSQL 存储层',
        databaseTags: ['自动备份', '可视化连接'],
        databaseConnect: 'postgres://n8n:••••@pg.internal:5432/n8n',
        databaseBackup: '每日快照 + 7 天保留',
        databaseOps: '备份 / 监控 / 只读副本',
        databaseEnv: 'DATABASE_URL',
        issueReason: '缺少 webhook 基础域名配置，任务入口进入降级模式。',
      };
    }

    if (id === 'metabase') {
      return {
        id: 'metabase',
        name: 'Metabase',
        slug: 'metabase',
        frontendSubtitle: '数据分析看板和查询工作台',
        frontendTags: ['模板实例', 'Dashboard', '自动连后端'],
        frontendConfig: '查询看板 / 组织空间 / 域名入口',
        backendSubtitle: '查询服务与元数据处理层',
        backendTags: ['API', '元数据', '已注入配置'],
        runtime: 'Container Runtime / Query Service',
        backendConfig: '数据源、管理员与缓存参数已注入',
        scaling: '查询服务可水平扩缩容',
        databaseSubtitle: '模板依赖 PostgreSQL 元数据库',
        databaseTags: ['自动备份', '可视化连接'],
        databaseConnect: 'postgres://metabase:••••@pg.internal:5432/metabase',
        databaseBackup: '每日快照 + 7 天保留',
        databaseOps: '备份 / 监控 / 只读副本',
        databaseEnv: 'DATABASE_URL',
        issueReason: '缺少管理员初始化密钥，健康检查进入降级模式。',
      };
    }

    return {
      id: 'fastgpt',
      name: 'FastGPT',
      slug: 'fastgpt',
      frontendSubtitle: '知识库、对话和工作流前端界面',
      frontendTags: ['模板实例', '知识库', '自动连后端'],
      frontendConfig: 'UI / 域名 / 身份入口',
      backendSubtitle: 'LLM 编排、任务执行和 API 服务',
      backendTags: ['API', '任务队列', '已注入配置'],
      runtime: 'Container Runtime / Worker',
      backendConfig: '模型服务、知识库和环境变量已注入',
      scaling: '水平扩缩容',
      databaseSubtitle: '模板依赖 MongoDB 存储层',
      databaseTags: ['自动备份', '可视化连接'],
      databaseConnect: 'mongodb://template:••••@mongo.internal:27017/fastgpt',
      databaseBackup: '每日快照 + 7 天保留',
      databaseOps: '备份 / 监控 / 副本集',
      databaseEnv: 'MONGO_URL',
      issueReason: '缺少模型服务密钥，健康检查进入降级模式。',
    };
  }

  function collectProjectNodes() {
    const workloadNodes = state.nodes.filter((node) => ['container', 'app'].includes(node.type));
    if (workloadNodes.length) {
      return workloadNodes;
    }

    const fallbackNodes = state.nodes.filter((node) => node.type !== 'entry');
    return fallbackNodes.slice(0, 6);
  }

  function getMessageById(id) {
    return state.messages.find((message) => message.id === id);
  }

  function openGithubImportUi() {
    const existing = state.messages.find(
      (message) => message.kind === 'agui' && message.ui === 'github-import',
    );

    if (existing) {
      existing.payload.error = '';
      renderChat();
      focusAguiField(existing.id, 'urlDraft');
      return;
    }

    const message = addAguiMessage('github-import', {
      authConnected: false,
      selectedRepo: '',
      urlDraft: '',
      deployState: 'idle',
      error: '',
      lastRepoUrl: '',
    });
    focusAguiField(message.id, 'urlDraft');
  }

  function openDockerDeployUi() {
    const existing = state.messages.find(
      (message) => message.kind === 'agui' && message.ui === 'docker-deploy',
    );

    if (existing) {
      existing.payload.error = '';
      renderChat();
      focusAguiField(existing.id, 'image');
      return;
    }

    const message = addAguiMessage('docker-deploy', {
      image: '',
      envVars: 'NODE_ENV=production',
      startArgs: '',
      cpu: '1',
      memory: '1Gi',
      mountDisk: false,
      diskSize: '10Gi',
      mountPath: '/data',
      domain: '',
      port: '3000',
      deployState: 'idle',
      error: '',
      lastImage: '',
    });
    focusAguiField(message.id, 'image');
  }

  function openDatabaseDeployUi() {
    const existing = state.messages.find(
      (message) => message.kind === 'agui' && message.ui === 'database-deploy',
    );

    if (existing) {
      existing.payload.error = '';
      renderChat();
      focusAguiField(existing.id, 'dbType');
      return;
    }

    const message = addAguiMessage('database-deploy', {
      dbType: 'MySQL',
      instanceSpec: 'db.mysql.small',
      replicas: '2',
      deployState: 'idle',
      error: '',
      lastType: '',
    });
    focusAguiField(message.id, 'dbType');
  }

  function openAppStoreUi() {
    const existing = state.messages.find((message) => message.kind === 'agui' && message.ui === 'app-store');

    if (existing) {
      existing.payload.error = '';
      renderChat();
      focusAguiField(existing.id, 'search');
      return;
    }

    const message = addAguiMessage('app-store', {
      search: '',
      selectedApp: 'fastgpt',
      deployState: 'idle',
      error: '',
      lastApp: '',
    });
    focusAguiField(message.id, 'search');
  }

  function openDevboxDeployUi() {
    const existing = state.messages.find((message) => message.kind === 'agui' && message.ui === 'devbox-deploy');

    if (existing) {
      existing.payload.error = '';
      renderChat();
      focusAguiField(existing.id, 'cpu');
      return;
    }

    const nextjsTemplate = getDevboxTemplateById('nextjs') || DEVBOX_TEMPLATES[0];
    const message = addAguiMessage('devbox-deploy', {
      templateId: nextjsTemplate ? nextjsTemplate.id : '',
      version: defaultDevboxVersion(nextjsTemplate),
      cpu: '2',
      memory: '4Gi',
      port: nextjsTemplate ? nextjsTemplate.defaultPort : '3000',
      domain: '',
      deployState: 'idle',
      error: '',
      lastTemplate: '',
      lastVersion: '',
      lastDomain: '',
    });
    focusAguiField(message.id, 'cpu');
  }

  function focusAguiField(messageId, field) {
    window.setTimeout(() => {
      const input = dom.chatLog.querySelector(`[data-agui-field="${field}"][data-message-id="${messageId}"]`);
      if (input) {
        input.focus();
      }
    }, 0);
  }

  function renderAguiMessage(message) {
    if (message.ui === 'github-import') {
      return renderGithubImportCard(message);
    }

    if (message.ui === 'docker-deploy') {
      return renderDockerDeployCard(message);
    }

    if (message.ui === 'app-store') {
      return renderAppStoreCard(message);
    }

    if (message.ui === 'devbox-deploy') {
      return renderDevboxDeployCard(message);
    }

    if (message.ui === 'database-deploy') {
      return renderDatabaseDeployCard(message);
    }

    return '';
  }

  function renderGithubImportCard(message) {
    const payload = message.payload || {};
    const urlDraft = escapeHtml(payload.urlDraft || '');
    const authConnected = Boolean(payload.authConnected);
    const deployState = payload.deployState || 'idle';
    const statusText =
      deployState === 'deploying'
        ? 'Deploying repository...'
        : deployState === 'done'
        ? `Last deploy: ${payload.lastRepoUrl || ''}`
        : authConnected
        ? `Authorized repo: ${payload.selectedRepo}`
        : 'Select a method to import your repository.';

    return `
      <div class="chat-message assistant agui-message">
        <div class="chat-avatar">UI</div>
        <div class="agui-card" data-agui-id="${message.id}">
          <div class="agui-card-header">
            <div>
              <strong>GitHub Import</strong>
              <span>Import repository from URL or GitHub authorization.</span>
            </div>
            <div class="agui-card-pill ${authConnected ? 'connected' : ''}">
              ${authConnected ? 'Connected' : 'Manual'}
            </div>
          </div>

          <div class="agui-methods">
            <section class="agui-method">
              <div class="agui-method-title">Method 1</div>
              <div class="agui-method-copy">Paste a GitHub repository URL.</div>
              <input
                class="agui-input"
                type="text"
                value="${urlDraft}"
                placeholder="https://github.com/owner/repo"
                data-agui-field="urlDraft"
                data-message-id="${message.id}"
              />
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Method 2</div>
              <div class="agui-method-copy">Authorize GitHub and use a selected repository.</div>
              <div class="agui-inline-row">
                <button
                  type="button"
                  class="agui-secondary-button"
                  data-agui-action="github-auth"
                  data-message-id="${message.id}"
                >
                  ${authConnected ? 'GitHub Connected' : 'Authorize GitHub'}
                </button>
                ${
                  authConnected
                    ? `<span class="agui-repo-chip">${escapeHtml(payload.selectedRepo)}</span>`
                    : ''
                }
              </div>
            </section>
          </div>

          <div class="agui-card-footer">
            <div class="agui-status ${payload.error ? 'error' : ''}">${escapeHtml(payload.error || statusText)}</div>
            <button
              type="button"
              class="agui-primary-button"
              data-agui-action="github-deploy"
              data-message-id="${message.id}"
              ${deployState === 'deploying' ? 'disabled' : ''}
            >
              ${deployState === 'deploying' ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function selectOptions(options, selected) {
    return options
      .map(
        (option) =>
          `<option value="${escapeHtml(option)}" ${option === selected ? 'selected' : ''}>${escapeHtml(option)}</option>`,
      )
      .join('');
  }

  async function deployDockerFromAgui(messageId) {
    const message = getMessageById(messageId);
    if (!message || message.kind !== 'agui' || message.ui !== 'docker-deploy') {
      return;
    }

    if (state.agentBusy) {
      message.payload.error = '当前已有任务在执行，请等待完成后再发起 Deploy。';
      renderChat();
      return;
    }

    const image = (message.payload.image || '').trim();
    const port = String(message.payload.port || '').trim();

    if (!image) {
      message.payload.error = '请填写 Docker 镜像地址。';
      renderChat();
      return;
    }

    if (!port) {
      message.payload.error = '请填写容器端口。';
      renderChat();
      return;
    }

    message.payload.error = '';
    message.payload.deployState = 'deploying';
    message.payload.lastImage = image;
    renderChat();

    addMessage(
      'assistant',
      `Docker Deploy 参数已确认：镜像 ${image}，端口 ${port}，CPU ${message.payload.cpu}，内存 ${message.payload.memory}。`,
    );

    await runImageFlow(`运行 Docker 镜像 ${image}`, {
      image,
      envVars: message.payload.envVars || '',
      startArgs: message.payload.startArgs || '',
      cpu: message.payload.cpu || '1',
      memory: message.payload.memory || '1Gi',
      mountDisk: Boolean(message.payload.mountDisk),
      diskSize: message.payload.diskSize || '10Gi',
      mountPath: message.payload.mountPath || '/data',
      domain: message.payload.domain || '',
      port,
    });

    message.payload.deployState = 'done';
    renderChat();
  }

  async function deployDatabaseFromAgui(messageId) {
    const message = getMessageById(messageId);
    if (!message || message.kind !== 'agui' || message.ui !== 'database-deploy') {
      return;
    }

    if (state.agentBusy) {
      message.payload.error = '当前已有任务在执行，请等待完成后再发起 Deploy。';
      renderChat();
      return;
    }

    const dbType = String(message.payload.dbType || '').trim();
    const instanceSpec = String(message.payload.instanceSpec || '').trim();
    const replicas = String(message.payload.replicas || '').trim();

    if (!dbType) {
      message.payload.error = '请选择数据库类型。';
      renderChat();
      return;
    }

    if (!instanceSpec) {
      message.payload.error = '请选择实例规格。';
      renderChat();
      return;
    }

    if (!replicas) {
      message.payload.error = '请选择副本数。';
      renderChat();
      return;
    }

    message.payload.error = '';
    message.payload.deployState = 'deploying';
    message.payload.lastType = dbType;
    message.payload.lastSpec = instanceSpec;
    message.payload.lastReplicas = replicas;
    renderChat();

    addMessage(
      'assistant',
      `Database Deploy 参数已确认：类型 ${dbType}，规格 ${instanceSpec}，副本数 ${replicas}。`,
    );

    await runDatabaseFlow(`创建一个 ${dbType} 数据库`, {
      dbType,
      instanceSpec,
      replicas,
    });

    message.payload.deployState = 'done';
    renderChat();
  }

  async function deployAppFromAgui(messageId) {
    const message = getMessageById(messageId);
    if (!message || message.kind !== 'agui' || message.ui !== 'app-store') {
      return;
    }

    if (state.agentBusy) {
      message.payload.error = '当前已有任务在执行，请等待完成后再发起 Deploy。';
      renderChat();
      return;
    }

    const selectedApp =
      getAppById(message.payload.selectedApp) || filterAppCatalog(message.payload.search)[0] || null;

    if (!selectedApp) {
      message.payload.error = '没有匹配的应用模板，请调整搜索关键字。';
      renderChat();
      return;
    }

    message.payload.error = '';
    message.payload.selectedApp = selectedApp.id;
    message.payload.deployState = 'deploying';
    message.payload.lastApp = selectedApp.name;
    renderChat();

    addMessage('assistant', `应用商店模板已选中：${selectedApp.name}，开始准备部署。`);
    await runAppFlow(`从应用商店部署 ${selectedApp.name}`, {
      appId: selectedApp.id,
    });

    message.payload.deployState = 'done';
    renderChat();
  }

  async function deployDevboxFromAgui(messageId) {
    const message = getMessageById(messageId);
    if (!message || message.kind !== 'agui' || message.ui !== 'devbox-deploy') {
      return;
    }

    if (state.agentBusy) {
      message.payload.error = '当前已有任务在执行，请等待完成后再发起 Deploy。';
      renderChat();
      return;
    }

    const template = getDevboxTemplateById(message.payload.templateId);
    const version = String(message.payload.version || defaultDevboxVersion(template)).trim();
    const cpu = String(message.payload.cpu || '').trim();
    const memory = String(message.payload.memory || '').trim();
    const port = String(message.payload.port || '').trim();
    const domain = String(message.payload.domain || '').trim();

    if (!template) {
      message.payload.error = '请选择 DevBox 模板。';
      renderChat();
      return;
    }

    if (!cpu) {
      message.payload.error = '请选择 DevBox CPU 配置。';
      renderChat();
      return;
    }

    if (!version) {
      message.payload.error = '请选择模板版本。';
      renderChat();
      return;
    }

    if (!memory) {
      message.payload.error = '请选择 DevBox 内存配置。';
      renderChat();
      return;
    }

    if (!port) {
      message.payload.error = '请填写 DevBox 暴露端口。';
      renderChat();
      return;
    }

    message.payload.error = '';
    message.payload.deployState = 'deploying';
    message.payload.lastTemplate = template.name;
    message.payload.lastVersion = version;
    message.payload.lastDomain = domain;
    renderChat();

    addMessage(
      'assistant',
      `DevBox Deploy 参数已确认：模板 ${template.name} ${version}，资源 ${cpu} CPU / ${memory}，端口 ${port}${domain ? `，域名 ${domain}` : '，域名自动分配'}。`,
    );

    const result = await runDevboxFlow(`创建一个 ${template.name} DevBox`, {
      templateId: template.id,
      version,
      cpu,
      memory,
      port,
      domain,
    });

    message.payload.deployState = 'done';
    message.payload.lastVersion = (result && result.version) || version;
    message.payload.lastDomain = (result && result.domain) || domain;
    renderChat();
  }

  function renderDockerDeployCard(message) {
    const payload = message.payload || {};
    const deployState = payload.deployState || 'idle';
    const statusText =
      deployState === 'deploying'
        ? 'Deploying container runtime...'
        : deployState === 'done'
        ? `Last deploy: ${payload.lastImage || payload.image || ''}`
        : 'Configure image, runtime, resource and network parameters.';

    return `
      <div class="chat-message assistant agui-message">
        <div class="chat-avatar">UI</div>
        <div class="agui-card" data-agui-id="${message.id}">
          <div class="agui-card-header">
            <div>
              <strong>Docker Deploy</strong>
              <span>Configure image, runtime arguments, resources and ingress.</span>
            </div>
            <div class="agui-card-pill">Container</div>
          </div>

          <div class="agui-methods">
            <section class="agui-method">
              <div class="agui-method-title">Image</div>
              <div class="agui-method-copy">Docker image address and startup arguments.</div>
              <div class="agui-grid agui-grid-2">
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.image || '')}"
                  placeholder="ghcr.io/owner/app:latest"
                  data-agui-field="image"
                  data-message-id="${message.id}"
                />
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.startArgs || '')}"
                  placeholder="npm run start -- --port 3000"
                  data-agui-field="startArgs"
                  data-message-id="${message.id}"
                />
              </div>
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Runtime</div>
              <div class="agui-method-copy">Environment variables and command configuration.</div>
              <textarea
                class="agui-textarea"
                placeholder="KEY=value&#10;API_KEY=***"
                data-agui-field="envVars"
                data-message-id="${message.id}"
              >${escapeHtml(payload.envVars || '')}</textarea>
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Resources</div>
              <div class="agui-method-copy">CPU, memory and persistent disk options.</div>
              <div class="agui-grid agui-grid-4">
                <select class="agui-select" data-agui-field="cpu" data-message-id="${message.id}">
                  ${selectOptions(['0.5', '1', '2', '4'], payload.cpu || '1')}
                </select>
                <select class="agui-select" data-agui-field="memory" data-message-id="${message.id}">
                  ${selectOptions(['512Mi', '1Gi', '2Gi', '4Gi'], payload.memory || '1Gi')}
                </select>
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.diskSize || '10Gi')}"
                  placeholder="10Gi"
                  data-agui-field="diskSize"
                  data-message-id="${message.id}"
                />
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.mountPath || '/data')}"
                  placeholder="/data"
                  data-agui-field="mountPath"
                  data-message-id="${message.id}"
                />
              </div>
              <label class="agui-checkline">
                <input
                  type="checkbox"
                  ${payload.mountDisk ? 'checked' : ''}
                  data-agui-field="mountDisk"
                  data-message-id="${message.id}"
                />
                <span>挂载持久磁盘</span>
              </label>
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Ingress</div>
              <div class="agui-method-copy">Public domain and container port mapping.</div>
              <div class="agui-grid agui-grid-2">
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.domain || '')}"
                  placeholder="app.example.com or leave blank for auto domain"
                  data-agui-field="domain"
                  data-message-id="${message.id}"
                />
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.port || '3000')}"
                  placeholder="3000"
                  data-agui-field="port"
                  data-message-id="${message.id}"
                />
              </div>
            </section>
          </div>

          <div class="agui-card-footer">
            <div class="agui-status ${payload.error ? 'error' : ''}">${escapeHtml(payload.error || statusText)}</div>
            <button
              type="button"
              class="agui-primary-button"
              data-agui-action="docker-deploy"
              data-message-id="${message.id}"
              ${deployState === 'deploying' ? 'disabled' : ''}
            >
              ${deployState === 'deploying' ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderAppStoreCard(message) {
    const payload = message.payload || {};
    const deployState = payload.deployState || 'idle';
    const search = payload.search || '';
    const apps = filterAppCatalog(search);
    const selectedApp = getAppById(payload.selectedApp) || apps[0] || null;
    const statusText =
      deployState === 'deploying'
        ? `Deploying ${selectedApp ? selectedApp.name : 'template'}...`
        : deployState === 'done'
        ? `Last deploy: ${payload.lastApp || ''}`
        : selectedApp
        ? `${selectedApp.name} · ${selectedApp.description}`
        : '搜索常见模板，例如 FastGPT、Dify、n8n。';

    return `
      <div class="chat-message assistant agui-message">
        <div class="chat-avatar">UI</div>
        <div class="agui-card" data-agui-id="${message.id}">
          <div class="agui-card-header">
            <div>
              <strong>App Store</strong>
              <span>Search templates and pick a common application to deploy.</span>
            </div>
            <div class="agui-card-pill">${apps.length} Apps</div>
          </div>

          <div class="agui-methods">
            <section class="agui-method">
              <div class="agui-method-title">Search</div>
              <div class="agui-method-copy">搜索常见应用模板，直接在当前会话里完成选择。</div>
              <input
                class="agui-input"
                type="text"
                value="${escapeHtml(search)}"
                placeholder="Search FastGPT / Dify / n8n"
                data-agui-field="search"
                data-message-id="${message.id}"
              />
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Catalog</div>
              <div class="agui-method-copy">常见应用模板已经准备好，点击即可切换当前选择。</div>
              <div class="agui-app-list">
                ${
                  apps.length
                    ? apps
                        .map(
                          (app) => `
                            <button
                              type="button"
                              class="agui-app-item ${selectedApp && selectedApp.id === app.id ? 'active' : ''}"
                              data-agui-action="app-select"
                              data-app-id="${app.id}"
                              data-message-id="${message.id}"
                            >
                              <span class="agui-app-icon" style="--app-accent:${app.accent};">${escapeHtml(app.mark)}</span>
                              <span class="agui-app-copy">
                                <strong>${escapeHtml(app.name)}</strong>
                                <span>${escapeHtml(app.description)}</span>
                              </span>
                              <span class="agui-app-meta">${escapeHtml(app.stack)}</span>
                            </button>
                          `,
                        )
                        .join('')
                    : '<div class="agui-empty">没有匹配的应用模板。</div>'
                }
              </div>
            </section>
          </div>

          <div class="agui-card-footer">
            <div class="agui-status ${payload.error ? 'error' : ''}">${escapeHtml(payload.error || statusText)}</div>
            <button
              type="button"
              class="agui-primary-button"
              data-agui-action="app-deploy"
              data-message-id="${message.id}"
              ${deployState === 'deploying' ? 'disabled' : ''}
            >
              ${deployState === 'deploying' ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderDevboxDeployCard(message) {
    const payload = message.payload || {};
    const deployState = payload.deployState || 'idle';
    const selectedTemplate = getDevboxTemplateById(payload.templateId) || DEVBOX_TEMPLATES[0];
    const versionOptions = (selectedTemplate && selectedTemplate.versions) || [];
    const selectedVersion = versionOptions.includes(payload.version)
      ? payload.version
      : defaultDevboxVersion(selectedTemplate);
    const statusText =
      deployState === 'deploying'
        ? `Provisioning ${selectedTemplate ? selectedTemplate.name : 'DevBox'} workspace...`
        : deployState === 'done'
        ? `Last deploy: ${payload.lastTemplate || ''}${payload.lastVersion ? ` ${payload.lastVersion}` : ''}${payload.lastDomain ? ` / ${payload.lastDomain}` : ''}`
        : selectedTemplate
        ? `${selectedTemplate.name} ${selectedVersion}`
        : 'Choose a language or framework template for DevBox.';

    return `
      <div class="chat-message assistant agui-message">
        <div class="chat-avatar">UI</div>
        <div class="agui-card" data-agui-id="${message.id}">
          <div class="agui-card-header">
            <div>
              <strong>DevBox Deploy</strong>
              <span>Choose a workspace template, resources and exposed endpoint.</span>
            </div>
            <div class="agui-card-pill">${escapeHtml(selectedTemplate ? selectedTemplate.name : 'DevBox')}</div>
          </div>

          <div class="agui-methods">
            <section class="agui-method">
              <div class="agui-method-title">Templates</div>
              <div class="agui-method-copy">选择语言或框架模板。</div>
              <div class="agui-template-grid">
                ${DEVBOX_TEMPLATES.map(
                  (template) => `
                    <button
                      type="button"
                      class="agui-template-item ${selectedTemplate && selectedTemplate.id === template.id ? 'active' : ''}"
                      data-agui-action="devbox-select"
                      data-template-id="${template.id}"
                      data-message-id="${message.id}"
                    >
                      <span class="agui-template-icon" style="--template-accent:${template.accent};">${renderDevboxTemplateIcon(template)}</span>
                      <span class="agui-template-copy">
                        <strong>${escapeHtml(template.name)}</strong>
                      </span>
                    </button>
                  `,
                ).join('')}
              </div>
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Version</div>
              <div class="agui-method-copy">选择当前模板的版本。</div>
              <select class="agui-select" data-agui-field="version" data-message-id="${message.id}">
                ${selectOptions(versionOptions, selectedVersion)}
              </select>
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Resources</div>
              <div class="agui-method-copy">配置 CPU 和内存。</div>
              <div class="agui-grid agui-grid-2">
                <select class="agui-select" data-agui-field="cpu" data-message-id="${message.id}">
                  ${selectOptions(['1', '2', '4', '8'], payload.cpu || '2')}
                </select>
                <select class="agui-select" data-agui-field="memory" data-message-id="${message.id}">
                  ${selectOptions(['2Gi', '4Gi', '8Gi', '16Gi'], payload.memory || '4Gi')}
                </select>
              </div>
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Ingress</div>
              <div class="agui-method-copy">配置端口和域名。</div>
              <div class="agui-grid agui-grid-2">
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.port || (selectedTemplate ? selectedTemplate.defaultPort : '3000'))}"
                  placeholder="${escapeHtml(selectedTemplate ? selectedTemplate.defaultPort : '3000')}"
                  data-agui-field="port"
                  data-message-id="${message.id}"
                />
                <input
                  class="agui-input"
                  type="text"
                  value="${escapeHtml(payload.domain || '')}"
                  placeholder="devbox.example.com or leave blank for auto domain"
                  data-agui-field="domain"
                  data-message-id="${message.id}"
                />
              </div>
            </section>
          </div>

          <div class="agui-card-footer">
            <div class="agui-status ${payload.error ? 'error' : ''}">${escapeHtml(payload.error || statusText)}</div>
            <button
              type="button"
              class="agui-primary-button"
              data-agui-action="devbox-deploy"
              data-message-id="${message.id}"
              ${deployState === 'deploying' ? 'disabled' : ''}
            >
              ${deployState === 'deploying' ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderDatabaseDeployCard(message) {
    const payload = message.payload || {};
    const deployState = payload.deployState || 'idle';
    const dbType = payload.dbType || 'MySQL';
    const specOptions = databaseSpecOptions(dbType);
    const selectedSpec = specOptions.includes(payload.instanceSpec) ? payload.instanceSpec : specOptions[0];
    const statusText =
      deployState === 'deploying'
        ? 'Provisioning database cluster...'
        : deployState === 'done'
        ? `Last deploy: ${payload.lastType || dbType} / ${payload.lastSpec || selectedSpec} / ${payload.lastReplicas || payload.replicas || '2'} replicas`
        : 'Select database type, instance spec and replica count.';

    return `
      <div class="chat-message assistant agui-message">
        <div class="chat-avatar">UI</div>
        <div class="agui-card" data-agui-id="${message.id}">
          <div class="agui-card-header">
            <div>
              <strong>Database Deploy</strong>
              <span>Provision database type, instance spec and replica topology.</span>
            </div>
            <div class="agui-card-pill">${escapeHtml(dbType)}</div>
          </div>

          <div class="agui-methods">
            <section class="agui-method">
              <div class="agui-method-title">Type</div>
              <div class="agui-method-copy">Choose a managed database engine for this workspace.</div>
              <select class="agui-select" data-agui-field="dbType" data-message-id="${message.id}">
                ${selectOptions(['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'], dbType)}
              </select>
            </section>

            <section class="agui-method">
              <div class="agui-method-title">Instance</div>
              <div class="agui-method-copy">${escapeHtml(dbType)} 的实例规格和副本数。</div>
              <div class="agui-grid agui-grid-2">
                <select class="agui-select" data-agui-field="instanceSpec" data-message-id="${message.id}">
                  ${selectOptions(specOptions, selectedSpec)}
                </select>
                <select class="agui-select" data-agui-field="replicas" data-message-id="${message.id}">
                  ${selectOptions(['1', '2', '3', '5'], String(payload.replicas || '2'))}
                </select>
              </div>
            </section>
          </div>

          <div class="agui-card-footer">
            <div class="agui-status ${payload.error ? 'error' : ''}">${escapeHtml(payload.error || statusText)}</div>
            <button
              type="button"
              class="agui-primary-button"
              data-agui-action="database-deploy"
              data-message-id="${message.id}"
              ${deployState === 'deploying' ? 'disabled' : ''}
            >
              ${deployState === 'deploying' ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function iconMarkup(icon) {
    if (icon === 'project') {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3.5h8.6l1.9 1.9H19A2.5 2.5 0 0 1 21.5 8v8A2.5 2.5 0 0 1 19 18.5H5A2.5 2.5 0 0 1 2.5 16V6A2.5 2.5 0 0 1 5 3.5Zm0 1.5A1 1 0 0 0 4 6v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4.1L13 5H5Zm2.25 3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm4.75 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm4.75 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM8.5 15h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1 0-1.5Z"/>
        </svg>
      `;
    }

    if (icon === 'docker') {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.2 11.3h2.3V9.1H3.2v2.2Zm2.7 0h2.3V9.1H5.9v2.2Zm2.7 0h2.3V9.1H8.6v2.2Zm2.7 0h2.3V9.1h-2.3v2.2Zm-5.4-2.6h2.3V6.5H8.6v2.2Zm2.7 0h2.3V6.5h-2.3v2.2Zm0-2.6h2.3V3.9h-2.3v2.2Zm9 5.2c-.3-.2-.9-.4-1.5-.3 0-.1 0-.2.1-.4.2-.7.2-1.4-.2-2l-.2-.2-.2.2c-.5.4-.8 1-.9 1.7-.1.4-.1.9 0 1.3-.4.2-1.2.5-2.2.5H2.6l-.1.3c-.3 2 1.1 3.6 3.1 4.5 1 .4 2.2.5 3.4.5 4.4 0 7.7-2 9.2-5.6.6 0 2-.1 2.6-1.3.1-.2.2-.5.2-.8v-.2l-.2-.1Z"/>
        </svg>
      `;
    }

    if (icon === 'github') {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .7a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.42-4.04-1.42-.55-1.37-1.33-1.73-1.33-1.73-1.08-.73.08-.72.08-.72 1.2.08 1.82 1.21 1.82 1.21 1.05 1.79 2.76 1.27 3.43.97.11-.75.41-1.27.74-1.56-2.67-.3-5.47-1.32-5.47-5.86 0-1.3.47-2.36 1.22-3.19-.12-.3-.53-1.52.12-3.16 0 0 1-.32 3.27 1.22a11.4 11.4 0 0 1 5.96 0c2.27-1.54 3.26-1.22 3.26-1.22.66 1.64.25 2.86.13 3.16.76.83 1.22 1.89 1.22 3.19 0 4.55-2.81 5.56-5.49 5.85.43.37.82 1.1.82 2.23v3.3c0 .32.21.69.83.57A12 12 0 0 0 12 .7Z"/>
        </svg>
      `;
    }

    if (icon === 'vscode') {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16.95 2.25 8.11 10.7 4.34 7.84 2.25 9.88l3.97 3.12-3.97 3.12 2.09 2.03 3.77-2.86 8.84 8.46 4.8-1.93V4.18l-4.8-1.93Zm-.45 4.37v10.76L10.68 13l5.82-6.38Z"/>
        </svg>
      `;
    }

    return `<span class="material-symbols-outlined">${icon}</span>`;
  }

  function escapeHtml(text) {
    return String(text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  resetState();
  bindEvents();
})();
