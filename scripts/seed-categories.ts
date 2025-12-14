import 'dotenv/config'; // Required for PAYLOAD_SECRET
import payload from 'payload';
import { CollectionSlug } from 'payload/dist/collections/config/types';

// The four core categories from the live site taxonomy
const categories = [
    { title: 'สุขภาพและอายุชีพ', slug: 'health' }, // Health
    { title: 'ความมั่งคั่ง', slug: 'wealth' },       // Wealth
    { title: 'มรดกและภาษี', slug: 'legacy' },     // Legacy
    { title: 'มุมมอง', slug: 'perspective' },     // Perspective
];

const seedCategories = async () => {
    try {
        console.log('--- Initializing Payload for Seeding ---');
        await payload.init({
            secret: process.env.PAYLOAD_SECRET as string,
            local: true, // Run in local mode for CLI script
        });

        const categoriesSlug: CollectionSlug = 'categories';

        console.log(`\n--- Starting Seed for ${categoriesSlug} ---`);
        for (const category of categories) {
            // 1. Check if the category already exists by slug
            const existing = await payload.find({
                collection: categoriesSlug,
                where: { slug: { equals: category.slug } },
                limit: 1,
            });

            if (existing.docs.length === 0) {
                // 2. Create the category if it does not exist
                await payload.create({
                    collection: categoriesSlug,
                    data: category,
                });
                console.log(`✅ Created: ${category.title} (${category.slug})`);
            } else {
                console.log(`ℹ️ Exists: ${category.title} (${category.slug}) - Skipping.`);
            }
        }

        console.log('\n--- Category Seeding Complete ---');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error during category seeding:', error);
        process.exit(1);
    }
};

seedCategories();
