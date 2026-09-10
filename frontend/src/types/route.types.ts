export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  date?: string;
  verifiedRoute?: string;
}

export interface TruckPriceEstimate {
  truckName: string;
  capacity: string;
  bodyType: string;
  idealFor: string;
  priceRange: string;
}

export interface TruckTypeSpec {
  name: string;
  capacity: string;
  dimensions: string;
  idealFor: string;
  tag?: string;
}

export interface IndustryItem {
  name: string;
  iconName?: string;
  description?: string;
}

export interface RouteConfig {
  // General Fields
  fromCity: string;
  toCity: string;
  slug: string; // e.g. "jaipur-to-delhi-transport"
  heroHeading: string;
  heroSubheading: string;
  heroHighlights: string[];
  bannerImage?: string;
  aboutContent: {
    overview: string;
    corridorContext: string;
    industriesUsingRoute: string;
    whyBusinessesChooseUs: string;
    deliveryTimelineSummary: string;
    companyExperience: string;
  };
  faqItems: FAQItem[];
  reviews: ReviewItem[];
  contactCta: {
    headline: string;
    subheadline: string;
    phone: string;
    whatsapp: string;
  };

  // SEO Fields
  seoTitle: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  sitemapStatus: boolean;

  // Business Fields
  distanceKm: number;
  transitTime: string;
  servicesOffered: string[]; // FTL, PTL, Parcel, Container, Trailer
  priceEstimates: TruckPriceEstimate[];
  pricingFactors: string[];
  truckTypes: TruckTypeSpec[];
  industries: string[];
  materialsTransported: string[];
  transitSteps: {
    step: number;
    title: string;
    description: string;
    expectedTime?: string;
  }[];
  documentsRequired: {
    name: string;
    mandatory: boolean;
    description: string;
  }[];
  galleryImages: {
    url: string;
    title: string;
    alt: string;
  }[];
  relatedRoutes: {
    fromCity: string;
    toCity: string;
    slug: string;
    distanceKm: number;
    transitTime: string;
  }[];
  blogSuggestions: {
    title: string;
    category: string;
    readTime: string;
    summary: string;
    link?: string;
  }[];
  rateCardHighlights?: {
    loadCapacityBadge?: string;
    delhiRates5Ton?: { vehicle: string; rate: string; capacity?: string }[];
    delhiRates7Ton?: { vehicle: string; rate: string; capacity?: string }[];
    delhiRates15Ton?: { vehicle: string; rate: string; capacity?: string }[];
    panIndiaRate?: {
      rate19ft: string;
      rate22ft: string;
    };
  };
  status: 'published' | 'draft';
}
