import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ShoppingCart, Zap, Star, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import tshirtImg from "@/assets/product-tshirt.jpg";

const FeaturedProduct = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    // Feature the t-shirt (first product)
    const featured = products[0];
    const defaultVariant = featured.variants[2]; // size M

    const handleAddToCart = () => {
        addToCart(featured, defaultVariant, 1);
        toast.success(`${featured.name} (M) added to cart!`);
    };

    const handleBuyNow = () => {
        addToCart(featured, defaultVariant, 1);
        navigate("/cart");
    };

    return (
        <section id="featured" className="py-24 md:py-40 section-padding overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Section Label */}
                <div ref={ref} className={`mb-16 md:mb-20 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-body text-sm tracking-[0.3em] uppercase text-primary mb-4">Featured Product</p>
                    <h2 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                        Shop Our<br />
                        <span className="italic font-normal">Best Seller</span>
                    </h2>
                    <div className="accent-line mt-6" />
                </div>

                {/* Product Card - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <Link to={`/product/${featured.slug}`} className="block group">
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-card shadow-2xl">
                                <img
                                    src={tshirtImg}
                                    alt={featured.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                {/* Badge */}
                                {featured.badge && (
                                    <span className="absolute top-5 left-5 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                                        {featured.badge}
                                    </span>
                                )}
                                {/* Discount badge */}
                                {featured.originalPrice && (
                                    <span className="absolute top-5 right-5 bg-red-500 text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                                        Sale
                                    </span>
                                )}
                                {/* Bottom CTA hint */}
                                <div className="absolute bottom-5 left-5 right-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white/70 text-xs uppercase tracking-widest">Premium Cotton</p>
                                            <p className="text-white font-display font-bold text-xl">View Details</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                            <ArrowRight size={16} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Details Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-6"
                    >
                        {/* Name & Rating */}
                        <div>
                            <p className="text-body text-xs tracking-[0.3em] uppercase text-primary mb-2">{featured.subtitle}</p>
                            <h3 className="text-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                                {featured.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-3">
                                {[1,2,3,4,5].map(s => (
                                    <Star key={s} size={14} className="fill-primary text-primary" />
                                ))}
                                <span className="text-xs text-muted-foreground ml-1">4.9 · 128 reviews</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3 pb-6 border-b border-border">
                            <span className="text-display text-4xl font-bold text-foreground">
                                ${featured.price.toFixed(2)}
                            </span>
                            {featured.originalPrice && (
                                <span className="text-muted-foreground line-through text-lg mb-1">
                                    ${featured.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Short Description */}
                        <p className="text-body text-sm md:text-base text-muted-foreground leading-relaxed">
                            {featured.description}
                        </p>

                        {/* Features quick list */}
                        <div className="space-y-2.5">
                            {featured.features.slice(0, 3).map(f => (
                                <div key={f} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{f}</span>
                                </div>
                            ))}
                        </div>

                        {/* Size preview */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">Available Sizes</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {featured.variants.map(v => (
                                    <div
                                        key={v.id}
                                        className={`w-10 h-10 rounded-lg text-xs font-medium border flex items-center justify-center ${
                                            v.id === "m"
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "border-border text-muted-foreground"
                                        }`}
                                    >
                                        {v.size}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Quick-adding size M. <Link to={`/product/${featured.slug}`} className="text-primary underline">Change size</Link></p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 h-14 border-2 border-primary text-primary text-sm tracking-widest uppercase font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                                <ShoppingCart size={16} />
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 flex items-center justify-center gap-2 h-14 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
                            >
                                <Zap size={16} />
                                Buy Now
                            </button>
                        </div>

                        {/* View Full Details */}
                        <Link
                            to={`/product/${featured.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            View full product details
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;
