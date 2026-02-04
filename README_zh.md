# Arcane Docs

<div align="center">

![Arcane Logo](./src/img/logo.png)

**反模板主义文档生成器**

[English](./README.md) | **中文**

</div>

---

**Arcane Docs** 是一个基于 **Node.js**、**Vite** 和 **Vue 3** 构建的静态文档站点生成器。它拒绝传统文档网站千篇一律的乏味设计，提供了一种大胆、高对比度且极简的视觉美学。

### ✨ 特性

- **反模板设计**：独特的视觉风格，拥有独立的“着陆页”和“文档模式”。
- **双色主题**：内置深色 🌙 和亮色 ☀️ 模式，自动保存用户偏好。
- **即时搜索**：基于 Fuse.js 的客户端全文搜索。
- **国际化支持**：内置中英文界面切换功能。
- **Markdown 为中心**：只需编写 Markdown 文件，路由自动生成。
- **极速体验**：由 Vite 驱动，提供秒级 HMR 和优化的生产构建。

### 🚀 快速开始

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```
   这将启动本地服务器（通常在 `http://localhost:5173`）。

3. **构建生产版本**
   ```bash
   npm run build
   ```
   静态网站将生成在 `dist` 目录下。

### ⚙️ 配置

你可以在 `src/client/siteConfig.js` 中修改站点配置：

```javascript
export default {
  title: 'Arcane', // 网站标题
  logo: {
    text: 'Arcane', // Logo 文本
    suffix: '.'     // Logo 后缀
  },
  github: 'https://github.com/your-repo', // GitHub 仓库链接
  // ...
}
```

---

## 📄 License

ISC
