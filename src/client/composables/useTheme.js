import { ref, watch, onMounted } from 'vue'

const isDark = ref(true) // Default to dark

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  const updateTheme = () => {
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  onMounted(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Default to dark as per project preference, or check system
      // isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = true
    }
    updateTheme()
  })

  return {
    isDark,
    toggleTheme
  }
}
