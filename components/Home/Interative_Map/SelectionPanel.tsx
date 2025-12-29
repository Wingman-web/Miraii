'use client';

import React from 'react';

interface LocationGroup {
  title: string;
  locations: string[];
}

interface Props {
  locationGroups: LocationGroup[];
  selectedLocation: string;
  expandedAccordion: string;
  toggleAccordion: (title: string) => void;
  handleLocationClick: (locationName: string) => void;
}

export default function SelectionPanel({
  locationGroups,
  selectedLocation,
  expandedAccordion,
  toggleAccordion,
  handleLocationClick,
}: Props) {
  return (
    <div className="absolute top-4 left-4 z-40 w-72 max-w-[calc(100%-2rem)] bg-white rounded-lg shadow-xl sm:static sm:relative sm:w-full sm:max-w-none sm:rounded-none sm:shadow-none sm:top-0 sm:left-0">
      <div className="text-center py-3 border-b bg-gray-50 rounded-t-lg">
        <span className="font-medium text-gray-700 text-sm">Select a Location :</span>
      </div>

      <div className="divide-y max-h-72 overflow-y-auto">
        {locationGroups.map((group) => (
          <div key={group.title}>
            <button
              onClick={() => toggleAccordion(group.title)}
              className="w-full text-left px-4 py-2.5 font-semibold text-sm hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <span>{group.title}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  expandedAccordion === group.title ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedAccordion === group.title && (
              <div className="px-3 pb-2">
                <div className="flex flex-col gap-1.5">
                  {group.locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleLocationClick(location)}
                      className={`text-left px-3 py-1.5 rounded text-xs transition-colors ${
                        selectedLocation === location ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-3 py-2.5 bg-white border-t rounded-b-lg">
        <div className="bg-gray-100 px-3 py-2 rounded text-gray-700 text-xs font-semibold">{selectedLocation}</div>
      </div>
    </div>
  );
}
