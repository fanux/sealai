# SealAI

SealAI 是一个面向 Sealos 的 AI Workspace 原型，用来把「项目源码、Docker 镜像、数据库、应用模板、DevBox 开发环境、域名入口」统一放到一个画布和一个 Agent 会话里管理。

它不是 Kubernetes 控制台，也不是纯聊天机器人。  
中间是对象画布，右侧是聊天与 AGUI 操作面板，用户可以直接创建、配置、连接和管理云对象。

<img width="3824" height="1894" alt="SealAI screenshot" src="https://github.com/user-attachments/assets/27558295-d00c-4f25-b003-ee09836c5ffd" />

## 项目目标

这个原型主要验证三件事：

1. 用统一画布表达项目、容器、数据库、入口域名、开发环境之间的关系。
2. 用右侧聊天区承载结构化操作，而不只是返回一段文本。
3. 让用户以更接近“业务对象”的方式操作 Sealos，而不是直接面对 Pod、Service、Ingress、Deployment 这些底层资源。

## 当前能力

- 项目列表视图：左侧保留应用级项目入口，支持近期项目切换和创建项目入口。
- 画布式对象管理：中间区域展示容器、数据库、入口域名、DevBox 等对象卡片和对象关系。
- 聊天 + AGUI：右侧既能接受自然语言输入，也能展示结构化表单、授权流程、Deploy 按钮和配置卡片。
- GitHub 导入：支持输入仓库地址或 GitHub 授权方式发起源码部署。
- Docker 部署：支持镜像地址、环境变量、启动参数、CPU、内存、磁盘、端口等配置。
- 数据库创建与管理：支持 MySQL、PostgreSQL、Redis、MongoDB，并提供数据库工作区、表数据、Schema、ER 图和备份页。
- 应用商店：支持搜索和部署常见应用模板，例如 FastGPT、Dify、n8n、Metabase。
- DevBox：支持语言或框架模板、资源配置、启动命令以及 IDE 连接提示。
- 连接关系与环境变量注入：对象之间可以建立关系，容器连接数据库后会在右侧显示环境变量注入。
- Sealos 部署：仓库内已包含 `.sealos/template/index.yaml`，并支持将当前前端资源同步到线上部署。

## 界面结构

### 1. 顶部 Header

- 保留品牌、通知、Plan、设置等全局动作。
- 页面整体为全屏工作区，不再堆叠额外概览面板。

### 2. 左侧窄栏

- 左侧只保留项目相关入口。
- 项目图标之外的主要创建入口放到右下角聊天工具栏。

### 3. 中间画布

- 负责展示对象卡片和连接关系。
- 支持拖拽、缩放、平移。
- 点击数据库卡片后可进入数据库工作区。

### 4. 右侧聊天区

- 承载聊天消息和结构化 AGUI。
- 点击底部图标会直接刷出对应操作卡，而不是只生成纯文本。
- 鼠标移到工具图标上时，会以 AI 消息的形式给出功能说明。

## 数据库工作区

数据库管理页目前包含两类主要能力：

- 数据浏览：数据库列表、表列表、数据表、Schema、索引、ER 图。
- 数据库配置：副本、CPU、内存、存储等参数可在右侧配置卡中调整。

备份页已简化为更紧凑的两段结构：

- 备份方式：`手动备份 / 备份策略`
- 备份列表：最近执行记录，并提供恢复按钮

备份策略当前支持：

- 按小时：选择每小时的分钟
- 按天：选择每天的开始小时和分钟
- 按周：选择周几、开始小时和分钟

## 本地运行

这个仓库本质上是一个静态前端原型，加一个极轻量的静态文件服务。

### 使用 Node.js 启动

要求：

- Node.js 18+ 或更高版本

启动：

```bash
npm start
```

默认访问：

```text
http://127.0.0.1:3000
```

如果希望局域网访问：

```bash
HOST=0.0.0.0 PORT=3000 npm start
```

## 生产镜像与静态服务器

仓库里有两套非常轻的服务方式：

- `server.js`
  本地开发时直接用 Node.js 启动，负责把 `public/` 目录作为静态资源输出。

- `cmd/sealai-static-server/main.go`
  生产环境使用的 Go 静态服务器，可编译为单个二进制文件，并放进 `scratch` 镜像中运行。

编译生产二进制：

```bash
go build -o dist/sealai-server ./cmd/sealai-static-server
```

## Docker 运行

仓库已经内置 `Dockerfile`，默认依赖 `dist/sealai-server`。

构建前先生成二进制：

```bash
go build -o dist/sealai-server ./cmd/sealai-static-server
```

再构建镜像：

```bash
docker build -t sealai:local .
```

运行：

```bash
docker run --rm -p 3000:3000 sealai:local
```

默认对外端口为 `3000`。

## 部署到 Sealos

仓库内已经包含 Sealos 模板：

- `.sealos/template/index.yaml`

该模板会创建：

- Deployment
- Service
- Ingress
- App

默认镜像配置位于模板文件内，运行端口为 `3000`。

在当前项目里，实际线上更新通常有两种方式：

1. 重建并推送新镜像，再更新 Deployment
2. 仅同步 `public/` 静态资源，通过 ConfigMap 替换并滚动重启

如果你的改动主要集中在 `public/`，第二种方式通常更快也更稳。

## 项目结构

```text
.
├── .sealos/                      # Sealos 模板、分析结果和部署状态
├── cmd/
│   └── sealai-static-server/     # 生产用 Go 静态服务器
├── dist/                         # 构建产物，Dockerfile 默认读取这里的二进制
├── public/
│   ├── index.html                # 页面骨架
│   ├── styles.css                # 全局样式
│   └── app.js                    # 主要交互逻辑、画布、聊天、AGUI、数据库工作区
├── demo.html                     # 最初的设计风格参考稿
├── design.md                     # 当前原型设计文档
├── server.js                     # 本地开发静态服务
├── Dockerfile                    # 生产镜像定义
└── package.json                  # 本地启动脚本
```

## 技术栈

- 原生 HTML / CSS / JavaScript
- Node.js 静态资源服务
- Go 静态文件服务，用于生成更轻量的生产二进制
- Sealos Application Template

## 当前边界

这是一个高保真原型，不是完整后端系统。目前仍然有以下边界：

- 大量对象数据和状态是前端模拟数据，用于验证交互与信息架构。
- 聊天区中的很多 AGUI 操作是原型流程，不等价于真实云资源编排后端。
- 数据库工作区、连接关系、对象卡片管理目前主要面向产品交互验证。
- 一部分线上更新采用“静态资源同步”而不是完整镜像发版，以降低验证成本。

## 相关文档

- 设计文档：[design.md](./design.md)
- 风格参考稿：[demo.html](./demo.html)

## License

当前仓库未单独声明 License。如需开源发布，建议补充明确的许可证文件。
