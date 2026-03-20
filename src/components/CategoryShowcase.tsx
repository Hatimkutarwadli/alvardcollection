import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getProductsByCategory, type Category, type CategoryInfo } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

function CategoryRow({ category }: { category: CategoryInfo }) {
    const { ref, isVisible } = useScrollAnimation(0.1);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const products = getProductsByCategory(category.slug);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 2);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateScrollState);
        updateScrollState();
        return () => el.removeEventListener("scroll", updateScrollState);
    }, []);

    const scroll = (dir: number) => {
        scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
    };

    if (products.length === 0) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 last:mb-0"
        >
            <div className="flex items-end justify-between mb-6">
                <div>
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-1">
                        {category.subtitle}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                        {category.title}
                    </h3>
                </div>
                <Link
                    to={`/category/${category.slug}`}
                    className="font-body text-xs tracking-[0.15em] uppercase text-primary hover:opacity-70 transition-opacity hidden md:block"
                >
                    View All →
                </Link>
            </div>

            <div className="relative group">
                {canScrollLeft && (
                    <button
                        onClick={() => scroll(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product, i) => (
                        <div key={product.id} className="min-w-[180px] max-w-[200px] flex-shrink-0">
                            <ProductCard product={product} index={i} showPrice showAddToCart />
                        </div>
                    ))}
                </div>

                {canScrollRight && (
                    <button
                        onClick={() => scroll(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                )}
            </div>

            <Link
                to={`/category/${category.slug}`}
                className="font-body text-xs tracking-[0.15em] uppercase text-primary hover:opacity-70 transition-opacity mt-4 inline-block md:hidden"
            >
                View All →
            </Link>
        </motion.div>
    );
}

export default function CategoryShowcase() {
    const { ref, isVisible } = useScrollAnimation(0.1);
    const categoryList: CategoryInfo[] = [
        { slug: "casual" as Category, title: "Casual Wear", subtitle: "Everyday Elegance", image: "", description: "" },
        { slug: "occasion" as Category, title: "Occasion Wear", subtitle: "Special Moments", image: "", description: "" },
        { slug: "wedding" as Category, title: "Wedding Collection", subtitle: "Your Beautiful Day", image: "", description: "" },
    ];

    return (
        <section className="py-20 md:py-28">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
                        Explore
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                        Shop by <span className="italic">Collection</span>
                    </h2>
                </motion.div>

                {categoryList.map((cat) => (
                    <CategoryRow key={cat.slug} category={cat} />
                ))}
            </div>
        </section>
    );
}
