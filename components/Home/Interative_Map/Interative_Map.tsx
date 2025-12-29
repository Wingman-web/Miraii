'use client';
/// <reference types="google.maps" />

import React, { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1633.0345929224866!2d78.33338733411476!3d17.415439306851333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95adcc4e9f31%3A0xa382316aa1d6dfa9!2sMirai!5e0!3m2!1sen!2sin!4v1766211939116!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Pavani Mirai Location"
    />
  ),
});

// Ensure window.google is recognized by TypeScript
declare global {
  interface Window {
    google: typeof google;
  }
}

// ============ BlurText Component ============
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
  className?: string;
}

function BlurText({
  text,
  delay = 150,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
}: BlurTextProps) {
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const items = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    setVisibleItems(0);
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev >= items.length) {
          clearInterval(timer);
          if (onAnimationComplete) onAnimationComplete();
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay, items.length, onAnimationComplete]);

  return (
    <div className={className}>
      {items.map((item, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            filter: index < visibleItems ? 'blur(0px)' : 'blur(10px)',
            opacity: index < visibleItems ? 1 : 0,
            transform: index < visibleItems ? 'translateY(0)' : direction === 'top' ? 'translateY(-20px)' : 'translateY(20px)',
            transition: 'all 0.3s ease-out',
            marginRight: animateBy === 'words' ? '0.25em' : '0',
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

// ============ Types ============
interface LocationGroup {
  title: string;
  locations: LocationData[];
}

interface LocationData {
  name: string;
  lat: number;
  lng: number;
  distance?: string;
  duration?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

type Libraries = ('places' | 'drawing' | 'geometry' | 'visualization')[];

// ============ Constants ============
const LIBRARIES: Libraries = ['places'];

// Pavani Mirai exact location from the iframe
const DEFAULT_CENTER: Coordinates = { lat: 17.415439306851333, lng: 78.33338733411476 };

const DEFAULT_DESCRIPTION =
  'Located in the Financial District, Pavani Mirai is situated just off the main road, near ISB, right next to the Apple and Amazon campuses, and a mere 1 km from the Outer Ring Road (ORR). Surrounded by a fully developed neighbourhood, it hands you the best of urban living on a silver platter.';

const DESCRIPTIONS: Record<string, string> = {
  'The League Sports Village': 'A popular sports complex offering multiple outdoor and indoor facilities.',
  'Prestige Skytech': 'Residential complex close to key commercial hubs.',
  'Ignite Art Cafe': 'Community cafe known for live art events and specialty coffee.',
  'Tansen Restaurant': 'A long-standing local restaurant serving traditional cuisine.',
  'Asie Stories': 'A boutique retail and dining destination with curated experiences.',
  'Mamalola': 'A cozy eatery serving contemporary comfort food.',
  'Soul of South': 'Regional cuisine restaurant highlighting southern flavors.',
  'Cycling Track': 'Well-maintained cycling track for fitness and leisure rides.',
  'Myscape Stories': 'A landscaped leisure zone with family-friendly spaces.',
  'The Kidz Land': 'Play area and activity center for children.',
  'ORR': 'Outer Ring Road - a major arterial route connecting the city.',
  'Alley 91 Bowling Bar': 'Entertainment venue with bowling lanes and bar.',
  'Flipside Adventure Park': 'Adventure park with activities for all ages.',
  "The Fishermen's Wharf": 'Waterfront dining with fresh seafood.',
  'Tabula Rasa': 'Contemporary restaurant with innovative cuisine.',
  'Van Lavino': 'Upscale dining experience with global flavors.',
  'One Golf Brewery & Moai': 'Brewery and restaurant with golf simulation.',
  'Continental Hospitals': 'Multi-specialty hospital with advanced care.',
  'Keystone School': 'A leading K-12 school with modern facilities.',
  'ISB': 'Indian School of Business - premier business school.',
  'The Gaudium School': 'Co-educational school with holistic curriculum.',
  'Star Hospital': 'Full-service hospital with emergency facilities.',
  'Rainbow Hospital': 'Specialist pediatric and maternity healthcare center.',
  'Hyatt Gachibowli': 'Premium hotel with business and leisure amenities.',
  'Sheraton': 'Upscale hotel offering international hospitality services.',
  'Anvaya Convention': 'Large convention center for events and conferences.',
  'Pradhan Convention': 'Modern venue for corporate and cultural events.',
  'Cognizant': 'Major IT services campus with thousands of employees.',
  'Capgemini': 'Global IT consulting and services office location.',
  'Amazon Hyderabad Campus': 'Large technology campus and regional office.',
  'WaveRock SEZ': 'Special economic zone hosting multiple tech firms.',
  'Shriram Academy': 'Educational institution focusing on professional courses.',
  'U.S. Consulate General': 'Diplomatic mission serving the region.',
  'Neopolis': 'Integrated township with residential and commercial spaces.',
  'Gandipet Lake': 'Scenic lake popular for outings and nature walks.',
  'Microsoft Campus': 'Regional office and engineering hub.',
  'Wipro Circle': 'Major technology campus landmark.',
  'Google': 'Regional engineering and operations center.',
  'Q City': 'Large mixed-use development with retail and offices.',
  'Neopolis Kokapet SEZ': 'Industrial and tech SEZ area for enterprises.',
  'IIIT Hyderabad': 'Premier institute for information technology education and research.',
  'CBIT': 'Engineering college with strong industry ties.',
  'Hyderabad Central University': 'Major university offering diverse programs.',
  'KIMS Hospital': 'Tertiary care hospital with specialized services.',
  'Hitech City': 'Primary IT and tech business district of the city.',
  'Filmnagar': 'Neighborhood known for film industry offices and studios.',
  'Jubilee Hills': 'Affluent residential and commercial neighborhood.',
  'Airport': 'Rajiv Gandhi International Airport - main international airport.',
};

const LOCATION_GROUPS: LocationGroup[] = [
  {
    title: 'Walk',
    locations: [
      { name: 'The League Sports Village', lat: 17.4148764, lng: 78.3337484, distance: '0.3 km', duration: '4 mins' },
      { name: 'Prestige Skytech', lat: 17.414489, lng: 78.3355389, distance: '0.5 km', duration: '6 mins' },
      { name: 'Ignite Art Cafe', lat: 17.4150717, lng: 78.336234, distance: '0.4 km', duration: '5 mins' },
      { name: 'Tansen Restaurant', lat: 17.4160469, lng: 78.3306843, distance: '0.3 km', duration: '4 mins' },
      { name: 'Asie Stories', lat: 17.4143236, lng: 78.3330337, distance: '0.2 km', duration: '3 mins' },
      { name: 'Mamalola', lat: 17.4143074, lng: 78.3330337, distance: '0.2 km', duration: '3 mins' },
      { name: 'Soul of South', lat: 17.4141533, lng: 78.3328651, distance: '0.1 km', duration: '2 mins' },
    ],
  },
  {
    title: '2 Min Drive',
    locations: [
      { name: 'Cycling Track', lat: 17.4105054, lng: 78.3278014, distance: '1.2 km', duration: '2 mins' },
      { name: 'Myscape Stories', lat: 17.4137679, lng: 78.3324943, distance: '0.8 km', duration: '2 mins' },
      { name: 'The Kidz Land', lat: 17.4137055, lng: 78.3277134, distance: '1.0 km', duration: '2 mins' },
      { name: 'ORR', lat: 17.4228862, lng: 78.3279799, distance: '1.5 km', duration: '2 mins' },
      { name: 'Alley 91 Bowling Bar', lat: 17.4137299, lng: 78.3276325, distance: '1.1 km', duration: '2 mins' },
      { name: 'Flipside Adventure Park', lat: 17.414843, lng: 78.3274302, distance: '1.0 km', duration: '2 mins' },
      { name: "The Fishermen's Wharf", lat: 17.4133099, lng: 78.3309376, distance: '0.9 km', duration: '2 mins' },
      { name: 'Tabula Rasa', lat: 17.4179593, lng: 78.3207238, distance: '1.8 km', duration: '3 mins' },
      { name: 'Van Lavino', lat: 17.4199657, lng: 78.3154373, distance: '2.2 km', duration: '3 mins' },
      { name: 'One Golf Brewery & Moai', lat: 17.414843, lng: 78.3271397, distance: '1.1 km', duration: '2 mins' },
      { name: 'Continental Hospitals', lat: 17.4179601, lng: 78.3272197, distance: '1.3 km', duration: '2 mins' },
    ],
  },
  {
    title: '5 Mins Drive',
    locations: [
      { name: 'Keystone School', lat: 17.4123878, lng: 78.3311968, distance: '2.9 km', duration: '7 mins' },
      { name: 'ISB', lat: 17.4251564, lng: 78.3279713, distance: '2.5 km', duration: '5 mins' },
      { name: 'The Gaudium School', lat: 17.4168793, lng: 78.3221195, distance: '2.1 km', duration: '5 mins' },
      { name: 'Star Hospital', lat: 17.4085965, lng: 78.3224827, distance: '2.3 km', duration: '5 mins' },
      { name: 'Rainbow Hospital', lat: 17.4085965, lng: 78.3224827, distance: '2.3 km', duration: '5 mins' },
      { name: 'Hyatt Gachibowli', lat: 17.4158965, lng: 78.3288624, distance: '1.8 km', duration: '4 mins' },
      { name: 'Sheraton', lat: 17.4179639, lng: 78.3301757, distance: '1.6 km', duration: '4 mins' },
      { name: 'Anvaya Convention', lat: 17.4161942, lng: 78.3267608, distance: '1.5 km', duration: '4 mins' },
      { name: 'Pradhan Convention', lat: 17.4118909, lng: 78.3265959, distance: '1.7 km', duration: '4 mins' },
      { name: 'Cognizant', lat: 17.4081444, lng: 78.3265413, distance: '2.0 km', duration: '5 mins' },
      { name: 'Capgemini', lat: 17.4169896, lng: 78.3308613, distance: '1.5 km', duration: '4 mins' },
      { name: 'Amazon Hyderabad Campus', lat: 17.4161345, lng: 78.3288624, distance: '1.7 km', duration: '4 mins' },
      { name: 'WaveRock SEZ', lat: 17.4167865, lng: 78.3305169, distance: '1.6 km', duration: '4 mins' },
    ],
  },
  {
    title: '10 Mins Drive',
    locations: [
      { name: 'Shriram Academy', lat: 17.4209304, lng: 78.3199636, distance: '3.5 km', duration: '8 mins' },
      { name: 'U.S. Consulate General', lat: 17.4198996, lng: 78.3280737, distance: '2.8 km', duration: '7 mins' },
      { name: 'Neopolis', lat: 17.4095988, lng: 78.3044951, distance: '4.2 km', duration: '10 mins' },
      { name: 'Gandipet Lake', lat: 17.4076674, lng: 78.2998658, distance: '5.0 km', duration: '12 mins' },
      { name: 'Microsoft Campus', lat: 17.42177, lng: 78.3256025, distance: '3.0 km', duration: '8 mins' },
      { name: 'Wipro Circle', lat: 17.4204179, lng: 78.3248756, distance: '3.2 km', duration: '8 mins' },
      { name: 'Google', lat: 17.4204179, lng: 78.3285039, distance: '2.9 km', duration: '7 mins' },
      { name: 'Q City', lat: 17.4200319, lng: 78.3241413, distance: '3.3 km', duration: '9 mins' },
      { name: 'Neopolis Kokapet SEZ', lat: 17.4095988, lng: 78.3044951, distance: '4.2 km', duration: '10 mins' },
      { name: 'IIIT Hyderabad', lat: 17.429996, lng: 78.320613, distance: '4.5 km', duration: '11 mins' },
      { name: 'CBIT', lat: 17.4038565, lng: 78.2996125, distance: '5.5 km', duration: '13 mins' },
    ],
  },
  {
    title: '20 Mins Drive',
    locations: [
      { name: 'Hyderabad Central University', lat: 17.4343056, lng: 78.3275432, distance: '6.5 km', duration: '18 mins' },
      { name: 'KIMS Hospital', lat: 17.4372095, lng: 78.3092861, distance: '7.2 km', duration: '20 mins' },
      { name: 'Hitech City', lat: 17.429027, lng: 78.3156842, distance: '5.8 km', duration: '16 mins' },
      { name: 'Filmnagar', lat: 17.4245454, lng: 78.2904693, distance: '8.0 km', duration: '22 mins' },
      { name: 'Jubilee Hills', lat: 17.425964, lng: 78.2894647, distance: '8.5 km', duration: '24 mins' },
    ],
  },
  {
    title: '30 Mins Drive',
    locations: [{ name: 'Airport', lat: 17.3279954, lng: 78.2974492, distance: '25 km', duration: '35 mins' }],
  },
];

// Google Maps styling
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  fullscreenControl: true,
};

// SVG marker icons as data URIs
const HOME_MARKER_ICON = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
    <circle cx="12" cy="12" r="10" fill="#1D4ED8" stroke="#fff" stroke-width="2"/>
    <circle cx="12" cy="12" r="4" fill="#fff"/>
  </svg>
`)}`;

const LOCATION_MARKER_ICON = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#DC2626"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>
`)}`;

const LOCATION_MARKER_ICON_SMALL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#78252f"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>
`)}`;

// ============ Selection Panel Component ============
interface SelectionPanelProps {
  locationGroups: LocationGroup[];
  selectedLocation: LocationData | null;
  expandedAccordion: string;
  toggleAccordion: (title: string) => void;
  handleLocationClick: (location: LocationData) => void;
  onReset: () => void;
}

function SelectionPanel({
  locationGroups,
  selectedLocation,
  expandedAccordion,
  toggleAccordion,
  handleLocationClick,
  onReset,
}: SelectionPanelProps) {
  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-2xl overflow-hidden z-10">
      {/* Header */}
      <div className="bg-[#78252f] px-5 py-4">
        <h3 className="text-white font-semibold text-center tracking-wide">Select a Location :</h3>
      </div>

      {/* Accordion List */}
      <div className="max-h-[350px] overflow-y-auto">
        {locationGroups.map((group) => (
          <div key={group.title} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleAccordion(group.title)}
              className="w-full text-left px-5 py-3 font-medium text-gray-800 hover:bg-gray-50 transition-all duration-200 flex justify-between items-center"
            >
              <span>{group.title}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  expandedAccordion === group.title ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expanded Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedAccordion === group.title ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-3 space-y-1">
                {group.locations.map((location) => (
                  <button
                    key={location.name}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full text-left px-4 py-2 rounded text-sm transition-all duration-200 ${
                      selectedLocation?.name === location.name
                        ? 'bg-[#78252f] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Location Info */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-gray-800 text-sm font-medium flex-1">
            {selectedLocation ? (
              <span>
                <span className="text-[#78252f] font-semibold">{selectedLocation.name}</span>
                <span className="text-gray-600">, </span>
                <span className="text-[#78252f]">Distance: {selectedLocation.distance}</span>
                <span className="text-gray-600"> • </span>
                <span className="text-[#78252f]">Duration: {selectedLocation.duration}</span>
              </span>
            ) : (
              <span className="text-gray-500">Select a location to see details</span>
            )}
          </div>
          {selectedLocation && (
            <button
              onClick={onReset}
              className="ml-3 p-2 rounded-full bg-[#78252f] text-white hover:bg-[#5a1c24] transition-colors"
              title="Reset Map"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ Main Component ============
export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<Coordinates>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(15);
  const [selectedDescription, setSelectedDescription] = useState<string>('');
  // Map-specific logic is moved to a client-only component (`MapClient`) to avoid SSR resolution of browser-only packages.



  const handleLocationClick = (location: LocationData) => {
    // Only update state in parent; MapClient will react to selectedLocation changes and update view.
    setSelectedLocation(location);
    setSelectedDescription(DESCRIPTIONS[location.name] || DEFAULT_DESCRIPTION);
    setExpandedAccordion('');
  };

  const toggleAccordion = (title: string) => {
    setExpandedAccordion((prev) => (prev === title ? '' : title));
  };

  const resetMap = () => {
    // Clear selection; MapClient will reset its view on null.
    setSelectedLocation(null);
    setSelectedDescription('');
    setExpandedAccordion('');
  };



  return (
    <section className="bg-white">
      <div className="container-fluid mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Content */}
          <div className="lg:col-span-1 flex flex-col justify-center min-h-[650px] space-y-6">
            <div className="inline-block">
              <span className="text-black font-semibold tracking-widest text-[15px] uppercase">CONNECTIVITY</span>
            </div>

            <h1 className="text-[40px] font-bold text-[#78252f] leading-tight">The Element of Time</h1>

            <div className="space-y-3">
              <div>
                {selectedDescription ? (
                  <BlurText
                    key={selectedDescription}
                    text={selectedDescription}
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={() => console.log('Animation completed!')}
                    className="text-lg text-gray-600 leading-relaxed"
                  />
                ) : (
                  <p className="text-lg text-gray-600 leading-relaxed">{DEFAULT_DESCRIPTION}</p>
                )}
              </div>

              {/* Location Details with Blur Animation */}
              {selectedLocation && (
                <div className="pt-1">
                  <BlurText
                    key={`${selectedLocation.name}-details`}
                    text={`${selectedLocation.name} • Distance: ${selectedLocation.distance} • Duration: ${selectedLocation.duration}`}
                    delay={100}
                    animateBy="words"
                    direction="top"
                    className="text-base font-semibold text-[#78252f]"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <a
                href="#"
                aria-label="Location"
                className="inline-flex items-center gap-2 text-black font-medium hover:text-gray-700 hover:underline transition-colors group"
              >
                Location
                <svg className="ml-1 w-4 h-4 text-current transition-transform transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Interactive Map"
                className="inline-flex items-center gap-2 text-black font-medium hover:text-gray-700 hover:underline transition-colors group"
              >
                Interactive Map
                <svg className="ml-1 w-4 h-4 text-current transition-transform transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Full Width Map with Overlay Panel */}
          <div className="relative lg:col-span-2">
            <div className="relative w-full h-[650px] rounded-lg overflow-hidden shadow-xl">
              <MapClient selectedLocation={selectedLocation} />

              {/* Selection Panel Overlay */}
              <SelectionPanel
                locationGroups={LOCATION_GROUPS}
                selectedLocation={selectedLocation}
                expandedAccordion={expandedAccordion}
                toggleAccordion={toggleAccordion}
                handleLocationClick={handleLocationClick}
                onReset={resetMap}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}