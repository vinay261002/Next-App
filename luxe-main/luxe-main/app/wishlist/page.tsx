'use client'

import Link from 'next/link'
import { products } from '@/lib/mockData'
import { useWishlist } from '@/lib/context/WishlistContext'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function WishlistPage() {
    const { items } = useWishlist()
    const wishlistProducts = products.filter((p) => items.includes(p.id))

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link href="/products" className="flex items-center gap-2 text-accent hover:underline mb-8">
                    <ArrowLeft size={20} />
                    Back to Shop
                </Link>

                <h1 className="text-4xl font-bold text-foreground mb-12">My Wishlist</h1>

                {wishlistProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-2xl text-muted-foreground mb-6">Your wishlist is empty</p>
                        <Link href="/products">
                            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p className="text-muted-foreground mb-8">{wishlistProducts.length} item(s) in your wishlist</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
