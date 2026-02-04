<template>
  <div class="theme-layout">
    <header class="theme-header">
      <div class="logo">{{ siteConfig.logo.text }}<span>{{ siteConfig.logo.suffix }}</span></div>
      <nav class="nav-links">
        <a :href="siteConfig.github" target="_blank">{{ t.github }} ↗</a>
        <div class="lang-switch" @click="toggleLanguage">
            {{ language === 'zh-CN' ? 'EN' : '中' }}
        </div>
        <div class="theme-switch" @click="toggleTheme">
            {{ isDark ? '🌙' : '☀️' }}
        </div>
        <Search />
      </nav>
    </header>

    <!-- Landing Page Mode -->
    <LandingPage v-if="isHome" @start="startDocs" />

    <!-- Documentation Mode -->
    <div v-else class="theme-container">
      <aside class="theme-sidebar">
        <nav>
          <ul>
            <li v-for="item in menuItems" :key="item.path">
              <router-link :to="item.path" active-class="active">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main class="theme-main">
        <div class="markdown-body">
            <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import routes from 'virtual:routes'
import Search from './Search.vue'
import LandingPage from './LandingPage.vue'
import { useLanguage } from '../composables/useLanguage'
import { useTheme } from '../composables/useTheme'
import siteConfig from '../siteConfig'

const route = useRoute()
const router = useRouter()
const { t, language, toggleLanguage } = useLanguage()
const { isDark, toggleTheme } = useTheme()

const isHome = computed(() => route.path === '/')

const menuItems = computed(() => {
    const children = routes[0].children || []
    return children
        .filter(r => r.path)
        .map(r => ({
            path: r.path,
            name: (r.path === '/' ? 'Home' : r.path.substring(1).replace(/-/g, ' ')).toUpperCase()
        }))
        .filter(item => item.name !== 'HOME') // Hide Home from sidebar
        .sort((a, b) => a.name.localeCompare(b.name))
})

const startDocs = () => {
    // Navigate to the first available doc
    if (menuItems.value.length > 0) {
        router.push(menuItems.value[0].path)
    }
}
</script>

<style>
@import './main.css';
</style>
