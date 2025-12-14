import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
    slug: 'media', // <--- This MUST match relationTo: 'media'
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'feature',
                width: 1024,
                height: 576,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    access: {
        read: () => true, // Public read
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
};
