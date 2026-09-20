import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Truck,
  Phone,
  MessageCircle,
  Search,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Filter,
  Radio,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react';
import {
  DELHI_NCR_5_TON_RATES,
  DELHI_NCR_15_TON_RATES,
  PAN_INDIA_RATES,
  PARCEL_COURIER_FREIGHT_RATES,
  RATE_CARD_META,
} from '../data/rateCardData';

interface RouteMapSectionProps {
  initialTab?: 'delhi' | 'pan-india' | 'parcel';
  className?: string;
}

export const RouteMapSection: React.FC<RouteMapSectionProps> = ({
  initialTab = 'delhi',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'delhi' | 'pan-india' | 'parcel'>(initialTab);
  const [delhiWeightTier, setDelhiWeightTier] = useState<'5-ton' | '15-ton'>('5-ton');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCityId, setSelectedCityId] = useState<string>('delhi');
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const [mapRegionFilter, setMapRegionFilter] = useState<string>('all');
  const [showAllCorridors, setShowAllCorridors] = useState<boolean>(true);

  // Leaflet Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const linesLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Filtered Pan-India routes for Left Rate Table tab
  const filteredPanIndia = PAN_INDIA_RATES.filter((item) => {
    const matchesRegion = regionFilter === 'all' || item.region.toLowerCase() === regionFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.destination.toLowerCase().includes(query) ||
      item.state.toLowerCase().includes(query) ||
      item.rateRange.toLowerCase().includes(query) ||
      item.popularGoods.some((g) => g.toLowerCase().includes(query));
    return matchesRegion && matchesQuery;
  });

  const generateWhatsAppUrl = (text: string) => {
    return `https://wa.me/919784800833?text=${encodeURIComponent(text)}`;
  };

  // Central Dispatch Origin Hub (Jaipur RJ-14) with verified GPS Coordinates
  const JAIPUR_ORIGIN = {
    lat: 26.9124,
    lng: 75.7873,
    code: 'RJ14',
    name: 'Jaipur Central Dispatch Hub',
    role: 'Central Dispatch & Linehaul Terminal',
    terminals: 'VKI Area, Bagru Logistics Park, Transport Nagar',
    status: 'ACTIVE 24x7 DISPATCH',
  };

  // Delivery destination cities radiating from Jaipur Dispatch Hub with actual GPS coordinates
  const DELIVERY_CITIES = [
    // North / Delhi NCR & Haryana
    {
      id: 'delhi',
      name: 'Delhi NCR',
      state: 'Delhi / Haryana / UP',
      region: 'North',
      lat: 28.6139,
      lng: 77.2090,
      rateRange: '₹11.5k – ₹22k (5T) | ₹18k – ₹33k (15T)',
      tonnage: '5 Ton & 15 Ton Commercial Fleet',
      distanceKm: 268,
      transitHours: '4 – 6 Hours',
      highway: 'NH-48 Expressway Corridor',
      link: '/jaipur-to-delhi-transport',
      popularGoods: ['Auto Components', 'Garments', 'E-commerce', 'Hardware'],
    },
    {
      id: 'jind',
      name: 'Jind',
      state: 'Haryana',
      region: 'North',
      lat: 29.3161,
      lng: 76.3155,
      rateRange: '₹15.5k – ₹17.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 320,
      transitHours: '6 – 7 Hours',
      highway: 'NH-152D Trans-Haryana Corridor',
      link: '/routes',
      popularGoods: ['Pesticides', 'Agricultural Inputs', 'Building Hardware'],
    },

    // Rajasthan Intra-State
    {
      id: 'ajmer',
      name: 'Ajmer',
      state: 'Rajasthan',
      region: 'Rajasthan',
      lat: 26.4499,
      lng: 74.6399,
      rateRange: '₹10.5k – ₹11.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 135,
      transitHours: '2.5 – 3 Hours',
      highway: 'NH-48 Direct Linehaul',
      link: '/jaipur-to-ajmer-transport',
      popularGoods: ['Textiles', 'Engineering Goods', 'Marble & Stone'],
    },
    {
      id: 'jodhpur',
      name: 'Jodhpur',
      state: 'Rajasthan',
      region: 'Rajasthan',
      lat: 26.2389,
      lng: 73.0243,
      rateRange: '₹17k – ₹19k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 335,
      transitHours: '6 – 7 Hours',
      highway: 'NH-25 Western Rajasthan Link',
      link: '/jaipur-to-jodhpur-transport',
      popularGoods: ['Handicrafts', 'Furniture', 'Spices & Guar Gum'],
    },
    {
      id: 'kota',
      name: 'Kota',
      state: 'Rajasthan',
      region: 'Rajasthan',
      lat: 25.1825,
      lng: 75.8391,
      rateRange: '₹14k – ₹15.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 250,
      transitHours: '4.5 – 5 Hours',
      highway: 'NH-52 Mega Highway',
      link: '/routes',
      popularGoods: ['Stone & Tiles', 'Chemicals', 'Fertilizers', 'Paper'],
    },
    {
      id: 'alwar',
      name: 'Alwar',
      state: 'Rajasthan',
      region: 'Rajasthan',
      lat: 27.5530,
      lng: 76.6346,
      rateRange: '₹11k – ₹13k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 150,
      transitHours: '3 – 3.5 Hours',
      highway: 'Delhi-Mumbai Expressway Spur',
      link: '/routes',
      popularGoods: ['Automotive Parts', 'Steel Castings', 'FMCG'],
    },
    {
      id: 'bhiwadi',
      name: 'Bhiwadi',
      state: 'Rajasthan',
      region: 'Rajasthan',
      lat: 28.2104,
      lng: 76.8606,
      rateRange: '₹13.5k – ₹15.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 200,
      transitHours: '3.5 – 4 Hours',
      highway: 'NH-48 Industrial Corridor',
      link: '/routes',
      popularGoods: ['Automotive Components', 'Electronics', 'Pharmaceuticals'],
    },
    {
      id: 'bharatpur',
      name: 'Bharatpur',
      state: 'Rajasthan',
      region: 'Rajasthan',
      lat: 27.2152,
      lng: 77.5030,
      rateRange: '₹13.5k – ₹15.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 185,
      transitHours: '3.5 – 4 Hours',
      highway: 'NH-21 Agra-Jaipur Highway',
      link: '/routes',
      popularGoods: ['Mustard Oil', 'Agricultural Implements', 'Ceramics'],
    },
    {
      id: 'mahwa',
      name: 'Mahwa',
      state: 'Rajasthan',
      region: 'Rajasthan',
      lat: 27.0456,
      lng: 76.9268,
      rateRange: '₹13.5k – ₹15.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 125,
      transitHours: '2.5 – 3 Hours',
      highway: 'NH-21 East Rajasthan Corridor',
      link: '/routes',
      popularGoods: ['Grains', 'Building Materials', 'FMCG'],
    },

    // West / Gujarat & Maharashtra
    {
      id: 'ahmedabad',
      name: 'Ahmedabad',
      state: 'Gujarat',
      region: 'West',
      lat: 23.0225,
      lng: 72.5714,
      rateRange: '₹24k – ₹26k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 675,
      transitHours: '12 – 14 Hours',
      highway: 'NH-48 Western Freight Highway',
      link: '/jaipur-to-ahmedabad-transport',
      popularGoods: ['Textiles', 'Chemicals', 'Dyes & Pigments', 'Machinery'],
    },
    {
      id: 'vadodara',
      name: 'Vadodara',
      state: 'Gujarat',
      region: 'West',
      lat: 22.3072,
      lng: 73.1812,
      rateRange: '₹24.5k – ₹26.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 760,
      transitHours: '14 – 16 Hours',
      highway: 'NH-48 Industrial Expressway',
      link: '/routes',
      popularGoods: ['Heavy Engineering', 'Petrochemicals', 'Plastics'],
    },
    {
      id: 'rajkot',
      name: 'Rajkot',
      state: 'Gujarat',
      region: 'West',
      lat: 22.3039,
      lng: 70.8022,
      rateRange: '₹27k – ₹29k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 880,
      transitHours: '16 – 18 Hours',
      highway: 'NH-27 Saurashtra Corridor',
      link: '/routes',
      popularGoods: ['Diesel Engines', 'Casting & Forging', 'Bearings'],
    },
    {
      id: 'surat',
      name: 'Surat',
      state: 'Gujarat',
      region: 'West',
      lat: 21.1702,
      lng: 72.8311,
      rateRange: '₹26.5k – ₹28.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 930,
      transitHours: '18 – 20 Hours',
      highway: 'NH-48 Coastal Commercial Route',
      link: '/jaipur-to-surat-transport',
      popularGoods: ['Synthetic Fabrics', 'Embroidery Machinery', 'Diamonds'],
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      state: 'Maharashtra',
      region: 'West',
      lat: 19.0760,
      lng: 72.8777,
      rateRange: '₹35.5k – ₹37.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 1160,
      transitHours: '24 – 28 Hours',
      highway: 'NH-48 & Western DFC Corridor',
      link: '/jaipur-to-mumbai-transport',
      popularGoods: ['Port Cargo (JNPT)', 'Electronics', 'Plastics', 'Pharma'],
    },
    {
      id: 'pune',
      name: 'Pune',
      state: 'Maharashtra',
      region: 'West',
      lat: 18.5204,
      lng: 73.8567,
      rateRange: '₹37.5k – ₹39.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 1280,
      transitHours: '26 – 30 Hours',
      highway: 'Mumbai-Pune Expressway Link',
      link: '/routes',
      popularGoods: ['Auto Ancillaries', 'IT Hardware', 'White Goods'],
    },

    // Central / Madhya Pradesh
    {
      id: 'indore',
      name: 'Indore',
      state: 'Madhya Pradesh',
      region: 'Central',
      lat: 22.7196,
      lng: 75.8577,
      rateRange: '₹25.5k – ₹27.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 600,
      transitHours: '11 – 13 Hours',
      highway: 'NH-52 Central India Corridor',
      link: '/routes',
      popularGoods: ['Pharma Formulations', 'Textiles', 'Confectionery', 'Seeds'],
    },
    {
      id: 'bhopal',
      name: 'Bhopal',
      state: 'Madhya Pradesh',
      region: 'Central',
      lat: 23.2599,
      lng: 77.4126,
      rateRange: '₹27.5k – ₹29.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 590,
      transitHours: '11 – 13 Hours',
      highway: 'NH-46 Industrial Link',
      link: '/routes',
      popularGoods: ['Heavy Electricals', 'Transformer Equipment', 'Chemicals'],
    },

    // East / Uttar Pradesh
    {
      id: 'agra',
      name: 'Agra',
      state: 'Uttar Pradesh',
      region: 'East',
      lat: 27.1767,
      lng: 78.0081,
      rateRange: '₹14k – ₹16k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 240,
      transitHours: '4 – 5 Hours',
      highway: 'NH-21 Agra Expressway',
      link: '/routes',
      popularGoods: ['Leather Goods', 'Footwear', 'Foundry Items', 'Handicrafts'],
    },
    {
      id: 'kanpur',
      name: 'Kanpur',
      state: 'Uttar Pradesh',
      region: 'East',
      lat: 26.4499,
      lng: 80.3319,
      rateRange: '₹25.5k – ₹27.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 510,
      transitHours: '9 – 11 Hours',
      highway: 'NH-19 Eastern Freight Corridor',
      link: '/routes',
      popularGoods: ['Leather & Saddlery', 'Detergents', 'Industrial Textiles'],
    },
    {
      id: 'lucknow',
      name: 'Lucknow',
      state: 'Uttar Pradesh',
      region: 'East',
      lat: 26.8467,
      lng: 80.9462,
      rateRange: '₹27.5k – ₹29.5k',
      tonnage: 'Load Upto 7 Ton',
      distanceKm: 570,
      transitHours: '10 – 12 Hours',
      highway: 'Agra-Lucknow Expressway',
      link: '/routes',
      popularGoods: ['Chikan Garments', 'Aerospace Components', 'Hardware'],
    },
  ];

  // Active City for Corridor Inspector HUD
  const activeCity =
    DELIVERY_CITIES.find((c) => c.id === (hoveredCityId || selectedCityId)) || DELIVERY_CITIES[0];

  // Helper to generate natural radiating curved polyline points across real GPS coordinates
  const createCurvedCoords = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
    numPoints = 25
  ): [number, number][] => {
    const coords: [number, number][] = [];
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    const norm = Math.sqrt(dLat * dLat + dLng * dLng) || 1;
    const arcFactor = Math.min(norm * 0.12, 1.2);

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const curLat = lat1 + dLat * t;
      const curLng = lng1 + dLng * t;
      const arcOffset = Math.sin(t * Math.PI) * arcFactor;
      const normalLat = -dLng / norm;
      const normalLng = dLat / norm;
      coords.push([curLat + normalLat * arcOffset, curLng + normalLng * arcOffset]);
    }
    return coords;
  };

  // Initialize Leaflet Map instance
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [24.5, 76.5],
      zoom: 5.4,
      minZoom: 4.5,
      maxZoom: 12,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    // High-speed, high-contrast CartoDB Dark Matter GIS tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    linesLayerGroupRef.current = L.layerGroup().addTo(map);
    markersLayerGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Handle container sizing / repaint
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map markers & corridor polylines dynamically
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerGroupRef.current || !linesLayerGroupRef.current) return;

    markersLayerGroupRef.current.clearLayers();
    linesLayerGroupRef.current.clearLayers();

    // 1. Add Jaipur Central Origin Hub Marker
    const jaipurHtml = `
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto">
        <span class="absolute w-14 h-14 rounded-full bg-[#22c55e] opacity-35 animate-ping"></span>
        <span class="absolute w-10 h-10 rounded-full bg-[#0B3A66]/50 border border-[#F5B51B] animate-pulse"></span>
        <div class="w-8 h-8 rounded-full bg-[#0B3A66] border-2 border-[#F5B51B] text-white flex items-center justify-center shadow-2xl font-black text-[10px] font-mono">
          RJ14
        </div>
        <div class="absolute -top-7 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#0b100c]/90 border border-[#F5B51B] text-[#F5B51B] text-[9.5px] font-extrabold font-mono shadow-xl flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
          <span>ORIGIN HUB (JAIPUR)</span>
        </div>
      </div>
    `;

    const jaipurMarker = L.marker([JAIPUR_ORIGIN.lat, JAIPUR_ORIGIN.lng], {
      icon: L.divIcon({
        className: 'jaipur-origin-div-icon',
        html: jaipurHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      }),
      zIndexOffset: 1000,
    });

    jaipurMarker.on('click', () => {
      resetMapView();
    });

    markersLayerGroupRef.current.addLayer(jaipurMarker);

    // 2. Add Delivery Cities and Corridors
    DELIVERY_CITIES.forEach((city) => {
      const isVisible = mapRegionFilter === 'all' || city.region === mapRegionFilter;
      const isSelected = activeCity.id === city.id;

      if (!isVisible && !isSelected) return;

      const curvedPath = createCurvedCoords(
        JAIPUR_ORIGIN.lat,
        JAIPUR_ORIGIN.lng,
        city.lat,
        city.lng,
        25
      );

      // Add polyline
      if (isSelected) {
        // Glowing halo
        const glowLine = L.polyline(curvedPath, {
          color: '#F5B51B',
          weight: 7,
          opacity: 0.35,
          lineCap: 'round',
        });
        linesLayerGroupRef.current?.addLayer(glowLine);

        // Active animated line
        const activeLine = L.polyline(curvedPath, {
          color: '#F5B51B',
          weight: 3.5,
          opacity: 1,
          dashArray: '8, 8',
          className: 'leaflet-corridor-active',
        });
        linesLayerGroupRef.current?.addLayer(activeLine);
      } else if (showAllCorridors) {
        const inactiveLine = L.polyline(curvedPath, {
          color: '#1e3825',
          weight: 1.5,
          opacity: isVisible ? 0.65 : 0.25,
          dashArray: '4, 4',
        });
        linesLayerGroupRef.current?.addLayer(inactiveLine);
      }

      // City Marker
      const cityHtml = `
        <div class="relative flex items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto">
          ${isSelected ? '<span class="absolute -inset-2 rounded-full bg-[#F5B51B] opacity-40 animate-ping"></span>' : ''}
          <div class="w-3.5 h-3.5 rounded-full ${
            isSelected
              ? 'bg-[#F5B51B] ring-2 ring-white scale-125'
              : 'bg-[#38bdf8] border border-white/60 hover:bg-[#F5B51B]'
          } shadow-md transition-all"></div>
          <div class="ml-2 px-2 py-0.5 rounded-md ${
            isSelected
              ? 'bg-[#0B3A66] text-white border border-[#F5B51B]'
              : 'bg-black/85 text-neutral-200 border border-white/20 group-hover:border-[#F5B51B]'
          } text-[11px] font-bold font-sans whitespace-nowrap shadow-lg flex items-center gap-1.5 transition-all">
            <span>${city.name}</span>
            ${isSelected ? `<span class="text-[9px] font-mono text-[#F5B51B] font-extrabold">(${city.rateRange})</span>` : ''}
          </div>
        </div>
      `;

      const cityMarker = L.marker([city.lat, city.lng], {
        icon: L.divIcon({
          className: `city-marker-${city.id}`,
          html: cityHtml,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
        zIndexOffset: isSelected ? 800 : 400,
      });

      cityMarker.on('click', () => {
        setSelectedCityId(city.id);
        setHoveredCityId(null);
      });

      cityMarker.on('mouseover', () => {
        setHoveredCityId(city.id);
      });

      cityMarker.on('mouseout', () => {
        setHoveredCityId(null);
      });

      markersLayerGroupRef.current?.addLayer(cityMarker);
    });
  }, [selectedCityId, hoveredCityId, mapRegionFilter, showAllCorridors, activeCity]);

  // Smoothly fly to corridor when selectedCityId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const city = DELIVERY_CITIES.find((c) => c.id === selectedCityId);
    if (!city) return;

    const bounds = L.latLngBounds([
      [JAIPUR_ORIGIN.lat, JAIPUR_ORIGIN.lng],
      [city.lat, city.lng],
    ]);
    map.fitBounds(bounds, {
      padding: [55, 55],
      maxZoom: 7.5,
      animate: true,
      duration: 0.8,
    });
  }, [selectedCityId]);

  // Controls for Zoom & Reset Pan-India View
  const resetMapView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([24.5, 76.5], 5.4, { duration: 0.8 });
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <section className={`w-full py-8 md:py-10 ${className}`} id="route-rate-cards">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header Title & Proof Badges */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3A66]/10 text-[#0B3A66] font-['Space_Mono'] text-xs font-bold border border-[#0B3A66]/20 mb-3">
            <Sparkles size={14} className="text-[#F5B51B]" />
            OFFICIAL FREIGHT RATE CARDS & ROUTE MAP
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b] tracking-tight">
            Jaipur Hub Transport Network & Rates
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-['Manrope'] mt-3 leading-relaxed">
            Direct-from-carrier pricing with zero broker commission. Compare verified rates for Jaipur to Delhi NCR (5 Ton & 15 Ton), Pan-India 18 Industrial Cities (7 Ton), and Express Parcel & Courier Rates.
          </p>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center shrink-0">
                <Truck size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Safe & On-Time
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">Fast Linehaul</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center shrink-0">
                <ShieldCheck size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Verified Fleet
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">50+ Trucks</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF2F9] text-[#0B3A66] flex items-center justify-center shrink-0">
                <Award size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Vetted Drivers
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">Commercial Pros</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e2dacd] shadow-sm flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFF9E6] text-[#B8860B] flex items-center justify-center shrink-0">
                <Clock size={17} />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-[#1a1f1b] font-['Manrope'] block leading-tight">
                  Quote in 1 Hour
                </span>
                <span className="text-[9px] text-neutral-500 font-['Space_Mono']">WhatsApp Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Hub Diagram Card: Live Interactive Geographic Map with Jaipur Origin Hub & Delivery Destinations */}
        <div className="mb-10 bg-[#141815] text-white rounded-3xl p-5 sm:p-7 md:p-8 border border-neutral-800 shadow-2xl overflow-hidden relative">
          <style>{`
            .leaflet-container {
              background-color: #101411 !important;
              font-family: inherit;
            }
            .leaflet-div-icon {
              background: transparent !important;
              border: none !important;
            }
            .leaflet-corridor-active {
              stroke-dasharray: 8, 6;
              animation: corridorFlow 1.2s linear infinite;
              filter: drop-shadow(0 0 6px rgba(244, 180, 0, 0.8));
            }
            @keyframes corridorFlow {
              to {
                stroke-dashoffset: -28;
              }
            }
          `}</style>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5B51B] font-['Space_Mono'] block">
                  Logistics Radiating Hub
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#0B3A66]/30 border border-[#0B3A66]/50 text-[#85B7EB] text-[10px] font-['Space_Mono'] font-bold">
                  RJ-14 ORIGIN HUB
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-white tracking-tight">
                Jaipur Central Dispatch Corridor Map
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-['Manrope'] mt-0.5">
                Live Geographic Freight Map: Interactive GPS navigation showing daily linehaul dispatches from Jaipur Central Terminal to 21 delivery drop points.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl text-xs font-['Space_Mono'] text-neutral-200 border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping" />
                <span>Jaipur Dispatch Active (24x7)</span>
              </div>
            </div>
          </div>

          {/* Region Filter Bar & Visibility Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white/5 p-2 rounded-2xl border border-white/5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-neutral-400 font-['Space_Mono'] uppercase px-2 flex items-center gap-1">
                <Filter size={12} className="text-[#F5B51B]" />
                Region:
              </span>
              {[
                { id: 'all', label: 'All Corridors (21)' },
                { id: 'North', label: 'Delhi NCR & North (2)' },
                { id: 'West', label: 'West & Ports (6)' },
                { id: 'Rajasthan', label: 'Rajasthan Intra-State (7)' },
                { id: 'Central', label: 'Central MP (2)' },
                { id: 'East', label: 'Uttar Pradesh (3)' },
              ].map((filterItem) => {
                const isActive = mapRegionFilter === filterItem.id;
                return (
                  <button
                    key={filterItem.id}
                    onClick={() => setMapRegionFilter(filterItem.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-['Space_Mono'] transition-all ${
                      isActive
                        ? 'bg-[#F5B51B] text-[#111512] font-bold shadow-md'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filterItem.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 px-2">
              <button
                onClick={() => setShowAllCorridors(!showAllCorridors)}
                className="text-[11px] text-neutral-300 hover:text-white font-['Space_Mono'] flex items-center gap-1.5 transition-colors bg-white/5 px-2.5 py-1 rounded-lg border border-white/5"
              >
                <Radio size={12} className={showAllCorridors ? 'text-[#F5B51B]' : 'text-neutral-500'} />
                <span>{showAllCorridors ? 'Show All Corridors' : 'Focus Selected Line Only'}</span>
              </button>
            </div>
          </div>

          {/* Grid Layout: Left/Top Live Leaflet Map, Right/Bottom Corridor Inspector HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Live Leaflet Map Viewport (7 of 12 cols on desktop) */}
            <div className="lg:col-span-7 relative w-full h-[460px] sm:h-[520px] md:h-[560px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#101411]">
              {/* Map DOM Container */}
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Map Telemetry Header Overlay */}
              <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 bg-black/85 px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-md text-[10px] font-['Space_Mono'] text-neutral-200 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                <span className="text-[#F5B51B] font-extrabold">LIVE TELEMETRY:</span>
                <span>CartoDB Real GIS Linehaul Data</span>
              </div>

              {/* Live Interactive Map Controls: Zoom in, Zoom out, Reset Pan-India View */}
              <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5 bg-black/85 p-1 rounded-xl border border-white/15 backdrop-blur-md shadow-2xl">
                <button
                  onClick={handleZoomIn}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  title="Zoom In"
                >
                  <Plus size={14} />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  title="Zoom Out"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={resetMapView}
                  className="w-7 h-7 rounded-lg bg-[#0B3A66] hover:bg-[#138043] text-[#F5B51B] flex items-center justify-center transition-colors"
                  title="Reset to Pan-India Overview"
                >
                  <RotateCcw size={13} />
                </button>
              </div>

              {/* Bottom Overlaid Quick Map Bar */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-[400] flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-300 font-['Space_Mono'] px-3 py-1.5 bg-black/85 rounded-xl backdrop-blur-md border border-white/15 shadow-xl">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  Central Loading: VKI • Bagru Logistics Park • Transport Nagar
                </span>
                <span className="text-[#85B7EB] font-bold">
                  NH-48 Linehaul & Western DFC Corridor
                </span>
              </div>
            </div>

            {/* CORRIDOR INSPECTOR HUD PANEL (5 of 12 cols on desktop) */}
            <div className="lg:col-span-5 bg-[#121613] rounded-2xl border border-neutral-800 p-4 sm:p-5 flex flex-col justify-between shadow-2xl">
              <div>
                {/* HUD Header */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B51B] font-['Space_Mono']">
                      Corridor Inspector HUD
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-['Space_Mono']">
                    {activeCity.region} Region
                  </span>
                </div>

                {/* Origin ➔ Destination Visual Card */}
                <div className="bg-black/50 rounded-xl p-3.5 border border-white/10 mb-4">
                  <div className="flex items-center justify-between text-[11px] font-['Space_Mono'] text-neutral-400 mb-1.5">
                    <span className="text-[#85B7EB] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#0B3A66] border border-[#F5B51B]" />
                      ORIGIN (RJ-14)
                    </span>
                    <span className="text-neutral-500 text-[10px]">DIRECT LINEHAUL</span>
                    <span className="text-[#F5B51B] font-bold flex items-center gap-1">
                      DELIVERY DROP
                      <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 font-['Archivo_Narrow'] font-extrabold text-lg sm:text-xl">
                    <div className="text-white">Jaipur</div>
                    <div className="flex-1 flex items-center justify-center px-2">
                      <div className="h-[2px] w-full bg-gradient-to-r from-[#0B3A66] via-[#F5B51B] to-[#38bdf8] relative">
                        <Truck
                          size={15}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-[#121613] p-0.5 rounded-full border border-white/20"
                        />
                      </div>
                    </div>
                    <div className="text-[#F5B51B]">{activeCity.name}</div>
                  </div>

                  <div className="text-[11px] text-neutral-400 font-['Manrope'] mt-1.5 flex items-center justify-between">
                    <span>Terminals: VKI / Bagru / TP Nagar</span>
                    <span className="text-neutral-300 font-medium">{activeCity.state}</span>
                  </div>
                </div>

                {/* 4 Corridor Spec Cards */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {/* Rate Card */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block">
                      Verified Freight Charge
                    </span>
                    <span className="text-sm sm:text-base font-extrabold font-['Space_Mono'] text-[#F5B51B] block mt-0.5">
                      {activeCity.rateRange}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-['Manrope'] block mt-0.5">
                      {activeCity.tonnage}
                    </span>
                  </div>

                  {/* Transit Duration Card */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block">
                      Transit Duration
                    </span>
                    <span className="text-sm sm:text-base font-extrabold font-['Space_Mono'] text-white block mt-0.5">
                      {activeCity.transitHours}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-['Manrope'] block mt-0.5">
                      Fast Linehaul Guaranteed
                    </span>
                  </div>

                  {/* Corridor Distance */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block">
                      Corridor Distance
                    </span>
                    <span className="text-sm font-bold font-['Space_Mono'] text-neutral-200 block mt-0.5">
                      {activeCity.distanceKm} KM
                    </span>
                    <span className="text-[10px] text-neutral-400 font-['Manrope'] block mt-0.5 truncate">
                      {activeCity.highway}
                    </span>
                  </div>

                  {/* Fleet Availability */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 font-['Space_Mono'] block">
                      Fleet Availability
                    </span>
                    <span className="text-sm font-bold font-['Space_Mono'] text-[#85B7EB] block mt-0.5">
                      Daily Scheduled
                    </span>
                    <span className="text-[10px] text-neutral-400 font-['Manrope'] block mt-0.5">
                      Direct Carrier Fleet
                    </span>
                  </div>
                </div>

                {/* Popular Goods on this Corridor */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-neutral-400 font-['Space_Mono'] uppercase tracking-wider block mb-1.5">
                    Common Commercial Goods on this Corridor:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCity.popularGoods.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 font-['Manrope']"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <a
                  href={generateWhatsAppUrl(
                    `Hello Shree Krishna Transport, I need freight quotation for Jaipur to ${activeCity.name} (${activeCity.tonnage}). Verified rate listed on map is ${activeCity.rateRange}. Please confirm vehicle availability.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0B3A66] hover:bg-[#138043] text-white font-bold font-['Manrope'] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0B3A66]/30"
                >
                  <MessageCircle size={15} />
                  <span>Confirm {activeCity.name} Rate on WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919784800833"
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-['Space_Mono'] text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone size={13} className="text-[#F5B51B]" />
                    <span>Call Terminal</span>
                  </a>

                  {activeCity.link && (
                    <Link
                      to={activeCity.link}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-['Space_Mono'] text-xs flex items-center justify-center gap-1.5 transition-colors group"
                    >
                      <span>Route Guide</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Map Legend Footer */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-['Space_Mono'] text-neutral-300">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#0B3A66] border-2 border-[#F5B51B] flex items-center justify-center text-[7px] font-bold text-white">
                  RJ
                </span>
                <span className="font-bold text-white">Origin Hub: Jaipur (RJ-14 Dispatch)</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#38bdf8] border border-white" />
                <span>Delivery Destination (21 Drops)</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-[2px] bg-gradient-to-r from-[#0B3A66] to-[#F5B51B]" />
                <span>Radiating Linehaul Corridor</span>
              </div>
            </div>

            <div className="text-neutral-400 text-[11px] flex items-center gap-1">
              <span className="text-[#F5B51B]">★</span>
              <span>Click or tap any city on map to inspect</span>
            </div>
          </div>
        </div>

        {/* Master Tab Bar: Delhi NCR (Table A & B) | Pan India (Left Rate Table) | Parcel Rates (Table C) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('delhi')}
            className={`px-5 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'delhi'
                ? 'bg-[#0B3A66] text-white shadow-[#0B3A66]/25 ring-2 ring-[#0B3A66]/30'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0B3A66]'
            }`}
          >
            <Truck size={17} />
            <span>Delhi NCR (Table A & B)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5B51B] text-[#071F35] font-['Space_Mono'] font-extrabold">
              5T & 15T
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pan-india')}
            className={`px-5 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'pan-india'
                ? 'bg-[#0B3A66] text-white shadow-[#0B3A66]/25 ring-2 ring-[#0B3A66]/30'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0B3A66]'
            }`}
          >
            <MapPin size={17} />
            <span>Jaipur ➔ Pan India (Left Rate Table)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] font-bold">
              18 Cities • 7 Ton
            </span>
          </button>

          <button
            onClick={() => setActiveTab('parcel')}
            className={`px-5 py-3 rounded-2xl font-['Archivo_Narrow'] font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'parcel'
                ? 'bg-[#0B3A66] text-white shadow-[#0B3A66]/25 ring-2 ring-[#0B3A66]/30'
                : 'bg-white text-[#1a1f1b] border border-[#e2dacd] hover:border-[#0B3A66]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5B51B]" />
            <span>Table C: Parcel / Courier & Freight</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF9E6] text-[#071F35] font-['Space_Mono'] font-extrabold">
              Per KG
            </span>
          </button>
        </div>

        {/* TAB 1: JAIPUR -> DELHI NCR (TABLE A & B) */}
        {activeTab === 'delhi' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase">
                  <span>Corridor: Jaipur ➔ Delhi NCR</span>
                  <span>•</span>
                  <span>280 KM</span>
                  <span>•</span>
                  <span>{delhiWeightTier === '5-ton' ? 'Table A' : 'Table B'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  {delhiWeightTier === '5-ton'
                    ? 'Table A: Delhi NCR | Service | Load Upto 5 Ton'
                    : 'Table B: Delhi NCR | Service | Load Upto 15 Ton'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                  Daily morning delivery across Okhla, Mayapuri, Mundka, Kundli, Gurugram, Faridabad, and Noida.
                </p>
              </div>

              {/* Weight Selector: Table A (Load Upto 5 Ton) vs Table B (Load Upto 15 Ton) */}
              <div className="inline-flex p-1 rounded-2xl bg-[#f4eee6] border border-[#d8d0c3]">
                <button
                  onClick={() => setDelhiWeightTier('5-ton')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-['Space_Mono'] transition-all ${
                    delhiWeightTier === '5-ton'
                      ? 'bg-[#0B3A66] text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  Table A (Load Upto 5 Ton)
                </button>
                <button
                  onClick={() => setDelhiWeightTier('15-ton')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-['Space_Mono'] transition-all ${
                    delhiWeightTier === '15-ton'
                      ? 'bg-[#0B3A66] text-white shadow-sm'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  Table B (Load Upto 15 Ton)
                </button>
              </div>
            </div>

            {/* Table A or Table B */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                    <th className="py-3 px-4 w-14">S. No.</th>
                    <th className="py-3 px-4">Vehicle Type</th>
                    <th className="py-3 px-4">Payload Spec</th>
                    <th className="py-3 px-4">Recommended Cargo</th>
                    <th className="py-3 px-4 text-right">Rate</th>
                    <th className="py-3 px-4 text-center w-36">Instant Quote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {(delhiWeightTier === '5-ton' ? DELHI_NCR_5_TON_RATES : DELHI_NCR_15_TON_RATES).map((item) => (
                    <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                      <td className="py-3.5 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                      <td className="py-3.5 px-4 font-bold text-[#1a1f1b]">
                        <div className="flex items-center gap-2">
                          <Truck size={16} className="text-[#0B3A66] shrink-0" />
                          <span>{item.vehicleType}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-['Space_Mono'] text-neutral-600">{item.capacity}</td>
                      <td className="py-3.5 px-4 text-xs text-neutral-600 max-w-xs">{item.idealFor}</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] text-sm sm:text-base whitespace-nowrap">
                        ₹{item.rateRange}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <a
                          href={generateWhatsAppUrl(
                            `Hi Shree Krishna Transport, I need freight quotation for Jaipur to Delhi NCR for ${item.vehicleType} (Rate: ₹${item.rateRange}).`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B3A66] hover:bg-[#0c532b] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
                        >
                          <MessageCircle size={13} />
                          <span>Book</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note and CTA banner */}
            <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-['Manrope'] italic">
                *{RATE_CARD_META.termsNote}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/jaipur-to-delhi-transport"
                  className="text-xs font-bold text-[#0B3A66] hover:underline font-['Space_Mono'] inline-flex items-center gap-1"
                >
                  View Full Route Specs <ArrowRight size={14} />
                </Link>
                <Link
                  to="/blog/jaipur-to-delhi-transport-cost-guide"
                  className="px-3.5 py-1.5 rounded-xl bg-[#f4eee6] hover:bg-[#e8e0d4] text-xs font-bold text-[#1a1f1b] font-['Manrope'] transition-colors"
                >
                  Read 2026 Cost Guide
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEFT RATE TABLE: JAIPUR -> PAN INDIA (SERVICE | LOAD UPTO 7 TON) */}
        {activeTab === 'pan-india' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                  Left Rate Table • Jaipur ➔ Pan India
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  Service | Load Upto 7 Ton (18 Cities)
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={17} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, rate (e.g. 24k), or state..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fbf9f6] border border-[#d8d0c3] text-xs font-['Manrope'] focus:outline-none focus:border-[#0B3A66]"
                />
              </div>
            </div>

            {/* Region Pill Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-neutral-500 font-['Space_Mono'] mr-1 flex items-center gap-1">
                <Filter size={13} /> Region:
              </span>
              {[
                { label: 'All 18 Cities', value: 'all' },
                { label: 'Gujarat / West', value: 'west' },
                { label: 'Rajasthan Local', value: 'rajasthan' },
                { label: 'Central / MP', value: 'central' },
                { label: 'East / UP', value: 'east' },
                { label: 'North', value: 'north' },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRegionFilter(r.value)}
                  className={`px-3 py-1 rounded-full text-xs font-bold font-['Manrope'] transition-all ${
                    regionFilter === r.value
                      ? 'bg-[#0B3A66] text-white shadow-sm'
                      : 'bg-[#f4eee6] text-neutral-700 hover:bg-[#e8e0d4]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Left Rate Table with exact requested City & Rate columns */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                    <th className="py-3 px-4 w-14">S. No.</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Rate (Load Upto 7 Ton)</th>
                    <th className="py-3 px-4">State / Region</th>
                    <th className="py-3 px-4">Distance & Transit</th>
                    <th className="py-3 px-4 text-right">19 ft Breakdown</th>
                    <th className="py-3 px-4 text-right">22 ft Breakdown</th>
                    <th className="py-3 px-4 text-center w-36">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {filteredPanIndia.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-neutral-500 text-xs font-['Manrope']">
                        No destinations matched "{searchQuery}". Try searching another city.
                      </td>
                    </tr>
                  ) : (
                    filteredPanIndia.map((item) => (
                      <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                        <td className="py-3.5 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                        <td className="py-3.5 px-4 font-bold text-[#1a1f1b]">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={15} className="text-[#F5B51B] shrink-0" />
                            <span className="text-base">{item.destination}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-3 py-1 rounded-xl bg-[#EBF2F9] text-[#0B3A66] font-['Space_Mono'] font-extrabold text-sm border border-[#0B3A66]/20">
                            {item.rateRange}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-['Manrope'] text-neutral-600">
                          <span className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px]">
                            {item.state}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-['Space_Mono'] text-neutral-600">
                          <span>{item.distanceKm} km</span> • <span className="text-[#0B3A66] font-semibold">{item.transitTime}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-neutral-700 font-['Space_Mono'] text-xs sm:text-sm">
                          {item.rate19ftFormatted}
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-[#0B3A66] font-['Space_Mono'] text-xs sm:text-sm">
                          {item.rate22ftFormatted}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <a
                            href={generateWhatsAppUrl(
                              `Hi Shree Krishna Transport, I need freight quotation for Jaipur to ${item.destination} (${item.state}) for Load Upto 7 Ton (${item.rateRange}).`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-[#0B3A66] hover:bg-[#0c532b] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
                          >
                            <MessageCircle size={13} />
                            <span>Quote</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Note & CTA banner */}
            <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-['Manrope'] italic">
                *{RATE_CARD_META.termsNote}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/blog/jaipur-to-pan-india-truck-transport-rates"
                  className="px-4 py-2 rounded-xl bg-[#0B3A66] text-white text-xs font-bold font-['Manrope'] hover:bg-[#0c532b] transition-colors"
                >
                  Read 18-City Rate Analysis
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TABLE C: PARCEL / COURIER & FREIGHT RATES */}
        {activeTab === 'parcel' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e2dacd] shadow-xl animate-fadeIn">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e2dacd] mb-6">
              <div>
                <span className="text-xs font-bold text-[#0B3A66] font-['Space_Mono'] uppercase block">
                  Express Surface, Air & Rail Parcel Network
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Archivo_Narrow'] text-[#1a1f1b]">
                  Table C: Parcel / Courier & Freight Rates
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-['Manrope'] mt-1">
                  Transparent per-kilogram parcel charges for lightweight packages, corporate documents, and delicate consignments.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9E6] text-[#071F35] font-['Space_Mono'] text-xs font-bold border border-[#F5B51B]/30">
                <Sparkles size={14} className="text-[#F5B51B]" />
                Per KG Door-to-Door Rates
              </div>
            </div>

            {/* Table C */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['Manrope'] text-sm">
                <thead>
                  <tr className="bg-[#FFF9E6] border-y border-[#F5B51B]/30 text-xs font-['Space_Mono'] uppercase text-[#071F35]">
                    <th className="py-3 px-4 w-14">S. No.</th>
                    <th className="py-3 px-4">Service Type</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Recommended Freight</th>
                    <th className="py-3 px-4 text-right">Official Rate</th>
                    <th className="py-3 px-4 text-center w-36">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece6dd]">
                  {PARCEL_COURIER_FREIGHT_RATES.map((item) => (
                    <tr key={item.sNo} className="hover:bg-[#fbf9f6] transition-colors group">
                      <td className="py-4 px-4 font-['Space_Mono'] text-xs text-neutral-500 font-bold">{item.sNo}.</td>
                      <td className="py-4 px-4 font-bold text-[#1a1f1b]">
                        <span className="text-base block">{item.serviceType}</span>
                      </td>
                      <td className="py-4 px-4 text-xs font-['Space_Mono']">
                        <span className="px-2.5 py-1 rounded-full bg-[#EBF2F9] text-[#0B3A66] font-bold">
                          {item.badge}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-neutral-600 max-w-sm">{item.idealFor}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-extrabold text-[#0B3A66] font-['Space_Mono'] text-base sm:text-lg whitespace-nowrap">
                          {item.rate}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <a
                          href={generateWhatsAppUrl(
                            `Hi Shree Krishna Transport, I want to book parcel/courier service for: ${item.serviceType} (${item.rate}).`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B3A66] hover:bg-[#0c532b] text-white text-xs font-bold font-['Manrope'] transition-all shadow-sm"
                        >
                          <MessageCircle size={13} />
                          <span>Book Parcel</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note & CTA */}
            <div className="mt-6 pt-5 border-t border-[#e2dacd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-500 font-['Manrope'] italic">
                *Minimum billable weight may apply based on destination pin-code. Fuel surcharge and handling are included in standard parcels.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={generateWhatsAppUrl('Hi Shree Krishna Transport, I need a parcel/courier freight rate estimate.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold font-['Manrope'] hover:bg-[#20ba59] transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle size={14} />
                  <span>Instant WhatsApp Parcel Quote</span>
                </a>
              </div>
            </div>
          </div>
        )}


        {/* Contact Strip Banner from Image Details */}
        <div className="mt-10 bg-gradient-to-r from-[#071F35] to-[#262c27] text-white rounded-3xl p-6 md:p-8 border border-neutral-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B3A66] text-white flex items-center justify-center shrink-0 shadow-lg">
              <Phone size={26} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B51B] font-['Space_Mono'] block">
                Direct Transport Dispatch Desk
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold uppercase font-['Archivo_Narrow'] text-white">
                Have a Custom Payload or Unlisted Route?
              </h4>
              <p className="text-xs text-neutral-300 font-['Manrope'] mt-0.5">
                Call or WhatsApp our fleet dispatcher for guaranteed fixed rates within 60 minutes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:+919784800833`}
              className="px-5 py-3 rounded-xl bg-white text-[#1a1f1b] font-bold text-xs uppercase font-['Space_Mono'] hover:bg-neutral-100 transition-colors flex items-center gap-2"
            >
              <Phone size={14} className="text-[#0B3A66]" />
              <span>+91 97848 00833</span>
            </a>
            <a
              href={generateWhatsAppUrl('Hi Shree Krishna Transport, I need an instant freight quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase font-['Manrope'] hover:bg-[#20ba59] transition-colors flex items-center gap-2 shadow-lg"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us in 1 Hr</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
