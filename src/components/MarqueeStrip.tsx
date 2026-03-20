export default function MarqueeStrip() {
    const items = [
        "RIDAS", "•", "SUJNIS", "•", "JODIS", "•", "BRIDAL WEAR", "•",
        "QUILTED ELEGANCE", "•", "HERITAGE CRAFT", "•", "PARDI EMBROIDERY", "•",
    ];

    return (
        <div className="py-6 md:py-8 border-y border-border overflow-hidden">
            <div className="flex animate-horizontal-scroll whitespace-nowrap">
                {[...items, ...items, ...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className={`font-display text-lg md:text-2xl tracking-[0.15em] mx-4 md:mx-6 ${item === "•" ? "text-primary" : "text-foreground/60"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
