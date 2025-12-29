// @/constants/navLinks.ts

export interface NavLink {
  id: number
  label: string
  href: string
  description: string
}

export const NAV_LINKS: NavLink[] = [
  { 
    id: 1, 
    label: 'Home', 
    href: './',
    description: 'Welcome to our luxury residential community. Experience modern living at its finest with world-class amenities and premium services.'
  },
  { 
    id: 2, 
    label: 'Amenities', 
    href: './ameniti.html',
    description: 'Discover premium facilities including swimming pools, gyms, spas, and recreational areas designed for your comfort and wellness.'
  },
  { 
    id: 3, 
    label: 'Location', 
    href: './locations.html',
    description: 'Strategically situated in the heart of the city with easy access to shopping, dining, and entertainment destinations.'
  },
  { 
    id: 4, 
    label: 'Map', 
    href: './maps.html',
    description: 'View the detailed layout of our community with interactive maps and facility locations for your convenience.'
  },
  { 
    id: 5, 
    label: 'Life @ MIRAI', 
    href: './lifeatmirais.html',
    description: 'Join our vibrant community and experience a lifestyle filled with events, activities, and meaningful connections with neighbors.'
  },
  { 
    id: 6, 
    label: 'Contact Us', 
    href: '#footer',
    description: 'Get in touch with our team for inquiries, bookings, or any assistance you may need. We are here to help.'
  }
]