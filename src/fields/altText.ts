const SHORT_MARKETING_ALT_RE = /(^|\s)(stunning|iconic|world[- ]class)(\s|$)/

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ')

export const validateMediaAltText = (value: string | null | undefined) => {
  const normalized = normalize(value || '')

  if (!normalized) {
    return 'Alt text is required.'
  }

  if (normalized === 'stunning luxury hotel') {
    return 'Alt text must describe the image specifically, not use generic marketing copy.'
  }

  if (normalized.split(' ').length <= 5 && SHORT_MARKETING_ALT_RE.test(normalized)) {
    return 'Alt text must describe the image specifically, not use generic marketing copy.'
  }

  return true
}
