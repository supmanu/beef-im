import { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'title',
        description: 'Taxonomy for organizing content modes and topics.',
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
        },
    ],
};
