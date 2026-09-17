import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Eye,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Globe,
  Settings,
  Briefcase,
  Search,
  ArrowLeft,
} from 'lucide-react';
import type { RouteConfig } from '../types/route.types';
import { getAllRoutes, saveRoute, deleteRoute, resetRoutesToDefault } from '../data/routeRegistry';

export const AdminRoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<RouteConfig[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'business'>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  const loadRoutes = () => {
    setRoutes(getAllRoutes());
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedRoute) return;

    if (!selectedRoute.slug || !selectedRoute.fromCity || !selectedRoute.toCity) {
      alert('Slug, Origin City, and Destination City are mandatory.');
      return;
    }

    saveRoute(selectedRoute);
    loadRoutes();
    setSaveAlert(`Route "${selectedRoute.fromCity} → ${selectedRoute.toCity}" saved successfully!`);
    setTimeout(() => setSaveAlert(null), 3500);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm(`Are you sure you want to delete the route "${slug}"?`)) {
      deleteRoute(slug);
      loadRoutes();
      if (selectedRoute?.slug === slug) setSelectedRoute(null);
    }
  };

  const handleDuplicate = (routeToClone: RouteConfig) => {
    const newRoute: RouteConfig = {
      ...routeToClone,
      slug: `${routeToClone.slug}-copy`,
      fromCity: routeToClone.fromCity,
      toCity: `${routeToClone.toCity} (Copy)`,
      h1: `${routeToClone.fromCity} to ${routeToClone.toCity} Transport Service`,
      seoTitle: `${routeToClone.fromCity} to ${routeToClone.toCity} Transport Service | Truck Booking`,
      status: 'draft',
    };
    saveRoute(newRoute);
    loadRoutes();
    setSelectedRoute(newRoute);
  };

  const handleCreateNew = () => {
    const freshRoute: RouteConfig = {
      fromCity: 'Jaipur',
      toCity: 'New City',
      slug: `jaipur-to-new-city-transport-${Date.now().toString().slice(-4)}`,
      heroHeading: 'Jaipur to New City Transport Service',
      heroSubheading: 'Reliable FTL & PTL Truck Transportation from Jaipur to New City',
      heroHighlights: ['Full Truck Load (FTL)', 'Part Truck Load (PTL)', 'GST Billing', 'Quote within 1 Hour'],
      bannerImage: '/images/hero-truck-1.webp',
      aboutContent: {
        overview: 'Direct freight transportation corridor connecting Jaipur industrial clusters with commercial delivery points.',
        corridorContext: 'Serviced with high-speed national highway connectivity.',
        industriesUsingRoute: 'Marble, steel, machinery, textiles, agriculture, and retail goods.',
        whyBusinessesChooseUs: 'Verified fleet, transparent rates, and on-time delivery.',
        deliveryTimelineSummary: 'Next-day delivery available.',
        companyExperience: 'Over a decade of freight experience across Rajasthan and Pan-India.',
      },
      faqItems: [
        { question: 'How much does transport cost on this route?', answer: 'Pricing is based on truck size, weight, and delivery point.' },
        { question: 'Do you provide GST tax invoices?', answer: 'Yes, 100% compliant GST invoicing is provided for all trips.' },
      ],
      reviews: [
        { id: 'rev-1', name: 'Industrial Client', company: 'Manufacturing Ltd', rating: 5, comment: 'Reliable trucks and punctual drivers.' },
      ],
      contactCta: {
        headline: 'Need Transport on This Route?',
        subheadline: 'Get an all-inclusive quote within 1 hour.',
        phone: '+91 97848 00833',
        whatsapp: '919784800833',
      },
      seoTitle: 'Jaipur to New City Transport Service | Truck Booking | Shree Krishna Transport',
      metaDescription: 'Book Jaipur to New City Transport Service with Shree Krishna Transport. FTL, PTL, Container & Parcel. GST Billing. Fast 1-Hour Quote.',
      h1: 'Jaipur to New City Transport Service',
      keywords: ['Jaipur Transport', 'Truck Booking Jaipur', 'Logistics'],
      canonicalUrl: 'https://www.shree-krishna-transport.org/jaipur-to-new-city-transport',
      ogTitle: 'Jaipur to New City Transport Service | Shree Krishna Transport',
      ogDescription: 'Reliable truck transport service from Jaipur to New City.',
      sitemapStatus: true,
      distanceKm: 300,
      transitTime: '1–2 Days',
      servicesOffered: ['FTL', 'PTL', 'Parcel', 'Container'],
      priceEstimates: [
        { truckName: 'Pickup (1.5T)', capacity: '1.5 Tons', bodyType: 'Open / Closed', idealFor: 'Light cargo', priceRange: '₹8,000 – ₹10,000' },
        { truckName: '14ft Truck (4T)', capacity: '4 Tons', bodyType: 'Open / Container', idealFor: 'Cartons & Furniture', priceRange: '₹14,000 – ₹17,000' },
        { truckName: '32ft Multi-Axle', capacity: '15 Tons', bodyType: 'Container', idealFor: 'High Volume Goods', priceRange: '₹28,000 – ₹34,000' },
      ],
      pricingFactors: ['Exact pin code', 'Gross cargo weight', 'Diesel rate adjustments'],
      truckTypes: [
        { name: 'Bolero / Ace Pickup', capacity: '1.5T', dimensions: '8x4.5x5 ft', idealFor: 'Light cargo' },
        { name: '14ft Truck', capacity: '4T', dimensions: '14x6x6 ft', idealFor: 'Industrial components' },
        { name: '32ft Multi-Axle', capacity: '15T', dimensions: '32x8x8.5 ft', idealFor: 'Heavy volume' },
      ],
      industries: ['Marble', 'Steel', 'Machinery', 'Furniture', 'Textiles'],
      materialsTransported: ['Tiles', 'Steel Bars', 'Machines', 'Consumer Goods'],
      transitSteps: [
        { step: 1, title: 'Instant Booking', description: 'Receive confirmed quote in 60 mins.' },
        { step: 2, title: 'Factory Loading', description: 'Truck reports at pickup location.' },
        { step: 3, title: 'Highway Haul', description: 'Continuous transit with WhatsApp updates.' },
        { step: 4, title: 'Safe Delivery', description: 'Unloading and GST invoice issuance.' },
      ],
      documentsRequired: [
        { name: 'GST Invoice', mandatory: true, description: 'Commercial invoice.' },
        { name: 'E-Way Bill', mandatory: true, description: 'Mandatory for value > ₹50,000.' },
      ],
      galleryImages: [{ url: '/images/hero-truck-1.webp', title: 'Linehaul Fleet', alt: 'Commercial Truck' }],
      relatedRoutes: [{ fromCity: 'Jaipur', toCity: 'Delhi', slug: 'jaipur-to-delhi-transport', distanceKm: 280, transitTime: '1 Day' }],
      blogSuggestions: [{ title: 'Transport Rate Calculation Guide', category: 'Pricing', readTime: '3 min', summary: 'Understanding freight rates.' }],
      status: 'draft',
    };

    saveRoute(freshRoute);
    loadRoutes();
    setSelectedRoute(freshRoute);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(routes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `shree_krishna_routes_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported: RouteConfig[] = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          imported.forEach((r) => saveRoute(r));
          loadRoutes();
          alert(`Successfully imported ${imported.length} routes!`);
        } else {
          alert('Invalid JSON structure: Expected an array of RouteConfig objects.');
        }
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const filteredRoutes = routes.filter(
    (r) =>
      r.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.toCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#ECE6DD] text-[#1a1f1b] font-['Manrope'] pb-16">
      {/* Top Admin Header */}
      <header className="bg-[#1C201D] text-white py-4 px-4 md:px-8 sticky top-0 z-40 shadow-lg border-b border-neutral-700">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-neutral-400 hover:text-white transition-colors" title="Back to Website">
              <ArrowLeft size={20} />
            </Link>
            <div className="p-2 rounded-lg bg-[#062448] text-white">
              <Truck size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold font-['Archivo_Narrow'] uppercase tracking-tight">
                Route Manager Admin Panel
              </h1>
              <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block">
                Dynamic Master Route Generator • {routes.length} Total Corridors
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCreateNew}
              className="px-3.5 py-2 rounded-lg bg-[#062448] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0A3366] transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus size={15} />
              <span>New Route</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-bold hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
              title="Export all routes to JSON backup"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
            <label className="px-3 py-2 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-bold hover:bg-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer">
              <Upload size={14} />
              <span className="hidden sm:inline">Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
            <button
              onClick={() => {
                if (window.confirm('Reset all custom routes and reload default pre-seeded corridors?')) {
                  resetRoutesToDefault();
                  loadRoutes();
                  setSelectedRoute(null);
                }
              }}
              className="px-2.5 py-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-red-400 text-xs font-bold transition-colors"
              title="Reset to default routes"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Alert Notification */}
      {saveAlert && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="p-3 bg-[#EBF2F9] border border-[#062448]/30 text-[#062448] font-bold text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{saveAlert}</span>
          </div>
        </div>
      )}

      {/* Main Content Layout: Split Master/Detail */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Routes Table / List */}
          <div className={`${selectedRoute ? 'hidden lg:block lg:col-span-4' : 'col-span-12'}`}>
            <div className="bg-white rounded-2xl p-4 border border-[#e2dacd] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase font-['Space_Mono'] text-neutral-500">
                  Corridors ({filteredRoutes.length})
                </span>
                <div className="relative w-48">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter..."
                    className="w-full pl-7 pr-2 py-1 text-xs rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
                {filteredRoutes.map((r) => {
                  const isSelected = selectedRoute?.slug === r.slug;
                  return (
                    <div
                      key={r.slug}
                      onClick={() => setSelectedRoute(r)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#062448] bg-[#EBF2F9]'
                          : 'border-[#ECE6DD] bg-[#fbf9f6] hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                          {r.fromCity} ➔ {r.toCity}
                        </span>
                        <span
                          className={`text-[9px] font-bold font-['Space_Mono'] px-1.5 py-0.5 rounded ${
                            r.status === 'published'
                              ? 'bg-[#062448]/10 text-[#062448]'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {r.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-[11px] text-neutral-500 font-['Space_Mono'] truncate mb-2">
                        /{r.slug}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60 text-[10px]">
                        <span className="text-neutral-500">{r.distanceKm} km • {r.transitTime}</span>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <Link
                            to={`/${r.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-[#062448]"
                            title="Preview Live Page"
                          >
                            <Eye size={13} />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(r)}
                            className="text-neutral-400 hover:text-blue-600"
                            title="Duplicate Route"
                          >
                            <Copy size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(r.slug)}
                            className="text-neutral-400 hover:text-red-600"
                            title="Delete Route"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Route Editor */}
          {selectedRoute ? (
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e2dacd] shadow-sm p-6">
              {/* Editor Header */}
              <div className="flex items-center justify-between border-b border-[#ECE6DD] pb-4 mb-6 flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedRoute(null)}
                      className="lg:hidden p-1 rounded hover:bg-neutral-100"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <h2 className="text-xl font-bold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                      Editing: {selectedRoute.fromCity} ➔ {selectedRoute.toCity}
                    </h2>
                  </div>
                  <span className="text-xs text-neutral-500 font-['Space_Mono'] block">
                    URL: /{selectedRoute.slug}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/${selectedRoute.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-[#d8d0c3] text-xs font-bold flex items-center gap-1 hover:bg-neutral-50"
                  >
                    <ExternalLink size={13} />
                    <span>View Page</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-lg bg-[#062448] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow hover:bg-[#0A3366]"
                  >
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* 3 Main Specification Tabs: General, SEO, Business */}
              <div className="flex border-b border-[#ECE6DD] mb-6">
                {[
                  { id: 'general', label: '1. General Fields', icon: Settings },
                  { id: 'seo', label: '2. SEO & Meta Specs', icon: Globe },
                  { id: 'business', label: '3. Business & Rates', icon: Briefcase },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
                        isActive
                          ? 'border-[#062448] text-[#062448]'
                          : 'border-transparent text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      <Icon size={15} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="space-y-6">
                {/* TAB 1: GENERAL FIELDS */}
                {activeTab === 'general' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-neutral-700 mb-1">From City (Origin) *</label>
                        <input
                          type="text"
                          required
                          value={selectedRoute.fromCity}
                          onChange={(e) => setSelectedRoute({ ...selectedRoute, fromCity: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-neutral-700 mb-1">To City (Destination) *</label>
                        <input
                          type="text"
                          required
                          value={selectedRoute.toCity}
                          onChange={(e) => setSelectedRoute({ ...selectedRoute, toCity: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-neutral-700 mb-1">URL Slug (e.g. jaipur-to-delhi-transport) *</label>
                        <input
                          type="text"
                          required
                          value={selectedRoute.slug}
                          onChange={(e) => setSelectedRoute({ ...selectedRoute, slug: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-['Space_Mono']"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Hero Heading (H1 Banner Title)</label>
                      <input
                        type="text"
                        value={selectedRoute.heroHeading}
                        onChange={(e) => setSelectedRoute({ ...selectedRoute, heroHeading: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Hero Subheading</label>
                      <input
                        type="text"
                        value={selectedRoute.heroSubheading}
                        onChange={(e) => setSelectedRoute({ ...selectedRoute, heroSubheading: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs"
                      />
                    </div>

                    {/* About This Route Text Areas */}
                    <div className="pt-2 border-t border-neutral-100">
                      <span className="font-bold text-neutral-800 block mb-2 font-['Space_Mono'] uppercase">
                        Editorial Route Overview (500–700 words)
                      </span>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-neutral-600 mb-0.5 font-semibold">1. Highway Overview</label>
                          <textarea
                            rows={3}
                            value={selectedRoute.aboutContent.overview}
                            onChange={(e) =>
                              setSelectedRoute({
                                ...selectedRoute,
                                aboutContent: { ...selectedRoute.aboutContent, overview: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-600 mb-0.5 font-semibold">2. Industrial Demand Context</label>
                          <textarea
                            rows={2}
                            value={selectedRoute.aboutContent.industriesUsingRoute}
                            onChange={(e) =>
                              setSelectedRoute({
                                ...selectedRoute,
                                aboutContent: { ...selectedRoute.aboutContent, industriesUsingRoute: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* FAQ Items Count & Quick Edit Notice */}
                    <div className="p-3 bg-[#fbf9f6] border border-[#ECE6DD] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-neutral-800 block">
                          FAQ Questions: {selectedRoute.faqItems.length} active
                        </span>
                        <span className="text-neutral-500 text-[11px]">
                          Automated into Google FAQPage Schema markup
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const q = prompt('New Question:');
                          if (!q) return;
                          const a = prompt('Answer:');
                          if (!a) return;
                          setSelectedRoute({
                            ...selectedRoute,
                            faqItems: [...selectedRoute.faqItems, { question: q, answer: a }],
                          });
                        }}
                        className="px-2.5 py-1 rounded bg-[#062448] text-white text-xs font-bold"
                      >
                        + Add FAQ
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: SEO FIELDS & LIVE SERP PREVIEW */}
                {activeTab === 'seo' && (
                  <div className="space-y-5 text-xs">
                    {/* Live Google Search Preview Card */}
                    <div className="p-4 bg-white rounded-xl border border-[#d8d0c3] shadow-sm space-y-1">
                      <span className="text-[10px] font-bold font-['Space_Mono'] uppercase text-[#062448] block mb-1">
                        Google Search (SERP) Live Simulation
                      </span>
                      <div className="text-[11px] text-neutral-600 truncate flex items-center gap-1">
                        <span className="text-neutral-800 font-bold">shree-krishna-transport.org</span>
                        <span>› routes › {selectedRoute.slug}</span>
                      </div>
                      <div className="text-base text-[#1a0dab] hover:underline cursor-pointer font-medium font-sans truncate">
                        {selectedRoute.seoTitle}
                      </div>
                      <div className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {selectedRoute.metaDescription}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-bold text-neutral-700">SEO Title (Target: 60–65 characters)</label>
                          <span
                            className={`font-['Space_Mono'] text-[10px] font-bold ${
                              selectedRoute.seoTitle.length >= 50 && selectedRoute.seoTitle.length <= 70
                                ? 'text-green-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {selectedRoute.seoTitle.length} chars
                          </span>
                        </div>
                        <input
                          type="text"
                          value={selectedRoute.seoTitle}
                          onChange={(e) => setSelectedRoute({ ...selectedRoute, seoTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="font-bold text-neutral-700">Meta Description (Target: 150–160 characters)</label>
                          <span
                            className={`font-['Space_Mono'] text-[10px] font-bold ${
                              selectedRoute.metaDescription.length >= 140 && selectedRoute.metaDescription.length <= 165
                                ? 'text-green-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {selectedRoute.metaDescription.length} chars
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={selectedRoute.metaDescription}
                          onChange={(e) => setSelectedRoute({ ...selectedRoute, metaDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">H1 Tag</label>
                          <input
                            type="text"
                            value={selectedRoute.h1}
                            onChange={(e) => setSelectedRoute({ ...selectedRoute, h1: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Canonical URL</label>
                          <input
                            type="text"
                            value={selectedRoute.canonicalUrl}
                            onChange={(e) => setSelectedRoute({ ...selectedRoute, canonicalUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-['Space_Mono']"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-700 mb-1">
                          Target Keywords (comma separated)
                        </label>
                        <input
                          type="text"
                          value={selectedRoute.keywords.join(', ')}
                          onChange={(e) =>
                            setSelectedRoute({
                              ...selectedRoute,
                              keywords: e.target.value.split(',').map((k) => k.trim()),
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-['Space_Mono']"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="sitemapStatus"
                          checked={selectedRoute.sitemapStatus}
                          onChange={(e) => setSelectedRoute({ ...selectedRoute, sitemapStatus: e.target.checked })}
                          className="w-4 h-4 text-[#062448] rounded"
                        />
                        <label htmlFor="sitemapStatus" className="font-bold text-neutral-800">
                          Include in sitemap.xml & Google Indexing
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: BUSINESS FIELDS */}
                {activeTab === 'business' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-neutral-700 mb-1">Highway Distance (KM)</label>
                        <input
                          type="number"
                          value={selectedRoute.distanceKm}
                          onChange={(e) =>
                            setSelectedRoute({ ...selectedRoute, distanceKm: Number(e.target.value) })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-neutral-700 mb-1">Standard Transit Time</label>
                        <input
                          type="text"
                          value={selectedRoute.transitTime}
                          onChange={(e) => setSelectedRoute({ ...selectedRoute, transitTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-neutral-700 mb-1">Status</label>
                        <select
                          value={selectedRoute.status}
                          onChange={(e) =>
                            setSelectedRoute({ ...selectedRoute, status: e.target.value as 'published' | 'draft' })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-bold uppercase"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    {/* Price Estimates Table Editor */}
                    <div className="pt-2 border-t border-neutral-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-neutral-800 font-['Space_Mono'] uppercase">
                          Truck Price Estimates ({selectedRoute.priceEstimates.length} models)
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const truckName = prompt('Truck Name:');
                            if (!truckName) return;
                            const range = prompt('Price Range (e.g. ₹15,000 – ₹18,000):');
                            if (!range) return;
                            setSelectedRoute({
                              ...selectedRoute,
                              priceEstimates: [
                                ...selectedRoute.priceEstimates,
                                {
                                  truckName,
                                  capacity: '5 Tons',
                                  bodyType: 'Open / Container',
                                  idealFor: 'Industrial freight',
                                  priceRange: range,
                                },
                              ],
                            });
                          }}
                          className="px-2 py-1 rounded bg-[#062448] text-white text-[11px] font-bold"
                        >
                          + Add Truck Rate
                        </button>
                      </div>

                      <div className="space-y-2">
                        {selectedRoute.priceEstimates.map((pe, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg border border-[#ECE6DD] bg-[#fbf9f6] flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="font-bold text-neutral-800">{pe.truckName}</div>
                            <input
                              type="text"
                              value={pe.priceRange}
                              onChange={(e) => {
                                const copy = [...selectedRoute.priceEstimates];
                                copy[idx].priceRange = e.target.value;
                                setSelectedRoute({ ...selectedRoute, priceEstimates: copy });
                              }}
                              className="w-36 px-2 py-1 rounded border border-[#d8d0c3] bg-white text-xs font-['Space_Mono'] font-bold text-[#E9A015]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const copy = selectedRoute.priceEstimates.filter((_, i) => i !== idx);
                                setSelectedRoute({ ...selectedRoute, priceEstimates: copy });
                              }}
                              className="text-neutral-400 hover:text-red-500"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Industries Tags */}
                    <div className="pt-2 border-t border-neutral-100">
                      <label className="block font-bold text-neutral-700 mb-1">
                        Industries Served (comma separated)
                      </label>
                      <input
                        type="text"
                        value={selectedRoute.industries.join(', ')}
                        onChange={(e) =>
                          setSelectedRoute({
                            ...selectedRoute,
                            industries: e.target.value.split(',').map((s) => s.trim()),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-['Space_Mono']"
                      />
                    </div>

                    {/* What We Transport Materials */}
                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">
                        What We Transport Materials (comma separated)
                      </label>
                      <input
                        type="text"
                        value={selectedRoute.materialsTransported.join(', ')}
                        onChange={(e) =>
                          setSelectedRoute({
                            ...selectedRoute,
                            materialsTransported: e.target.value.split(',').map((s) => s.trim()),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#d8d0c3] bg-[#fbf9f6] text-xs font-['Space_Mono']"
                      />
                    </div>
                  </div>
                )}

                {/* Bottom Save Bar */}
                <div className="pt-4 border-t border-[#ECE6DD] flex items-center justify-between">
                  <div className="text-[11px] text-neutral-500">
                    Changes take effect immediately on public route pages upon saving.
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#062448] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0A3366] shadow flex items-center gap-1.5"
                  >
                    <Save size={15} />
                    <span>Save All Changes</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="hidden lg:flex lg:col-span-8 bg-white rounded-2xl border border-dashed border-[#d8d0c3] p-12 flex-col items-center justify-center text-center">
              <Truck size={40} className="text-neutral-300 mb-3" />
              <h3 className="font-bold text-neutral-700 font-['Archivo_Narrow'] text-lg uppercase">
                Select a Route to Edit
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mt-1 mb-4">
                Choose a route from the list on the left to edit its General, SEO, and Business fields, or create a brand new corridor.
              </p>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 rounded-lg bg-[#062448] text-white font-bold text-xs uppercase tracking-wider"
              >
                + Create New Corridor
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
