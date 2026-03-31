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
      subtitle: '镜像任务自动暴露的公网入口',
      status: 'Healthy',
      tags: ['80/443', '域名已分配'],
      x,
      y: y - 82,
      details: {
        domain,
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
      tags: buildDockerTags(options),
      x: x + 260,
      y,
      details: {
        image,
        entrypoint: options.startArgs || '自动解析',
        env: envSummary,
        runtime: runtimeSummary,
        route: `${domain} -> ${port}/TCP`,
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

    state.nodes.push({
      id,
      type: 'database',
      title: `${flavor} Cluster`,
      subtitle: `${instanceSpec} / ${replicas} 副本 / 连接信息已生成`,
      status: 'Protected',
      tags: [instanceSpec, `${replicas} 副本`, '连接串'],
      x,
      y,
      details: {
        connect: databaseConnectString(flavor),
        backup: '快照 + 恢复点',
        observability: `${instanceSpec} / ${replicas} 副本 / 监控开启`,
      },
      operations: ['复制连接串', '创建只读副本', '打开备份'],
    });

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

    state.nodes.push(
      {
        id: entryId,
        type: 'entry',
        title: `${appTemplate.slug}.suite.sealos.run`,
        subtitle: '模板应用统一入口',
        status: 'Healthy',
        tags: ['公网', 'HTTPS'],
        x: baseX,
        y: baseY - 120,
        details: {
          domain: `${appTemplate.slug}.suite.sealos.run`,
          app: appName,
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
        subtitle: appTemplate.backendSubtitle,
        status: 'Running',
        tags: appTemplate.backendTags,
        x: baseX + 250,
        y: baseY + 168,
        details: {
          runtime: appTemplate.runtime,
          config: appTemplate.backendConfig,
          scaling: appTemplate.scaling,
        },
        operations: ['查看日志', '更改密钥', '重启'],
      },
      {
        id: dbId,
        type: 'database',
        title: `${appName} Data`,
        subtitle: appTemplate.databaseSubtitle,
        status: 'Protected',
        tags: appTemplate.databaseTags,
        x: baseX + 545,
        y: baseY + 136,
        details: {
          connect: appTemplate.databaseConnect,
          backup: appTemplate.databaseBackup,
          ops: appTemplate.databaseOps,
        },
        operations: ['查看连接串', '创建备份', '扩容存储'],
      },
    );

    state.edges.push(
      { id: createId('edge'), from: entryId, to: frontId, label: 'HTTPS' },
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
        subtitle: `DevBox 入口 / ${port}/TCP / 自动 HTTPS`,
        status: 'Healthy',
        tags: ['DevBox', `${port}/TCP`, 'HTTPS'],
        x: x - 250,
        y: y - 48,
        details: {
          domain,
          target: `DevBox / ${owner}`,
          policy: '自动 HTTPS + Workspace 访问控制',
        },
        operations: ['复制域名', '替换域名', '暂停入口'],
      },
      {
        id,
        type: 'devbox',
        title: `DevBox / ${owner}`,
        subtitle: `${template.name} ${version} / ${cpu} CPU / ${memory} RAM`,
        status: 'Ready',
        tags: [template.name, `v${version}`, `${port}/TCP`, `${cpu} CPU`, memory],
        x,
        y,
        details: {
          access: domain,
          toolchain: `${template.toolchain} / v${version}`,
          client: 'VS Code / Cursor / Web',
          runtime: `${cpu} CPU / ${memory} RAM`,
          template: `${template.type} / ${template.name}`,
          version,
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
                      <span class="agui-template-icon" style="--template-accent:${template.accent};">${escapeHtml(template.mark)}</span>
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
