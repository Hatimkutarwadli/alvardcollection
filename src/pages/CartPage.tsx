import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CartPage = () => {
    const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const shipping = totalPrice > 0 ? 4.99 : 0;
    const grandTotal = totalPrice + shipping;

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
                    Continue Shopping
                </Link>

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <p className="text-body text-xs tracking-[0.3em] uppercase text-primary mb-2">Your Bag</p>
                            <h1 className="text-display text-3xl md:text-4xl font-bold text-foreground">
                                Shopping Cart
                                {totalItems > 0 && (
                                    <span className="text-muted-foreground font-normal text-2xl ml-3">({totalItems})</span>
                                )}
                            </h1>
                        </div>
                        {items.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Empty State */}
                    <AnimatePresence>
                        {items.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-24 flex flex-col items-center gap-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ShoppingBag size={32} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-display text-2xl font-bold text-foreground mb-2">Your cart is empty</p>
                                    <p className="text-muted-foreground text-sm">Add some premium garments to get started.</p>
                                </div>
                                <Link
                                    to="/product/premium-cotton-tshirt"
                                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
                                >
                                    Shop Now <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Cart Content */}
                    {items.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.product.id}-${item.variant.id}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex gap-5 p-5 bg-card border border-border rounded-2xl group"
                                        >
                                            {/* Image */}
                                            <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-secondary">
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            </Link>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">{item.product.subtitle}</p>
                                                        <Link
                                                            to={`/product/${item.product.slug}`}
                                                            className="text-display font-semibold text-foreground hover:text-primary transition-colors"
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Size: <span className="font-medium text-foreground">{item.variant.size}</span>
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id, item.variant.id)}
                                                        className="text-muted-foreground hover:text-red-500 transition-colors p-1 flex-shrink-0"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    {/* Qty */}
                                                    <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <div className="w-10 h-8 flex items-center justify-center text-sm font-semibold text-foreground border-x border-border">
                                                            {item.quantity}
                                                        </div>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        <p className="text-display font-bold text-foreground text-lg">
                                                            ${(item.product.price * item.quantity).toFixed(2)}
                                                        </p>
                                                        {item.quantity > 1 && (
                                                            <p className="text-xs text-muted-foreground">
                                                                ${item.product.price.toFixed(2)} each
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-card border border-border rounded-2xl p-6 sticky top-28 space-y-5">
                                    <h2 className="text-display text-xl font-bold text-foreground">Order Summary</h2>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                                            <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Shipping</span>
                                            <span className="text-foreground font-medium">
                                                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="border-t border-border pt-3 flex justify-between">
                                            <span className="font-bold text-foreground text-base">Total</span>
                                            <span className="text-display font-bold text-foreground text-xl">${grandTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Checkout button */}
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => navigate("/checkout")}
                                        className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout <ArrowRight size={14} />
                                    </motion.button>

                                    <Link
                                        to="/"
                                        className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Continue Shopping
                                    </Link>

                                    <div className="pt-3 border-t border-border text-center">
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                            Secure Checkout · SSL Encrypted
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
