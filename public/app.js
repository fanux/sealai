(function () {
  const FILTERS = [
    {
      id: 'projects',
      label: '项目列表',
      icon: 'folder_code',
      action: 'projects',
    },
    {
      id: 'docker',
      label: 'Docker 镜像',
      icon: 'docker',
      prompt: '运行 Docker 镜像 ghcr.io/example/next-app:latest',
    },
    {
      id: 'github',
      label: 'GitHub 导入',
      icon: 'github',
      prompt: '分析这个 GitHub 项目并部署：https://github.com/openai/openai-quickstart-node',
    },
    {
      id: 'database',
      label: '创建数据库',
      icon: 'database',
      prompt: '创建一个高可用 PostgreSQL 数据库',
    },
    {
      id: 'app',
      label: '应用模板',
      icon: 'widgets',
      prompt: '从应用商店部署 FastGPT',
    },
    {
      id: 'devbox',
      label: 'DevBox',
      icon: 'terminal',
      prompt: '启动一个 DevBox 开发环境，支持 VS Code 和 Cursor',
    },
  ];

  const dom = {
    navFilters: document.getElementById('navFilters'),
    nodeLayer: document.getElementById('nodeLayer'),
    edgeLayer: document.getElementById('edgeLayer'),
    canvasStage: document.getElementById('canvasStage'),
    canvasWorld: document.getElementById('canvasWorld'),
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
  };

  let rafHandle = 0;

  function createId(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function getInitialGraph() {
    return {
      nodes: [
        {
          id: 'entry-demo',
          type: 'entry',
          title: 'orders.demo.sealos.run',
          subtitle: '公网入口 / HTTPS / 自动证书',
          status: 'Healthy',
          tags: ['TLS', '公网', '自动续期'],
          x: 96,
          y: 110,
          details: {
            domain: 'orders.demo.sealos.run',
            target: 'Orders API',
            policy: '自动证书 + HTTP/2',
          },
          operations: ['查看路由', '替换域名', '暂停入口'],
        },
        {
          id: 'container-demo',
          type: 'container',
          title: 'Orders API',
          subtitle: '源码部署实例 / Node.js 20 / 自动扩缩容',
          status: 'Running',
          tags: ['2 副本', '镜像缓存', '环境变量已注入'],
          x: 370,
          y: 230,
          details: {
            image: 'ghcr.io/sealai/orders-api:2026.03.31',
            runtime: 'Node.js 20 / pnpm',
            release: 'Blue-Green 已开启',
          },
          operations: ['查看日志', '回滚版本', '扩容副本'],
        },
        {
          id: 'db-demo',
          type: 'database',
          title: 'PostgreSQL HA',
          subtitle: '高可用数据库 / 自动备份 / 监控已开启',
          status: 'Protected',
          tags: ['Primary + Replica', 'PITR', '监控'],
          x: 700,
          y: 355,
          details: {
            connect: 'postgres://orders:••••@pg-ha.internal:5432/orders',
            backup: '每小时快照 + PITR',
            metrics: 'QPS 120 / 复制延迟 30ms',
          },
          operations: ['查看连接串', '创建备份', '打开监控'],
        },
        {
          id: 'devbox-demo',
          type: 'devbox',
          title: 'DevBox / Alice',
          subtitle: 'VS Code Server / Cursor / 预置 Node + Docker',
          status: 'Ready',
          tags: ['Remote IDE', 'SSH', '持久化工作区'],
          x: 712,
          y: 92,
          details: {
            access: 'code-server.sealos.run/devbox/alice',
            toolchain: 'Node.js / Python / Docker CLI',
            workspace: '50GB 持久卷',
          },
          operations: ['复制连接地址', '重启环境', '挂载仓库'],
        },
      ],
      edges: [
        { id: 'edge-demo-1', from: 'entry-demo', to: 'container-demo', label: 'HTTPS 443' },
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
    state.nodes = initial.nodes;
    state.edges = initial.edges;
    state.messages = initial.messages;
    state.timeline = initial.timeline;
    state.selectedNodeId = initial.selectedNodeId;
    state.agentBusy = false;
    state.currentTask = '待命';
    state.lastIssue = {
      title: 'FastGPT 启动失败',
      reason: '后端实例缺少 `OPENAI_API_KEY`，入口健康检查连续失败。',
    };
    renderAll();
  }

  function addMessage(role, text) {
    state.messages.push({
      id: createId('msg'),
      role,
      text,
    });
    renderChat();
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

    visibleNodes.forEach((node) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `node-card ${node.id === state.selectedNodeId ? 'active' : ''}`;
      card.dataset.nodeId = node.id;
      card.dataset.type = node.type;
      card.style.left = `${node.x}px`;
      card.style.top = `${node.y}px`;
      card.innerHTML = `
        <div class="node-badge">${node.status}</div>
        <div class="node-top">
          <div class="node-heading">
            <div class="node-icon material-symbols-outlined">${iconForType(node.type)}</div>
            <div class="node-heading-copy">
              <span class="node-type">${labelForType(node.type)}</span>
              <h3 class="node-title">${node.title}</h3>
            </div>
          </div>
          <div class="node-led"></div>
        </div>
        <p class="node-subtitle">${node.subtitle}</p>
        <div class="node-footer">
          ${node.tags.map((tag) => `<span class="node-tag">${tag}</span>`).join('')}
        </div>
        <div class="node-summary">${nodeSummary(node)}</div>
      `;

      card.addEventListener('click', () => {
        state.selectedNodeId = node.id;
        renderAll();
      });

      card.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) {
          return;
        }

        const rect = dom.canvasWorld.getBoundingClientRect();
        state.dragging = {
          nodeId: node.id,
          offsetX: event.clientX - rect.left - node.x,
          offsetY: event.clientY - rect.top - node.y,
        };
        card.classList.add('dragging');
        card.setPointerCapture(event.pointerId);
      });

      card.addEventListener('pointermove', (event) => {
        if (!state.dragging || state.dragging.nodeId !== node.id) {
          return;
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

        state.dragging = null;
        card.classList.remove('dragging');
        card.releasePointerCapture(event.pointerId);
        scheduleEdgeRender();
      });

      dom.nodeLayer.appendChild(card);
    });
    scheduleEdgeRender();
    updateSummary();
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
      .map(
        (message) => `
          <div class="chat-message ${message.role}">
            <div class="chat-avatar">${message.role === 'assistant' ? 'AI' : 'YOU'}</div>
            <div class="chat-bubble">${escapeHtml(message.text)}</div>
          </div>
        `,
      )
      .join('');
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
          renderAll();
        }
        return;
      }

      dom.chatInput.value = button.dataset.shortcutPrompt || '';
      dom.chatInput.focus();
    });

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

    if (/(postgres|pgsql|mysql|mongo|数据库)/.test(lower)) {
      return 'database';
    }

    if (/(fastgpt|应用商店|模板|app store)/.test(lower)) {
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
      subtitle: '源码部署生成的公网入口',
      status: 'Healthy',
      tags: ['HTTPS', '自动证书', '访问域名'],
      x: baseX,
      y: baseY - 70,
      details: {
        domain: `${project}.cloud.sealos.run`,
        source: url,
        route: `指向 ${project} Runtime`,
      },
      operations: ['查看入口', '切换灰度', '复制域名'],
    });

    state.nodes.push({
      id: appId,
      type: 'container',
      title: `${project} Runtime`,
      subtitle: '由源码自动构建并发布的应用实例',
      status: 'Running',
      tags: ['自动构建', '健康检查', '弹性副本'],
      x: baseX + 260,
      y: baseY + 40,
      details: {
        image: `registry.local/${project}:latest`,
        runtime: '自动识别启动命令',
        release: 'Deployment 已隐藏，展示为实例',
      },
      operations: ['查看日志', '回滚', '扩容'],
    });

    state.edges.push({
      id: createId('edge'),
      from: entryId,
      to: appId,
      label: 'HTTPS 443',
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

  async function runImageFlow(input) {
    const image = extractImage(input) || 'ghcr.io/example/app:latest';
    const name = image.split('/').pop().replace(/[:.]/g, '-').slice(0, 18);

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
      title: `${name}.edge.sealos.run`,
      subtitle: '镜像任务自动暴露的公网入口',
      status: 'Healthy',
      tags: ['80/443', '域名已分配'],
      x,
      y: y - 82,
      details: {
        domain: `${name}.edge.sealos.run`,
        policy: '自动 HTTPS',
        image,
      },
      operations: ['复制域名', '查看路由', '暂停入口'],
    });

    state.nodes.push({
      id: containerId,
      type: 'container',
      title: `${name} Container`,
      subtitle: '根据镜像分析结果自动运行',
      status: 'Running',
      tags: ['镜像直启', 'Env 扫描', '端口推断'],
      x: x + 260,
      y,
      details: {
        image,
        entrypoint: '自动解析',
        env: '等待补充敏感变量',
      },
      operations: ['追加环境变量', '查看日志', '重启'],
    });

    state.edges.push({
      id: createId('edge'),
      from: entryId,
      to: containerId,
      label: 'HTTP -> Runtime',
    });

    state.selectedNodeId = containerId;
    addMessage(
      'assistant',
      '镜像已转化为一个可运行实例。原型里不会直接暴露 Pod 或 Service，而是只显示入口与实例。',
    );
    setAgentState(false, '待命');
    renderAll();
  }

  async function runDatabaseFlow(input) {
    const lower = input.toLowerCase();
    const flavor = lower.includes('mysql')
      ? 'MySQL'
      : lower.includes('mongo')
      ? 'MongoDB'
      : 'PostgreSQL';
    const x = 520 + Math.floor(Math.random() * 120);
    const y = 240 + Math.floor(Math.random() * 140);
    const id = createId('db');

    setAgentState(true, '数据库创建');
    addMessage('assistant', `开始创建 ${flavor} 高可用实例，并配置备份与监控。`);
    pushTimeline('创建数据库', `${flavor} 集群初始化、存储挂载和备份策略下发。`, 'running');
    await wait(1000);

    state.nodes.push({
      id,
      type: 'database',
      title: `${flavor} Cluster`,
      subtitle: '高可用数据库卡片 / 连接信息已生成',
      status: 'Protected',
      tags: ['备份', '监控', '连接串'],
      x,
      y,
      details: {
        connect:
          flavor === 'MySQL'
            ? 'mysql://admin:••••@mysql.internal:3306/app'
            : flavor === 'MongoDB'
            ? 'mongodb://admin:••••@mongo.internal:27017/app'
            : 'postgres://app:••••@pgsql.internal:5432/app',
        backup: '快照 + 恢复点',
        observability: 'CPU / IOPS / 慢查询',
      },
      operations: ['复制连接串', '创建只读副本', '打开备份'],
    });

    const lastContainer = [...state.nodes].reverse().find((node) => node.type === 'container');
    if (lastContainer) {
      state.edges.push({
        id: createId('edge'),
        from: lastContainer.id,
        to: id,
        label: `${flavor === 'MongoDB' ? 'MONGO_URL' : flavor === 'MySQL' ? 'MYSQL_URL' : 'DATABASE_URL'}`,
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

  async function runAppFlow(input) {
    const appName = /fastgpt/i.test(input) ? 'FastGPT' : '应用模板';
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

    state.nodes.push(
      {
        id: entryId,
        type: 'entry',
        title: `${appName.toLowerCase()}.suite.sealos.run`,
        subtitle: '模板应用统一入口',
        status: 'Healthy',
        tags: ['公网', 'HTTPS'],
        x: baseX,
        y: baseY - 120,
        details: {
          domain: `${appName.toLowerCase()}.suite.sealos.run`,
          app: appName,
          route: 'Frontend Gateway',
        },
        operations: ['切换域名', '查看流量', '暂停入口'],
      },
      {
        id: frontId,
        type: 'app',
        title: `${appName} Frontend`,
        subtitle: '应用商店封装的前端界面',
        status: 'Running',
        tags: ['模板实例', '自动连后端'],
        x: baseX + 250,
        y: baseY - 16,
        details: {
          bundle: 'Template Runtime',
          config: 'UI / 域名 / 身份入口',
          delivery: 'CDN + Runtime 混合',
        },
        operations: ['查看模板参数', '重建前端', '打开预览'],
      },
      {
        id: backId,
        type: 'container',
        title: `${appName} Backend`,
        subtitle: '模板应用后端能力',
        status: 'Running',
        tags: ['API', '任务队列', '已注入配置'],
        x: baseX + 250,
        y: baseY + 168,
        details: {
          runtime: 'Container Runtime',
          config: '环境变量已注入',
          scaling: '水平扩缩容',
        },
        operations: ['查看日志', '更改密钥', '重启'],
      },
      {
        id: dbId,
        type: 'database',
        title: `${appName} Data`,
        subtitle: '模板依赖数据库',
        status: 'Protected',
        tags: ['自动备份', '可视化连接'],
        x: baseX + 545,
        y: baseY + 136,
        details: {
          connect: 'mongodb://template:••••@mongo.internal:27017/fastgpt',
          backup: '每日快照 + 7 天保留',
          ops: '备份 / 监控 / 副本集',
        },
        operations: ['查看连接串', '创建备份', '扩容存储'],
      },
    );

    state.edges.push(
      { id: createId('edge'), from: entryId, to: frontId, label: 'HTTPS' },
      { id: createId('edge'), from: frontId, to: backId, label: 'API Traffic' },
      { id: createId('edge'), from: backId, to: dbId, label: 'MONGO_URL' },
    );

    state.selectedNodeId = frontId;
    state.lastIssue = {
      title: `${appName} 启动失败`,
      reason: `${appName} Backend 缺少模型服务密钥，健康检查进入降级模式。`,
    };

    addMessage(
      'assistant',
      `${appName} 模板已展开到画布：入口、前端、后端和数据库均作为关键原子单元展示。`,
    );
    setAgentState(false, '待命');
    renderAll();
  }

  async function runDevboxFlow() {
    const id = createId('devbox');
    const x = 560 + Math.floor(Math.random() * 120);
    const y = 90 + Math.floor(Math.random() * 100);

    setAgentState(true, 'DevBox 创建');
    addMessage('assistant', '开始创建云端 DevBox，预置 VS Code Server、Cursor 连接和持久化工作区。');
    pushTimeline('创建 DevBox', '准备工作区卷、工具链镜像和远程访问入口。', 'running');
    await wait(900);

    state.nodes.push({
      id,
      type: 'devbox',
      title: `DevBox / ${randomName()}`,
      subtitle: '内置 VS Code Server，可被 VS Code / Cursor 连接',
      status: 'Ready',
      tags: ['IDE', 'SSH', '持久化'],
      x,
      y,
      details: {
        access: `devbox-${Math.floor(Math.random() * 900 + 100)}.sealos.run`,
        toolchain: 'VS Code Server / Git / Node / Python',
        client: 'VS Code / Cursor / Web',
      },
      operations: ['复制访问地址', '挂载仓库', '重启容器'],
    });

    state.selectedNodeId = id;
    addMessage(
      'assistant',
      'DevBox 已就绪。它在画布中表现为一个基础原子单元，可与应用实例建立调试或开发连接。',
    );
    setAgentState(false, '待命');
    renderAll();
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
      entry.status = 'Healthy';
      entry.tags = uniqueTags(entry.tags.concat(['可访问']));
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
      container: '应用实例',
      database: '数据库',
      app: '封装应用',
      devbox: '开发环境',
    }[type];
  }

  function iconForType(type) {
    return {
      entry: 'router',
      container: 'inventory_2',
      database: 'database',
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
      Healthy: 92,
      Running: 78,
      Protected: 88,
      Ready: 85,
      Recovered: 81,
    }[node.status] || 64;
  }

  function nodeSummary(node) {
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
      ops: '运维',
      client: '连接客户端',
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

  function collectProjectNodes() {
    const workloadNodes = state.nodes.filter((node) => ['container', 'app'].includes(node.type));
    if (workloadNodes.length) {
      return workloadNodes;
    }

    const fallbackNodes = state.nodes.filter((node) => node.type !== 'entry');
    return fallbackNodes.slice(0, 6);
  }

  function iconMarkup(icon) {
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

    return `<span class="material-symbols-outlined">${icon}</span>`;
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  resetState();
  bindEvents();
})();
