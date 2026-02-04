<template>
  <div class="landing-wrapper">
    <div class="bg-text">WRITE</div>
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title" style="white-space: pre-line">
            <span class="highlight">{{ titleFirstLine }}</span><br>
            {{ titleSecondLine }}
        </h1>
        <p class="hero-subtitle">{{ subtitle }}</p>
        <div class="actions">
          <a @click="$emit('start')" class="cta-button">{{ ctaText }}</a>
          <span class="version-tag">{{ versionText }}</span>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-frame">
          <div class="placeholder-graphic"></div>
          <div class="sticker">
            <span>&lt;/&gt;</span>
            NO_JUNK_CODE
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { t, language } = useLanguage()

const titleFirstLine = computed(() => {
    return language.value === 'zh-CN' ? '拒绝' : 'NO MORE'
})

const titleSecondLine = computed(() => {
    return language.value === 'zh-CN' ? '平庸文档。' : 'BORING DOCS.'
})

const subtitle = computed(() => {
    return language.value === 'zh-CN' ? '写个文档而已，别搞得像填税单。' : 'Writing docs shouldn\'t feel like filing taxes.'
})

const ctaText = computed(() => {
    return language.value === 'zh-CN' ? '开始胡搞' : 'START MESSING AROUND'
})

const versionText = computed(() => {
    return language.value === 'zh-CN' ? '-> v1.0.0 已发布' : '-> v1.0.0 RELEASED'
})

defineEmits(['start'])
</script>

<style scoped>
.landing-wrapper {
  position: relative;
  min-height: calc(100vh - 80px); /* Adjust based on header height */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--landing-bg, #111);
  color: var(--landing-text, #fff);
  padding: 2rem;
}

.bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25vw;
  font-weight: 900;
  color: var(--landing-watermark, rgba(255, 255, 255, 0.03));
  pointer-events: none;
  z-index: 0;
  line-height: 1;
  white-space: nowrap;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
}

.hero-text {
  flex: 1;
  min-width: 300px;
}

.hero-title {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.highlight {
  color: var(--landing-accent, #ccff00);
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--landing-secondary, #888);
  margin-bottom: 3rem;
  max-width: 600px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cta-button {
  background: var(--landing-accent, #ccff00);
  color: var(--landing-accent-text, #000);
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
  display: inline-block;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.version-tag {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--landing-secondary, #666);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.image-frame {
  width: 400px;
  height: 400px;
  position: relative;
  border: 1px solid var(--landing-border, #333);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-graphic {
    width: 100%;
    height: 100%;
    background: 
        linear-gradient(45deg, transparent 48%, var(--landing-border, #333) 49%, var(--landing-border, #333) 51%, transparent 52%),
        linear-gradient(-45deg, transparent 48%, var(--landing-border, #333) 49%, var(--landing-border, #333) 51%, transparent 52%);
    background-size: 20px 20px;
    opacity: 0.3;
}

.sticker {
  position: absolute;
  bottom: -20px;
  left: -20px;
  background: var(--sticker-bg);
  border: 1px solid var(--sticker-border);
  padding: 1rem;
  color: var(--sticker-text);
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 10px 30px var(--sticker-shadow);
}

.sticker span {
  color: var(--landing-accent, #ccff00);
  font-weight: bold;
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 960px) {
  .hero-content {
    flex-direction: column;
    text-align: left;
    gap: 3rem;
  }

  .hero-image {
    justify-content: center;
    width: 100%;
  }
  
  .image-frame {
    width: 100%;
    max-width: 400px;
    height: 300px;
  }

  .hero-title {
    font-size: 3.5rem;
  }
  
  .bg-text {
      font-size: 20vw;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .cta-button {
    width: 100%;
    text-align: center;
  }
  
  .actions {
      flex-direction: column;
      align-items: flex-start;
  }
  
  .landing-wrapper {
      padding: 1rem;
  }
}
</style>