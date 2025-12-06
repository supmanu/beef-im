import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description = "Essential instruments derived from the central logic core.",
  image = "https://nerdwithnart.com/default-og-image.jpg", // We need a default image later
  url = window.location.href
}: SEOProps) {

  const siteTitle = "Nerd with Nart | Data. Logic. Legacy.";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{`${title} | Nerd with Nart`}</title>
      <meta name="description" content={description} />

      {/* Facebook / Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}