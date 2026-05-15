import type { Access, GlobalConfig } from 'payload'

export const editorialReviewStatuses = [
  'draft',
  'staging',
  'readyForReview',
  'approved',
  'live',
  'archived',
] as const

const publicEditorialStatuses = ['approved', 'live'] as const

export const authenticatedOnly: Access = ({ req }) => Boolean(req.user)

export const publicRead: Access = () => true

export const authenticatedOrApprovedRead: Access = ({ req }) => {
  if (req.user) {
    return true
  }

  return {
    reviewStatus: {
      in: [...publicEditorialStatuses],
    },
  }
}

export const globalAccess: NonNullable<GlobalConfig['access']> = {
  read: publicRead,
  update: authenticatedOnly,
}
