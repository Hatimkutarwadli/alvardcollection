import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CartItem {
    productId: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((productId: string) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.productId === productId);
            if (existing) {
                return prev.map((i) =>
                    i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { productId, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((i) => i.productId !== productId));
        } else {
            setItems((prev) =>
                prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
            );
        }
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
