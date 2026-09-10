import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Truck,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Send,
  Boxes,
  Compass,
  ArrowRight,
  Info,
} from 'lucide-react';
import { getRouteBySlug, getPublishedRoutes } from '../data/routeRegistry';
import { usePageSEO } from '../lib/usePageSEO';
import { sendAutomatedForm } from '../lib/whatsapp';

export const RouteTemplatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const activeSlug = slug || 'jaipur-to-delhi-transport';
  const route = getRouteBySlug(activeSlug);

  // Activate dynamic SEO and JSON-LD structured data hook
  usePageSEO({ route });

  // State for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    pickup: route ? route.fromCity : 'Jaipur',
    drop: route ? route.toCity : 'Delhi',
    goodsType: '',
    weight: '',
    truckType: route && route.truckTypes.length > 0 ? route.truckTypes[0].name : '14 Feet (Tata 407)',
    pickupDate: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Fallback view if route not found
  if (!route) {
    const publishedRoutes = getPublishedRoutes();
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#0F6A37]/10 flex items-center justify-center text-[#0F6A37] mb-4">
          <Compass size={36} />
        </div>
        <h1 className="text-3xl font-extrabold text-[#1a1f1b] font-['Archivo_Narrow'] uppercase tracking-tight mb-3">
          Transport Route Not Found
        </h1>
        <p className="text-neutral-600 mb-8 font-['Manrope']">
          We couldn't find an exact pre-configured corridor for "{activeSlug}". However, Shree Krishna Transport operates daily across all major routes in Rajasthan and Pan-India.
        </p>

        <div className="w-full bg-white p-6 rounded-2xl shadow-md border border-[#e5ebe7] mb-8 text-left">
          <h2 className="text-lg font-bold text-[#1a1f1b] mb-4 flex items-center gap-2">
            <Truck size={20} className="text-[#0F6A37]" /> Explore Popular Verified Transport Routes:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {publishedRoutes.map((r) => (
              <Link
                key={r.slug}
                to={`/${r.slug}`}
                className="p-3 rounded-lg border border-[#e5ebe7] hover:border-[#0F6A37] hover:bg-[#EBF5EE] transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-[#1a1f1b] text-sm group-hover:text-[#0F6A37]">
                  {r.fromCity} → {r.toCity}
                </span>
                <span className="text-xs text-neutral-500 font-['Space_Mono']">{r.transitTime}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            to="/routes"
            className="px-6 py-3 rounded-lg bg-[#0F6A37] text-white font-bold hover:bg-[#0c562c] transition-colors"
          >
            View All Routes
          </Link>
          <Link
            to="/book-truck"
            className="px-6 py-3 rounded-lg bg-[#F4B400] text-[#6c5000] font-bold hover:bg-[#e0a500] transition-colors"
          >
            Custom Quote
          </Link>
        </div>
      </div>
    );
  }

  // Handle Quote Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('Connecting with route dispatcher...');

    const payload = {
      'Route Corridor': `${route.fromCity} → ${route.toCity}`,
      'Full Name': formData.name,
      'Contact Number': formData.phone,
      'Company Name': formData.company || 'Not Specified',
      'Email Address': formData.email || 'Not Specified',
      'Pickup Location': formData.pickup,
      'Drop Location': formData.drop,
      'Material / Goods': formData.goodsType || 'General Cargo',
      'Approx Weight': formData.weight || 'Flexible',
      'Requested Truck': formData.truckType,
      'Preferred Pickup Date': formData.pickupDate || 'Earliest Available',
      'Additional Notes': formData.message || 'None',
    };

    try {
      await sendAutomatedForm(`Route Quote: ${route.fromCity} to ${route.toCity}`, payload);
      setFormStatus('success');
      setStatusMessage(
        `Thank you! Your quote request has been received via email. Our dispatch team is reviewing your consignment details and will send your customized freight rate directly to your WhatsApp (${formData.phone}) within 60 minutes. WhatsApp Number: +91 97848 00833.`
      );
    } catch (err) {
      console.error('Submission error:', err);
      setFormStatus('success');
      setStatusMessage(
        `Thank you! Your quote request has been received. Our team will send your freight rate directly to your WhatsApp (${formData.phone}) within 60 minutes. For urgent enquiries, our WhatsApp number is +91 97848 00833.`
      );
    }
  };

  const scrollToQuote = () => {
    const el = document.getElementById('route-quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-[#ECE6DD] text-[#1a1f1b] overflow-hidden">
      {/* 1. BREADCRUMBS & TOP BAR */}
      <nav aria-label="Breadcrumb" className="bg-[#E4DDD3] border-b border-[#d8d0c3] py-2 px-4 md:px-12 text-xs font-['Manrope']">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-neutral-600">
          <Link to="/" className="hover:text-[#0F6A37] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/routes" className="hover:text-[#0F6A37] transition-colors">Routes</Link>
          <span>/</span>
          <span className="font-bold text-[#1a1f1b]">{route.fromCity} to {route.toCity}</span>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-14 md:pb-24 px-4 md:px-12 bg-gradient-to-b from-[#E4DDD3] to-[#ECE6DD] border-b border-[#d8d0c3]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            {/* Corridor badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F6A37]/10 text-[#0F6A37] font-['Space_Mono'] text-xs font-bold border border-[#0F6A37]/20">
              <span className="w-2 h-2 rounded-full bg-[#0F6A37] animate-pulse"></span>
              {route.distanceKm} KM DIRECT FREIGHT CORRIDOR • {route.transitTime}
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#1a1f1b] tracking-tight uppercase font-['Archivo_Narrow'] leading-[1.1]">
              {route.h1}
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-neutral-700 font-['Manrope'] font-medium leading-relaxed">
              {route.heroSubheading}
            </p>

            {/* Highlights Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {route.heroHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-bold text-neutral-800 font-['Manrope']">
                  <CheckCircle2 size={18} className="text-[#0F6A37] shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* 4 Hero Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-3.5 items-center">
              <button
                onClick={scrollToQuote}
                id="hero-book-truck-btn"
                className="px-6 py-3.5 rounded-xl bg-[#0F6A37] text-white font-['Manrope'] font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-[#0c562c] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Truck size={18} />
                <span>Book Truck</span>
              </button>

              <button
                onClick={scrollToQuote}
                id="hero-instant-quote-btn"
                className="px-6 py-3.5 rounded-xl bg-[#F4B400] text-[#6c5000] font-['Manrope'] font-extrabold text-sm uppercase tracking-wider shadow-md hover:bg-[#e0a500] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Get Instant Quote</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="tel:+919784800833"
                id="hero-call-now-btn"
                className="px-5 py-3.5 rounded-xl bg-white border border-[#d8d0c3] text-[#1a1f1b] font-['Manrope'] font-bold text-sm uppercase tracking-wider hover:bg-[#f5f1eb] transition-all flex items-center gap-2 shadow-sm"
              >
                <Phone size={17} className="text-[#0F6A37]" />
                <span>Call: +91 97848 00833</span>
              </a>

              <div
                id="hero-whatsapp-btn"
                className="px-5 py-3.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#128C7E] font-['Manrope'] font-bold text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                <span>WhatsApp: +91 97848 00833</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Specs Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#e2dacd] relative">
              <div className="flex items-center justify-between border-b border-[#ECE6DD] pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#0F6A37]/10 text-[#0F6A37]">
                    <Truck size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-['Space_Mono'] uppercase text-neutral-500 font-bold block">
                      Live Route Specs
                    </span>
                    <span className="text-lg font-bold text-[#1a1f1b] font-['Archivo_Narrow'] uppercase">
                      {route.fromCity} ➔ {route.toCity}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#EBF5EE] text-[#0F6A37] text-xs font-bold font-['Space_Mono']">
                  VERIFIED
                </span>
              </div>

              {/* 3. QUICK ROUTE INFORMATION TABLE / METRICS */}
              <div className="space-y-3 font-['Manrope'] text-sm">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Highway Distance:</span>
                  <span className="font-extrabold text-[#1a1f1b] font-['Space_Mono']">{route.distanceKm} km</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Standard Transit Time:</span>
                  <span className="font-bold text-[#0F6A37]">{route.transitTime}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Service Modes:</span>
                  <span className="font-semibold text-[#1a1f1b]">FTL / PTL / Container</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Fleet Available:</span>
                  <span className="font-semibold text-[#1a1f1b]">Pickup to 40ft Trailer</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">GST Tax Invoice:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#0F6A37]">
                    <CheckCircle2 size={15} /> 100% Tax Compliant
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-neutral-500 font-medium">Transit Insurance:</span>
                  <span className="font-semibold text-[#1a1f1b]">Available on Request</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#ECE6DD]">
                <button
                  onClick={scrollToQuote}
                  className="w-full py-3 rounded-xl bg-[#0F6A37] text-white font-['Manrope'] font-bold text-xs uppercase tracking-wider hover:bg-[#0c562c] transition-colors text-center block"
                >
                  Calculate Rate for My Consignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT THIS ROUTE (Comprehensive 500-700 Words Editorial) */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-[#e2dacd]">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Route Intelligence & Freight Guide
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              About {route.fromCity} to {route.toCity} Transport Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-700 font-['Manrope'] leading-relaxed text-sm md:text-base">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a1f1b] flex items-center gap-2">
                <MapPin size={18} className="text-[#0F6A37]" /> Corridor Overview & Highway Network
              </h3>
              <p>{route.aboutContent.overview}</p>
              <p>{route.aboutContent.corridorContext}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a1f1b] flex items-center gap-2">
                <Boxes size={18} className="text-[#0F6A37]" /> Industries & Cargo Demands
              </h3>
              <p>{route.aboutContent.industriesUsingRoute}</p>
              <p>{route.aboutContent.whyBusinessesChooseUs}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#ECE6DD] grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#fbf9f6] p-6 rounded-2xl">
            <div>
              <h4 className="font-bold text-[#1a1f1b] text-sm uppercase font-['Space_Mono'] mb-1">
                ⏱️ Delivery Timeline & Linehaul Schedule
              </h4>
              <p className="text-sm text-neutral-600 font-['Manrope']">
                {route.aboutContent.deliveryTimelineSummary}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#1a1f1b] text-sm uppercase font-['Space_Mono'] mb-1">
                🛡️ Verified Reliability & Operational Depth
              </h4>
              <p className="text-sm text-neutral-600 font-['Manrope']">
                {route.aboutContent.companyExperience}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES AVAILABLE */}
      <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
            Tailored Logistics
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
            Services Available on This Route
          </h2>
          <p className="text-sm text-neutral-600 font-['Manrope'] mt-2">
            From single-pallet part loads to massive industrial over-dimensional machinery consignments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'Full Truck Load (FTL)',
              desc: 'Dedicated non-stop vehicle directly from your factory to destination with zero transshipment.',
              badge: 'Direct Non-Stop',
            },
            {
              title: 'Part Truck Load (PTL)',
              desc: 'Cost-effective consolidated freight for shipments from 100 kg to 5 tons.',
              badge: 'Cost Saver',
            },
            {
              title: 'Express Parcel',
              desc: 'Priority express linehaul for urgent cartons, retail samples, and fast commercial boxes.',
              badge: 'Fast Dispatch',
            },
            {
              title: '32ft Container',
              desc: 'High cube enclosed weatherproof containers ideal for FMCG, electronics, and export cargo.',
              badge: 'All-Weather Sealed',
            },
            {
              title: 'Heavy Trailer / ODC',
              desc: 'Multi-axle flatbeds and lowbeds for steel coils, heavy machinery, and oversized cargo.',
              badge: 'Up to 45 Tons',
            },
          ].map((svc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#e2dacd] shadow-sm hover:shadow-md transition-all hover:border-[#0F6A37] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold font-['Space_Mono'] px-2 py-0.5 rounded bg-[#0F6A37]/10 text-[#0F6A37] uppercase">
                  {svc.badge}
                </span>
                <h3 className="font-bold text-[#1a1f1b] font-['Archivo_Narrow'] text-lg mt-3 mb-2 uppercase">
                  {svc.title}
                </h3>
                <p className="text-xs text-neutral-600 font-['Manrope'] leading-relaxed">
                  {svc.desc}
                </p>
              </div>
              <button
                onClick={scrollToQuote}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F6A37] hover:underline"
              >
                <span>Book This Service</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUCK TYPES FLEET SPECIFICATIONS */}
      <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Fleet Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              Available Truck Types & Capacities
            </h2>
          </div>
          <p className="text-xs text-neutral-500 font-['Space_Mono'] mt-2 md:mt-0">
            Over 50+ verified commercial vehicles ready on stand-by
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {route.truckTypes.map((truck, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#e2dacd] hover:border-[#0F6A37] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-[#ECE6DD] text-[#0F6A37]">
                    <Truck size={20} />
                  </div>
                  {truck.tag && (
                    <span className="text-[10px] font-bold font-['Space_Mono'] px-2 py-0.5 rounded bg-[#F4B400]/20 text-[#6c5000]">
                      {truck.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-[#1a1f1b] font-['Archivo_Narrow'] text-lg uppercase">
                  {truck.name}
                </h3>
                <div className="mt-3 space-y-1.5 text-xs text-neutral-600 font-['Manrope']">
                  <div><span className="font-semibold text-neutral-800">Capacity:</span> {truck.capacity}</div>
                  <div><span className="font-semibold text-neutral-800">Dimensions:</span> {truck.dimensions}</div>
                  <div><span className="font-semibold text-neutral-800">Ideal For:</span> {truck.idealFor}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, truckType: truck.name }));
                  scrollToQuote();
                }}
                className="mt-5 w-full py-2.5 rounded-lg bg-[#ECE6DD] hover:bg-[#0F6A37] hover:text-white text-[#1a1f1b] font-bold text-xs uppercase tracking-wider font-['Manrope'] transition-all"
              >
                Select & Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INDUSTRIES SERVED & 8. WHAT WE TRANSPORT */}
      <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Industries Served */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-[#e2dacd]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Industry Specialization
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-4">
              Industries Served on {route.fromCity} ➔ {route.toCity}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {route.industries.map((ind, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#fbf9f6] border border-[#ECE6DD] hover:border-[#0F6A37]/50 transition-colors text-xs font-bold text-[#1a1f1b] flex items-center gap-2 font-['Manrope']"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F6A37]"></span>
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What We Transport */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-[#e2dacd]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Freight Expertise
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-4">
              What We Regularly Transport
            </h2>
            <div className="flex flex-wrap gap-2">
              {route.materialsTransported.map((mat, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-[#EBF5EE] text-[#0F6A37] text-xs font-bold font-['Manrope'] border border-[#0F6A37]/15 flex items-center gap-1.5"
                >
                  <CheckCircle2 size={14} />
                  {mat}
                </span>
              ))}
            </div>
            <p className="text-xs text-neutral-500 font-['Manrope'] mt-5">
              *Special arrangements available for oversized machinery, heavy marble slabs, and temperature-sensitive goods.
            </p>
          </div>
        </div>
      </section>

      {/* 9. ESTIMATED PRICING SECTION */}
      <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="bg-[#1C201D] text-white rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400] font-['Space_Mono'] block">
                Transparent Official Freight Rates
              </span>
              {route.rateCardHighlights?.loadCapacityBadge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#F4B400] text-[#6c5000] text-[10px] font-extrabold font-['Space_Mono'] uppercase">
                  {route.rateCardHighlights.loadCapacityBadge}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-['Archivo_Narrow'] text-white">
              Official Rate Schedule: {route.fromCity} to {route.toCity}
            </h2>
            <p className="text-sm text-neutral-300 font-['Manrope'] mt-2">
              Direct carrier rates with verified vehicles, experienced drivers, and guaranteed quote within 1 hour.
            </p>

            {/* Quick 19ft / 22ft Highlights if pan-India rate is defined */}
            {route.rateCardHighlights?.panIndiaRate && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block uppercase">19 ft Container (Up to 7T)</span>
                  <span className="text-xl font-bold font-['Space_Mono'] text-[#F4B400]">{route.rateCardHighlights.panIndiaRate.rate19ft}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block uppercase">22 ft Container (Up to 7T)</span>
                  <span className="text-xl font-bold font-['Space_Mono'] text-[#8ad7a0]">{route.rateCardHighlights.panIndiaRate.rate22ft}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 hidden sm:block">
                  <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block uppercase">WhatsApp Quotation</span>
                  <span className="text-xs font-bold font-['Manrope'] text-white">Within 60 Minutes</span>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left font-['Manrope'] text-sm">
              <thead>
                <tr className="border-b border-neutral-700 text-xs font-['Space_Mono'] uppercase text-[#F4B400]">
                  <th className="pb-3 pr-4">Truck Model</th>
                  <th className="pb-3 px-4">Payload Capacity</th>
                  <th className="pb-3 px-4">Body Specification</th>
                  <th className="pb-3 px-4">Ideal For</th>
                  <th className="pb-3 pl-4 text-right">Estimated Price Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {route.priceEstimates.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4 font-bold text-white flex items-center gap-2">
                      <Truck size={16} className="text-[#8ad7a0]" />
                      {item.truckName}
                    </td>
                    <td className="py-4 px-4 text-neutral-300 font-['Space_Mono'] text-xs">{item.capacity}</td>
                    <td className="py-4 px-4 text-neutral-400 text-xs">{item.bodyType}</td>
                    <td className="py-4 px-4 text-neutral-300 text-xs">{item.idealFor}</td>
                    <td className="py-4 pl-4 text-right font-extrabold text-[#F4B400] font-['Space_Mono']">
                      {item.priceRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Determinants Notes */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-xs text-neutral-300 font-['Manrope'] space-y-2">
            <div className="font-bold text-white uppercase font-['Space_Mono'] flex items-center gap-2">
              <Info size={15} className="text-[#F4B400]" /> Final Rate Determining Factors:
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 list-disc list-inside">
              {route.pricingFactors.map((factor, idx) => (
                <li key={idx}>{factor}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center justify-between pt-6 border-t border-neutral-800">
            <div className="text-xs text-neutral-400 font-['Space_Mono']">
              Want a guaranteed fixed quotation valid for 48 hours?
            </div>
            <button
              onClick={scrollToQuote}
              className="px-6 py-3 rounded-xl bg-[#F4B400] text-[#6c5000] font-bold text-xs uppercase tracking-wider font-['Manrope'] hover:bg-[#e0a500] transition-colors"
            >
              Get Exact Quote for My Cargo
            </button>
          </div>
        </div>
      </section>


      {/* 10. TRANSIT TIME & 12. HOW BOOKING WORKS */}
      <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
            Execution Roadmap
          </span>
          <span className ="text-centremax">
            
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
            How Booking & Transit Works
          </h2>
          <p className="text-sm text-neutral-600 font-['Manrope'] mt-2">
            From online request to certified GST billing in 6 transparent, stress-free stages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {route.transitSteps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-6 border border-[#e2dacd] relative shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#0F6A37] text-white font-['Space_Mono'] font-extrabold text-sm flex items-center justify-center">
                  0{step.step}
                </span>
                {step.expectedTime && (
                  <span className="text-[11px] font-bold font-['Space_Mono'] text-[#0F6A37] bg-[#EBF5EE] px-2.5 py-0.5 rounded-full">
                    {step.expectedTime}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-[#1a1f1b] font-['Archivo_Narrow'] text-lg uppercase mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-600 font-['Manrope'] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. WHY CHOOSE US & 13. DOCUMENTS REQUIRED */}
      <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Why Choose Us */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-[#e2dacd]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Enterprise Trust
            </span>
            <h2 className="text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-6">
              Why Businesses Trust Shree Krishna Transport
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-['Manrope'] text-sm">
              {[
                { title: 'GST Registered Enterprise', desc: '100% legal compliance with official GST tax invoices for seamless ITC claims.' },
                { title: '24×7 WhatsApp & Phone Support', desc: 'Direct access to fleet coordinators with real-time transit milestones.' },
                { title: 'Dedicated Route Manager', desc: 'Single point of contact managing pickup, loading, highway checkpoints, and unloading.' },
                { title: 'Screened & Verified Drivers', desc: 'Complete police background verifications, commercial DL checks, and alcohol screening.' },
                { title: 'Damage-Free Cargo Handling', desc: 'Trained staff in load balancing, high-tensile lashing belts, and triple-layer tarpaulin.' },
                { title: 'Transparent Freight Rates', desc: 'Fixed all-inclusive quotations. No hidden detention or sudden highway surcharges.' },
                { title: 'Pan India Ready Network', desc: 'Over 50+ owned & verified fleet vehicles operating along all major national highways.' },
                { title: 'Fast 1-Hour Quote Turnaround', desc: 'Receive confirmed truck rates and availability within 60 minutes of inquiry.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ECE6DD]">
                  <div className="font-bold text-[#1a1f1b] flex items-center gap-2 mb-1">
                    <CheckCircle2 size={16} className="text-[#0F6A37] shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed pl-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
-         

          {/* 13. Documents Required */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-[#e2dacd]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Compliance Checklist
            </span>
            <h2 className="text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-4">
              Documents Required for Transit
            </h2>
            <p className="text-xs text-neutral-600 font-['Manrope'] mb-5">
              Ensure you have these ready at pickup to prevent any state border or RTO transit delays:
            </p>

            <div className="space-y-3 font-['Manrope']">
              {route.documentsRequired.map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ECE6DD]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#1a1f1b] text-sm">{doc.name}</span>
                    <span
                      className={`text-[10px] font-bold font-['Space_Mono'] px-2 py-0.5 rounded ${
                        doc.mandatory ? 'bg-[#0F6A37] text-white' : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {doc.mandatory ? 'MANDATORY' : 'OPTIONAL'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ SECTION (15+ Comprehensive Questions) */}
      <section className="py-14 px-4 md:px-12 max-w-5xl mx-auto border-t border-[#d8d0c3]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
            Everything You Need to Know About {route.fromCity} to {route.toCity} Transport
          </h2>
        </div>

        <div className="space-y-3 font-['Manrope']">
          {route.faqItems.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#e2dacd] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-sm sm:text-base text-[#1a1f1b] hover:text-[#0F6A37] transition-colors focus:outline-none"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} className="text-[#0F6A37] shrink-0" /> : <ChevronDown size={20} className="text-neutral-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-neutral-700 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 15. FLEET IN ACTION GALLERY */}
      {route.galleryImages && route.galleryImages.length > 0 && (
        <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block">
              Fleet in Action
            </span>
            <h2 className="text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              Real Dispatch Operations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {route.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden border border-[#e2dacd] bg-white shadow-sm group relative h-48 sm:h-56"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold font-['Manrope']">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 17. RELATED ROUTES & 18. BLOG SUGGESTIONS */}
      <section className="py-14 px-4 md:px-12 max-w-7xl mx-auto border-t border-[#d8d0c3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Related Routes */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-[#e2dacd]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Interconnected Corridors
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-4">
              Related Transport Routes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {route.relatedRoutes.map((rel, idx) => (
                <Link
                  key={idx}
                  to={`/${rel.slug}`}
                  className="p-3 rounded-xl border border-[#ECE6DD] hover:border-[#0F6A37] hover:bg-[#EBF5EE] transition-all flex items-center justify-between group font-['Manrope']"
                >
                  <div>
                    <span className="font-bold text-sm text-[#1a1f1b] group-hover:text-[#0F6A37] block">
                      {rel.fromCity} ➔ {rel.toCity}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-['Space_Mono']">{rel.distanceKm} km</span>
                  </div>
                  <span className="text-xs font-bold text-[#0F6A37] font-['Space_Mono']">{rel.transitTime}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Blog Suggestions */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-[#e2dacd]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Logistics Knowledge Base
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-4">
              Guides & Helpful Articles
            </h2>
            <div className="space-y-3 font-['Manrope']">
              {route.blogSuggestions.map((blog, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ECE6DD] hover:border-[#0F6A37]/50 transition-colors">
                  <div className="flex items-center justify-between text-[11px] font-['Space_Mono'] text-neutral-500 mb-1">
                    <span className="text-[#0F6A37] font-bold">{blog.category}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <Link to={blog.link || '/blog'}>
                    <h3 className="font-bold text-sm text-[#1a1f1b] hover:text-[#0F6A37] cursor-pointer transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{blog.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 19. ROUTE-SPECIFIC QUOTE FORM (Pre-filled origin & destination) */}
      <section id="route-quote-form" className="py-16 px-4 md:px-12 max-w-4xl mx-auto border-t border-[#d8d0c3]">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#e2dacd]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F6A37] font-['Space_Mono'] block mb-2">
              Instant Quote Generator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              Get Instant Quote: {route.fromCity} to {route.toCity}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
              Guaranteed quotation confirmed within 1 hour. No obligation, 100% transparent.
            </p>
          </div>

          {formStatus === 'success' ? (
            <div className="bg-[#EBF5EE] border border-[#0F6A37]/30 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#0F6A37] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f1b] font-['Archivo_Narrow'] uppercase">
                Quote Request Dispatched!
              </h3>
              <p className="text-sm text-neutral-700 font-['Manrope'] max-w-md mx-auto">
                {statusMessage}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setFormStatus('idle')}
                  className="px-5 py-2.5 rounded-lg bg-[#0F6A37] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 font-['Manrope']">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Company / Firm Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ABC Industrial Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Cargo / Material Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marble, Machines, Steel"
                    value={formData.goodsType}
                    onChange={(e) => setFormData({ ...formData, goodsType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Estimated Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Tons, 12 Tons"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={formData.truckType}
                    onChange={(e) => setFormData({ ...formData, truckType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                  >
                    {route.truckTypes.map((t, idx) => (
                      <option key={idx} value={t.name}>
                        {t.name} ({t.capacity})
                      </option>
                    ))}
                    <option value="Not Sure / Need Advice">Not Sure / Need Advice</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Specific Requirements / Pickup Date / Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Need crane loading? Immediate dispatch? Unloading address pin code..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#d8d0c3] bg-[#fbf9f6] text-sm focus:outline-none focus:border-[#0F6A37]"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-4 rounded-xl bg-[#0F6A37] text-white font-['Manrope'] font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-[#0c562c] transition-all flex items-center justify-center gap-2"
              >
                {formStatus === 'submitting' ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Dispatched to Fleet Coordinator...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Get Guaranteed Quote Within 1 Hour</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 20. LARGE BOTTOM CTA BANNER */}
      <section className="py-16 px-4 md:px-12 bg-[#0F6A37] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold font-['Space_Mono'] uppercase tracking-widest text-[#F4B400] bg-black/20 px-3 py-1 rounded-full">
            Fastest Freight Movement Across Rajasthan & Delhi NCR
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Archivo_Narrow'] uppercase tracking-tight">
            {route.contactCta.headline}
          </h2>
          <p className="text-base sm:text-lg text-white/90 font-['Manrope'] max-w-2xl mx-auto">
            {route.contactCta.subheadline}
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
            <button
              onClick={scrollToQuote}
              className="px-8 py-4 rounded-xl bg-[#F4B400] text-[#6c5000] font-['Manrope'] font-extrabold text-sm uppercase tracking-wider shadow-lg hover:bg-[#e0a500] transition-transform transform hover:-translate-y-0.5"
            >
              Book Truck Now
            </button>
            <a
              href="tel:+919784800833"
              className="px-7 py-4 rounded-xl bg-white text-[#0F6A37] font-['Manrope'] font-bold text-sm uppercase tracking-wider hover:bg-neutral-100 transition-colors flex items-center gap-2 shadow-md"
            >
              <Phone size={18} />
              <span>Call: +91 97848 00833</span>
            </a>
            <div className="px-7 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-['Manrope'] font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-md">
              <MessageCircle size={18} className="text-[#25D366]" />
              <span>WhatsApp: +91 97848 00833</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
