import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: Window | HTMLElement,
  event: string,
  callback: EventListener
) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
