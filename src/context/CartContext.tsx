import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product, ProductVariant } from "@/data/products";

export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeFromCart: (productId: string, variantId: string) => void;
    updateQuantity: (productId: string, variantId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = useCallback(
        (product: Product, variant: ProductVariant, quantity = 1) => {
            setItems((prev) => {
                const existing = prev.find(
                    (i) => i.product.id === product.id && i.variant.id === variant.id
                );
                if (existing) {
                    return prev.map((i) =>
                        i.product.id === product.id && i.variant.id === variant.id
                            ? { ...i, quantity: i.quantity + quantity }
                            : i
                    );
                }
                return [...prev, { product, variant, quantity }];
            });
        },
        []
    );

    const removeFromCart = useCallback((productId: string, variantId: string) => {
        setItems((prev) =>
            prev.filter((i) => !(i.product.id === productId && i.variant.id === variantId))
        );
    }, []);

    const updateQuantity = useCallback(
        (productId: string, variantId: string, quantity: number) => {
            if (quantity <= 0) {
                removeFromCart(productId, variantId);
                return;
            }
            setItems((prev) =>
                prev.map((i) =>
                    i.product.id === productId && i.variant.id === variantId
                        ? { ...i, quantity }
                        : i
                )
            );
        },
        [removeFromCart]
    );

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
};
