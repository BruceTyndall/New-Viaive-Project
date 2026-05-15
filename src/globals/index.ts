import type { GlobalConfig } from 'payload'

import { globalAccess } from '../access/payloadAccess'
import { pageBlockRegistry } from '../blocks'
import { buildCmsFields } from '../fields/buildCmsFields'
import { cmsSpec } from '../fields/cmsSpec'

const globalOrder = [
  'navigation',
  'footer',
  'viaiveStandard',
  'proof',
  'newsletter',
  'novaExitIntent',
] as const

export const globals: GlobalConfig[] = globalOrder.map((slug) => {
  const spec = cmsSpec.globals[slug]

  if (!spec) {
    throw new Error(`Missing global spec for "${slug}"`)
  }

  return {
    slug,
    access: globalAccess,
    fields: buildCmsFields(spec.fields, pageBlockRegistry),
  } satisfies GlobalConfig
})
