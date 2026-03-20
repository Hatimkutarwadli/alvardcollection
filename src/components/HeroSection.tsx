import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-elegant.jpg";

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background image */}
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={loaded ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <img
                    src={heroImage}
                    alt="Elegant pink rida with gold embroidery"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-end pb-16 md:pb-24 lg:items-center lg:pb-0">
                <div className="container">
                    <div className="max-w-xl">
                        <motion.p
                            className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={loaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            Since 25 Years
                        </motion.p>

                        <motion.h2
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.15]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={loaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            Elegant Rida{" "}
                            <span className="italic text-primary">Collection</span>
                        </motion.h2>

                        <motion.p
                            className="font-body text-base md:text-lg text-muted-foreground mt-4 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={loaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            Grace in every thread
                        </motion.p>

                        <motion.div
                            className="mt-8 flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={loaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        >
                            <a
                                href="#collections"
                                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-body text-sm tracking-wide hover:opacity-90 transition-opacity duration-300"
                            >
                                Explore Collection
                            </a>
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center border border-primary text-primary px-8 py-3.5 rounded-lg font-body text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                                Order on WhatsApp
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
