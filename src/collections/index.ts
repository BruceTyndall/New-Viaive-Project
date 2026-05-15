import type { CollectionConfig } from 'payload'

import {
  authenticatedOnly,
  authenticatedOrApprovedRead,
  publicRead,
} from '../access/payloadAccess'
import { pageBlockRegistry } from '../blocks'
import { buildCmsFields } from '../fields/buildCmsFields'
import { cmsSpec } from '../fields/cmsSpec'

const collectionOrder = [
  'pages',
  'destinations',
  'desks',
  'regions',
  'bestOf',
  'compares',
  'posts',
  'legal',
  'briefs',
  'media',
] as const

const editorialCollectionSlugs = new Set([
  'pages',
  'destinations',
  'desks',
  'bestOf',
  'compares',
  'posts',
])

const getCollectionAccess = (slug: string): CollectionConfig['access'] => {
  if (editorialCollectionSlugs.has(slug)) {
    return {
      read: authenticatedOrApprovedRead,
      create: authenticatedOnly,
      update: authenticatedOnly,
      delete: authenticatedOnly,
    }
  }

  if (slug === 'briefs') {
    return {
      read: authenticatedOnly,
      create: publicRead,
      update: authenticatedOnly,
      delete: authenticatedOnly,
    }
  }

  return {
    read: publicRead,
    create: authenticatedOnly,
    update: authenticatedOnly,
    delete: authenticatedOnly,
  }
}

export const collections: CollectionConfig[] = collectionOrder.map((slug) => {
  const spec = cmsSpec.collections[slug]

  if (!spec) {
    throw new Error(`Missing collection spec for "${slug}"`)
  }

  const collection: CollectionConfig = {
    slug,
    access: getCollectionAccess(slug),
    fields: buildCmsFields(spec.fields, pageBlockRegistry, {
      collectionSlug: slug,
    }),
  }

  if ('auth' in spec) {
    collection.auth = spec.auth
  }

  if (spec.admin) {
    collection.admin = spec.admin
  }

  if (spec.upload) {
    collection.upload = {
      staticDir: spec.upload.staticDir,
    }
  }

  return collection
})
