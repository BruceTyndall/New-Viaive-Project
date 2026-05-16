'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type BriefState = { success: boolean; error?: string } | null

export async function submitBrief(prev: BriefState, formData: FormData): Promise<BriefState> {
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'briefs',
      data: {
        intent: (formData.get('intent') as string) || undefined,
        desk: (formData.get('desk') as string) || undefined,
        name: (formData.get('name') as string) || undefined,
        email: (formData.get('email') as string) || undefined,
        phone: (formData.get('phone') as string) || undefined,
        dates: (formData.get('dates') as string) || undefined,
        budget: (formData.get('budget') as string) || undefined,
        notes: (formData.get('notes') as string) || undefined,
        source: (formData.get('source') as string) || 'web',
      },
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
