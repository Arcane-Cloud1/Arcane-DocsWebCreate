<template>
  <div class="search-container">
    <div class="search-trigger" @click="isOpen = true">
      {{ t.search }}
    </div>

    <div v-if="isOpen" class="search-overlay" @click.self="isOpen = false">
      <div class="search-modal">
        <input 
          ref="searchInput"
          v-model="query" 
          type="text" 
          :placeholder="t.searchPlaceholder"
          @keydown.esc="isOpen = false"
        >
        <div class="search-results" v-if="results.length">
            <div 
                v-for="(result, index) in results" 
                :key="index"
                class="search-item"
                @click="navigate(result.item.path)"
            >
                <div class="result-title">{{ result.item.title }}</div>
                <div class="result-path">{{ result.item.path }}</div>
            </div>
        </div>
        <div v-else-if="query" class="no-results">
            {{ t.noResults }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import searchIndex from 'virtual:search-index'
import { useLanguage } from '../composables/useLanguage'

const router = useRouter()
const { t } = useLanguage()
const isOpen = ref(false)
const query = ref('')
const searchInput = ref(null)

const fuse = new Fuse(searchIndex, {
  keys: ['title', 'content'],
  threshold: 0.3,
  ignoreLocation: true
})

const results = computed(() => {
  if (!query.value) return []
  return fuse.search(query.value).slice(0, 5)
})

const navigate = (path) => {
    isOpen.value = false
    router.push(path)
    query.value = ''
}

watch(isOpen, async (val) => {
    if (val) {
        await nextTick()
        searchInput.value.focus()
    }
})
</script>

<style scoped>
.search-container {
    display: inline-block;
}

.search-trigger {
    padding: 0 1rem;
    font-weight: 600;
    cursor: pointer;
    color: #888;
    text-transform: uppercase;
    font-size: 0.9rem;
    display: inline-block;
    transition: color 0.3s;
}

.search-trigger:hover {
    color: var(--accent-color);
}

.search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--overlay-bg);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
}

.search-modal {
    width: 600px;
    max-width: 90%;
    background: var(--bg-color);
    border: var(--border-width) solid var(--border-color);
    box-shadow: var(--shadow-offset) var(--shadow-offset) 0px var(--shadow-color);
    padding: 1rem;
}

input {
    width: 100%;
    border: var(--border-width) solid var(--border-color);
    background: var(--bg-color);
    color: var(--text-color);
    padding: 1rem;
    font-family: var(--font-code);
    font-size: 1.5rem;
    font-weight: bold;
    outline: none;
    box-sizing: border-box;
    text-transform: uppercase;
}

input:focus {
    background: var(--text-color);
    color: var(--bg-color);
}

.search-results {
    margin-top: 1rem;
    max-height: 400px;
    overflow-y: auto;
}

.search-item {
    padding: 1rem;
    border: var(--border-width) solid var(--border-color);
    margin-bottom: 0.5rem;
    cursor: pointer;
    background: var(--bg-color);
    color: var(--text-color);
    transition: transform 0.1s;
}

.search-item:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0px var(--border-color);
    background: var(--accent-color);
    color: var(--accent-text);
}

.result-title {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.2rem;
}

.result-path {
    font-family: var(--font-code);
    font-size: 0.8rem;
    opacity: 0.7;
}

.no-results {
    padding: 1rem;
    text-align: center;
    font-weight: bold;
    color: var(--accent-color);
    text-transform: uppercase;
}
</style>