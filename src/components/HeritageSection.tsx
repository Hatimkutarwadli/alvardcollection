import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import embroideryImg from "@/assets/heritage-embroidery.jpg";
import fabricsImg from "@/assets/heritage-fabrics.jpg";

export default function HeritageSection() {
    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
    const { ref: imgRef, isVisible: imgVisible } = useScrollAnimation(0.1);

    return (
        <section id="heritage" className="py-20 md:py-32 bg-secondary/50">
            <div className="container">
                {/* Title */}
                <div ref={titleRef} className="text-center mb-16 md:mb-24">
                    <motion.span
                        className="font-body text-xs tracking-[0.3em] uppercase text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={titleVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        The Art of Pardi
                    </motion.span>
                    <motion.h2
                        className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold mt-3 text-foreground max-w-2xl mx-auto text-balance"
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        25 Years of{" "}
                        <span className="italic text-primary">Heritage</span>{" "}
                        Craftsmanship
                    </motion.h2>
                    <motion.p
                        className="font-body text-sm md:text-base text-muted-foreground mt-6 max-w-lg mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={titleVisible ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Every stitch carries the weight of centuries-old tradition. Our artisans
                        weave stories of faith, identity, and beauty into each piece.
                    </motion.p>
                </div>

                {/* Staggered images */}
                <div ref={imgRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    <motion.div
                        className="md:col-span-7 overflow-hidden"
                        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                        animate={imgVisible ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                    >
                        <img
                            src={fabricsImg}
                            alt="Luxurious fabric swatches in jewel tones"
                            className="w-full h-[50vh] md:h-[70vh] object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="md:col-span-5 md:mt-16 overflow-hidden"
                        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                        animate={imgVisible ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.3 }}
                    >
                        <img
                            src={embroideryImg}
                            alt="Intricate gold Pardi embroidery detail"
                            className="w-full h-[60vh] md:h-[80vh] object-cover"
                        />
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-24">
                    {[
                        { number: "25+", label: "Years of Legacy" },
                        { number: "10K+", label: "Happy Customers" },
                        { number: "50+", label: "Artisan Partners" },
                        { number: "100+", label: "Unique Designs" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={imgVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                        >
                            <span className="font-display text-3xl md:text-4xl font-bold text-primary">
                                {stat.number}
                            </span>
                            <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mt-2">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
