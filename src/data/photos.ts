export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: 'rooms' | 'interiors' | 'dining' | 'bathrooms';
  roomCategory?: 'deluxe' | 'super-deluxe';
  alt: string;
  featured?: boolean;
}

export const HOTEL_PHOTOS: PhotoItem[] = [
  // Reception & Lobby
  {
    id: 'DSC00153',
    src: '/assets/hotel-kings-crown/photos/DSC00153.jpg',
    title: 'Grand Reception & Lobby Lounge',
    category: 'interiors',
    alt: 'Hotel Kings Crown spacious reception lobby with warm lighting and comfortable guest seating',
    featured: true
  },
  {
    id: 'DSC00144',
    src: '/assets/hotel-kings-crown/photos/DSC00144.jpg',
    title: 'Front Reception Desk',
    category: 'interiors',
    alt: 'Hotel Kings Crown front reception counter featuring marble finish and heritage Rajasthani wallpaper',
    featured: true
  },
  {
    id: 'DSC00141',
    src: '/assets/hotel-kings-crown/photos/DSC00141.jpg',
    title: 'Reception Counter & Service Desk',
    category: 'interiors',
    alt: 'Reception counter with wood accents and air-conditioned guest reception area'
  },
  {
    id: 'DSC00131',
    src: '/assets/hotel-kings-crown/photos/DSC00131.jpg',
    title: 'Lobby Seating & Guest Lounge',
    category: 'interiors',
    alt: 'Guest lounge with plush tan armchairs, coffee tables, and wood paneling'
  },
  {
    id: 'DSC00134',
    src: '/assets/hotel-kings-crown/photos/DSC00134.jpg',
    title: 'Lobby Relaxation Lounge',
    category: 'interiors',
    alt: 'Curved comfortable lounge sofas for arriving guests at Hotel Kings Crown',
    featured: true
  },
  {
    id: 'DSC00138',
    src: '/assets/hotel-kings-crown/photos/DSC00138.jpg',
    title: 'Lounge Seating Area',
    category: 'interiors',
    alt: 'Side angle of guest seating lounge with warm interior lighting'
  },
  {
    id: 'DSC00159',
    src: '/assets/hotel-kings-crown/photos/DSC00159.jpg',
    title: 'Lobby Corner Lounge',
    category: 'interiors',
    alt: 'Comfortable waiting and meeting lounge in the hotel lobby'
  },

  // Elevator & Common Areas
  {
    id: 'DSC00162',
    src: '/assets/hotel-kings-crown/photos/DSC00162.jpg',
    title: 'Golden Elevator & Dining Entrance',
    category: 'interiors',
    alt: 'Modern elevator with golden finish and glass doors leading to dining hall',
    featured: true
  },
  {
    id: 'DSC00165',
    src: '/assets/hotel-kings-crown/photos/DSC00165.jpg',
    title: 'Guest Elevator Foyer',
    category: 'interiors',
    alt: 'Polished granite foyer with elevator access to all guest room floors'
  },
  {
    id: 'DSC00168',
    src: '/assets/hotel-kings-crown/photos/DSC00168.jpg',
    title: 'Modern Elevator Cabin',
    category: 'interiors',
    alt: 'Front view of hotel elevator with digital floor indicator'
  },

  // Dining Area
  {
    id: 'DSC00171',
    src: '/assets/hotel-kings-crown/photos/DSC00171.jpg',
    title: 'Hotel Dining Hall',
    category: 'dining',
    alt: 'Dining hall with long marble tables, gold frame legs, and quilted tan chairs',
    featured: true
  },
  {
    id: 'DSC00174',
    src: '/assets/hotel-kings-crown/photos/DSC00174.jpg',
    title: 'Dining Seating & Ambience',
    category: 'dining',
    alt: 'Spacious dining area with air conditioning, wall paneling, and warm lighting'
  },
  {
    id: 'DSC00177',
    src: '/assets/hotel-kings-crown/photos/DSC00177.jpg',
    title: 'Dining Hall Panoramic View',
    category: 'dining',
    alt: 'Wide perspective of Hotel Kings Crown restaurant and dining space',
    featured: true
  },
  {
    id: 'DSC00180',
    src: '/assets/hotel-kings-crown/photos/DSC00180.jpg',
    title: 'Dining Table Setup',
    category: 'dining',
    alt: 'Intimate table setup with marble tabletop and comfortable seating'
  },

  // Deluxe Room
  {
    id: 'DSC00183',
    src: '/assets/hotel-kings-crown/photos/DSC00183.jpg',
    title: 'Deluxe Room Bed & Decor',
    category: 'rooms',
    roomCategory: 'deluxe',
    alt: 'Deluxe room with double bed, crisp white linens, accent headboard, and bedside table',
    featured: true
  },
  {
    id: 'DSC00186',
    src: '/assets/hotel-kings-crown/photos/DSC00186.jpg',
    title: 'Deluxe Room King Bed',
    category: 'rooms',
    roomCategory: 'deluxe',
    alt: 'Deluxe room front view showing air conditioner, ceiling fan, and accent cushions',
    featured: true
  },
  {
    id: 'DSC00188',
    src: '/assets/hotel-kings-crown/photos/DSC00188.jpg',
    title: 'Deluxe Room Sleeping Area',
    category: 'rooms',
    roomCategory: 'deluxe',
    alt: 'Close view of comfortable double bed with golden-beige runner in Deluxe room'
  },
  {
    id: 'DSC00194',
    src: '/assets/hotel-kings-crown/photos/DSC00194.jpg',
    title: 'Deluxe Room Bedside View',
    category: 'rooms',
    roomCategory: 'deluxe',
    alt: 'Bedside perspective in Deluxe Room with ambient lighting'
  },
  {
    id: 'DSC00197',
    src: '/assets/hotel-kings-crown/photos/DSC00197.jpg',
    title: 'Deluxe Room Interior',
    category: 'rooms',
    roomCategory: 'deluxe',
    alt: 'Deluxe room view showing window blinds, telephone, and warm interior styling'
  },

  // Super Deluxe Room Suite
  {
    id: 'DSC00212',
    src: '/assets/hotel-kings-crown/photos/DSC00212.jpg',
    title: 'Super Deluxe Suite with Balcony',
    category: 'rooms',
    roomCategory: 'super-deluxe',
    alt: 'Super Deluxe suite living lounge with private balcony glass door, sofa, and Smart TV',
    featured: true
  },
  {
    id: 'DSC00215',
    src: '/assets/hotel-kings-crown/photos/DSC00215.jpg',
    title: 'Super Deluxe Living Lounge & Minibar',
    category: 'rooms',
    roomCategory: 'super-deluxe',
    alt: 'Super Deluxe room living room with mini refrigerator, tea kettle station, and Smart TV',
    featured: true
  },
  {
    id: 'DSC00218',
    src: '/assets/hotel-kings-crown/photos/DSC00218.jpg',
    title: 'Super Deluxe Living Area',
    category: 'rooms',
    roomCategory: 'super-deluxe',
    alt: 'Super Deluxe suite sitting area with maroon velvet sofa and Jaipur artwork'
  },
  {
    id: 'DSC00221',
    src: '/assets/hotel-kings-crown/photos/DSC00221.jpg',
    title: 'Super Deluxe Suite Room Perspective',
    category: 'rooms',
    roomCategory: 'super-deluxe',
    alt: 'Spacious Super Deluxe suite living lounge overview at Hotel Kings Crown'
  },

  // En-Suite Bathrooms
  {
    id: 'DSC00204',
    src: '/assets/hotel-kings-crown/photos/DSC00204.jpg',
    title: 'Modern En-Suite Bathroom',
    category: 'bathrooms',
    alt: 'Modern en-suite bathroom with wall-mounted toilet, dual-flush system, and marble tiling',
    featured: true
  },
  {
    id: 'DSC00206',
    src: '/assets/hotel-kings-crown/photos/DSC00206.jpg',
    title: 'Ceramic Vanity & Washbasin',
    category: 'bathrooms',
    alt: 'Square ceramic washbasin with chrome mixer faucet and fresh towel'
  },
  {
    id: 'DSC00209',
    src: '/assets/hotel-kings-crown/photos/DSC00209.jpg',
    title: 'Rain Shower & Water Geyser',
    category: 'bathrooms',
    alt: 'Bathroom rain shower head, water heater geyser, and modern fixtures',
    featured: true
  }
];

