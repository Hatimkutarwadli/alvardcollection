import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { categories } from "@/data/products";

function CategoryCard({ slug, title, subtitle, image, index }: { slug: string; title: string; subtitle: string; image: string; index: number }) {
    const { ref, isVisible } = useScrollAnimation(0.15);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15 }}
        >
            <Link
                to={`/category/${slug}`}
                className="group relative block overflow-hidden rounded-2xl cursor-pointer"
            >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent flex flex-col justify-end p-6">
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/80 mb-1">
                        {subtitle}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground">
                        {title}
                    </h3>
                </div>
            </Link>
        </motion.div>
    );
}

export default function CategorySection() {
    const { ref, isVisible } = useScrollAnimation(0.1);

    return (
        <section id="categories" className="py-20 md:py-28">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
                        Shop by Category
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                        Curated for <span className="italic">Every Occasion</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <CategoryCard key={cat.slug} {...cat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
