import type { Block, Field } from 'payload'

import type { CmsFieldSpec } from './cmsSpec'
import { validateMediaAltText } from './altText'

type BuildContext = {
  collectionSlug?: string
}

export const buildCmsFields = (
  fields: CmsFieldSpec[],
  blockRegistry: Record<string, Block>,
  context: BuildContext = {},
): Field[] => fields.map((field) => buildCmsField(field, blockRegistry, context)) as Field[]

const buildCmsField = (
  field: CmsFieldSpec,
  blockRegistry: Record<string, Block>,
  context: BuildContext,
): Field => {
  const nextField: Record<string, unknown> = { ...field }

  if (field.fields) {
    nextField.fields = buildCmsFields(field.fields, blockRegistry, context)
  }

  if (field.type === 'blocks') {
    nextField.blocks = (field.blocks || []).map((slug) => {
      const block = blockRegistry[slug]

      if (!block) {
        throw new Error(`Missing block definition for "${slug}"`)
      }

      return block
    })
  }

  if (context.collectionSlug === 'media' && field.name === 'alt' && field.type === 'text') {
    nextField.validate = validateMediaAltText
  }

  return nextField as Field
}
