import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

interface Props {
    product: Product;
    index: number;
    showPrice?: boolean;
    showAddToCart?: boolean;
}

export default function ProductCard({ product, index, showPrice = true, showAddToCart = false }: Props) {
    const { ref, isVisible } = useScrollAnimation(0.1);
    const { addToCart } = useCart();

    return (
        <motion.div
            ref={ref}
            className="group"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-secondary">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </Link>
            <div className="mt-4 text-center">
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>
                {showPrice && (
                    <p className="font-body text-sm text-primary mt-1 font-medium">
                        ₹{product.price.toLocaleString("en-IN")}
                    </p>
                )}
                {showAddToCart && (
                    <button
                        onClick={() => addToCart(product.id)}
                        className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-body text-xs tracking-wide hover:opacity-90 transition-opacity duration-300"
                    >
                        <ShoppingBag size={14} />
                        Add to Cart
                    </button>
                )}
            </div>
        </motion.div>
    );
}
