import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap, ChevronLeft, Star, Check, Package, Truck, Shield } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ProductPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const product = getProductBySlug(slug ?? "");
    const { addToCart } = useCart();
    const { theme, toggleTheme } = useTheme();

    const [selectedVariant, setSelectedVariant] = useState(product?.variants[2] ?? null); // default M
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
                <p className="text-2xl font-display">Product not found</p>
                <Link to="/" className="btn-link text-primary underline">Go back home</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedVariant) return;
        addToCart(product, selectedVariant, quantity);
        setAddedToCart(true);
        toast.success(`${product.name} (${selectedVariant.size}) added to cart!`);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        if (!selectedVariant) return;
        addToCart(product, selectedVariant, quantity);
        navigate("/cart");
    };

    const savings = product.originalPrice
        ? ((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)
        : null;

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="pt-24 md:pt-28 pb-20 section-padding">
                {/* Back */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* ── Image Gallery ── */}
                    <div className="space-y-4">
                        {/* Main image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="relative overflow-hidden rounded-2xl aspect-square bg-card"
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.badge && (
                                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                                    {product.badge}
                                </span>
                            )}
                            {savings && (
                                <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                                    -{savings}%
                                </span>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                                        selectedImage === i
                                            ? "border-primary shadow-md scale-105"
                                            : "border-border hover:border-primary/50"
                                    }`}
                                >
                                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Product Details ── */}
                    <div className="space-y-6">
                        {/* Eyebrow */}
                        <div>
                            <p className="text-body text-xs tracking-[0.3em] uppercase text-primary mb-2">{product.subtitle}</p>
                            <h1 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                {product.name}
                            </h1>

                            {/* Rating */}
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
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-muted-foreground line-through text-lg mb-1">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                            {savings && (
                                <span className="text-red-500 text-sm font-semibold mb-1">Save {savings}%</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-body text-sm md:text-base text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        {/* Size picker */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Size</span>
                                {selectedVariant && (
                                    <span className="text-xs text-primary">Selected: {selectedVariant.size}</span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.variants.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVariant(v)}
                                        disabled={v.stock === 0}
                                        className={`w-12 h-12 rounded-lg text-sm font-semibold border-2 transition-all duration-200 ${
                                            selectedVariant?.id === v.id
                                                ? "bg-primary text-primary-foreground border-primary scale-110 shadow-md"
                                                : v.stock === 0
                                                ? "text-muted-foreground border-border opacity-40 cursor-not-allowed line-through"
                                                : "text-foreground border-border hover:border-primary hover:scale-105"
                                        }`}
                                    >
                                        {v.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity picker */}
                        <div>
                            <span className="text-sm font-semibold text-foreground uppercase tracking-wider block mb-3">Quantity</span>
                            <div className="flex items-center gap-0 border border-border rounded-lg w-fit overflow-hidden">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-12 h-12 text-xl font-light text-foreground hover:bg-secondary transition-colors"
                                >
                                    −
                                </button>
                                <div className="w-14 h-12 flex items-center justify-center text-foreground font-semibold border-x border-border">
                                    {quantity}
                                </div>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-12 h-12 text-xl font-light text-foreground hover:bg-secondary transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <motion.button
                                onClick={handleAddToCart}
                                whileTap={{ scale: 0.97 }}
                                disabled={!selectedVariant}
                                className={`flex-1 flex items-center justify-center gap-2 h-14 text-sm tracking-widest uppercase font-medium border-2 transition-all duration-300 ${
                                    addedToCart
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                }`}
                            >
                                <AnimatePresence mode="wait">
                                    {addedToCart ? (
                                        <motion.span
                                            key="added"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Check size={16} /> Added!
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="add"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="flex items-center gap-2"
                                        >
                                            <ShoppingCart size={16} /> Add to Cart
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <motion.button
                                onClick={handleBuyNow}
                                whileTap={{ scale: 0.97 }}
                                disabled={!selectedVariant}
                                className="flex-1 flex items-center justify-center gap-2 h-14 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
                            >
                                <Zap size={16} />
                                Buy Now
                            </motion.button>
                        </div>

                        {/* Trust signals */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                            {[
                                { icon: Package, label: "Free Packaging" },
                                { icon: Truck, label: "Fast Shipping" },
                                { icon: Shield, label: "Quality Guarantee" },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Icon size={16} className="text-primary" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Features */}
                        <div className="border border-border rounded-xl p-5 space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Product Details</p>
                            {product.features.map((f) => (
                                <div key={f} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductPage;
