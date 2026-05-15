export const serviceDesksSeed = {
  hotel: {
    title: 'Hotel Advisory Desk',
    slug: 'hotel',
    deskType: 'hotel',
    dek: 'The room, rate, upgrade, view, and arrival sequence matter more than the booking engine.',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1800',
    proofPoints: ['Preferred partner context', 'Room-category clarity', 'Stay22-ready placement'],
  },
  family: {
    title: 'Family & Legacy Desk',
    slug: 'family',
    deskType: 'family',
    dek: 'Multi-generation travel requires rhythm, care, privacy, and enough structure to protect the magic.',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1800',
    proofPoints: ['Multi-gen pacing', 'Villa and connecting-room logic', 'Private guide fit'],
  },
  safari: {
    title: 'Safari Desk',
    slug: 'safari',
    deskType: 'safari',
    dek: 'Safari decisions are seasonal, logistical, ethical, and personal. The wrong camp is an expensive lesson.',
    imageUrl:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1800',
    proofPoints: ['Season and migration fit', 'Camp and guide standards', 'Aircraft and transfer design'],
  },
  asia: {
    title: 'Asia Intelligence Desk',
    slug: 'asia',
    deskType: 'asia',
    dek: 'Asia planning rewards precision: hotel neighborhood, transfer timing, weather windows, and service culture.',
    imageUrl:
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1800',
    proofPoints: ['Tokyo and Thailand sequencing', 'Hotel neighborhood matching', 'Private transfer context'],
  },
} as const

export type ServiceDeskSlug = keyof typeof serviceDesksSeed
