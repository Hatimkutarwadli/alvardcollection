import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section id="about" className="py-20 md:py-32">
            <div ref={ref} className="container max-w-4xl text-center">
                <motion.span
                    className="font-body text-xs tracking-[0.3em] uppercase text-primary"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Our Story
                </motion.span>
                <motion.h2
                    className="font-display text-3xl md:text-5xl font-semibold mt-3 text-foreground text-balance"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Your Outlook Is{" "}
                    <span className="italic text-primary">Our Lookout</span>
                </motion.h2>
                <motion.p
                    className="font-body text-base md:text-lg text-muted-foreground mt-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    A collection of quality goods created and curated with 25 years of experience
                    in the industry. Al-Vard has always been at the forefront of the bridge between
                    our culture and fashion — honouring the timeless traditions of the Dawoodi Bohra
                    community while embracing contemporary elegance.
                </motion.p>
                <motion.div
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a
                        href="#"
                        className="inline-block border border-primary px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                    >
                        Shop Now
                    </a>
                    <a
                        href="#"
                        className="inline-block border border-border px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:border-primary hover:text-primary transition-all duration-500"
                    >
                        Wedding Planner
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
