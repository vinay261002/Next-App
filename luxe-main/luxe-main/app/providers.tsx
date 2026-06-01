'use client'

import { CartProvider } from '@/lib/context/CartContext'
import { WishlistProvider } from '@/lib/context/WishlistContext'
import { Toaster } from '@/components/ui/toaster'
import {Header} from '@/components/Header'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <WishlistProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Toaster />
            </WishlistProvider>
        </CartProvider>
    )
}