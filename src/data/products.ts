// Product catalogue — add more items here to expand the store
import tshirtImg from "@/assets/product-tshirt.jpg";
import poloImg from "@/assets/product-polo.jpg";
import vestImg from "@/assets/product-vest.jpg";

export interface ProductVariant {
    id: string;
    size: string;
    stock: number;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    currency: string;
    description: string;
    features: string[];
    images: string[];
    variants: ProductVariant[];
    badge?: string;
    category: string;
}

export const products: Product[] = [
    {
        id: "tshirt-001",
        slug: "premium-cotton-tshirt",
        name: "Premium Cotton T-Shirt",
        subtitle: "Men's Collection",
        price: 24.99,
        originalPrice: 34.99,
        currency: "USD",
        badge: "Best Seller",
        category: "men",
        description:
            "Crafted from 100% ring-spun cotton, our signature T-shirt combines luxury softness with everyday durability. Manufactured at our Tirupur facility with precision stitching and pre-shrunk fabric for a perfect fit wash after wash.",
        features: [
            "100% Ring-Spun Cotton",
            "Pre-shrunk fabric",
            "Reinforced collar & cuffs",
            "Double-stitched seams",
            "Available in XS – 3XL",
        ],
        images: [tshirtImg, poloImg, vestImg],
        variants: [
            { id: "xs",  size: "XS", stock: 12 },
            { id: "s",   size: "S",  stock: 28 },
            { id: "m",   size: "M",  stock: 35 },
            { id: "l",   size: "L",  stock: 22 },
            { id: "xl",  size: "XL", stock: 18 },
            { id: "2xl", size: "2XL",stock: 10 },
            { id: "3xl", size: "3XL",stock: 5  },
        ],
    },
    {
        id: "polo-001",
        slug: "classic-polo-shirt",
        name: "Classic Polo Shirt",
        subtitle: "Men's Collection",
        price: 39.99,
        currency: "USD",
        category: "men",
        description:
            "Our Classic Polo combines timeless style with contemporary manufacturing. A staple for any wardrobe, crafted with pique knit cotton for breathability and a structured collar for refined elegance.",
        features: [
            "Premium Pique Knit Cotton",
            "3-button placket",
            "Ribbed collar & cuffs",
            "Reinforced side seams",
            "Machine washable",
        ],
        images: [poloImg, tshirtImg, vestImg],
        variants: [
            { id: "s",  size: "S",  stock: 20 },
            { id: "m",  size: "M",  stock: 30 },
            { id: "l",  size: "L",  stock: 25 },
            { id: "xl", size: "XL", stock: 15 },
        ],
    },
    {
        id: "vest-001",
        slug: "knitted-cotton-vest",
        name: "Knitted Cotton Vest",
        subtitle: "Men's Collection",
        price: 29.99,
        currency: "USD",
        category: "men",
        description:
            "A versatile layering piece crafted from premium knitted cotton. Perfect for both casual and smart-casual looks, with a clean design that pairs well with any outfit.",
        features: [
            "100% Knitted Cotton",
            "Clean round neckline",
            "Premium ribbed hem",
            "Slim-fit silhouette",
            "Ethically manufactured in Tirupur",
        ],
        images: [vestImg, tshirtImg, poloImg],
        variants: [
            { id: "s",  size: "S",  stock: 15 },
            { id: "m",  size: "M",  stock: 22 },
            { id: "l",  size: "L",  stock: 18 },
            { id: "xl", size: "XL", stock: 12 },
        ],
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}
