import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import collectionRida from "@/assets/collection-rida-2.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionJodi from "@/assets/collection-jodi.jpg";

const collections = [
    {
        title: "Ridas",
        subtitle: "The Signature Collection",
        description: "From everyday elegance to special occasions — each Rida tells a story of tradition, reimagined.",
        image: collectionRida,
        align: "left" as const,
    },
    {
        title: "Bridal",
        subtitle: "For Your Most Beautiful Day",
        description: "Exquisite zardozi, delicate lace, and the finest fabrics come together for moments that last a lifetime.",
        image: collectionBridal,
        align: "right" as const,
    },
    {
        title: "Jodis",
        subtitle: "Perfect Pairings",
        description: "Coordinated sets that bring harmony and grace to your wardrobe, crafted with meticulous attention to detail.",
        image: collectionJodi,
        align: "left" as const,
    },
];

function CollectionCard({ title, subtitle, description, image, align, index }: typeof collections[0] & { index: number }) {
    const { ref, isVisible } = useScrollAnimation(0.2);

    return (
        <div
            ref={ref}
            className={`flex flex-col ${align === "right" ? "md:flex-row-reverse" : "md:flex-row"
                } gap-6 md:gap-12 items-center`}
        >
            {/* Image */}
            <motion.div
                className="w-full md:w-3/5 overflow-hidden"
                initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                animate={isVisible ? { clipPath: "inset(0% 0 0 0)", opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
            >
                <motion.img
                    src={image}
                    alt={title}
                    className="w-full h-[60vh] md:h-[80vh] object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8 }}
                />
            </motion.div>

            {/* Text */}
            <motion.div
                className={`w-full md:w-2/5 ${align === "right" ? "md:text-right" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <span className="font-body text-xs tracking-[0.3em] uppercase text-primary">
                    0{index + 1}
                </span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 text-foreground">
                    {title}
                </h3>
                <p className="font-display text-lg italic text-primary mt-2">{subtitle}</p>
                <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed max-w-sm">
                    {description}
                </p>
                <a
                    href="#"
                    className="inline-block mt-6 font-body text-xs tracking-[0.2em] uppercase text-primary border-b border-primary pb-1 hover:border-foreground hover:text-foreground transition-colors duration-300"
                >
                    View Collection
                </a>
            </motion.div>
        </div>
    );
}

export default function CollectionsSection() {
    return (
        <section id="collections" className="py-20 md:py-32">
            <div className="container space-y-20 md:space-y-32">
                <div className="text-center">
                    <span className="font-body text-xs tracking-[0.3em] uppercase text-primary">
                        Our Collections
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 text-foreground">
                        Curated With <span className="italic">Purpose</span>
                    </h2>
                </div>

                {collections.map((collection, i) => (
                    <CollectionCard key={collection.title} {...collection} index={i} />
                ))}
            </div>
        </section>
    );
}
