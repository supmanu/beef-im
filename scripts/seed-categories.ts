// scripts/seed-categories.ts
// Standalone script to seed the four core categories into Payload CMS
// Run with: npx tsx scripts/seed-categories.ts

import { getPayload } from 'payload';
import config from '../payload-config/payload.config';

// Core categories from live site (Hygraph)
const categories = [
    {
        title: 'สุขภาพและอายุชีพ',
        slug: 'health',
    },
    {
        title: 'ความมั่งคั่ง',
        slug: 'wealth',
    },
    {
        title: 'มรดกและภาษี',
        slug: 'legacy',
    },
    {
        title: 'มุมมอง',
        slug: 'perspective',
    },
];

async function seedCategories() {
    console.log('🌱 Starting category seeding...');

    try {
        // Initialize Payload
        const payload = await getPayload({ config });
        console.log('✅ Payload initialized');

        // Seed each category
        for (const category of categories) {
            try {
                // Check if category already exists
                const existing = await payload.find({
                    collection: 'categories',
                    where: {
                        slug: {
                            equals: category.slug,
                        },
                    },
                });

                if (existing.docs.length > 0) {
                    console.log(`⏭️  Category "${category.title}" (${category.slug}) already exists, skipping...`);
                    continue;
                }

                // Create the category
                const result = await payload.create({
                    collection: 'categories',
                    data: category,
                });

                console.log(`✅ Created category: "${category.title}" (${category.slug})`);
            } catch (error) {
                console.error(`❌ Failed to create category "${category.title}":`, error);
            }
        }

        console.log('\n🎉 Category seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

// Execute the seeding
seedCategories();
