import { 
  Product, 
  Category, 
  Brand, 
  User, 
  Order, 
  OrderStatus, 
  PaymentMethod, 
  PaymentStatus, 
  Notification 
} from '../types';

// Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Clothing',
    slug: 'clothing',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Trendy clothes for all occasions'
  },
  {
    id: '2',
    name: 'Jewelry',
    slug: 'jewelry',
    image: 'https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Beautiful jewelry pieces for all occasions'
  },
  {
    id: '3',
    name: 'Home Decor',
    slug: 'home-decor',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Stylish decor to enhance your home'
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Must-have accessories to complete your look'
  }
];

// Brands
export const brands: Brand[] = [
  {
    id: '1',
    name: 'Crystal Elegance',
    slug: 'crystal-elegance',
    logo: 'https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Elegant designs for the modern woman'
  },
  {
    id: '2',
    name: 'Urban Crystal',
    slug: 'urban-crystal',
    logo: 'https://images.pexels.com/photos/2449600/pexels-photo-2449600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Urban styles with a crystal twist'
  },
  {
    id: '3',
    name: 'Crystal Home',
    slug: 'crystal-home',
    logo: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Luxury home decor with crystal accents'
  }
];

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Crystal Pendant Necklace',
    slug: 'crystal-pendant-necklace',
    description: 'Beautiful crystal pendant necklace that shines in any light. Perfect for special occasions.',
    price: 129.99,
    salePrice: 99.99,
    images: [
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/689428/pexels-photo-689428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Jewelry',
    brand: 'Crystal Elegance',
    tags: ['necklace', 'pendant', 'crystal', 'jewelry'],
    inStock: true,
    quantity: 25,
    ratings: 4.8,
    reviews: [
      {
        id: '101',
        userId: '1',
        userName: 'Emily Smith',
        rating: 5,
        comment: 'Absolutely gorgeous necklace! Exceeded my expectations.',
        createdAt: '2025-01-15T14:30:00Z'
      },
      {
        id: '102',
        userId: '2',
        userName: 'Jessica Williams',
        rating: 4.5,
        comment: 'Beautiful quality, looks very elegant.',
        createdAt: '2025-01-10T09:15:00Z'
      }
    ],
    specifications: {
      'Material': 'Sterling Silver with Crystal',
      'Chain Length': '18 inches',
      'Clasp': 'Lobster Clasp',
      'Weight': '10g'
    },
    createdAt: '2024-12-01T12:00:00Z',
    updatedAt: '2025-01-15T16:00:00Z'
  },
  {
    id: '2',
    name: 'Crystal Embellished Evening Dress',
    slug: 'crystal-embellished-evening-dress',
    description: 'Stunning evening dress with crystal embellishments. Perfect for galas and special events.',
    price: 299.99,
    images: [
      'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Clothing',
    brand: 'Crystal Elegance',
    tags: ['dress', 'evening wear', 'crystal', 'elegant'],
    inStock: true,
    quantity: 10,
    ratings: 4.9,
    reviews: [
      {
        id: '201',
        userId: '3',
        userName: 'Olivia Johnson',
        rating: 5,
        comment: 'This dress is breathtaking. Made me feel like royalty!',
        createdAt: '2025-01-18T20:45:00Z'
      }
    ],
    specifications: {
      'Material': 'Silk with Crystal Embellishments',
      'Available Sizes': 'XS, S, M, L, XL',
      'Care': 'Dry Clean Only',
      'Style': 'Full Length, A-Line'
    },
    createdAt: '2024-12-05T14:30:00Z',
    updatedAt: '2025-01-18T21:00:00Z'
  },
  {
    id: '3',
    name: 'Crystal Table Lamp',
    slug: 'crystal-table-lamp',
    description: 'Elegant crystal table lamp that adds luxury to any room. Features LED lighting with adjustable brightness.',
    price: 189.99,
    salePrice: 149.99,
    images: [
      'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Home Decor',
    brand: 'Crystal Home',
    tags: ['lamp', 'lighting', 'home decor', 'crystal'],
    inStock: true,
    quantity: 15,
    ratings: 4.7,
    reviews: [
      {
        id: '301',
        userId: '4',
        userName: 'Michael Brown',
        rating: 5,
        comment: 'Beautiful lamp, gives my room a luxurious feel!',
        createdAt: '2025-01-12T18:20:00Z'
      },
      {
        id: '302',
        userId: '5',
        userName: 'Sarah Davis',
        rating: 4.5,
        comment: 'Great quality, very satisfied with my purchase.',
        createdAt: '2025-01-08T11:30:00Z'
      },
      {
        id: '303',
        userId: '6',
        userName: 'David Wilson',
        rating: 4.5,
        comment: 'Good lamp, looks more expensive than it is!',
        createdAt: '2025-01-02T14:15:00Z'
      }
    ],
    specifications: {
      'Material': 'Crystal and Metal',
      'Height': '18 inches',
      'Bulb Type': 'LED',
      'Wattage': '40W',
      'Cord Length': '6 feet'
    },
    createdAt: '2024-12-10T10:15:00Z',
    updatedAt: '2025-01-12T19:00:00Z'
  },
  {
    id: '4',
    name: 'Crystal Embellished Clutch',
    slug: 'crystal-embellished-clutch',
    description: 'Stylish clutch with crystal embellishments. Perfect for evenings out and special occasions.',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/5707180/pexels-photo-5707180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5707180/pexels-photo-5707180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Accessories',
    brand: 'Urban Crystal',
    tags: ['clutch', 'bag', 'crystal', 'accessories'],
    inStock: true,
    quantity: 20,
    ratings: 4.6,
    reviews: [
      {
        id: '401',
        userId: '7',
        userName: 'Lauren Roberts',
        rating: 5,
        comment: 'Gorgeous clutch, fits my essentials perfectly!',
        createdAt: '2025-01-20T19:45:00Z'
      },
      {
        id: '402',
        userId: '8',
        userName: 'Rachel Thompson',
        rating: 4,
        comment: 'Beautiful but slightly smaller than expected.',
        createdAt: '2025-01-15T21:30:00Z'
      }
    ],
    specifications: {
      'Material': 'Satin with Crystal Embellishments',
      'Dimensions': '10" x 5" x 2"',
      'Closure': 'Magnetic Snap',
      'Interior': 'Lined with One Slip Pocket'
    },
    createdAt: '2024-12-15T15:45:00Z',
    updatedAt: '2025-01-20T20:00:00Z'
  },
  {
    id: '5',
    name: 'Crystal Chandelier',
    slug: 'crystal-chandelier',
    description: 'Luxurious crystal chandelier that transforms any space with elegant lighting and sparkle.',
    price: 599.99,
    salePrice: 499.99,
    images: [
      'https://images.pexels.com/photos/6508362/pexels-photo-6508362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/681333/pexels-photo-681333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Home Decor',
    brand: 'Crystal Home',
    tags: ['chandelier', 'lighting', 'crystal', 'luxury'],
    inStock: true,
    quantity: 5,
    ratings: 4.9,
    reviews: [
      {
        id: '501',
        userId: '9',
        userName: 'Jennifer Adams',
        rating: 5,
        comment: 'Absolutely stunning! Made my dining room look like a palace!',
        createdAt: '2025-01-22T14:10:00Z'
      }
    ],
    specifications: {
      'Material': 'Crystal and Metal',
      'Diameter': '24 inches',
      'Height': '30 inches',
      'Bulbs': '8 x E12 (not included)',
      'Installation': 'Professional installation recommended'
    },
    createdAt: '2024-12-20T09:30:00Z',
    updatedAt: '2025-01-22T15:00:00Z'
  },
  {
    id: '6',
    name: 'Crystal Bracelet Set',
    slug: 'crystal-bracelet-set',
    description: 'Set of three matching crystal bracelets. Can be worn together or separately for versatile styling.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4348744/pexels-photo-4348744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Jewelry',
    brand: 'Crystal Elegance',
    tags: ['bracelet', 'jewelry', 'crystal', 'set'],
    inStock: true,
    quantity: 30,
    ratings: 4.7,
    reviews: [
      {
        id: '601',
        userId: '10',
        userName: 'Emma White',
        rating: 5,
        comment: 'These bracelets are stunning! I get compliments every time I wear them.',
        createdAt: '2025-01-25T10:15:00Z'
      },
      {
        id: '602',
        userId: '11',
        userName: 'Sophie Martinez',
        rating: 4.5,
        comment: 'Beautiful set, great quality for the price.',
        createdAt: '2025-01-18T16:45:00Z'
      }
    ],
    specifications: {
      'Material': 'Sterling Silver with Crystal',
      'Size': 'Adjustable',
      'Style': 'Tennis, Bangle, and Charm',
      'Gift Box': 'Included'
    },
    createdAt: '2024-12-22T11:20:00Z',
    updatedAt: '2025-01-25T11:00:00Z'
  },
];

// Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    addresses: [
      {
        id: '101',
        name: 'Home',
        line1: '123 Main St',
        line2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
        isDefault: true
      }
    ],
    role: 'user'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    addresses: [
      {
        id: '201',
        name: 'Home',
        line1: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90001',
        country: 'United States',
        isDefault: true
      },
      {
        id: '202',
        name: 'Work',
        line1: '789 Corporate Blvd',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90015',
        country: 'United States',
        isDefault: false
      }
    ],
    role: 'user'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@crystalreadymade.com',
    phone: '555-555-5555',
    addresses: [
      {
        id: '301',
        name: 'Office',
        line1: '100 Commerce St',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601',
        country: 'United States',
        isDefault: true
      }
    ],
    role: 'admin'
  }
];

