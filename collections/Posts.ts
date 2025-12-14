import { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'mode', 'status', 'publishedAt'],
    },
    access: {
        read: () => true, // Public read
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
            index: true,
            admin: {
                position: 'sidebar',
                description: 'URL-friendly name (e.g. system-reboot-protocol)',
            },
        },
        {
            name: 'mode',
            type: 'select',
            options: [
                { label: 'Quick Magnet (S)', value: 'S' },
                { label: 'Deep Dive (A)', value: 'A' },
                { label: 'Kane Edition (B)', value: 'B' },
                { label: 'Flagship (C)', value: 'C' },
            ],
            defaultValue: 'A',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            defaultValue: 'draft',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'heroImage',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'excerpt',
            type: 'textarea',
            label: 'Hook / Excerpt',
            admin: {
                description: 'Tweet-length intro for social cards (Grid View)',
            },
        },
        {
            name: 'content',
            type: 'richText', // <--- CRITICAL CHANGE
            required: true,
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
