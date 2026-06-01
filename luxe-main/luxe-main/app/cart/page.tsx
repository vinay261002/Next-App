'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { Button } from '@/components/ui/button'
import { ArrowLeft, X } from 'lucide-react'

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

    const subtotal = cartTotal
    const shipping = subtotal > 100 ? 0 : 15
    const tax = Math.round(subtotal * 0.08 * 100) / 100
    const total = subtotal + shipping + tax

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link href="/products" className="flex items-center gap-2 text-accent hover:underline mb-8">
                    <ArrowLeft size={20} />
                    Continue Shopping
                </Link>

                <h1 className="text-4xl font-bold text-foreground mb-12">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-2xl text-muted-foreground mb-6">Your cart is empty</p>
                        <Link href="/products">
                            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-card border border-border rounded-sm p-6 flex gap-6">
                                        {/* Image */}
                                        <div className="flex-shrink-0 w-32 h-32 relative bg-muted rounded">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <Link href={`/products/${item.id}`}>
                                                <h3 className="font-semibold text-lg text-foreground hover:text-accent transition mb-2">
                                                    {item.name}
                                                </h3>
                                            </Link>

                                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                                {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                                                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 py-1 border border-border rounded hover:bg-muted transition"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 border border-border rounded hover:bg-muted transition"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-lg font-semibold text-foreground">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">${item.price} each</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="flex-shrink-0 text-muted-foreground hover:text-destructive transition"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {items.length > 0 && (
                                <Button
                                    onClick={clearCart}
                                    variant="outline"
                                    className="mt-8 border-border text-foreground hover:text-destructive hover:border-destructive"
                                >
                                    Clear Cart
                                </Button>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-card border border-border rounded-sm p-8 sticky top-24 space-y-6">
                                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                                <div className="space-y-3 border-b border-border pb-6">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xl font-bold text-foreground">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                {shipping === 0 && (
                                    <div className="bg-muted p-3 rounded text-sm text-muted-foreground">
                                        ✓ Free shipping on this order!
                                    </div>
                                )}

                                <Link href="/checkout" className="w-full block">
                                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <Link href="/products" className="w-full block">
                                    <Button variant="outline" size="lg" className="w-full border-border text-foreground hover:bg-muted">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
