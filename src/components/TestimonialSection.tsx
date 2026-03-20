import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Fatema B.",
        quote: "The craftsmanship is unmatched. My bridal rida was everything I dreamed of and more. Truly a work of art.",
        location: "Mumbai",
    },
    {
        name: "Sakina M.",
        quote: "I've been ordering from Alvard for years. The quality and attention to detail keep me coming back every season.",
        location: "Surat",
    },
    {
        name: "Tasneem K.",
        quote: "Beautiful occasion wear that makes me feel elegant and confident. The fabrics are luxurious and the embroidery is exquisite.",
        location: "Udaipur",
    },
];

export default function TestimonialSection() {
    const { ref, isVisible } = useScrollAnimation(0.1);

    return (
        <section className="py-20 md:py-28 bg-secondary/30">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
                        Testimonials
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                        Loved by <span className="italic">Our Clients</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={t.name} {...t} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ name, quote, location, index }: typeof testimonials[0] & { index: number }) {
    const { ref, isVisible } = useScrollAnimation(0.15);

    return (
        <motion.div
            ref={ref}
            className="bg-card rounded-2xl p-8 shadow-sm border border-border/50"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{quote}"
            </p>
            <div>
                <p className="font-body text-sm font-medium text-foreground">{name}</p>
                <p className="font-body text-xs text-muted-foreground">{location}</p>
            </div>
        </motion.div>
    );
}
