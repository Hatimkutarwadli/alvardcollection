import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { getCategoryInfo, getProductsByCategory, type Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
    const { slug } = useParams<{ slug: string }>();
    const { theme, toggleTheme } = useTheme();
    const category = getCategoryInfo(slug as Category);
    const products = getProductsByCategory(slug as Category);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="font-body text-muted-foreground">Category not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            {/* Hero banner */}
            <section className="relative h-[50vh] min-h-[320px] overflow-hidden">
                <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
                <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-16">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-primary mb-4 hover:opacity-70 transition-opacity"
                            >
                                <ArrowLeft size={14} />
                                Back to Home
                            </Link>
                            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">
                                {category.subtitle}
                            </p>
                            <h1 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
                                {category.title}
                            </h1>
                            <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg leading-relaxed">
                                {category.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Products grid */}
            <section className="py-14 md:py-20">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
                        {products.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} showPrice={true} showAddToCart={true} />
                        ))}
                    </div>
                    {products.length === 0 && (
                        <p className="text-center font-body text-muted-foreground py-20">
                            No products in this category yet.
                        </p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
