import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  slug?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

export default function SEO({
  title,
  description,
  // TODO: Replace this default image with a real URL from your Hygraph assets later
  image = 'https://media.graphassets.com/YOUR_DEFAULT_IMAGE_ID',
  slug = '',
  type = 'website',
  publishedTime,
  author = 'Nerd with Nart'
}: SEOProps) {

  const siteUrl = 'https://nerdwithnart.com';
  const fullUrl = `${siteUrl}${slug}`;
  const fullTitle = `${title} | Nerd with Nart`;

  // GEO SIGNAL: JSON-LD Structured Data for AI Authority
  const structuredData = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": [image],
    "datePublished": publishedTime,
    "author": [{
      "@type": "Person",
      "name": author,
      "url": siteUrl
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Nerd with Nart",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "description": description
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "Nerd with Nart",
    "description": description
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook / Line */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* GEO / AI Signal */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}