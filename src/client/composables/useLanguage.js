import { ref, computed } from 'vue'
import siteConfig from '../siteConfig'

const language = ref('zh-CN')

export function useLanguage() {
  const toggleLanguage = () => {
    language.value = language.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }

  const t = computed(() => {
    return language.value === 'zh-CN' ? {
      // Common
      search: '搜索',
      searchPlaceholder: '输入关键词搜索...',
      noResults: '未找到相关内容',
      github: 'GITHUB 仓库',
      
      // Layout Dark
      darkHeroTitle: '拒绝\n平庸文档。',
      darkHeroSubtitle: '写个文档而已，别搞得像填税单。',
      darkCta: '开始胡搞',
      darkVersion: '-> v1.0.0 已发布',
      
      // Layout Light
      lightHeroTitle: '纯粹\n文档。',
      lightHeroSubtitle: '回归阅读本质，没有多余的干扰。',
      lightCta: '开始阅读',
      lightSource: '查看源码 ->',
      lightFooterBuild: `${siteConfig.title} 构建`,
      lightFooterDesign: '反模板设计'
    } : {
      // Common
      search: 'SEARCH',
      searchPlaceholder: 'TYPE TO SEARCH...',
      noResults: 'NO MATCHES FOUND',
      github: 'GITHUB REPO',

      // Layout Dark
      darkHeroTitle: 'NO MORE\nBORING DOCS.',
      darkHeroSubtitle: 'Writing docs shouldn\'t feel like filing taxes.',
      darkCta: 'START MESSING AROUND',
      darkVersion: '-> v1.0.0 RELEASED',

      // Layout Light
      lightHeroTitle: 'PURE\nDOCS.',
      lightHeroSubtitle: 'Back to the essence of reading. No distractions.',
      lightCta: 'START READING',
      lightSource: 'VIEW SOURCE ->',
      lightFooterBuild: `BUILT BY ${siteConfig.title.toUpperCase()}`,
      lightFooterDesign: 'ANTI-TEMPLATE DESIGN'
    }
  })

  return {
    language,
    toggleLanguage,
    t
  }
}
