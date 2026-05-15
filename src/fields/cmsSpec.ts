import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export type CmsFieldSpec = {
  name: string
  type: string
  admin?: Record<string, unknown>
  blocks?: string[]
  defaultValue?: unknown
  fields?: CmsFieldSpec[]
  hasMany?: boolean
  maxRows?: number
  minRows?: number
  options?: string[]
  relationTo?: string
  required?: boolean
  unique?: boolean
}

type CmsCollectionSpec = {
  admin?: Record<string, unknown>
  auth?: boolean
  fields: CmsFieldSpec[]
  upload?: {
    adapter?: string
    staticDir: string
  }
}

type CmsGlobalSpec = {
  fields: CmsFieldSpec[]
}

type CmsSharedBlockSpec =
  | string[]
  | {
      fields: CmsFieldSpec[]
    }

export type CmsSpec = {
  $schema: string
  collections: Record<string, CmsCollectionSpec>
  globals: Record<string, CmsGlobalSpec>
  sharedBlocks: Record<string, CmsSharedBlockSpec>
  updated: string
  version: string
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const cmsSpecPath = path.resolve(dirname, '../../docs/figma/source/docs/cms-fields.json')

export const cmsSpec = JSON.parse(fs.readFileSync(cmsSpecPath, 'utf8')) as CmsSpec
