import { computed, toValue } from 'vue'

const expandHexIfNeeded = (hex) => {
  return hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex
}

export const normalizeThemeColor = (value, fallback) => {
  if (!value) return fallback

  const trimmed = value.trim()
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
  const isHex = /^#([\da-fA-F]{3}|[\da-fA-F]{6})$/.test(withHash)
  const isColorFunction = /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(.+\)$/i.test(trimmed)
  const isNamedColor = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(trimmed)

  if (isHex) return expandHexIfNeeded(withHash)
  if (isColorFunction || isNamedColor) return trimmed
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('color', trimmed)) return trimmed

  return fallback
}

const buildPrimaryPalette = (primary) => ({
  50: `color-mix(in srgb, ${primary} 8%, white)`,
  100: `color-mix(in srgb, ${primary} 16%, white)`,
  200: `color-mix(in srgb, ${primary} 28%, white)`,
  300: `color-mix(in srgb, ${primary} 42%, white)`,
  400: `color-mix(in srgb, ${primary} 62%, white)`,
  500: primary,
  600: `color-mix(in srgb, ${primary} 82%, black)`,
  700: `color-mix(in srgb, ${primary} 72%, black)`,
  800: `color-mix(in srgb, ${primary} 62%, black)`,
  900: `color-mix(in srgb, ${primary} 52%, black)`,
  950: `color-mix(in srgb, ${primary} 40%, black)`
})

const buildBackgroundPalette = (bg, dark) => {
  const mixer = dark ? 'white' : 'black'
  return {
    '--ui-bg': bg,
    '--ui-bg-muted': `color-mix(in srgb, ${bg} 86%, ${mixer})`,
    '--ui-bg-elevated': `color-mix(in srgb, ${bg} 86%, ${mixer})`,
    '--ui-bg-accented': `color-mix(in srgb, ${bg} 72%, ${mixer})`,
    '--ui-border': `color-mix(in srgb, ${bg} 86%, ${mixer})`,
    '--ui-border-muted': `color-mix(in srgb, ${bg} 72%, ${mixer})`,
    '--ui-border-accented': `color-mix(in srgb, ${bg} 72%, ${mixer})`
  }
}

export const useCustomTheme = (options) => {
  const mode = computed(() => {
    const val = toValue(options.mode)
    if (val === 'dark') return 'dark'
    if (val === 'light') return 'light'
    return null
  })

  const isDark = computed(() => mode.value === null ? null : mode.value === 'dark')

  const primary = computed(() => normalizeThemeColor(toValue(options.primary), null))
  const background = computed(() => normalizeThemeColor(toValue(options.background), null))
  const primaryPalette = computed(() => primary.value ? buildPrimaryPalette(primary.value) : null)

  const themeStyles = computed(() => {
    const styles = {}

    if (isDark.value !== null) {
      styles.color = isDark.value ? '#ffffff' : '#0f172a'
    }

    if (primary.value && primaryPalette.value) {
      Object.assign(styles, {
        '--ui-color-primary-50': primaryPalette.value[50],
        '--ui-color-primary-100': primaryPalette.value[100],
        '--ui-color-primary-200': primaryPalette.value[200],
        '--ui-color-primary-300': primaryPalette.value[300],
        '--ui-color-primary-400': primaryPalette.value[400],
        '--ui-color-primary-500': primaryPalette.value[500],
        '--ui-color-primary-600': primaryPalette.value[600],
        '--ui-color-primary-700': primaryPalette.value[700],
        '--ui-color-primary-800': primaryPalette.value[800],
        '--ui-color-primary-900': primaryPalette.value[900],
        '--ui-color-primary-950': primaryPalette.value[950],
        '--ui-primary': primaryPalette.value[500]
      })
    }

    if (background.value !== null && isDark.value !== null) {
      Object.assign(styles, buildBackgroundPalette(background.value, isDark.value))
    }

    return styles
  })

  return { mode, isDark, primary, background, themeStyles }
}
