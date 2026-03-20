import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface NavbarProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const navLinks = [
    { label: "Collections", href: "/#collections" },
    { label: "Categories", href: "/#categories" },
    { label: "About", href: "/#about" },
];

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "py-3 bg-background/85 backdrop-blur-xl border-b border-border/40 shadow-sm"
                        : "py-5 bg-transparent"
                    }`}
            >
                <div className="container flex items-center justify-between">
                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-foreground p-2"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {/* Logo */}
                    <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <h1 className="font-display text-xl md:text-2xl tracking-[0.12em] font-semibold text-foreground">
                            Alvard
                        </h1>
                    </Link>

                    {/* Nav links - desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300 rounded-full hover:bg-secondary"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <Link
                            to="/cart"
                            className="relative p-2 text-muted-foreground hover:text-primary transition-colors duration-300 rounded-full hover:bg-secondary"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={18} />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-body font-semibold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="font-display text-2xl tracking-[0.1em] text-foreground hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        to="/cart"
                        onClick={() => setMobileOpen(false)}
                        className="font-display text-2xl tracking-[0.1em] text-foreground hover:text-primary transition-colors"
                    >
                        Cart {totalItems > 0 && `(${totalItems})`}
                    </Link>
                </div>
            )}
        </>
    );
}
