import { useEffect } from 'react';
import type { RouteConfig } from '../types/route.types';

interface PageSEOProps {
  route?: RouteConfig | null;
}

/**
 * Dynamically injects SEO Meta tags, Canonical URL, Open Graph,
 * and JSON-LD Structured Data (LogisticsService, BreadcrumbList, FAQPage)
 * into document.head for maximum Google ranking.
 */
export function usePageSEO({ route }: PageSEOProps) {
  useEffect(() => {
    if (!route) return;

    // 1. Update Document Title
    const originalTitle = document.title;
    document.title = route.seoTitle;

    // Helper to safely set or create meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
      return element;
    };

    // Helper to set or create canonical link
    const setCanonicalLink = (url: string) => {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    };

    // 2. Set Standard Meta Tags
    setMetaTag('name', 'description', route.metaDescription);
    if (route.keywords && route.keywords.length > 0) {
      setMetaTag('name', 'keywords', route.keywords.join(', '));
    }

    // 3. Set Canonical URL
    const canonicalHref = route.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
    setCanonicalLink(canonicalHref);

    // 4. Set Open Graph (Facebook / LinkedIn / WhatsApp rich preview)
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', route.ogTitle || route.seoTitle);
    setMetaTag('property', 'og:description', route.ogDescription || route.metaDescription);
    setMetaTag('property', 'og:url', canonicalHref);
    if (route.ogImage) {
      const fullImageUrl = route.ogImage.startsWith('http')
        ? route.ogImage
        : `${window.location.origin}${route.ogImage}`;
      setMetaTag('property', 'og:image', fullImageUrl);
    }

    // 5. Inject JSON-LD Structured Data
    const scriptId = `seo-schema-route-${route.slug}`;
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://www.shree-krishna-transport.org';

    // Build structured schema graph
    const schemaGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        // 5A. LocalBusiness / LogisticsService
        {
          '@type': 'LocalBusiness',
          '@id': `${currentOrigin}/#organization`,
          name: 'Shree Krishna Group Transportation',
          url: currentOrigin,
          telephone: '+919784800833',
          email: 'deepesh3052@gmail.com',
          priceRange: '₹₹',
          image: `${currentOrigin}/images/logo.png`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jaipur',
            addressRegion: 'Rajasthan',
            addressCountry: 'IN',
          },
          areaServed: [
            {
              '@type': 'City',
              name: route.fromCity,
            },
            {
              '@type': 'City',
              name: route.toCity,
            },
            {
              '@type': 'Country',
              name: 'India',
            },
          ],
        },
        // 5B. Service Specific Schema
        {
          '@type': 'Service',
          '@id': `${currentOrigin}/${route.slug}/#service`,
          name: route.h1,
          serviceType: 'Freight and Logistics Transportation',
          description: route.metaDescription,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Shree Krishna Group Transportation',
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: `${route.fromCity} to ${route.toCity} Freight Corridor`,
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${route.fromCity} to ${route.toCity} Truck Booking Services`,
            itemListElement: route.priceEstimates.map((item, index) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `${item.truckName} Transport`,
                description: `${item.capacity} capacity - Ideal for ${item.idealFor}`,
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'INR',
                price: item.priceRange,
              },
              position: index + 1,
            })),
          },
        },
        // 5C. BreadcrumbList Schema
        {
          '@type': 'BreadcrumbList',
          '@id': `${currentOrigin}/${route.slug}/#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: currentOrigin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Routes',
              item: `${currentOrigin}/routes`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: `${route.fromCity} to ${route.toCity}`,
              item: `${currentOrigin}/${route.slug}`,
            },
          ],
        },
        // 5D. FAQPage Schema (Allows Google to display FAQ accordions in SERP!)
        ...(route.faqItems && route.faqItems.length > 0
          ? [
              {
                '@type': 'FAQPage',
                '@id': `${currentOrigin}/${route.slug}/#faq`,
                mainEntity: route.faqItems.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ]
          : []),
      ],
    };

    scriptTag.textContent = JSON.stringify(schemaGraph, null, 2);

    // Cleanup on unmount or route switch
    return () => {
      document.title = originalTitle;
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [route]);
}
