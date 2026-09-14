// Freight & Parcel Rate Calculator Engine
// Uses verified routeRegistry data where available, and deterministic distance/vehicle formulas for arbitrary corridors.

import { getAllRoutes } from '../data/routeRegistry';

export interface VehicleOption {
  id: string;
  name: string;
  capacity: string;
  bodyType: string;
  baseRatePerKm: number; // In INR for estimation fallback
  minFreight: number;
  description: string;
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'pickup-1.5t',
    name: 'Pickup (1.5 Ton / Bolero / Tata Ace)',
    capacity: '1.5 Tons',
    bodyType: 'Open / Closed Box',
    baseRatePerKm: 28,
    minFreight: 3500,
    description: 'Ideal for local intra-city or short intercity runs, electronics, cartons, and light fabrication.',
  },
  {
    id: 'truck-14ft',
    name: '14 ft Truck (4 to 4.5 Tons)',
    capacity: '4.5 Tons',
    bodyType: 'Open / High Deck',
    baseRatePerKm: 42,
    minFreight: 8000,
    description: 'Ideal for FMCG, electrical panels, textile bales, and light industrial components.',
  },
  {
    id: 'truck-17ft',
    name: '17 ft Truck (6.5 Tons)',
    capacity: '6.5 Tons',
    bodyType: 'Open / High Deck',
    baseRatePerKm: 46,
    minFreight: 10000,
    description: 'Ideal for machinery components, tiles, light fabrication, and PVC pipes.',
  },
  {
    id: 'truck-20-22ft',
    name: '20 ft / 22 ft Truck (7 Tons)',
    capacity: '7.0 Tons',
    bodyType: 'Open / Taurus',
    baseRatePerKm: 50,
    minFreight: 12000,
    description: 'Ideal for steel pipes, sanitaryware, structural frames, and industrial packaging.',
  },
  {
    id: 'container-32ft-sxl',
    name: '32 ft Container Single Axle (7.5 Tons)',
    capacity: '7.5 Tons',
    bodyType: 'Sealed All-Weather Container',
    baseRatePerKm: 65,
    minFreight: 16000,
    description: 'Ideal for volumetric goods, e-commerce cartons, export garments, and furniture.',
  },
  {
    id: 'container-32ft-mxl',
    name: '32 ft Container Multi-Axle (15 Tons)',
    capacity: '15 Tons',
    bodyType: 'Heavy High-Cube Container',
    baseRatePerKm: 78,
    minFreight: 24000,
    description: 'Ideal for high-density commercial goods, auto components, and industrial machinery.',
  },
  {
    id: 'multi-axle-10-12-tyre',
    name: '10–12 Tyre Heavy Truck (16–21 Tons)',
    capacity: '16 – 21 Tons',
    bodyType: 'Open Taurus Commercial',
    baseRatePerKm: 85,
    minFreight: 25000,
    description: 'Ideal for heavy steel coils, marble & granite slabs, heavy machinery, and raw minerals.',
  },
];

export const POPULAR_ORIGINS = [
  'Jaipur',
  'Delhi',
  'Jodhpur',
  'Ajmer',
  'Kota',
  'Udaipur',
  'Bikaner',
  'Kishangarh',
  'Bhilwara',
  'Ahmedabad',
];

export const POPULAR_DESTINATIONS = [
  'Delhi',
  'Mumbai',
  'Ahmedabad',
  'Pune',
  'Surat',
  'Bangalore',
  'Hyderabad',
  'Indore',
  'Kolkata',
  'Chennai',
  'Jodhpur',
  'Ajmer',
  'Gurugram',
  'Faridabad',
  'Jaipur',
];

