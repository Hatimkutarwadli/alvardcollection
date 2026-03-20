import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
    const { ref, isVisible } = useScrollAnimation(0.1);
    const featured = getFeaturedProducts();

    return (
        <section id="collections" className="py-20 md:py-28 bg-secondary/30">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
                        Featured
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                        Our <span className="italic">Bestsellers</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                    {featured.map((product, i) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={i}
                            showPrice={true}
                            showAddToCart={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
