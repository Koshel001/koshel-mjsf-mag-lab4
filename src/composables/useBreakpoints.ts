import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { useEventListener } from './useEventListener'

export interface Breakpoints {
  mobile: number
  tablet: number
  desktop: number
  [key: string]: number
}

interface UseBreakpointsReturn {
  width: Ref<number>
  isMobile: ComputedRef<boolean>
  isTablet: ComputedRef<boolean>
  isDesktop: ComputedRef<boolean>
  greater: (name: keyof Breakpoints) => ComputedRef<boolean>
  smaller: (name: keyof Breakpoints) => ComputedRef<boolean>
  between: (min: keyof Breakpoints, max: keyof Breakpoints) => ComputedRef<boolean>
}

const defaultBreakpoints: Breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440
}

export function useBreakpoints(
  customBreakpoints?: Partial<Breakpoints>
): UseBreakpointsReturn {
  const breakpoints: Breakpoints = {
    ...defaultBreakpoints,
    ...customBreakpoints
  }

  const width = ref(window.innerWidth)

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  useEventListener(window, 'resize', updateWidth)

  const isMobile = computed(() => width.value < breakpoints.mobile)
  
  const isTablet = computed(
    () => width.value >= breakpoints.mobile && width.value < breakpoints.tablet
  )
  
  const isDesktop = computed(() => width.value >= breakpoints.desktop)

  const greater = (name: keyof Breakpoints): ComputedRef<boolean> => {
    return computed(() => width.value >= breakpoints[name])
  }

  const smaller = (name: keyof Breakpoints): ComputedRef<boolean> => {
    return computed(() => width.value < breakpoints[name])
  }

  const between = (
    min: keyof Breakpoints,
    max: keyof Breakpoints
  ): ComputedRef<boolean> => {
    return computed(
      () => width.value >= breakpoints[min] && width.value < breakpoints[max]
    )
  }

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    greater,
    smaller,
    between
  }
}
