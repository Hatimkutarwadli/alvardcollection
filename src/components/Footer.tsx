import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer id="about" className="border-t border-border py-16 md:py-20">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-display text-2xl tracking-[0.1em] font-semibold text-foreground">
                            Alvard
                        </h3>
                        <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs">
                            Crafting elegant Ridas for the Dawoodi Bohra woman since 25 years. Where tradition meets timeless style.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-5 font-medium">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <span className="font-body text-sm text-muted-foreground">+91 98765 43210</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <span className="font-body text-sm text-muted-foreground">
                                    Bohri Mohalla, Surat,<br />Gujarat, India
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-5 font-medium">
                            Follow Us
                        </h4>
                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, label: "Instagram", href: "#" },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 pt-8 border-t border-border text-center">
                    <p className="font-body text-xs text-muted-foreground">
                        © 2026 Alvard Collection. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
