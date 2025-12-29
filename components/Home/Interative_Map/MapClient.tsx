'use client';
/// <reference types="google.maps" />

import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

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

const DEFAULT_CENTER: Coordinates = { lat: 17.415439306851333, lng: 78.33338733411476 };

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

const HOME_MARKER_ICON = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
    <circle cx="12" cy="12" r="10" fill="#1D4ED8" stroke="#fff" stroke-width="2"/>
    <circle cx="12" cy="12" r="4" fill="#fff"/>
  </svg>
`)}`;

const LOCATION_MARKER_ICON_SMALL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#78252f"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>
`)}`;

const LIBRARIES = ['places'] as const;

export default function MapClient({ selectedLocation }: { selectedLocation: LocationData | null }) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const polylineBorderRef = useRef<google.maps.Polyline | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', libraries: LIBRARIES as any });

  useEffect(() => {
    return () => {
      // cleanup
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
      if (polylineBorderRef.current) {
        polylineBorderRef.current.setMap(null);
        polylineBorderRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // clear existing
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    if (polylineBorderRef.current) {
      polylineBorderRef.current.setMap(null);
      polylineBorderRef.current = null;
    }

    if (!selectedLocation) {
      // reset view
      mapRef.current.panTo(DEFAULT_CENTER);
      mapRef.current.setZoom(15);
      return;
    }

    const coords = { lat: selectedLocation.lat, lng: selectedLocation.lng };
    const path = [DEFAULT_CENTER, coords];

    // border polyline
    polylineBorderRef.current = new window.google.maps.Polyline({
      path,
      strokeColor: '#78252f',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      geodesic: true,
      zIndex: 0,
      map: mapRef.current,
    });

    polylineRef.current = new window.google.maps.Polyline({
      path,
      strokeColor: '#FFFFFF',
      strokeOpacity: 1,
      strokeWeight: 2,
      geodesic: true,
      zIndex: 1,
      map: mapRef.current,
    });

    // fit bounds
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(DEFAULT_CENTER);
    bounds.extend(coords);
    mapRef.current.fitBounds(bounds, { top: 50, right: 350, bottom: 50, left: 50 });
  }, [selectedLocation]);

  if (loadError) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Error loading maps. Please check your API key.</p></div>;

  return (
    <div className="w-full h-full">
      {!isLoaded ? (
        <div className="w-full h-full" />
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={DEFAULT_CENTER}
          zoom={15}
          onLoad={(map) => { mapRef.current = map; }}
          options={mapOptions}
        >
          <Marker
            position={DEFAULT_CENTER}
            icon={{ url: HOME_MARKER_ICON, scaledSize: new window.google.maps.Size(28, 28), anchor: new window.google.maps.Point(14, 14) }}
            title="Pavani Mirai"
          />

          {selectedLocation && (
            <Marker
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              icon={{ url: LOCATION_MARKER_ICON_SMALL, scaledSize: new window.google.maps.Size(24, 36), anchor: new window.google.maps.Point(12, 36) }}
              title={selectedLocation.name}
              zIndex={100}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
}
