'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ShapeTwo from '../Mirai_Pods_Slider/shape-two.png';

interface Amenity {
  name: string;
  image: string;
}

interface Level {
  level: string;
  defaultImage: string;
  amenities: Amenity[];
}

const levels: Level[] = [
  {
    level: 'Level 1',
    defaultImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    amenities: [
      { name: '350-Seater Multipurpose Hall', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80' },
      { name: 'Pre-Function Hall', image: 'https://images.unsplash.com/photo-1519167758481-83f29da8dc4d?w=1600&q=80' },
      { name: 'Dance Studio', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1600&q=80' },
      { name: 'Creche', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&q=80' },
      { name: 'Hobby Rooms', image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1600&q=80' },
      { name: 'Virtual Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=80' },
      { name: 'Virtual Golf', image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80' },
      { name: 'Kids Activity Zone', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&q=80' }
    ]
  },
  {
    level: 'Level 2',
    defaultImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80',
    amenities: [
      { name: '50-Seater Private Theatre', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80' },
      { name: 'Billiards & Snooker', image: 'https://images.unsplash.com/photo-1604163514098-c6a1c0f3c8e4?w=1600&q=80' },
      { name: 'Guest Rooms', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&q=80' },
      { name: 'Spa', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80' },
      { name: 'Business & Social Lounge', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80' },
      { name: 'Study Center', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80' },
      { name: 'Sports Lounge', image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1600&q=80' },
      { name: 'Cards Room', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80' }
    ]
  },
  {
    level: 'Level 3',
    defaultImage: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1600&q=80',
    amenities: [
      { name: 'Pool', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1600&q=80' },
      { name: 'TT Room', image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=1600&q=80' },
      { name: 'Board Games', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1600&q=80' },
      { name: 'Coworking Space', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80' },
      { name: 'Squash Court', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&q=80' },
      { name: 'Badminton Courts', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1600&q=80' },
      { name: 'Cards Lounge', image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=1600&q=80' },
      { name: 'Conference Arena', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80' }
    ]
  },
  {
    level: 'Level 4',
    defaultImage: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1600&q=80',
    amenities: [
      { name: 'Aerobics Studio', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80' },
      { name: 'Yoga Studio', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80' },
      { name: 'Meditation Deck', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80' },
      { name: 'Gym & Fitness Corner', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80' }
    ]
  }
];

export default function MiraiClubhouse() {
  const [globalBg, setGlobalBg] = useState(levels[0].defaultImage);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  const handleLevelEnter = (levelIndex: number) => {
    setGlobalBg(levels[levelIndex].defaultImage);
    setActiveLevel(levelIndex);
  };

  const handleAmenityHover = (image: string, levelIndex: number) => {
    setGlobalBg(image);
    setActiveLevel(levelIndex);
  };

  const handleGlobalLeave = () => {
    setGlobalBg(levels[0].defaultImage);
    setActiveLevel(null);
  };

  return (
    <section className="relative bg-gray-900 w-full h-screen overflow-hidden">
      <div className="w-full h-full px-0 relative z-10">
        <div 
          className="relative grid grid-cols-1 lg:grid-cols-4 h-full bg-cover bg-center transition-all duration-400 ease-in-out"
          style={{ backgroundImage: `url('${globalBg}')` }}
          onMouseLeave={handleGlobalLeave}
        >
          {/* Decorative shape placed inside the grid so it appears above the background image */}
          <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
          <div className="absolute right-[-20%] -top-2 w-[160vw] md:w-[150vw] lg:w-[140vw]">
              <Image
                src={ShapeTwo}
                alt="Background shape"
                width={7200}
                height={5400}

                unoptimized
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          {levels.map((level, levelIndex) => (
            <div
              key={levelIndex}
              className={`relative h-full ${levelIndex < 3 ? 'lg:border-r border-gray-700' : ''}`}
              onMouseEnter={() => handleLevelEnter(levelIndex)}
            >
              <div className="flex items-end h-full">
                <div
                  className={`absolute left-0 w-full bg-black/55 text-white px-7 py-5 transition-all duration-450 ease-in-out ${
                    activeLevel === levelIndex
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-5 pointer-events-none'
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-2">
                    <span className="border-b border-white pb-1">{level.level}</span>
                  </h2>
                  <div className="space-y-1">
                    {level.amenities.map((amenity, idx) => (
                      <p key={idx} className="text-base">
                        <span
                          className="inline-block cursor-pointer border-b border-white/15 border-dashed pb-1.5 hover:border-white/40 transition-colors"
                          onMouseEnter={() => handleAmenityHover(amenity.image, levelIndex)}
                        >
                          {amenity.name}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}