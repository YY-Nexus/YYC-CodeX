# YanYu Cloud³ OS - 言语丨云³智能交互平台

<div align="center">
  <img src="/public/yanyu-cloud-logo.png" alt="YanYu Cloud³ OS Logo" width="200" height="200">
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
  
  **基于Vercel + Next.js构建的智能工具开发平台**
  
  ✅ 零配置部署的自治工具单元  
  ✅ 边缘计算驱动的实时AI推理  
  ✅ 军事级安全防护体系  
  ✅ 开箱即用的全链路监控
</div>

## 📋 目录

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [功能特性](#功能特性)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [API文档](#api文档)
- [环境变量](#环境变量)
- [部署指南](#部署指南)
- [开发指南](#开发指南)
- [测试](#测试)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 🚀 项目简介

YanYu Cloud³ OS是一个基于Next.js 14和TypeScript构建的现代化智能交互平台，集成了网络诊断、AI对话、性能测试、安全检测等多种功能模块。平台采用模块化架构设计，支持插件式扩展，为用户提供一站式的网络工具和AI服务体验。

### 核心特性

- 🌐 **网络诊断工具**：实时网络速度测试、连接诊断、性能分析
- 🤖 **AI智能交互**：集成OpenAI GPT模型，支持智能对话和内容生成
- 🎨 **创意工具套件**：图像生成、视频处理、音乐创作等AI驱动的创意工具
- 🏠 **智能场景应用**：智能家居、智慧城市、智能教育、智能医疗等场景化应用
- 📊 **实时监控面板**：系统状态监控、API性能追踪、用户行为分析
- 🔒 **企业级安全**：JWT认证、数据加密、安全扫描、权限管理

## 🛠 技术栈

### 前端框架
- **Next.js 14** - React全栈框架，支持App Router
- **TypeScript 5.3.3** - 类型安全的JavaScript超集
- **React 18.2.0** - 用户界面构建库
- **Tailwind CSS 3.4.17** - 原子化CSS框架

### UI组件库
- **Radix UI** - 无障碍的原始UI组件
- **Shadcn/ui** - 基于Radix UI的现代组件库
- **Framer Motion 10.16.16** - 动画和手势库
- **Lucide React** - 美观的SVG图标库

### AI集成
- **AI SDK 3.4.32** - Vercel AI SDK核心库
- **@ai-sdk/openai 0.0.66** - OpenAI模型集成
- **Zod 3.22.4** - TypeScript优先的模式验证

### 开发工具
- **ESLint** - 代码质量检查
- **Jest** - JavaScript测试框架
- **Testing Library** - React组件测试工具
- **PostCSS** - CSS后处理器

### 部署平台
- **Vercel** - 边缘计算部署平台
- **Vercel Edge Functions** - 边缘计算函数
- **Vercel Analytics** - 性能分析工具

## ✨ 功能特性

### 🌐 网络诊断模块
\`\`\`typescript
// 网络速度测试
const speedTest = await fetch('/api/network/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ server: 'auto', duration: 10 })
});
\`\`\`

- **实时速度测试**：下载/上传速度、延迟、抖动测量
- **网络诊断**：连接状态检测、路由跟踪、DNS解析分析
- **性能监控**：网站加载时间、资源分析、性能评分
- **安全扫描**：SSL证书检查、安全头检测、漏洞扫描

### 🤖 AI智能交互
\`\`\`typescript
// AI对话接口
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: '你好，请介绍一下这个平台' }]
  })
});
\`\`\`

- **智能对话**：基于GPT-4的自然语言交互
- **内容生成**：文本创作、代码生成、翻译服务
- **语音识别**：实时语音转文字功能
- **情感分析**：用户情绪识别和智能回应

### 🎨 创意工具套件
- **图像生成**：AI驱动的图像创作和编辑
- **视频处理**：视频剪辑、特效添加、格式转换
- **音乐创作**：AI音乐生成、音频处理、节拍制作
- **3D建模**：三维模型生成和渲染

### 🏠 智能场景应用
- **智能家居**：设备控制、场景联动、能耗管理
- **智慧城市**：交通监控、环境监测、公共服务
- **智能教育**：个性化学习、知识图谱、学习分析
- **智能医疗**：健康监测、诊断辅助、医疗数据分析

## 🚀 快速开始

### 环境要求
- Node.js >= 18.17.0
- pnpm >= 8.0.0
- Git

### 安装步骤

1. **克隆项目**
\`\`\`bash
git clone https://github.com/YY-Nexus/YY-Y.git
cd YY-Y
\`\`\`

2. **安装依赖**
\`\`\`bash
pnpm install
\`\`\`

3. **配置环境变量**
\`\`\`bash
cp .env.example .env.local
# 编辑 .env.local 文件，填入必要的环境变量
\`\`\`

4. **启动开发服务器**
\`\`\`bash
pnpm dev
\`\`\`

5. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 黄金三步部署
\`\`\`bash
# 1. 克隆模板仓库
git clone https://github.com/YY-Nexus/YY-Y.git

# 2. 安装依赖
pnpm install --frozen-lockfile

# 3. 本地预览
vercel dev --local-config
\`\`\`

## 📁 项目结构

\`\`\`
YanYu-Cloud³-OS/
├── app/                          # Next.js App Router目录
│   ├── api/                      # API路由
│   │   ├── chat/                 # AI对话接口
│   │   ├── feedback/             # 用户反馈接口
│   │   ├── health/               # 健康检查接口
│   │   ├── monitor/              # 监控接口
│   │   └── network/              # 网络测试接口
│   ├── docs/                     # API文档页面
│   ├── local-api/                # 本地API测试页面
│   ├── smart-home/               # 智能家居页面
│   ├── smart-city/               # 智慧城市页面
│   ├── smart-education/          # 智能教育页面
│   ├── smart-health/             # 智能医疗页面
│   ├── image-creation/           # 图像创作页面
│   ├── video-hub/                # 视频中心页面
│   ├── code-assistant/           # 代码助手页面
│   ├── ai-engine/                # AI引擎页面
│   ├── music-studio/             # 音乐工作室页面
│   ├── layout.tsx                # 根布局组件
│   ├── page.tsx                  # 首页组件
│   ├── loading.tsx               # 加载页面
│   ├── not-found.tsx             # 404页面
│   └── error.tsx                 # 错误页面
├── components/                   # React组件
│   ├── ui/                       # 基础UI组件
│   │   ├── accordion.tsx         # 手风琴组件
│   │   ├── alert.tsx             # 警告组件
│   │   ├── button.tsx            # 按钮组件
│   │   ├── card.tsx              # 卡片组件
│   │   ├── dialog.tsx            # 对话框组件
│   │   ├── input.tsx             # 输入框组件
│   │   ├── select.tsx            # 选择器组件
│   │   ├── slider.tsx            # 滑块组件
│   │   ├── tabs.tsx              # 标签页组件
│   │   └── ...                   # 其他UI组件
│   ├── modules/                  # 功能模块组件
│   │   ├── image-creation-module.tsx
│   │   ├── video-hub-module.tsx
│   │   └── music-studio-module.tsx
│   ├── ai-interaction-hub.tsx    # AI交互中心
│   ├── smart-module-panel.tsx    # 智能模块面板
│   ├── top-navigation-menu.tsx   # 顶部导航菜单
│   ├── global-header.tsx         # 全局头部
│   ├── global-footer.tsx         # 全局底部
│   ├── speed-test-module.tsx     # 网速测试模块
│   ├── network-diagnosis-module.tsx # 网络诊断模块
│   ├── performance-test-module.tsx  # 性能测试模块
│   ├── security-detection-module.tsx # 安全检测模块
│   ├── feedback-module.tsx       # 反馈模块
│   ├── error-boundary.tsx        # 错误边界
│   └── ...                       # 其他业务组件
├── lib/                          # 工具库
│   ├── utils.ts                  # 通用工具函数
│   ├── api-utils.ts              # API工具函数
│   ├── ai-service.ts             # AI服务
│   ├── notification-config.ts    # 通知配置
│   ├── swagger-config.ts         # Swagger配置
│   └── ...                       # 其他工具库
├── hooks/                        # React Hooks
│   ├── use-mobile.ts             # 移动端检测Hook
│   ├── use-toast.ts              # 消息提示Hook
│   ├── use-local-storage.ts      # 本地存储Hook
│   └── use-privacy-consent.ts    # 隐私同意Hook
├── scripts/                      # 脚本文件
│   ├── generate-docs.ts          # 文档生成脚本
│   ├── performance-test.ts       # 性能测试脚本
│   └── test-report.ts            # 测试报告脚本
├── __tests__/                    # 测试文件
│   ├── api/                      # API测试
│   ├── integration/              # 集成测试
│   ├── performance/              # 性能测试
│   └── e2e/                      # 端到端测试
├── docs/                         # 文档目录
│   ├── feature-analysis.md       # 功能分析文档
│   └── feature-extension-roadmap.md # 功能扩展路线图
├── public/                       # 静态资源
│   ├── images/                   # 图片资源
│   ├── icons/                    # 图标资源
│   └── ...                       # 其他静态文件
├── styles/                       # 样式文件
│   └── globals.css               # 全局样式
├── .env.example                  # 环境变量示例
├── .env.local                    # 本地环境变量
├── next.config.mjs               # Next.js配置
├── tailwind.config.js            # Tailwind CSS配置
├── tsconfig.json                 # TypeScript配置
├── package.json                  # 项目依赖配置
├── pnpm-lock.yaml                # 依赖锁定文件
├── vercel.json                   # Vercel部署配置
├── Dockerfile                    # Docker配置
├── jest.config.js                # Jest测试配置
└── README.md                     # 项目说明文档
\`\`\`

## 📚 API文档

### 网络测试API

#### POST /api/network/test
执行网络速度测试

**请求参数：**
\`\`\`typescript
interface SpeedTestRequest {
  server?: string;      // 测试服务器ID，默认自动选择
  duration?: number;    // 测试持续时间（秒），默认10秒
}
\`\`\`

**响应数据：**
\`\`\`typescript
interface SpeedTestResponse {
  downloadSpeed: number;    // 下载速度 (Mbps)
  uploadSpeed: number;      // 上传速度 (Mbps)
  latency: number;          // 延迟 (ms)
  jitter: number;           // 抖动 (ms)
  timestamp: string;        // 测试时间
  isp: string;              // 互联网服务提供商
  serverLocation: string;   // 测试服务器位置
}
\`\`\`

**示例请求：**
\`\`\`bash
curl -X POST http://localhost:3000/api/network/test \
  -H "Content-Type: application/json" \
  -d '{"server": "auto", "duration": 10}'
\`\`\`

### AI对话API

#### POST /api/chat
AI智能对话接口

**请求参数：**
\`\`\`typescript
interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  model?: string;           // AI模型，默认gpt-4
  temperature?: number;     // 创造性参数，0-1
  maxTokens?: number;       // 最大令牌数
}
\`\`\`

**响应数据：**
\`\`\`typescript
interface ChatResponse {
  message: {
    role: 'assistant';
    content: string;
  };
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  timestamp: string;
}
\`\`\`

### 系统监控API

#### GET /api/health
获取系统健康状态

**响应数据：**
\`\`\`typescript
interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;           // 运行时间（秒）
  memory: {
    used: number;           // 已使用内存（字节）
    total: number;          // 总内存（字节）
    percentage: number;     // 内存使用率（%）
  };
  services: {
    database: boolean;      // 数据库状态
    email: boolean;         // 邮件服务状态
    cache: boolean;         // 缓存服务状态
  };
}
\`\`\`

#### POST /api/feedback
提交用户反馈

**请求参数：**
\`\`\`typescript
interface FeedbackRequest {
  name?: string;            // 用户姓名
  email: string;            // 用户邮箱
  message: string;          // 反馈内容
  category: 'bug' | 'feature' | 'general' | 'other'; // 反馈类型
  attachments?: File[];     // 附件文件
}
\`\`\`

## 🔧 环境变量

项目使用环境变量进行配置管理。请参考 `.env.example` 文件创建你的 `.env.local` 文件。

### 必需的环境变量

\`\`\`bash
# AI服务配置
OPENAI_API_KEY=your_openai_api_key_here

# 数据库配置
DATABASE_URL=your_database_connection_string

# 邮件服务配置
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password

# 应用配置
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Vercel配置
VERCEL_URL=your_vercel_deployment_url
\`\`\`

### 可选的环境变量

\`\`\`bash
# 分析和监控
VERCEL_ANALYTICS_ID=your_analytics_id
SENTRY_DSN=your_sentry_dsn

# 第三方服务
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# 功能开关
ENABLE_AI_FEATURES=true
ENABLE_NETWORK_TOOLS=true
ENABLE_CREATIVE_TOOLS=true
\`\`\`

## 🚀 部署指南

### Vercel部署（推荐）

1. **连接GitHub仓库**
   - 登录 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的GitHub仓库

2. **配置环境变量**
   - 在Vercel项目设置中添加环境变量
   - 复制 `.env.example` 中的变量到Vercel

3. **部署设置**
   \`\`\`json
   {
     "buildCommand": "pnpm build",
     "devCommand": "pnpm dev",
     "installCommand": "pnpm install",
     "framework": "nextjs"
   }
   \`\`\`

4. **自动部署**
   - 推送代码到main分支自动触发部署
   - 预览分支自动生成预览链接

### Docker部署

1. **构建镜像**
\`\`\`bash
docker build -t yanyu-cloud-os .
\`\`\`

2. **运行容器**
\`\`\`bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key \
  -e DATABASE_URL=your_db_url \
  yanyu-cloud-os
\`\`\`

### 手动部署

1. **构建项目**
\`\`\`bash
pnpm build
\`\`\`

2. **启动生产服务器**
\`\`\`bash
pnpm start
\`\`\`

## 👨‍💻 开发指南

### 开发环境设置

1. **安装依赖**
\`\`\`bash
pnpm install
\`\`\`

2. **启动开发服务器**
\`\`\`bash
pnpm dev
\`\`\`

3. **代码格式化**
\`\`\`bash
pnpm lint
pnpm lint:fix
\`\`\`

### 添加新功能模块

1. **创建组件文件**
\`\`\`bash
# 在 components/ 目录下创建新组件
touch components/new-feature-module.tsx
\`\`\`

2. **实现组件逻辑**
\`\`\`typescript
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NewFeatureModule() {
  const [data, setData] = useState(null)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>新功能模块</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 功能实现 */}
      </CardContent>
    </Card>
  )
}
\`\`\`

3. **添加API路由**
\`\`\`typescript
// app/api/new-feature/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    // 处理业务逻辑
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
\`\`\`

### 代码规范

- **TypeScript**：所有组件和函数必须有类型定义
- **ESLint**：遵循项目ESLint配置
- **命名规范**：
  - 组件：PascalCase (e.g., `UserProfile`)
  - 文件：kebab-case (e.g., `user-profile.tsx`)
  - 函数：camelCase (e.g., `getUserData`)
  - 常量：UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Git工作流

\`\`\`bash
# 1. 创建特性分支
git checkout -b feat/new-feature

# 2. 开发和提交
git add .
git commit -m "feat: 添加新功能模块"

# 3. 推送分支
git push origin feat/new-feature

# 4. 创建Pull Request
# 在GitHub上创建PR并等待代码审查
\`\`\`

## 🧪 测试

### 运行测试

\`\`\`bash
# 运行所有测试
pnpm test

# 监视模式运行测试
pnpm test:watch

# 生成测试覆盖率报告
pnpm test:coverage
\`\`\`

### 测试类型

1. **单元测试**：测试单个组件和函数
2. **集成测试**：测试组件间的交互
3. **API测试**：测试API端点的功能
4. **端到端测试**：测试完整的用户流程

### 编写测试

\`\`\`typescript
// __tests__/components/speed-test-module.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { SpeedTestModule } from '@/components/speed-test-module'

describe('SpeedTestModule', () => {
  it('应该渲染速度测试按钮', () => {
    render(<SpeedTestModule />)
    const button = screen.getByText('开始测试')
    expect(button).toBeInTheDocument()
  })

  it('点击按钮应该开始测试', async () => {
    render(<SpeedTestModule />)
    const button = screen.getByText('开始测试')
    fireEvent.click(button)
    
    expect(screen.getByText('测试中...')).toBeInTheDocument()
  })
})
\`\`\`

## 📈 性能优化

### 构建优化

- **代码分割**：使用动态导入减少初始包大小
- **图片优化**：使用Next.js Image组件自动优化
- **字体优化**：使用next/font优化字体加载
- **Bundle分析**：使用@next/bundle-analyzer分析包大小

### 运行时优化

- **缓存策略**：合理使用浏览器缓存和CDN
- **懒加载**：非关键组件使用懒加载
- **虚拟滚动**：大列表使用虚拟滚动
- **防抖节流**：用户输入使用防抖和节流

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

### 贡献流程

1. **Fork项目**
2. **创建特性分支** (`git checkout -b feat/amazing-feature`)
3. **提交更改** (`git commit -m 'feat: 添加惊人的新功能'`)
4. **推送分支** (`git push origin feat/amazing-feature`)
5. **创建Pull Request**

### 提交规范

使用[Conventional Commits](https://www.conventionalcommits.org/)规范：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式化
- `refactor:` 代码重构
- `test:` 添加测试
- `chore:` 构建过程或辅助工具的变动

### 代码审查

所有PR都需要经过代码审查：

- 代码质量检查
- 测试覆盖率检查
- 性能影响评估
- 安全性审查

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🙏 致谢

感谢以下开源项目和贡献者：

- [Next.js](https://nextjs.org/) - React全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Radix UI](https://www.radix-ui.com/) - 无障碍UI组件
- [Vercel](https://vercel.com/) - 部署平台
- [OpenAI](https://openai.com/) - AI服务

## 📞 联系我们

- **项目主页**：[https://github.com/YY-Nexus/YY-Y](https://github.com/YY-Nexus/YY-Y)
- **问题反馈**：[GitHub Issues](https://github.com/YY-Nexus/YY-Y/issues)
- **功能请求**：[GitHub Discussions](https://github.com/YY-Nexus/YY-Y/discussions)
- **邮箱联系**：support@yyc3.tech

---

<div align="center">
  <p>Made with ❤️ by YanYu Cloud³ Team</p>
  <p>© 2024 YanYu Cloud³ OS. All rights reserved.</p>
</div>
