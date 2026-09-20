import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  ChevronRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Truck,
  MapPin,
  ChevronDown,
  ChevronUp,
  Share2,
  Sparkles,
  Info,
} from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts } from '../data/blogData';
import { useMetaSEO } from '../lib/useMetaSEO';
import {
  DELHI_NCR_7_TON_RATES,
  DELHI_NCR_15_TON_RATES,
  PAN_INDIA_RATES,
  PARCEL_COURIER_FREIGHT_RATES,
  RATE_CARD_META,
} from '../data/rateCardData';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic SEO meta tags and Article + FAQ schema
  useMetaSEO({
    title: post ? post.seoTitle : 'Article Not Found | Shree Krishna Transport',
    description: post ? post.metaDescription : 'Logistics blog article by Shree Krishna Transport.',
    canonicalPath: post ? `/blog/${post.slug}` : '/blog',
    ogImage: post?.bannerImage || '/images/new home.webp',
    type: 'article',
    structuredData: post
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.metaDescription,
              image: post.bannerImage.startsWith('http')
                ? post.bannerImage
                : `https://www.shree-krishna-transport.org${post.bannerImage}`,
              author: {
                '@type': 'Person',
                name: post.author,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Shree Krishna Transport',
                url: 'https://www.shree-krishna-transport.org',
              },
              mainEntityOfPage: `https://www.shree-krishna-transport.org/blog/${post.slug}`,
            },
            ...(post.faqs && post.faqs.length > 0
              ? [
                  {
                    '@type': 'FAQPage',
                    mainEntity: post.faqs.map((faq) => ({
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
        }
      : undefined,
  });

  if (!post) {
    const allPosts = getAllBlogPosts();
    return (
      <div className="w-full bg-[#ECE6DD] min-h-screen py-20 px-4 text-center">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-[#e2dacd] shadow-lg">
          <div className="w-14 h-14 rounded-full bg-[#FFF9E6] text-[#B8860B] flex items-center justify-center mx-auto mb-4">
            <Info size={28} />
          </div>
          <h1 className="text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
            Article Not Found
          </h1>
          <p className="text-sm text-neutral-600 font-['Manrope'] mt-2 mb-6">
            We couldn't locate the blog article "{slug}". Check out our latest freight guides below.
          </p>
          <div className="space-y-2 text-left mb-6">
            {allPosts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="block p-3 rounded-xl border border-[#ece6dd] hover:border-[#0B3A66] hover:bg-[#EBF2F9] text-xs font-bold text-[#1a1f1b] transition-all"
              >
                {p.title}
              </Link>
            ))}
          </div>
          <Link
            to="/blog"
            className="px-6 py-2.5 rounded-xl bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] uppercase tracking-wider"
          >
            Back to All Guides
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const generateWhatsAppUrl = (text: string) => {
    return `https://wa.me/919784800833?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-[#ECE6DD] min-h-screen text-[#1a1f1b]">
      {/* Top Breadcrumbs */}
      <div className="bg-[#E4DDD3] border-b border-[#d8d0c3] py-3 px-4 md:px-12 text-xs font-['Manrope'] text-neutral-600">
        <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[#0B3A66]">Home</Link>
          <ChevronRight size={13} />
          <Link to="/blog" className="hover:text-[#0B3A66]">Logistics Blog</Link>
          <ChevronRight size={13} />
          <span className="font-bold text-[#1a1f1b] truncate max-w-xs sm:max-w-md">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-gradient-to-b from-[#E4DDD3] to-[#ECE6DD] pt-10 pb-12 px-4 md:px-12 border-b border-[#d8d0c3]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0B3A66] text-white text-xs font-bold font-['Space_Mono'] uppercase">
              {post.category}
            </span>
            <span className="text-xs font-['Space_Mono'] text-neutral-600 flex items-center gap-1">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 font-['Manrope'] leading-relaxed">
            {post.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#d8d0c3]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B3A66] text-white flex items-center justify-center font-bold text-sm font-['Space_Mono']">
                DS
              </div>
              <div>
                <span className="text-xs font-bold text-[#1a1f1b] font-['Manrope'] block">
                  {post.author}
                </span>
                <span className="text-[11px] text-neutral-500 font-['Manrope']">
                  {post.authorRole} • {post.publishDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#d8d0c3] text-xs font-bold font-['Manrope'] hover:bg-neutral-50 flex items-center gap-1.5 transition-colors"
              >
                <Share2 size={13} />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
              <a
                href={generateWhatsAppUrl(`Hi, I am reading your article "${post.title}" and need freight consultation.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#25D366] text-white text-xs font-bold font-['Manrope'] hover:bg-[#20ba59] flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle size={13} />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar Layout */}
      <div className="max-w-5xl mx-auto px-4 md:px-12 py-12">
        {/* Key Takeaways Box */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e2dacd] shadow-md mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase font-['Space_Mono'] text-[#0B3A66] mb-3">
            <Sparkles size={16} className="text-[#F5B51B]" />
            <span>Executive Summary & Key Takeaways</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {post.keyTakeaways.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-['Manrope']">
                <CheckCircle2 size={16} className="text-[#0B3A66] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Body Sections */}
        <article className="space-y-12">
          {post.sections.map((section, sIdx) => (
            <section key={sIdx} className="bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-sm space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-neutral-700 font-['Manrope'] leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Bullet Points if any */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 pt-2">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-['Manrope']">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B3A66] shrink-0 mt-2" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Embedded Rate Table: Delhi 7 Ton */}
              {section.rateTableType === 'delhi-7ton' && (
                <div className="pt-4">
                  <div className="overflow-x-auto rounded-2xl border border-[#e2dacd]">
                    <table className="w-full text-left font-['Manrope'] text-sm">
                      <thead>
                        <tr className="bg-[#FFF9E6] border-b border-[#F5B51B]/40 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                          <th className="py-3 px-4">S. No.</th>
                          <th className="py-3 px-4">Vehicle Model</th>
                          <th className="py-3 px-4">Payload Spec</th>
                          <th className="py-3 px-4">Ideal For</th>
                          <th className="py-3 px-4 text-right">Official Rate (₹)</th>
                          <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ece6dd]">
                        {DELHI_NCR_7_TON_RATES.map((item) => (
                          <tr key={item.sNo} className="hover:bg-[#fbf9f6]">
                            <td className="py-3 px-4 font-['Space_Mono'] text-xs text-neutral-500">{item.sNo}.</td>
                            <td className="py-3 px-4 font-bold text-[#1a1f1b] flex items-center gap-2">
                              <Truck size={15} className="text-[#0B3A66]" />
                              <span>{item.vehicleType}</span>
                            </td>
                            <td className="py-3 px-4 text-xs font-['Space_Mono'] text-neutral-600">{item.capacity}</td>
                            <td className="py-3 px-4 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                            <td className="py-3 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] whitespace-nowrap">
                              ₹{item.rateRange}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <a
                                href={generateWhatsAppUrl(`Hi Shree Krishna Transport, I want to book ${item.vehicleType} for Jaipur to Delhi NCR.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-lg bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#0c532b]"
                              >
                                Book
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-['Manrope'] mt-2 italic">
                    *{RATE_CARD_META.termsNote}
                  </p>
                </div>
              )}

              {/* Embedded Rate Table: Delhi 15 Ton */}
              {section.rateTableType === 'delhi-15ton' && (
                <div className="pt-4">
                  <div className="overflow-x-auto rounded-2xl border border-[#e2dacd]">
                    <table className="w-full text-left font-['Manrope'] text-sm">
                      <thead>
                        <tr className="bg-[#FFF9E6] border-b border-[#F5B51B]/40 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                          <th className="py-3 px-4">S. No.</th>
                          <th className="py-3 px-4">Heavy Vehicle Type</th>
                          <th className="py-3 px-4">Payload Capacity</th>
                          <th className="py-3 px-4">Recommended Freight</th>
                          <th className="py-3 px-4 text-right">Official Rate (₹)</th>
                          <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ece6dd]">
                        {DELHI_NCR_15_TON_RATES.map((item) => (
                          <tr key={item.sNo} className="hover:bg-[#fbf9f6]">
                            <td className="py-3 px-4 font-['Space_Mono'] text-xs text-neutral-500">{item.sNo}.</td>
                            <td className="py-3 px-4 font-bold text-[#1a1f1b] flex items-center gap-2">
                              <Truck size={15} className="text-[#0B3A66]" />
                              <span>{item.vehicleType}</span>
                            </td>
                            <td className="py-3 px-4 text-xs font-['Space_Mono'] text-neutral-600">{item.capacity}</td>
                            <td className="py-3 px-4 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                            <td className="py-3 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] whitespace-nowrap">
                              ₹{item.rateRange}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <a
                                href={generateWhatsAppUrl(`Hi Shree Krishna Transport, I want to book ${item.vehicleType} (${item.capacity}) for Jaipur to Delhi NCR.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-lg bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#0c532b]"
                              >
                                Book
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-['Manrope'] mt-2 italic">
                    *{RATE_CARD_META.termsNote}
                  </p>
                </div>
              )}

              {/* Embedded Rate Table: Pan-India 18 Cities */}
              {section.rateTableType === 'pan-india' && (
                <div className="pt-4">
                  <div className="overflow-x-auto rounded-2xl border border-[#e2dacd]">
                    <table className="w-full text-left font-['Manrope'] text-sm">
                      <thead>
                        <tr className="bg-[#FFF9E6] border-b border-[#F5B51B]/40 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                          <th className="py-3 px-4">S. No.</th>
                          <th className="py-3 px-4">Destination (City)</th>
                          <th className="py-3 px-4">Rate (Load Upto 7 Ton)</th>
                          <th className="py-3 px-4">State</th>
                          <th className="py-3 px-4 text-right">19 ft Rate (₹)</th>
                          <th className="py-3 px-4 text-right">22 ft Rate (₹)</th>
                          <th className="py-3 px-4 text-center">Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ece6dd]">
                        {PAN_INDIA_RATES.map((item) => (
                          <tr key={item.sNo} className="hover:bg-[#fbf9f6]">
                            <td className="py-3 px-4 font-['Space_Mono'] text-xs text-neutral-500">{item.sNo}.</td>
                            <td className="py-3 px-4 font-bold text-[#1a1f1b] flex items-center gap-1.5">
                              <MapPin size={14} className="text-[#F5B51B]" />
                              <span>{item.destination}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-0.5 rounded-lg bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] font-bold text-xs">
                                {item.rateRange}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-xs font-['Manrope'] text-neutral-600">{item.state}</td>
                            <td className="py-3 px-4 text-right font-bold text-[#1a1f1b] font-['Space_Mono'] text-xs sm:text-sm">
                              {item.rate19ftFormatted}
                            </td>
                            <td className="py-3 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] text-xs sm:text-sm">
                              {item.rate22ftFormatted}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <a
                                href={generateWhatsAppUrl(`Hi Shree Krishna Transport, I need freight quotation for Jaipur to ${item.destination} (Rate: ${item.rateRange}).`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-lg bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#0c532b]"
                              >
                                Quote
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-['Manrope'] mt-2 italic">
                    *{RATE_CARD_META.termsNote}
                  </p>
                </div>
              )}

              {/* Embedded Rate Table: Table C: Parcel / Courier & Freight */}
              {section.rateTableType === 'parcel-courier' && (
                <div className="pt-4">
                  <div className="overflow-x-auto rounded-2xl border border-[#e2dacd]">
                    <table className="w-full text-left font-['Manrope'] text-sm">
                      <thead>
                        <tr className="bg-[#FFF9E6] border-b border-[#F5B51B]/40 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                          <th className="py-3 px-4">S. No.</th>
                          <th className="py-3 px-4">Service Type</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Recommended Freight</th>
                          <th className="py-3 px-4 text-right">Official Rate</th>
                          <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ece6dd]">
                        {PARCEL_COURIER_FREIGHT_RATES.map((item) => (
                          <tr key={item.sNo} className="hover:bg-[#fbf9f6]">
                            <td className="py-3 px-4 font-['Space_Mono'] text-xs text-neutral-500">{item.sNo}.</td>
                            <td className="py-3 px-4 font-bold text-[#1a1f1b]">
                              <span>{item.serviceType}</span>
                            </td>
                            <td className="py-3 px-4 text-xs font-['Space_Mono']">
                              <span className="px-2 py-0.5 rounded bg-[#EBF2F9] text-[#0B3A66] font-semibold">
                                {item.badge}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                            <td className="py-3 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] text-sm sm:text-base whitespace-nowrap">
                              {item.rate}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <a
                                href={generateWhatsAppUrl(`Hi Shree Krishna Transport, I want to book parcel/courier service: ${item.serviceType} (${item.rate}).`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-lg bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#0c532b]"
                              >
                                Book
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-['Manrope'] mt-2 italic">
                    *Parcel rates are door-to-door per-kg surface or express transit. Minimum billable weight may apply based on destination.
                  </p>
                </div>
              )}

              {/* Callout Box */}
              {section.calloutBox && (
                <div className="p-5 rounded-2xl bg-[#EBF2F9] border border-[#0B3A66]/20 space-y-1.5 mt-4">
                  {section.calloutBox.badge && (
                    <span className="text-[10px] font-bold font-['Space_Mono'] text-[#0B3A66] uppercase tracking-wider block">
                      {section.calloutBox.badge}
                    </span>
                  )}
                  <h4 className="font-bold text-sm text-[#1a1f1b] font-['Archivo_Narrow'] uppercase">
                    {section.calloutBox.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 font-['Manrope'] leading-relaxed">
                    {section.calloutBox.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* FAQs */}
        {post.faqs.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B3A66] font-['Space_Mono'] block mb-1">
                Frequently Answered
              </span>
              <h3 className="text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                Questions Shippers Ask About This Topic
              </h3>
            </div>

            <div className="space-y-3 font-['Manrope']">
              {post.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-[#ece6dd] overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-5 py-3.5 flex items-center justify-between font-bold text-sm text-[#1a1f1b] hover:text-[#0B3A66] transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp size={18} className="text-[#0B3A66] shrink-0" /> : <ChevronDown size={18} className="text-neutral-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2.5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Fast Action WhatsApp Quote Card */}
        <div className="mt-12 bg-gradient-to-r from-[#071F35] to-[#242b25] text-white rounded-3xl p-8 border border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5B51B] font-['Space_Mono'] block">
              Quotation in 1 Hour on WhatsApp
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-white">
              Ready to Dispatch Your Consignment?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-['Manrope'] max-w-lg">
              Call or message our Jaipur freight desk directly at +91 97848 00833. Verified trucks, live driver assignment, and GST billing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`tel:+919784800833`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-[#1a1f1b] font-bold text-xs uppercase font-['Space_Mono'] hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={14} className="text-[#0B3A66]" />
              <span>+91 97848 00833</span>
            </a>
            <a
              href={generateWhatsAppUrl(`Hi Shree Krishna Transport, I need freight quotation based on your article "${post.title}".`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase font-['Manrope'] hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={16} />
              <span>Get WhatsApp Quote</span>
            </a>
          </div>
        </div>

        {/* Cross Linking: Related Corridors */}
        {post.relatedRouteSlugs.length > 0 && (
          <div className="mt-12">
            <h4 className="text-lg font-bold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] mb-4">
              Explore Related Verified Routes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {post.relatedRouteSlugs.map((rSlug) => (
                <Link
                  key={rSlug}
                  to={`/${rSlug}`}
                  className="p-4 rounded-2xl bg-white border border-[#e2dacd] hover:border-[#0B3A66] hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-[#0B3A66]" />
                    <span className="font-bold text-xs uppercase font-['Space_Mono'] text-[#1a1f1b] group-hover:text-[#0B3A66]">
                      {rSlug.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <ChevronRight size={15} className="text-neutral-400 group-hover:text-[#0B3A66]" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
