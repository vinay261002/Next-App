'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface WishlistContextType {
    items: string[]
    isInWishlist: (productId: string) => boolean
    addToWishlist: (productId: string) => void
    removeFromWishlist: (productId: string) => void
    wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<string[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('wishlist')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to load wishlist:', e)
            }
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('wishlist', JSON.stringify(items))
        }
    }, [items, mounted])

    const isInWishlist = (productId: string) => items.includes(productId)

    const addToWishlist = (productId: string) => {
        setItems((prev) => prev.includes(productId) ? prev : [...prev, productId])
    }

    const removeFromWishlist = (productId: string) => {
        setItems((prev) => prev.filter((id) => id !== productId))
    }

    return (
        <WishlistContext.Provider
            value={{
                items,
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
                wishlistCount: items.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider')
    }
    return context
}