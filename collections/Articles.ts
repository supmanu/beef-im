import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
    slug: 'articles',
    admin: {
        useAsTitle: 'title',
        group: 'Content',
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'category',
            type: 'select',
            options: [
                { label: 'Deep Dive', value: 'deep-dive' },
                { label: 'Quick Magnet', value: 'quick-magnet' },
                { label: 'News', value: 'news' },
                { label: 'Case Study', value: 'case-study' },
            ],
            required: true,
        },
        {
            name: 'excerpt',
            type: 'textarea',
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
    ],
}
