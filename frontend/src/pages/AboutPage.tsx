import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Building2, ShieldCheck, Truck, Award, Clock, MapPin,
  CheckCircle2, Phone, MessageCircle, ArrowRight,
  Users, Sparkles, Compass, Cpu
} from 'lucide-react';
import {
  BUSINESS_NAME, PHONE_DISPLAY, WHATSAPP_NUMBER,
  GSTIN, ADDRESS_FULL, BUSINESS_HOURS, PARENT_ENTITY
} from '../lib/constants';
import { useMetaSEO } from '../lib/useMetaSEO';

export const AboutPage: React.FC = () => {
  useMetaSEO({
    title: 'About Us | Shree Krishna Transport Network — Pan-India Freight & Fleet Logistics',
    description: 'Learn about Shree Krishna Transport Network, backed by Shree Krishna Buildtech. Over 12+ years delivering reliable FTL, PTL, and express freight solutions across 53+ corridors from Jaipur, Rajasthan.',
    canonicalPath: '/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${BUSINESS_NAME}`,
      description: 'Corporate overview, fleet capabilities, parent organization, and operational standards of Shree Krishna Transport Network.',
      mainEntity: {
        '@type': 'LogisticsService',
        name: BUSINESS_NAME,
        parentOrganization: {
          '@type': 'Organization',
          name: PARENT_ENTITY,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1D, Lalita Colony, Nahari Ka Naka, Shastri Nagar',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          postalCode: '302016',
          addressCountry: 'IN',
        },
        telephone: `+91${PHONE_DISPLAY.replace(/\D/g, '').slice(-10)}`,
        taxID: GSTIN,
      },
    },
  });

  // Key Operational Stats
  const stats = [
    { value: '12+', label: 'Years Experience', subtext: 'Established freight legacy' },
    { value: '50+', label: 'Verified Fleet Partners', subtext: 'Continuous linehaul availability' },
    { value: '200+', label: 'Industrial Shippers', subtext: 'Corporate & SME trust' },
    { value: '53+', label: 'Direct Corridors', subtext: 'Connecting 28+ states' },
    { value: '10,000+', label: 'Tons Moved / Mo.', subtext: 'Heavy industrial cargo' },
    { value: '99.2%', label: 'On-Time Delivery SLA', subtext: 'Strict transit adherence' },
  ];

  // Core Value Pillars
  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Radical Pricing Transparency',
      desc: 'Transparent pricing with zero hidden surcharges or surprise detention fees. Verified bilty (LR) and E-Way bills issued for every load.',
      accent: 'border-l-4 border-[#0B3A66]',
    },
    {
      icon: Clock,
      title: 'Strict Punctuality & SLAs',
      desc: 'Dedicated dispatch coordinators actively monitor your cargo. 99.2% on-time milestone delivery record across all high-frequency corridors.',
      accent: 'border-l-4 border-[#F5B51B]',
    },
    {
      icon: Truck,
      title: 'Diverse Heavy Fleet Capacity',
      desc: 'From 1.5-ton mini pickups to 32ft multi-axle high-cube containers and 40ft flatbed trailers, we match the ideal vehicle to your payload.',
      accent: 'border-l-4 border-[#0B3A66]',
    },
    {
      icon: Users,
      title: 'Driver Dignity & Safety First',
      desc: 'Our fleet operators undergo comprehensive background checks and vehicle health audits, ensuring cargo security and safe highway transit.',
      accent: 'border-l-4 border-[#F5B51B]',
    },
  ];

  // Fleet Spectrum
  const fleetTypes = [
    {
      category: 'Mini & Light Trucks (LCV)',
      vehicles: 'Mahindra Bolero Maxi Truck / Tata 407 / Eicher Pro 1049',
      capacity: '1.5 – 3.5 Metric Tons',
      useCase: 'Intra-city distribution, rapid factory-to-hub transfers, and parcel consolidation.',
      tag: 'Fast Dispatch',
    },
    {
      category: 'Medium Duty Linehaul (ICV)',
      vehicles: '14ft, 17ft, 19ft & 22ft Open / Closed Container Trucks',
      capacity: '5.0 – 9.0 Metric Tons',
      useCase: 'Textiles, consumer appliances, electrical goods, packaging materials, and general PTL freight.',
      tag: 'Most Popular',
    },
    {
      category: 'Heavy Multi-Axle Trucks (HCV)',
      vehicles: 'Taurus 10-Wheelers, 12-Wheelers & 14-Wheelers',
      capacity: '16.0 – 25.0 Metric Tons',
      useCase: 'Stone, marble, cement, structural steel, chemical drums, and raw industrial commodities.',
      tag: 'Heavy Load',
    },
    {
      category: 'High-Cube Express Containers',
      vehicles: '32ft Single Axle (SXL) & Multi-Axle (MXL) Containers',
      capacity: '7.5 – 15.0 Metric Tons (Up to 1,900 cu. ft.)',
      useCase: 'FMCG, e-commerce express, electronics, pharmaceuticals, and weather-sensitive cargo.',
      tag: 'Moisture Safe',
    },
    {
      category: 'Specialized Trailers & Low-Beds',
      vehicles: '40ft High-Bed & Low-Bed Trailers / Mechanical Steerable',
      capacity: 'Up to 35 Metric Tons',
      useCase: 'Over-Dimensional Cargo (ODC), heavy machinery, cranes, transformers, and industrial infrastructure equipment.',
      tag: 'Project Cargo',
    },
  ];

  // Industrial Sectors Served
  const industries = [
    { name: 'Textiles & Garments', hub: 'Jaipur, Sanganer, Bhilwara' },
    { name: 'Marble, Granite & Ceramic', hub: 'Kishangarh, Makrana, Udaipur' },
    { name: 'Auto Components & Engineering', hub: 'Bhiwadi, Neemrana, Gurugram' },
    { name: 'Agricultural Commodities', hub: 'Kota, Alwar, Ganganagar' },
    { name: 'Chemicals & Minerals', hub: 'Udaipur, Jodhpur, Gujarat belt' },
    { name: 'FMCG & Consumer Durables', hub: 'PAN-India Retail Corridors' },
  ];

  return (
    <div className="min-h-screen bg-[#ECE6DD] py-6 md:py-10 px-4 md:px-12">
      <div className="max-w-6xl xl:max-w-7xl mx-auto space-y-8 md:space-y-12">

        {/* 1. Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['Manrope'] text-xs font-bold text-[#0B3A66] hover:text-[#071F35] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="font-['Space_Mono'] text-xs text-[#5a665c]">
            <Link to="/" className="hover:text-[#0B3A66] transition-colors">Home</Link>
            {' / '}
            <span className="text-[#0B3A66] font-bold">About Us</span>
          </div>
        </div>

        {/* 2. Hero Section: Corporate Headline & Authority Banner */}
        <div className="relative overflow-hidden bg-[#071F35] text-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl border border-[#0B3A66]/60">
          {/* Subtle Background Glow */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#0B3A66] rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute right-1/4 -bottom-24 w-72 h-72 bg-[#F5B51B] rounded-full blur-3xl opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F5B51B] font-['Space_Mono'] text-xs font-bold">
              <Sparkles size={14} className="text-[#F5B51B]" />
              <span>Backed by {PARENT_ENTITY}</span>
            </div>

            <h1 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight text-white">
              Engineering Reliable Freight Across India
            </h1>

            <p className="font-['Manrope'] text-sm sm:text-base md:text-lg text-[#D9E4EE] leading-relaxed">
              <strong>Shree Krishna Transport Network</strong> is a premier freight facilitator and transportation company based in Jaipur, Rajasthan. With over 12 years of operational excellence, we combine deep highway logistics expertise with modern fleet coordination to ensure transparent, dependable, and timely goods movement for India’s growing enterprises.
            </p>

            {/* Micro Trust Pills */}
            <div className="pt-3 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-['Manrope'] font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#85B7EB]">
                <CheckCircle2 size={14} className="text-[#F5B51B]" />
                <span>GSTIN: {GSTIN}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#85B7EB]">
                <ShieldCheck size={14} className="text-[#25D366]" />
                <span>100% E-Way Bill Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#85B7EB]">
                <Clock size={14} className="text-[#F5B51B]" />
                <span>24/7 Dispatch Coordination</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Operational Performance Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#c5beb4]/70 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="font-['Space_Mono'] text-2xl sm:text-3xl font-extrabold text-[#0B3A66] tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2">
                <div className="font-['Archivo_Narrow'] text-xs sm:text-sm font-bold uppercase text-[#1a1f1b]">
                  {stat.label}
                </div>
                <div className="font-['Manrope'] text-[11px] text-[#5a665c] leading-tight mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Company Heritage, Origin & Parent Entity Synergy */}
        <div className="bg-white border border-[#c5beb4] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] text-xs font-bold">
                <Building2 size={13} />
                <span>Our Roots &amp; Evolution</span>
              </div>

              <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-[#1a1f1b] tracking-tight">
                From Local Linehauls to a Pan-India Freight Network
              </h2>

              <p className="font-['Manrope'] text-sm text-[#4A554C] leading-relaxed">
                Headquartered in Jaipur, Shree Krishna Transport Network was established with a clear mission: to eliminate the ambiguity, unexpected surcharges, and communication gaps prevalent in traditional road transport. Operating at the crossroads of Rajasthan's key industrial corridors — connecting Jaipur, Bhiwadi, Jodhpur, and Kota to major national economic hubs — we have steadily expanded to serve over 53 high-volume commercial routes across India.
              </p>

              <p className="font-['Manrope'] text-sm text-[#4A554C] leading-relaxed">
                As a transportation arm operating under the strong legacy of <strong>{PARENT_ENTITY}</strong>, our operations benefit from robust capital discipline, long-standing industrial trust, and rigorous quality standards. We do not just move cargo; we manage end-to-end linehaul commitments with verified documentation, dedicated dispatch desks, and complete E-Way bill accountability.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#ECE6DD]/60 border border-[#dcd3c5]">
                  <div className="font-['Archivo_Narrow'] text-xs font-bold uppercase text-[#0B3A66] flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#0B3A66]" />
                    <span>Central Hub Jaipur</span>
                  </div>
                  <p className="font-['Manrope'] text-xs text-[#5a665c] mt-1">
                    Direct access to Sitapura, VKI, Nahari Ka Naka &amp; Bindayaka industrial clusters.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#ECE6DD]/60 border border-[#dcd3c5]">
                  <div className="font-['Archivo_Narrow'] text-xs font-bold uppercase text-[#0B3A66] flex items-center gap-1.5">
                    <Award size={14} className="text-[#F5B51B]" />
                    <span>Parentage Reliability</span>
                  </div>
                  <p className="font-['Manrope'] text-xs text-[#5a665c] mt-1">
                    Financial security and organizational integrity backed by {PARENT_ENTITY}.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual Image Card */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-lg border border-[#c5beb4] h-80 sm:h-96">
              <img
                src="/images/team_logistics.jpg"
                alt="Shree Krishna Transport Operations Team and Dispatch Desk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F35]/90 via-[#071F35]/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="font-['Space_Mono'] text-xs font-bold text-[#F5B51B] uppercase tracking-wider">
                  Operational Control
                </span>
                <h3 className="font-['Archivo_Narrow'] text-xl font-bold uppercase tracking-tight text-white mt-1">
                  Dedicated Dispatch &amp; Highway Supervision
                </h3>
                <p className="font-['Manrope'] text-xs text-neutral-300 mt-1">
                  Coordinators working round-the-clock for real-time truck placement and delivery confirmations.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 5. Mission, Vision & Core Values */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#c5beb4]/50 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold mb-2 shadow-xs">
              <Compass size={13} className="text-[#0B3A66]" />
              <span>Guiding Principles</span>
            </div>
            <h2 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl font-extrabold uppercase text-[#1a1f1b] tracking-tight">
              Our Mission, Vision &amp; Pillars
            </h2>
            <p className="font-['Manrope'] text-xs sm:text-sm text-[#5a665c] mt-1">
              Building lasting supply chain partnerships based on predictable service and ethical operations.
            </p>
          </div>

          {/* Mission & Vision Dual Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0B3A66] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#0B3A66] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F5B51B] mb-4">
                  <Compass size={22} />
                </div>
                <h3 className="font-['Archivo_Narrow'] text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                  Our Mission
                </h3>
                <p className="font-['Manrope'] text-xs sm:text-sm text-[#D9E4EE] leading-relaxed mt-3">
                  To provide seamless, highly reliable, and digitally accountable road transport solutions that connect India’s manufacturing heartlands with major consumer markets — ensuring on-time delivery, cargo safety, and zero administrative friction.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-['Space_Mono'] text-[#85B7EB]">
                <CheckCircle2 size={14} className="text-[#F5B51B]" />
                <span>Zero Pilferage • Guaranteed Placement</span>
              </div>
            </div>

            <div className="bg-white text-[#1a1f1b] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c5beb4] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66] mb-4">
                  <Award size={22} />
                </div>
                <h3 className="font-['Archivo_Narrow'] text-xl sm:text-2xl font-bold uppercase text-[#1a1f1b] tracking-tight">
                  Our Vision
                </h3>
                <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] leading-relaxed mt-3">
                  To establish Shree Krishna Transport Network as Northern India’s benchmark logistics provider, recognized for uncompromising integrity, fleet technological integration, and progressive welfare for our highway driver community.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e2dad0] flex items-center gap-2 text-xs font-['Space_Mono'] text-[#0B3A66]">
                <CheckCircle2 size={14} className="text-[#0B3A66]" />
                <span>Pan-India Presence • Digital Transparency</span>
              </div>
            </div>
          </div>

          {/* 4 Core Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {coreValues.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl p-5 border border-[#c5beb4]/70 shadow-xs hover:shadow-md transition-all ${val.accent}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#EBF2F9] flex items-center justify-center text-[#0B3A66] mb-3">
                    <Icon size={18} />
                  </div>
                  <h4 className="font-['Archivo_Narrow'] text-base font-bold uppercase text-[#1a1f1b] tracking-tight">
                    {val.title}
                  </h4>
                  <p className="font-['Manrope'] text-xs text-[#5a665c] leading-relaxed mt-1.5">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Comprehensive Fleet Spectrum & Capacity */}
        <div className="bg-white border border-[#c5beb4] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e2dad0] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] text-xs font-bold mb-1">
                <Truck size={13} />
                <span>Fleet Infrastructure</span>
              </div>
              <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-[#1a1f1b] tracking-tight">
                Complete Commercial Fleet Capabilities
              </h2>
            </div>
            <Link
              to="/book-truck"
              className="inline-flex items-center gap-1.5 text-xs font-['Manrope'] font-bold text-[#0B3A66] hover:text-[#071F35] uppercase tracking-wider transition-colors shrink-0"
            >
              <span>Check Vehicle Rates</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="font-['Manrope'] text-xs sm:text-sm text-[#4A554C] max-w-3xl leading-relaxed">
            Whether booking Full Truck Load (FTL) for factory dispatch or scheduling Part Truck Load (PTL) consignments, our network deploys verified commercial vehicles tailored to cargo dimensions, payload weight, and weatherproofing requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {fleetTypes.map((truck, idx) => (
              <div
                key={idx}
                className="bg-[#fcfaf7] border border-[#dcd3c5] rounded-2xl p-5 hover:border-[#0B3A66]/50 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-['Space_Mono'] font-bold px-2 py-0.5 rounded bg-[#0B3A66] text-white uppercase">
                      {truck.tag}
                    </span>
                    <span className="font-['Space_Mono'] text-xs font-bold text-[#0B3A66]">
                      {truck.capacity}
                    </span>
                  </div>
                  <h3 className="font-['Archivo_Narrow'] text-lg font-bold uppercase text-[#1a1f1b] leading-tight">
                    {truck.category}
                  </h3>
                  <div className="text-[11px] font-['Space_Mono'] text-[#5a665c] mt-1 font-semibold">
                    {truck.vehicles}
                  </div>
                  <p className="font-['Manrope'] text-xs text-[#6b786d] leading-relaxed mt-2">
                    {truck.useCase}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#e8e0d4]">
                  <Link
                    to={`/book-truck?truckType=${encodeURIComponent(truck.category)}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-['Manrope'] font-bold text-[#0B3A66] hover:text-[#071F35] uppercase tracking-wider"
                  >
                    <span>Request This Vehicle</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}

            {/* Visual Photo Card within the Grid */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#dcd3c5] min-h-[220px]">
              <img
                src="/images/warehouse_delivery.jpg"
                alt="Freight Hub Material Handling"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F35]/95 via-[#071F35]/40 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="font-['Space_Mono'] text-[10px] font-bold text-[#F5B51B] uppercase tracking-wider">
                  Hub Infrastructure
                </span>
                <h4 className="font-['Archivo_Narrow'] text-base font-bold uppercase text-white mt-1">
                  Loading Bay &amp; Cross-Docking Facilities
                </h4>
                <p className="font-['Manrope'] text-[11px] text-neutral-300 mt-1">
                  Systematic material handling to eliminate damage during transit and linehaul transshipment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Key Industrial Sectors & Rajasthan Economic Synergy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left: Sectors list (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#c5beb4] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] text-xs font-bold mb-2">
                <Building2 size={13} />
                <span>Industrial Specialization</span>
              </div>
              <h2 className="font-['Archivo_Narrow'] text-2xl sm:text-3xl font-extrabold uppercase text-[#1a1f1b] tracking-tight mb-2">
                Serving Core Manufacturing Industries
              </h2>
              <p className="font-['Manrope'] text-xs sm:text-sm text-[#5a665c] leading-relaxed mb-5">
                Our operations team understands the distinct cargo handling nuances, lashing protocols, and documentation required across Rajasthan’s key production sectors:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industries.map((ind, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#ECE6DD]/40 border border-[#dcd3c5] flex items-start gap-2.5"
                  >
                    <CheckCircle2 size={16} className="text-[#0B3A66] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-['Archivo_Narrow'] text-sm font-bold uppercase text-[#1a1f1b]">
                        {ind.name}
                      </div>
                      <div className="font-['Manrope'] text-[11px] text-[#6b786d]">
                        Primary Hubs: {ind.hub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2dad0] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-['Manrope'] text-[#5a665c]">
                Need dedicated contracts for continuous monthly movements?
              </span>
              <Link
                to="/contact#enquiry"
                className="font-['Manrope'] font-bold text-[#0B3A66] hover:underline uppercase tracking-wider"
              >
                Inquire Corporate Rates →
              </Link>
            </div>
          </div>

          {/* Right: Technology & Compliance Banner (5 cols) */}
          <div className="lg:col-span-5 bg-[#071F35] text-white border border-[#0B3A66] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F5B51B] font-['Space_Mono'] text-xs font-bold">
                <Cpu size={13} />
                <span>Statutory &amp; Tech Standards</span>
              </div>

              <h3 className="font-['Archivo_Narrow'] text-2xl font-extrabold uppercase text-white tracking-tight">
                Compliant, Tracked &amp; Digitally Accountable
              </h3>

              <ul className="space-y-3 font-['Manrope'] text-xs text-[#D9E4EE]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Registered GST Compliance:</strong> Full input tax credit facilitation with valid GST invoice ({GSTIN}).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>E-Way Bill &amp; Bilty:</strong> Instant digital LR issuance before vehicle moves out of factory premises.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Transit Milestones:</strong> Real-time location updates directly coordinated via WhatsApp and SMS helpline.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                  <span><strong>Transit Insurance Assistance:</strong> Optional risk coverage with top national underwriters for high-value freight.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <img
                src="/images/smart_tracking.jpg"
                alt="Technology enabled logistics tracking"
                className="w-full h-32 object-cover rounded-xl border border-white/10"
              />
            </div>
          </div>

        </div>

        {/* 8. Corporate Information & Registered Office Directory */}
        <div className="bg-white border border-[#c5beb4] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="border-b border-[#e2dad0] pb-4 mb-6">
            <h2 className="font-['Archivo_Narrow'] text-2xl font-extrabold uppercase text-[#1a1f1b] tracking-tight">
              Corporate Entity &amp; Registered Office
            </h2>
            <p className="font-['Manrope'] text-xs text-[#5a665c] mt-0.5">
              Official registration and dispatch coordination details for commercial shippers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <div className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#5a665c]">
                Legal Entity
              </div>
              <div className="font-['Archivo_Narrow'] text-base font-bold text-[#1a1f1b] uppercase mt-0.5">
                {BUSINESS_NAME}
              </div>
              <div className="font-['Manrope'] text-xs text-[#0B3A66] font-semibold mt-1">
                Parent: {PARENT_ENTITY}
              </div>
            </div>

            <div>
              <div className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#5a665c]">
                Goods &amp; Services Tax (GSTIN)
              </div>
              <div className="font-['Space_Mono'] text-sm font-extrabold text-[#0B3A66] mt-0.5">
                {GSTIN}
              </div>
              <div className="font-['Manrope'] text-xs text-[#25D366] font-semibold mt-1">
                Active &amp; Verified Taxpayer
              </div>
            </div>

            <div>
              <div className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#5a665c]">
                Registered Headquarters
              </div>
              <div className="font-['Manrope'] text-xs text-[#1a1f1b] font-medium leading-relaxed mt-0.5">
                {ADDRESS_FULL}
              </div>
            </div>

            <div>
              <div className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#5a665c]">
                Dispatch Desk &amp; Hours
              </div>
              <div className="font-['Space_Mono'] text-xs font-bold text-[#1a1f1b] mt-0.5">
                {PHONE_DISPLAY}
              </div>
              <div className="font-['Manrope'] text-xs text-[#5a665c] mt-1">
                {BUSINESS_HOURS} (24/7 Helpline)
              </div>
            </div>
          </div>
        </div>

        {/* 9. High-Impact Call to Action */}
        <div className="bg-gradient-to-r from-[#071F35] via-[#0B3A66] to-[#071F35] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#0B3A66] text-center space-y-5">
          <h2 className="font-['Archivo_Narrow'] text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Ready to Move Your Freight with Certainty?
          </h2>
          <p className="font-['Manrope'] text-xs sm:text-sm md:text-base text-[#D9E4EE] max-w-2xl mx-auto leading-relaxed">
            Get transparent rate estimates within 1 hour, or speak directly with our senior dispatch coordinators in Jaipur.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/book-truck"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5B51B] hover:bg-[#E0A212] text-[#071F35] font-['Manrope'] font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <Truck size={16} />
              <span>Get Free Freight Quote</span>
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Shree Krishna Transport, I would like to inquire about freight booking and vehicle availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-['Manrope'] font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Dispatch</span>
            </a>

            <a
              href={`tel:+91${PHONE_DISPLAY.replace(/\D/g, '').slice(-10)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-['Manrope'] font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors"
            >
              <Phone size={15} />
              <span>Call {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
