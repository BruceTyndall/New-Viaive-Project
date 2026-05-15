import type { Block, Field } from 'payload'

import { AtlasBlock } from '../payload/blocks/AtlasBlock'
import { BriefBlock } from '../payload/blocks/BriefBlock'
import { DesksBlock } from '../payload/blocks/DesksBlock'
import { EditorialBlock } from '../payload/blocks/EditorialBlock'
import { ProofBlock } from '../payload/blocks/ProofBlock'
import { StandardBlock } from '../payload/blocks/StandardBlock'

const text = (name: string, overrides: Record<string, unknown> = {}): Field =>
  ({
    name,
    type: 'text',
    ...overrides,
  }) as Field

const textarea = (name: string, overrides: Record<string, unknown> = {}): Field =>
  ({
    name,
    type: 'textarea',
    ...overrides,
  }) as Field

const upload = (
  name: string,
  relationTo = 'media',
  overrides: Record<string, unknown> = {},
): Field =>
  ({
    name,
    type: 'upload',
    relationTo,
    ...overrides,
  }) as Field

const relationship = (
  name: string,
  relationTo: string,
  overrides: Record<string, unknown> = {},
): Field =>
  ({
    name,
    type: 'relationship',
    relationTo,
    ...overrides,
  }) as Field

const group = (
  name: string,
  fields: Field[],
  overrides: Record<string, unknown> = {},
): Field =>
  ({
    name,
    type: 'group',
    fields,
    ...overrides,
  }) as Field

const array = (
  name: string,
  fields: Field[],
  overrides: Record<string, unknown> = {},
): Field =>
  ({
    name,
    type: 'array',
    fields,
    ...overrides,
  }) as Field

const heroBlock: Block = {
  slug: 'HeroBlock',
  fields: [
    text('eyebrow'),
    text('headline'),
    text('italicHeadline'),
    textarea('lede'),
    group('primaryCta', [text('label'), text('href')]),
    group('secondaryCta', [text('label'), text('href')]),
    upload('image'),
  ],
}

const trustBarBlock: Block = {
  slug: 'TrustBarBlock',
  fields: [array('items', [text('label'), upload('logo'), text('href')])],
}

const intentRouterBlock: Block = {
  slug: 'IntentRouterBlock',
  fields: [array('cards', [text('eyebrow'), text('title'), textarea('blurb'), text('href')])],
}

const destinationsRailBlock: Block = {
  slug: 'DestinationsRailBlock',
  fields: [
    text('title'),
    text('italicTitle'),
    text('eyebrow'),
    relationship('destinations', 'destinations', { hasMany: true }),
  ],
}

const destinationGuideBlock: Block = {
  slug: 'DestinationGuideBlock',
  fields: [relationship('destination', 'destinations')],
}

const stayModuleBlock: Block = {
  slug: 'StayModuleBlock',
  fields: [
    text('title'),
    textarea('lede'),
    text('defaultDestination'),
    textarea('disclosureText'),
  ],
}

const emailCaptureBlock: Block = {
  slug: 'EmailCaptureBlock',
  fields: [text('overrideTitle'), textarea('overrideLede')],
}

const faqBlock: Block = {
  slug: 'FAQBlock',
  fields: [text('title'), array('items', [text('question'), textarea('answer')])],
}

const layoutBlocks: Block[] = [
  DesksBlock,
  AtlasBlock,
  StandardBlock,
  EditorialBlock,
  ProofBlock,
]

export const pageBlocks: Block[] = [
  heroBlock,
  trustBarBlock,
  intentRouterBlock,
  ...layoutBlocks,
  destinationsRailBlock,
  destinationGuideBlock,
  stayModuleBlock,
  BriefBlock,
  emailCaptureBlock,
  faqBlock,
]

export const pageBlockRegistry = Object.fromEntries(
  pageBlocks.map((block) => [block.slug, block]),
) as Record<string, Block>
