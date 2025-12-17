import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
    slug: 'media', // <--- This MUST match relationTo: 'media'
    upload: {

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
    hooks: {
        afterRead: [
            ({ doc }) => {
                // Check both possible variable names for safety
                const publicUrl = process.env.PAYLOAD_PUBLIC_R2_URL || process.env.R2_PUBLIC_URL;

                if (publicUrl && doc.filename) {
                    // Update main URL with bucket prefix
                    doc.url = `${publicUrl}/nwn-assets/${doc.filename}`;

                    if (doc.sizes) {
                        Object.keys(doc.sizes).forEach((size) => {
                            if (doc.sizes[size] && doc.sizes[size].filename) {
                                // Update size URLs with bucket prefix
                                doc.sizes[size].url = `${publicUrl}/nwn-assets/${doc.sizes[size].filename}`;
                            }
                        });
                    }
                }
                return doc;
            }
        ]
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
