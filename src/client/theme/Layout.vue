<template>
  <div class="noai-layout">
    <header class="noai-header">
      <div class="logo">{{ siteConfig.logo.text }} Docs</div>
      <div class="header-right">
        <div class="lang-switch" @click="toggleLanguage">
            {{ language === 'zh-CN' ? 'EN' : '中' }}
        </div>
        <Search />
      </div>
    </header>
    
    <!-- Landing Page Mode -->
    <LandingPage v-if="isHome" @start="startDocs" />

    <!-- Documentation Mode -->
    <div v-else class="noai-container">
      <aside class="noai-sidebar">
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
      
      <main class="noai-main">
        <div class="content-wrapper">
            <router-view />
        </div>
      </main>
    </div>

    <footer class="noai-footer">
      <span>{{ t.lightFooterBuild }}</span>
      <span>{{ t.lightFooterDesign }}</span>
    </footer>
  </div>
</template>

<script setup>
import routes from 'virtual:routes'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Search from './Search.vue'
import LandingPage from './LandingPage.vue'
import { useLanguage } from '../composables/useLanguage'
import siteConfig from '../siteConfig'

const route = useRoute()
const router = useRouter()
const { t, language, toggleLanguage } = useLanguage()

const isHome = computed(() => route.path === '/')

const menuItems = computed(() => {
    const children = routes[0].children || []
    return children
        .filter(r => r.path)
        .map(r => ({
            path: r.path,
            name: (r.path === '/' ? '首页' : r.path.substring(1).replace(/-/g, ' ')).toUpperCase()
        }))
        .filter(item => item.name !== '首页')
        .sort((a, b) => a.name.localeCompare(b.name))
})

const startDocs = () => {
    if (menuItems.value.length > 0) {
        router.push(menuItems.value[0].path)
    }
}
</script>

<style scoped>
@import './styles.css';

.header-right {
    display: flex;
    align-items: center;
}

.lang-switch {
    cursor: pointer;
    font-weight: bold;
    padding: 0 1rem;
    color: #888;
    transition: color 0.3s;
}

.lang-switch:hover {
    color: #000;
}
</style>
