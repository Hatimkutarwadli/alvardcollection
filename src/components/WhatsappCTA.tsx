import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
    const { ref, isVisible } = useScrollAnimation(0.2);

    return (
        <section className="py-20 md:py-28">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="bg-primary/10 rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                        Order Made <span className="italic">Simple</span>
                    </h2>
                    <p className="font-body text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                        Browse our collection and place your order directly on WhatsApp. Personal styling assistance available.
                    </p>
                    <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-body text-sm tracking-wide hover:opacity-90 transition-opacity duration-300"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
