import type { Block } from 'payload'

export const BriefBlock: Block = {
  slug: 'BriefBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'lede',
      type: 'textarea',
    },
    {
      name: 'fields',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description:
              'Field key, camelCase. E.g. fullName, email, dates, partySize, budget, notes',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: ['text', 'email', 'tel', 'textarea', 'select', 'date', 'number', 'checkbox'],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'helpText',
          type: 'text',
        },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (_: unknown, sibling: { type?: string } | undefined) =>
              sibling?.type === 'select',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'value',
              type: 'text',
            },
          ],
        },
        {
          name: 'autocomplete',
          type: 'text',
          admin: {
            description: 'HTML autocomplete attr: name, email, tel, etc.',
          },
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
    },
  ],
}
