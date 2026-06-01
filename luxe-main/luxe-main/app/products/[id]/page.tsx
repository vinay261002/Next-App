'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { products, getProductById } from '@/lib/mockData'
import { useCart } from '@/lib/context/CartContext'
import { useWishlist } from '@/lib/context/WishlistContext'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Heart, Star, Share2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ProductDetailPage() {
    const params = useParams()
    const productId = params.id as string
    const product = getProductById(productId)
    const { addToCart } = useCart()
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product?.colors[0])
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
    const [quantity, setQuantity] = useState(1)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Back to Shop
                    </Button>
                </div>
            </div>
        )
    }

    const inWishlist = isInWishlist(product.id)
    const relatedProducts = products.filter((p) => product.relatedProducts.includes(p.id))

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedColor, selectedSize)
        toast.success(`Added ${quantity} item(s) to cart!`)
        setQuantity(1)
    }

    const handleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(product.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist(product.id)
            toast.success('Added to wishlist!')
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="relative bg-muted overflow-hidden rounded-sm aspect-square">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-4">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative w-20 h-20 rounded overflow-hidden border-2 transition ${selectedImage === i ? 'border-accent' : 'border-border'
                                            }`}
                                    >
                                        <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
                            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted'}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {product.rating} ({product.reviewCount} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-3xl font-bold text-foreground">${product.price}</div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                        {/* Stock Status */}
                        <div>
                            {product.inStock ? (
                                <p className="text-green-600 font-semibold">In Stock</p>
                            ) : (
                                <p className="text-red-600 font-semibold">Out of Stock</p>
                            )}
                        </div>

                        {/* Color Selection */}
                        {product.colors.length > 0 && (
                            <div>
                                <label className="block font-semibold text-foreground mb-3">Color</label>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded border-2 transition ${selectedColor === color
                                                    ? 'border-accent bg-accent text-accent-foreground'
                                                    : 'border-border hover:border-accent text-foreground'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        {product.sizes.length > 0 && (
                            <div>
                                <label className="block font-semibold text-foreground mb-3">Size</label>
                                <div className="flex gap-3 flex-wrap">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded border-2 transition ${selectedSize === size
                                                    ? 'border-accent bg-accent text-accent-foreground'
                                                    : 'border-border hover:border-accent text-foreground'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div>
                            <label className="block font-semibold text-foreground mb-3">Quantity</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 border border-border rounded hover:bg-muted transition"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 border border-border rounded hover:bg-muted transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                size="lg"
                                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add to Cart
                            </Button>
                            <Button
                                onClick={handleWishlist}
                                variant="outline"
                                size="lg"
                                className={`border-2 ${inWishlist
                                        ? 'border-accent bg-accent text-accent-foreground'
                                        : 'border-border text-foreground hover:bg-muted'
                                    }`}
                            >
                                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                            </Button>
                            <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
                                <Share2 size={20} />
                            </Button>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-muted p-4 rounded space-y-2">
                            <p className="font-semibold text-foreground">Free Shipping</p>
                            <p className="text-sm text-muted-foreground">On all orders over $100</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.reviews.map((review) => (
                            <div key={review.id} className="bg-card p-6 rounded-sm border border-border">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-foreground">{review.author}</h3>
                                    <span className="text-xs text-muted-foreground">{review.date}</span>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < review.rating ? 'fill-accent text-accent' : 'text-muted'}
                                        />
                                    ))}
                                </div>
                                <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
