import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, User, Sparkles, MessageCircle, Truck } from 'lucide-react';
import { getAllBlogPosts } from '../data/blogData';
import { useMetaSEO } from '../lib/useMetaSEO';

export const BlogIndexPage: React.FC = () => {
  useMetaSEO({
    title: 'Logistics Intelligence Blog & Freight Rate Guides | Shree Krishna Transport',
    description: 'Expert guides on truck transport rates, FTL vs PTL vehicle selection, and inter-state E-Way bill rules by Shree Krishna Transport Jaipur.',
    canonicalPath: '/blog',
    ogImage: '/images/hero-truck-1.webp',
  });

  const posts = getAllBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'All Articles', value: 'all' },
    { label: 'Pricing Guides', value: 'Pricing Guide' },
    { label: 'Route Intelligence', value: 'Route Intelligence' },
    { label: 'Fleet Operations', value: 'Fleet Operations' },
    { label: 'Compliance & Taxes', value: 'Compliance & Taxes' },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.keyTakeaways.some((k) => k.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });
  

  const featuredPost = posts[0];

  return (
    <div className="w-full bg-[#ECE6DD] min-h-screen text-[#1a1f1b]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E4DDD3] to-[#ECE6DD] py-12 md:py-16 px-4 md:px-12 border-b border-[#d8d0c3]">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F6A37]/10 text-[#0F6A37] font-['Space_Mono'] text-xs font-bold border border-[#0F6A37]/20">
            <Sparkles size={14} className="text-[#F4B400]" />
            SHREE KRISHNA LOGISTICS INTELLIGENCE & BLOG
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] tracking-tight">
            Freight Rates, Route Guides & Transport Insights
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-['Manrope'] max-w-2xl mx-auto">
            Practical pricing breakdowns, RTO compliance rules, and corridor advice from Rajasthan’s trusted freight operators.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search freight rates, Delhi corridor, 14ft trucks, E-Way Bill..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#d8d0c3] text-sm shadow-sm focus:outline-none focus:border-[#0F6A37] font-['Manrope']"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[#d8d0c3]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-['Manrope'] uppercase tracking-wider transition-all ${
                  selectedCategory === c.value
                    ? 'bg-[#0F6A37] text-white shadow-sm'
                    : 'bg-white text-neutral-700 hover:bg-[#EBF5EE] border border-[#d8d0c3]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <span className="font-['Space_Mono'] text-xs uppercase font-bold text-neutral-500">
            Showing {filteredPosts.length} Articles
          </span>
        </div>

        {/* Featured Article Card (if no search active) */}
        {!searchQuery && selectedCategory === 'all' && featuredPost && (
          <div className="mb-12 bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-xl hover:border-[#0F6A37] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FFF9E6] text-[#8a6500] text-xs font-bold font-['Space_Mono'] uppercase border border-[#F4B400]/40">
                  Featured Master Guide
                </span>
                <span className="text-xs text-neutral-500 font-['Space_Mono'] flex items-center gap-1">
                  <Clock size={13} /> {featuredPost.readTime}
                </span>
              </div>

              <Link to={`/blog/${featuredPost.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] hover:text-[#0F6A37] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-sm text-neutral-600 font-['Manrope'] leading-relaxed">
                {featuredPost.summary}
              </p>

              {/* Key Takeaways snippet */}
              <div className="space-y-1.5 pt-2">
                {featuredPost.keyTakeaways.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 font-['Manrope']">
                    <span className="text-[#0F6A37] font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-['Manrope']">
                  <User size={14} className="text-[#0F6A37]" />
                  <span className="font-semibold text-neutral-800">{featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.publishDate}</span>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-[#0F6A37] hover:bg-[#0c532b] text-white text-xs font-bold font-['Manrope'] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Read Guide</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#e2dacd] relative group">
              <img
                src={featuredPost.bannerImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <span className="text-white text-xs font-bold font-['Space_Mono'] bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                  Jaipur ➔ Delhi NCR Rate List
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl p-6 border border-[#e2dacd] shadow-sm hover:shadow-lg transition-all hover:border-[#0F6A37] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF5EE] text-[#0F6A37] text-[10px] font-bold font-['Space_Mono'] uppercase">
                    {post.category}
                  </span>
                  <span className="text-xs font-['Space_Mono'] text-neutral-500 flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-bold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] group-hover:text-[#0F6A37] transition-colors leading-snug mb-2.5">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-neutral-600 font-['Manrope'] leading-relaxed line-clamp-3 mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ece6dd] flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-['Manrope']">
                  {post.publishDate}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#0F6A37] hover:underline font-['Space_Mono'] flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Rate Cards Banner Cross-Promo */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-[#e2dacd] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F6A37] font-['Space_Mono'] uppercase mb-1">
              <Truck size={15} /> DIRECT CARRIER PRICING
            </div>
            <h3 className="text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
              Need Official Transport Rates for Your Consignment?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
              Check our verified rate cards for Delhi NCR and 18 Pan-India corridors, or get a quote in 1 hour on WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/routes"
              className="px-5 py-3 rounded-xl bg-[#f4eee6] hover:bg-[#e8e0d4] text-xs font-bold text-[#1a1f1b] font-['Manrope'] uppercase tracking-wider transition-colors"
            >
              Explore Routes
            </Link>
            <a
              href="https://wa.me/919784800833?text=Hi%20Shree%20Krishna%20Transport,%20I%20need%20a%20freight%20quote%20from%20your%20blog."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#0F6A37] hover:bg-[#0c532b] text-white text-xs font-bold font-['Manrope'] uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Quote</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
