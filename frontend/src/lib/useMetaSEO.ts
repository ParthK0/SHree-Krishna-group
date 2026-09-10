import { useEffect } from 'react';

interface MetaSEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: string;
  structuredData?: object;
}

/**
 * Dynamically updates document title, canonical link, open graph tags,
 * and optional JSON-LD structured data for any React page component.
 */
export function useMetaSEO({
  title,
  description,
  canonicalPath = '',
  ogImage,
  type = 'website',
  structuredData,
}: MetaSEOProps) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, val: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', val);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    const fullCanonical = `https://www.shree-krishna-transport.org${
      canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : ''
    }`;
    setMeta('property', 'og:url', fullCanonical);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonical);

    if (ogImage) {
      const fullImg = ogImage.startsWith('http')
        ? ogImage
        : `https://www.shree-krishna-transport.org${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
      setMeta('property', 'og:image', fullImg);
      setMeta('name', 'twitter:image', fullImg);
    }

    let scriptTag: HTMLScriptElement | null = null;
    if (structuredData) {
      const scriptId = `seo-schema-${canonicalPath.replace(/[^a-zA-Z0-9_-]/g, '-') || 'page'}`;
      scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    return () => {
      document.title = originalTitle;
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [title, description, canonicalPath, ogImage, type, structuredData]);
}