// Sample Orders
export const orders: Order[] = [
  {
    id: '1001',
    userId: '1',
    items: [
      {
        id: '10001',
        productId: '1',
        name: 'Crystal Pendant Necklace',
        price: 99.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '10002',
        productId: '6',
        name: 'Crystal Bracelet Set',
        price: 79.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ],
    status: 'delivered' as OrderStatus,
    shippingAddress: {
      id: '101',
      name: 'Home',
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      isDefault: true
    },
    paymentMethod: 'card' as PaymentMethod,
    paymentStatus: 'paid' as PaymentStatus,
    subtotal: 179.98,
    tax: 14.40,
    shipping: 9.99,
    discount: 0,
    total: 204.37,
    trackingNumber: 'TRK12345678',
    createdAt: '2025-01-10T14:30:00Z',
    updatedAt: '2025-01-15T09:45:00Z'
  },
  {
    id: '1002',
    userId: '2',
    items: [
      {
        id: '20001',
        productId: '3',
        name: 'Crystal Table Lamp',
        price: 149.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ],
    status: 'shipped' as OrderStatus,
    shippingAddress: {
      id: '201',
      name: 'Home',
      line1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'United States',
      isDefault: true
    },
    paymentMethod: 'upi' as PaymentMethod,
    paymentStatus: 'paid' as PaymentStatus,
    subtotal: 299.98,
    tax: 24.00,
    shipping: 0,
    discount: 30.00,
    total: 293.98,
    trackingNumber: 'TRK87654321',
    createdAt: '2025-01-18T10:15:00Z',
    updatedAt: '2025-01-20T15:30:00Z'
  },
  {
    id: '1003',
    userId: '1',
    items: [
      {
        id: '30001',
        productId: '2',
        name: 'Crystal Embellished Evening Dress',
        price: 299.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ],
    status: 'processing' as OrderStatus,
    shippingAddress: {
      id: '101',
      name: 'Home',
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      isDefault: true
    },
    paymentMethod: 'card' as PaymentMethod,
    paymentStatus: 'paid' as PaymentStatus,
    subtotal: 299.99,
    tax: 24.00,
    shipping: 12.99,
    discount: 0,
    total: 336.98,
    createdAt: '2025-01-22T16:45:00Z',
    updatedAt: '2025-01-23T09:20:00Z'
  }
];

// Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Order Delivered',
    message: 'Your order #1001 has been delivered. Enjoy your new Crystal products!',
    type: 'order',
    read: false,
    createdAt: '2025-01-15T09:45:00Z'
  },
  {
    id: '2',
    userId: '2',
    title: 'Order Shipped',
    message: 'Your order #1002 has been shipped. Track your package with tracking number TRK87654321.',
    type: 'order',
    read: true,
    createdAt: '2025-01-20T15:30:00Z'
  },
  {
    id: '3',
    userId: '1',
    title: 'Special Offer',
    message: 'Enjoy 20% off on all jewelry this weekend. Use code CRYSTAL20 at checkout.',
    type: 'promotion',
    read: false,
    createdAt: '2025-01-24T12:00:00Z'
  }
];

// Mock cart data (to be stored in localStorage)
export const defaultCart = {
  id: 'cart1',
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 9.99,
  discount: 0,
  total: 0
};

// Mock wishlist (to be stored in localStorage)
export const defaultWishlist = {
  id: 'wishlist1',
  items: []
};