import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = '/og-image-default.jpg', 
  type = 'website' 
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to efficiently update or create meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      // Remove existing tag to prevent duplicates (simple cleanup)
      const existingSelector = `meta[${attribute}="${name}"]`;
      const existingTag = document.querySelector(existingSelector);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // 3. Update Standard Meta
    updateMeta('description', description);
    
    // 4. Update Open Graph
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:type', type, 'property');
    
    // 5. Update Twitter Card
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', title, 'name');
    updateMeta('twitter:description', description, 'name');
    updateMeta('twitter:image', image, 'name');

  }, [title, description, image, type]);

  return null;
};

export default SEO;