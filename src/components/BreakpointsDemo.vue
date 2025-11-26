<script setup lang="ts">
import { useBreakpoints } from "@/composables/useBreakpoints"

const { width, isMobile, isTablet, isDesktop, greater, smaller, between } = useBreakpoints({
  mobile: 640,
  tablet: 960,
  desktop: 1280
})
</script>

<template>
  <div class="p-4">
    <p>📏 Ширина вікна: {{ width }}px</p>
    <p v-if="isMobile">📱 Мобільний</p>
    <p v-else-if="isTablet">📟 Планшет</p>
    <p v-else-if="isDesktop">🖥 Десктоп</p>
    
    <hr class="my-4" />
    
    <p>greater("tablet") → {{ greater("tablet") }}</p>
    <p>smaller("desktop") → {{ smaller("desktop") }}</p>
    <p>between("mobile", "desktop") → {{ between("mobile", "desktop") }}</p>
  </div>
</template>

<style scoped>
.p-4 {
  padding: 1rem;
}

.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
}

p {
  margin: 0.5rem 0;
}
</style>
