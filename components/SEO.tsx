import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website'
}: SEOProps) {

  // 🟢 DEFAULTS (Your "Global" Fallbacks)
  const defaultTitle = "Nerd with Nart (เนิร์ดกับนาถ) | Financial Strategy";
  const defaultDescription = "Data. Logic. Legacy. เจาะลึกกลไกการเงินและประกันด้วยตรรกะ ไม่ใช่การขายฝัน";

  // 👇 Defaulting to your Profile Avatar if no article image is provided
  const defaultImage = "https://assets.nerdwithnart.com/nwn-assets/og-background.jpg";

  const siteUrl = "https://nerdwithnart.com";

  // 🔵 LOGIC: Use prop if available, otherwise default
  const metaTitle = title ? `${title} | Nerd with Nart` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Facebook / LINE / LinkedIn (Open Graph) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content="Nerd with Nart" />

      {/* Twitter Cards (X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}