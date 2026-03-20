import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import casualImg from "@/assets/category-casual.jpg";
import occasionImg from "@/assets/category-occasion.jpg";
import weddingImg from "@/assets/category-wedding.jpg";

export type Category = "casual" | "occasion" | "wedding";

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: Category;
    description: string;
    featured: boolean;
    details: string[];
}

export interface CategoryInfo {
    slug: Category;
    title: string;
    subtitle: string;
    image: string;
    description: string;
}

export const categories: CategoryInfo[] = [
    {
        slug: "casual",
        title: "Casual Wear",
        subtitle: "Everyday Elegance",
        image: casualImg,
        description: "Effortlessly elegant ridas designed for your everyday moments. Lightweight fabrics, subtle embellishments, and timeless silhouettes.",
    },
    {
        slug: "occasion",
        title: "Occasion Wear",
        subtitle: "Special Moments",
        image: occasionImg,
        description: "Make every occasion unforgettable with our exquisitely crafted ridas. Rich fabrics, intricate embroidery, and a touch of glamour.",
    },
    {
        slug: "wedding",
        title: "Wedding Collection",
        subtitle: "Your Beautiful Day",
        image: weddingImg,
        description: "Bridal and wedding ridas crafted with love. Luxurious zardozi, pearl work, and heirloom-quality craftsmanship for your most cherished day.",
    },
];

export const products: Product[] = [
    {
        id: "sage-lace-rida",
        name: "Sage Lace Rida",
        price: 4500,
        image: product1,
        category: "casual",
        description: "A soft sage green rida adorned with delicate lace detailing. Perfect for everyday wear with an understated elegance that transitions seamlessly from day to evening.",
        featured: true,
        details: [
            "Premium cotton-silk blend fabric",
            "Hand-finished lace borders",
            "Breathable and lightweight",
            "Available in S, M, L, XL",
        ],
    },
    {
        id: "blush-pearl-rida",
        name: "Blush Pearl Rida",
        price: 6800,
        image: product2,
        category: "occasion",
        description: "Romantic blush pink rida embellished with hand-sewn freshwater pearls. A statement piece for weddings, mehndi nights, and celebrations.",
        featured: true,
        details: [
            "Pure georgette fabric",
            "Hand-sewn pearl embellishments",
            "Satin lining for comfort",
            "Available in S, M, L, XL",
        ],
    },
    {
        id: "champagne-embroidered-rida",
        name: "Champagne Embroidered Rida",
        price: 8500,
        image: product3,
        category: "wedding",
        description: "A luxurious champagne rida featuring intricate zardozi embroidery. Designed for brides and special occasions where you want to shine.",
        featured: true,
        details: [
            "Rich silk-organza base",
            "Zardozi and sequin hand embroidery",
            "Includes matching dupatta",
            "Available in S, M, L, XL",
        ],
    },
    {
        id: "dusty-rose-zardozi-rida",
        name: "Dusty Rose Zardozi Rida",
        price: 9200,
        image: product4,
        category: "wedding",
        description: "An heirloom-quality dusty rose rida with lavish zardozi work. Every stitch tells a story of artisanal excellence and timeless beauty.",
        featured: true,
        details: [
            "Premium tissue silk fabric",
            "Full-panel zardozi embroidery",
            "Stone and pearl detailing",
            "Available in S, M, L, XL",
        ],
    },
    {
        id: "ivory-lace-rida",
        name: "Ivory Lace Rida",
        price: 3800,
        image: product5,
        category: "casual",
        description: "Classic ivory rida with refined lace accents. A wardrobe essential that pairs beautifully with any occasion, from casual outings to intimate gatherings.",
        featured: false,
        details: [
            "Soft cotton-modal blend",
            "French lace trim",
            "Easy-care fabric",
            "Available in S, M, L, XL",
        ],
    },
    {
        id: "teal-satin-rida",
        name: "Teal Satin Rida",
        price: 5500,
        image: product6,
        category: "occasion",
        description: "A striking teal rida in lustrous satin with subtle thread work. Commanding yet graceful, perfect for evening events and festive celebrations.",
        featured: false,
        details: [
            "Premium duchess satin",
            "Tonal thread embroidery",
            "Structured drape",
            "Available in S, M, L, XL",
        ],
    },
];

export function getProductsByCategory(category: Category): Product[] {
    return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured);
}

export function getRelatedProducts(productId: string, limit = 3): Product[] {
    const product = getProductById(productId);
    if (!product) return [];
    return products
        .filter((p) => p.id !== productId && p.category === product.category)
        .concat(products.filter((p) => p.id !== productId && p.category !== product.category))
        .slice(0, limit);
}

export function getCategoryInfo(slug: Category): CategoryInfo | undefined {
    return categories.find((c) => c.slug === slug);
}
