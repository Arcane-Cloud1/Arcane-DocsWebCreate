# Arcane Docs

<div align="center">

![Arcane Logo](/src/img/logo.png)

**Anti-Template Documentation Generator**

**English** | [中文](./README_zh.md)

</div>

---

**Arcane Docs** is a static documentation site generator built with **Node.js**, **Vite**, and **Vue 3**. It rejects the boring, cookie-cutter designs of traditional documentation sites, offering a bold, high-contrast, and minimalist aesthetic.

### ✨ Features

- **Anti-Template Design**: Unique visual style with "Landing Page" and "Documentation Mode".
- **Dual Theme**: Built-in Dark 🌙 and Light ☀️ modes with persistent user preference.
- **Instant Search**: Client-side full-text search powered by Fuse.js.
- **Internationalization**: Built-in support for English and Chinese interface switching.
- **Markdown Centric**: Just write Markdown files, and the routing is generated automatically.
- **Blazing Fast**: Powered by Vite for instant HMR and optimized production builds.

### 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   This will start the local server (usually at `http://localhost:5173`).

3. **Build for Production**
   ```bash
   npm run build
   ```
   The static site will be generated in the `dist` directory.

### ⚙️ Configuration

You can configure the site settings in `src/client/siteConfig.js`:

```javascript
export default {
  title: 'Arcane',
  logo: {
    text: 'Arcane',
    suffix: '.'
  },
  github: 'https://github.com/your-repo',
  // ...
}
```

---

## 📄 License

ISC