// Approximate highway road distance matrix for major hubs from Jaipur (in km)
const DISTANCE_CACHE: Record<string, number> = {
  'jaipur-delhi': 280,
  'delhi-jaipur': 280,
  'jaipur-gurugram': 240,
  'jaipur-faridabad': 260,
  'jaipur-mumbai': 1150,
  'mumbai-jaipur': 1150,
  'jaipur-ahmedabad': 660,
  'ahmedabad-jaipur': 660,
  'jaipur-pune': 1220,
  'pune-jaipur': 1220,
  'jaipur-surat': 850,
  'surat-jaipur': 850,
  'jaipur-hyderabad': 1480,
  'hyderabad-jaipur': 1480,
  'jaipur-bangalore': 2050,
  'bangalore-jaipur': 2050,
  'jaipur-indore': 510,
  'indore-jaipur': 510,
  'jaipur-kolkata': 1520,
  'kolkata-jaipur': 1520,
  'jaipur-jodhpur': 340,
  'jodhpur-jaipur': 340,
  'jaipur-ajmer': 135,
  'ajmer-jaipur': 135,
  'jaipur-kishangarh': 105,
  'jaipur-bhilwara': 250,
  'jaipur-udaipur': 390,
  'jaipur-kota': 250,
  'jaipur-chennai': 2100,
  'chennai-jaipur': 2100,
  'delhi-mumbai': 1420,
  'delhi-ahmedabad': 940,
  'delhi-bangalore': 2150,
};

export function getEstimatedDistance(fromCity: string, toCity: string): number {
  if (!fromCity || !toCity) return 300;
  const key1 = `${fromCity.trim().toLowerCase()}-${toCity.trim().toLowerCase()}`;
  if (DISTANCE_CACHE[key1]) return DISTANCE_CACHE[key1];

  // Look in routeRegistry if available
  const allRoutes = getAllRoutes();
  const matchedRoute = allRoutes.find(
    (r) =>
      r.fromCity.toLowerCase() === fromCity.trim().toLowerCase() &&
      r.toCity.toLowerCase() === toCity.trim().toLowerCase()
  );
  if (matchedRoute && matchedRoute.distanceKm) {
    return matchedRoute.distanceKm;
  }

  // Baseline fallback estimate
  return 450;
}

export function getEstimatedTransitTime(distanceKm: number): string {
  if (distanceKm <= 150) return 'Same Day (4–6 Hours)';
  if (distanceKm <= 350) return '1 Day (Next Morning Delivery)';
  if (distanceKm <= 750) return '1–2 Days';
  if (distanceKm <= 1250) return '2–3 Days';
  if (distanceKm <= 1800) return '3–4 Days';
  return '4–5 Days';
}

export interface FreightEstimateResult {
  minPrice: number;
  maxPrice: number;
  priceFormatted: string;
  distanceKm: number;
  transitTime: string;
  isCorridorVerified: boolean;
  vehicleName: string;
  vehicleCapacity: string;
  notes: string[];
}

