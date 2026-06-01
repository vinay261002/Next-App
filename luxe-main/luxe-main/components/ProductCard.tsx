'use client'

import { Product } from '@/lib/mockData'
import { useCart } from '@/lib/context/CartContext'
import { useWishlist } from '@/lib/context/WishlistContext'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart()
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
    const [isHovered, setIsHovered] = useState(false)
    const inWishlist = isInWishlist(product.id)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        addToCart(product, 1)
        toast.success('Added to cart!')
    }

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        if (inWishlist) {
            removeFromWishlist(product.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist(product.id)
            toast.success('Added to wishlist!')
        }
    }

    return (
        <Link href={`/products/${product.id}`}>
            <div
                className="group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative bg-muted overflow-hidden rounded-sm mb-4 aspect-square">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'
                            }`}
                    />
                    <button
                        onClick={handleWishlist}
                        className="absolute top-4 right-4 p-2 bg-background rounded-full shadow-md hover:bg-accent hover:text-accent-foreground transition z-10"
                    >
                        <Heart
                            size={18}
                            className={inWishlist ? 'fill-current text-accent' : ''}
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted'}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-foreground">${product.price}</span>
                        {isHovered && (
                            <Button
                                onClick={handleAddToCart}
                                variant="default"
                                size="sm"
                                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                            >
                                Add
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
