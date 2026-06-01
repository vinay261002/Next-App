'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, Product } from '../mockData'

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, quantity: number, color?: string, size?: string) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    cartTotal: number
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [mounted, setMounted] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cart')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to load cart:', e)
            }
        }
        setMounted(true)
    }, [])

    // Save to localStorage whenever items change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('cart', JSON.stringify(items))
        }
    }, [items, mounted])

    const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
            )

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id && item.selectedColor === color && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }

            return [...prevItems, { ...product, quantity, selectedColor: color, selectedSize: size }]
        })
    }

    const removeFromCart = (productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}