export function calculateFreightEstimate(
  fromCity: string,
  toCity: string,
  vehicleId: string
): FreightEstimateResult {
  const allRoutes = getAllRoutes();
  const matchedRoute = allRoutes.find(
    (r) =>
      r.fromCity.toLowerCase() === fromCity.trim().toLowerCase() &&
      r.toCity.toLowerCase() === toCity.trim().toLowerCase()
  );

  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[1];
  const distanceKm = matchedRoute?.distanceKm || getEstimatedDistance(fromCity, toCity);
  const transitTime = matchedRoute?.transitTime || getEstimatedTransitTime(distanceKm);

  // 1. Check if route has an exact price estimate for this vehicle type
  if (matchedRoute && matchedRoute.priceEstimates && matchedRoute.priceEstimates.length > 0) {
    // Try matching truck by name snippet (e.g. "14", "17", "32", "1.5")
    const matchedEstimate = matchedRoute.priceEstimates.find((pe) => {
      const pName = pe.truckName.toLowerCase();
      if (vehicle.id.includes('14') && pName.includes('14')) return true;
      if (vehicle.id.includes('17') && pName.includes('17')) return true;
      if (vehicle.id.includes('pickup') && (pName.includes('pickup') || pName.includes('1.5'))) return true;
      if (vehicle.id.includes('20') && (pName.includes('20') || pName.includes('22'))) return true;
      if (vehicle.id.includes('container-32ft') && pName.includes('32')) return true;
      if (vehicle.id.includes('multi-axle') && (pName.includes('10') || pName.includes('12') || pName.includes('axle'))) return true;
      return false;
    });

    if (matchedEstimate && matchedEstimate.priceRange) {
      // Parse numbers from string like "₹11,500 – ₹12,500"
      const nums = matchedEstimate.priceRange.replace(/[^0-9–-]/g, '').split(/[–-]/).map((n) => parseInt(n, 10));
      if (nums.length >= 2 && !isNaN(nums[0]) && !isNaN(nums[1])) {
        return {
          minPrice: nums[0],
          maxPrice: nums[1],
          priceFormatted: `₹${nums[0].toLocaleString('en-IN')} – ₹${nums[1].toLocaleString('en-IN')}`,
          distanceKm,
          transitTime,
          isCorridorVerified: true,
          vehicleName: vehicle.name,
          vehicleCapacity: vehicle.capacity,
          notes: [
            'Direct scheduled corridor rate from Shree Krishna Transport registry',
            'Includes fuel, driver allowance, and basic toll allocation',
            'Full 100% GST Invoice & E-Way Bill documentation provided',
          ],
        };
      }
    }
  }

  // 2. Deterministic formula calculation based on road distance
  const baseComputed = distanceKm * vehicle.baseRatePerKm;
  const rawMin = Math.max(vehicle.minFreight, Math.round(baseComputed * 0.95 / 500) * 500);
  const rawMax = Math.max(vehicle.minFreight + 1500, Math.round(baseComputed * 1.10 / 500) * 500);

  return {
    minPrice: rawMin,
    maxPrice: rawMax,
    priceFormatted: `₹${rawMin.toLocaleString('en-IN')} – ₹${rawMax.toLocaleString('en-IN')}`,
    distanceKm,
    transitTime,
    isCorridorVerified: false,
    vehicleName: vehicle.name,
    vehicleCapacity: vehicle.capacity,
    notes: [
      'Indicative point-to-point rate based on highway mileage index',
      'Exact quotation confirmed on WhatsApp based on local loading restrictions',
      '100% GST compliant invoicing with transit insurance assistance',
    ],
  };
}

export interface ParcelEstimateResult {
  weightKg: number;
  minPrice: number;
  maxPrice: number;
  priceFormatted: string;
  distanceKm: number;
  transitTime: string;
  ratePerKg: string;
  notes: string[];
}

export function calculateParcelEstimate(
  fromCity: string,
  toCity: string,
  weightKg: number
): ParcelEstimateResult {
  const distanceKm = getEstimatedDistance(fromCity, toCity);
  const transitTime = getEstimatedTransitTime(distanceKm);
  const safeWeight = Math.max(0.5, Math.min(150, weightKg || 10));

  // Pricing structure:
  // Base slab up to 10 kg: ₹350 - ₹500 depending on distance
  // Incremental slab per kg > 10 kg: ₹15 - ₹25/kg depending on distance
  const isLongDistance = distanceKm > 1000;
  const isMediumDistance = distanceKm > 400;

  const baseMin = isLongDistance ? 550 : (isMediumDistance ? 450 : 350);
  const baseMax = isLongDistance ? 750 : (isMediumDistance ? 600 : 480);

  const extraKg = Math.max(0, safeWeight - 10);
  const perKgRateMin = isLongDistance ? 22 : (isMediumDistance ? 18 : 14);
  const perKgRateMax = isLongDistance ? 28 : (isMediumDistance ? 24 : 19);

  const minTotal = Math.round((baseMin + extraKg * perKgRateMin) / 10) * 10;
  const maxTotal = Math.round((baseMax + extraKg * perKgRateMax) / 10) * 10;

  return {
    weightKg: safeWeight,
    minPrice: minTotal,
    maxPrice: maxTotal,
    priceFormatted: `₹${minTotal.toLocaleString('en-IN')} – ₹${maxTotal.toLocaleString('en-IN')}`,
    distanceKm,
    transitTime,
    ratePerKg: extraKg > 0 ? `₹${perKgRateMin} – ₹${perKgRateMax} / kg` : 'Base Slab (Up to 10 kg)',
    notes: [
      'Express parcel service for commercial boxes, samples & spare parts (0–150 kg)',
      'Door-to-door or hub-to-hub dispatch with WhatsApp status tracking',
      'Protective handling with formal consignment receipt note',
    ],
  };
}
