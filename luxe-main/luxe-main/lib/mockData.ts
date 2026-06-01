export interface Product {
    id: string
    name: string
    category: string
    price: number
    images: string[]
    description: string
    colors: string[]
    sizes: string[]
    rating: number
    reviewCount: number
    reviews: Review[]
    inStock: boolean
    relatedProducts: string[]
}

export interface Review {
    id: string
    author: string
    rating: number
    comment: string
    date: string
}

export interface CartItem extends Product {
    quantity: number
    selectedColor?: string
    selectedSize?: string
}

export interface Order {
    id: string
    date: string
    items: CartItem[]
    subtotal: number
    shipping: number
    tax: number
    total: number
    status: string
    shippingAddress: Address
}

export interface Address {
    fullName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

const reviews: Review[] = [
    {
        id: '1',
        author: 'Sarah M.',
        rating: 5,
        comment: 'Absolutely beautiful and high quality. Will definitely purchase again!',
        date: '2024-05-10',
    },
    {
        id: '2',
        author: 'James L.',
        rating: 4,
        comment: 'Great product, excellent customer service.',
        date: '2024-05-05',
    },
    {
        id: '3',
        author: 'Emma R.',
        rating: 5,
        comment: 'Exactly what I was looking for. Premium quality at a fair price.',
        date: '2024-04-28',
    },
]

export const products: Product[] = [
    {
        id: '1',
        name: 'Marble Table Lamp',
        category: 'Lighting',
        price: 189,
        images: [
            'https://images.unsplash.com/photo-1565636192335-14ae4ee7ca3f?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1565636192335-14ae4ee7ca3f?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Elegant marble base table lamp with warm brass accents. Perfect for modern or traditional interiors. Includes LED bulb.',
        colors: ['White', 'Black', 'Beige'],
        sizes: ['Small', 'Large'],
        rating: 4.8,
        reviewCount: 124,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['2', '3'],
    },
    {
        id: '2',
        name: 'Ceramic Vase Set',
        category: 'Decor',
        price: 129,
        images: [
            'https://images.unsplash.com/photo-1578500494198-246f612d782d?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578500494198-246f612d782d?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Set of three handcrafted ceramic vases in complementary neutral tones. Adds texture and elegance to any room.',
        colors: ['White', 'Beige', 'Gray'],
        sizes: ['Set of 3'],
        rating: 4.6,
        reviewCount: 89,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['1', '4'],
    },
    {
        id: '3',
        name: 'Linen Throw Pillow',
        category: 'Textiles',
        price: 45,
        images: [
            'https://images.unsplash.com/photo-1578500494198-246f612d782d?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578500494198-246f612d782d?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Soft linen throw pillow with zipper closure. Available in various sizes and neutral colors. Hypoallergenic fill.',
        colors: ['Natural', 'Gray', 'Charcoal'],
        sizes: ['18x18', '20x20', '24x24'],
        rating: 4.7,
        reviewCount: 156,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['4', '5'],
    },
    {
        id: '4',
        name: 'Wooden Wall Shelf',
        category: 'Furniture',
        price: 199,
        images: [
            'https://images.unsplash.com/photo-1595521624299-f5f6f4f83c91?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1595521624299-f5f6f4f83c91?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Minimalist floating shelf made from reclaimed oak. Sturdy steel brackets. Perfect for displaying books and decor.',
        colors: ['Oak', 'Walnut', 'Ash'],
        sizes: ['24inch', '36inch', '48inch'],
        rating: 4.9,
        reviewCount: 203,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['1', '2'],
    },
    {
        id: '5',
        name: 'Canvas Art Print',
        category: 'Art',
        price: 79,
        images: [
            'https://images.unsplash.com/photo-1578675367847-b06a0d4f1d6f?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578675367847-b06a0d4f1d6f?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Abstract canvas art print on premium cotton canvas. Museum-quality reproduction with vibrant colors.',
        colors: ['Color', 'B&W'],
        sizes: ['16x20', '20x24', '24x32'],
        rating: 4.5,
        reviewCount: 67,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['3', '4'],
    },
    {
        id: '6',
        name: 'Glass Coffee Table',
        category: 'Furniture',
        price: 399,
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Modern glass coffee table with brushed metal frame. Tempered safety glass top. Contemporary design.',
        colors: ['Black', 'Gold', 'Silver'],
        sizes: ['Standard'],
        rating: 4.7,
        reviewCount: 142,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['1', '5'],
    },
    {
        id: '7',
        name: 'Pendant Light Fixture',
        category: 'Lighting',
        price: 149,
        images: [
            'https://images.unsplash.com/photo-1565636192335-14ae4ee7ca3f?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1565636192335-14ae4ee7ca3f?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Industrial pendant light with frosted glass shade. Adjustable cord length. Perfect for kitchens and dining areas.',
        colors: ['Clear', 'Frosted'],
        sizes: ['Small', 'Medium', 'Large'],
        rating: 4.6,
        reviewCount: 95,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['2', '6'],
    },
    {
        id: '8',
        name: 'Wool Area Rug',
        category: 'Textiles',
        price: 299,
        images: [
            'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=600&fit=crop&q=80',
        ],
        description:
            'Premium wool area rug with geometric pattern. Handwoven, naturally hypoallergenic. Various sizes available.',
        colors: ['Cream', 'Gray', 'Charcoal'],
        sizes: ['5x7', '6x9', '8x10'],
        rating: 4.8,
        reviewCount: 178,
        reviews: reviews,
        inStock: true,
        relatedProducts: ['3', '7'],
    },
]

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase()
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
    )
}

export const categories = Array.from(new Set(products.map((p) => p.category)))