export const HOTEL_DETAILS = {
  name: 'Hotel Kings Crown',
  tagline: 'A Comfortable Stay in the Heart of Jaipur',
  address: {
    line1: 'B-21, Mahalaxmi Road, Behind WTP',
    locality: 'Malviya Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302017',
    country: 'India',
    full: 'B-21, Mahalaxmi Road, Behind WTP, Malviya Nagar, Jaipur, Rajasthan 302017, India'
  },
  whatsapp: '+917425023130',
  phone: '+917425023130',
  whatsappUrl: 'https://wa.me/917425023130',
  googleMapsUrl: 'https://maps.google.com/?q=B-21,+Mahalaxmi+Road,+Behind+WTP,+Malviya+Nagar,+Jaipur,+Rajasthan+302017,+India',
  rooms: [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      subtitle: 'Comfortable & Well-Appointed Room in Malviya Nagar',
      heroImage: '/assets/hotel-kings-crown/photos/DSC00186.jpg',
      galleryImages: [
        '/assets/hotel-kings-crown/photos/DSC00183.jpg',
        '/assets/hotel-kings-crown/photos/DSC00188.jpg',
        '/assets/hotel-kings-crown/photos/DSC00194.jpg',
        '/assets/hotel-kings-crown/photos/DSC00197.jpg',
        '/assets/hotel-kings-crown/photos/DSC00204.jpg',
        '/assets/hotel-kings-crown/photos/DSC00206.jpg'
      ],
      description: 'Our Deluxe Room offers a comfortable haven designed with clean contemporary finishes, crisp bed linens, and a calm atmosphere for relaxation after exploring Jaipur. Features individual split air conditioning, ceiling fan, bedside connectivity, and a modern en-suite bathroom.',
      features: [
        'Comfortable Double Bed with Clean Bedding',
        'Individual Split Air Conditioning',
        'Ceiling Fan & Ambient Lighting',
        'Bedside Nightstand & Intercom',
        'Modern En-Suite Bathroom with Rain Shower',
        'Hot & Cold Running Water (Geyser)'
      ],
      rateNote: 'Contact us for current rates and availability.'
    },
    {
      id: 'super-deluxe',
      name: 'Super Deluxe Room',
      subtitle: 'Spacious Suite Living with Private Balcony & Minibar',
      heroImage: '/assets/hotel-kings-crown/photos/DSC00212.jpg',
      galleryImages: [
        '/assets/hotel-kings-crown/photos/DSC00215.jpg',
        '/assets/hotel-kings-crown/photos/DSC00218.jpg',
        '/assets/hotel-kings-crown/photos/DSC00221.jpg',
        '/assets/hotel-kings-crown/photos/DSC00186.jpg',
        '/assets/hotel-kings-crown/photos/DSC00204.jpg',
        '/assets/hotel-kings-crown/photos/DSC00209.jpg'
      ],
      description: 'The Super Deluxe Room provides expanded living space including a dedicated sitting lounge with plush couch seating, coffee table, and direct access to a private balcony. Equipped with an in-room refrigerator, tea/coffee maker, wall-mounted Smart TV, and premium en-suite facilities.',
      features: [
        'Dedicated Living Lounge Area with Sofa & Coffee Table',
        'Private Balcony with Outside City Views',
        'Wall-Mounted Smart TV',
        'In-Room Mini Refrigerator',
        'Tea & Coffee Making Electric Kettle Station',
        'Individual Air Conditioning & Fan',
        'Modern Bathroom with Rain Shower & Geyser'
      ],
      rateNote: 'Contact us for current rates and availability.'
    }
  ]
};
