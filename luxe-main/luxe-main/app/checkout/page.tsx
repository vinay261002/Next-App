'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/context/CartContext'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface CheckoutForm {
    firstName: string
    lastName: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    cardName: string
    cardNumber: string
    expiryDate: string
    cvv: string
}

export default function CheckoutPage() {
    const router = useRouter()
    const { items, cartTotal, clearCart } = useCart()
    const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>()

    const shipping = cartTotal > 100 ? 0 : 15
    const tax = Math.round(cartTotal * 0.08 * 100) / 100
    const total = cartTotal + shipping + tax

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl text-muted-foreground mb-6">Your cart is empty</p>
                    <Link href="/products">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            Back to Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const onSubmit = async (data: CheckoutForm) => {
        if (step === 'shipping') {
            setStep('payment')
        } else if (step === 'payment') {
            setStep('review')
        } else {
            // Create order
            const order = {
                id: `ORDER-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                items: items,
                subtotal: cartTotal,
                shipping: shipping,
                tax: tax,
                total: total,
                status: 'confirmed',
                shippingAddress: {
                    fullName: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    phone: data.phone,
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    country: data.country,
                },
            }

            // Save to localStorage
            const orders = JSON.parse(localStorage.getItem('orders') || '[]')
            orders.push(order)
            localStorage.setItem('orders', JSON.stringify(orders))

            clearCart()
            toast.success('Order placed successfully!')
            router.push(`/order-confirmation?orderId=${order.id}`)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link href="/cart" className="flex items-center gap-2 text-accent hover:underline mb-8">
                    <ArrowLeft size={20} />
                    Back to Cart
                </Link>

                <h1 className="text-4xl font-bold text-foreground mb-12">Checkout</h1>

                {/* Progress Steps */}
                <div className="flex gap-4 mb-12">
                    {['shipping', 'payment', 'review'].map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === s || (step === 'payment' && i < 1) || (step === 'review' && i < 2)
                                        ? 'bg-accent text-accent-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {i + 1}
                            </div>
                            <span className="capitalize text-sm font-medium text-foreground">{s}</span>
                            {i < 2 && <div className="w-8 h-0.5 bg-muted mx-2" />}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-8">
                        {/* Shipping Step */}
                        {step === 'shipping' && (
                            <div className="bg-card border border-border rounded-sm p-8 space-y-6">
                                <h2 className="text-2xl font-bold text-foreground">Shipping Address</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                                        <input
                                            {...register('firstName', { required: 'First name is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="John"
                                        />
                                        {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                                        <input
                                            {...register('lastName', { required: 'Last name is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                                        <input
                                            {...register('email', { required: 'Email is required' })}
                                            type="email"
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                                        <input
                                            {...register('phone', { required: 'Phone is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                        {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
                                    <input
                                        {...register('street', { required: 'Street address is required' })}
                                        className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                        placeholder="123 Main St"
                                    />
                                    {errors.street && <p className="text-destructive text-xs mt-1">{errors.street.message}</p>}
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">City</label>
                                        <input
                                            {...register('city', { required: 'City is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="New York"
                                        />
                                        {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">State</label>
                                        <input
                                            {...register('state', { required: 'State is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="NY"
                                        />
                                        {errors.state && <p className="text-destructive text-xs mt-1">{errors.state.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                                        <input
                                            {...register('zipCode', { required: 'ZIP code is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="10001"
                                        />
                                        {errors.zipCode && <p className="text-destructive text-xs mt-1">{errors.zipCode.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                                    <input
                                        {...register('country', { required: 'Country is required' })}
                                        className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                        placeholder="United States"
                                    />
                                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country.message}</p>}
                                </div>

                                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Continue to Payment
                                </Button>
                            </div>
                        )}

                        {/* Payment Step */}
                        {step === 'payment' && (
                            <div className="bg-card border border-border rounded-sm p-8 space-y-6">
                                <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
                                    <input
                                        {...register('cardName', { required: 'Cardholder name is required' })}
                                        className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                        placeholder="John Doe"
                                    />
                                    {errors.cardName && <p className="text-destructive text-xs mt-1">{errors.cardName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                                    <input
                                        {...register('cardNumber', { required: 'Card number is required' })}
                                        className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                        placeholder="4111 1111 1111 1111"
                                    />
                                    {errors.cardNumber && <p className="text-destructive text-xs mt-1">{errors.cardNumber.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                                        <input
                                            {...register('expiryDate', { required: 'Expiry date is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="MM/YY"
                                        />
                                        {errors.expiryDate && <p className="text-destructive text-xs mt-1">{errors.expiryDate.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                                        <input
                                            {...register('cvv', { required: 'CVV is required' })}
                                            className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                            placeholder="123"
                                        />
                                        {errors.cvv && <p className="text-destructive text-xs mt-1">{errors.cvv.message}</p>}
                                    </div>
                                </div>

                                <div className="bg-muted p-3 rounded text-sm text-muted-foreground">
                                    This is a demo. Use test card 4111 1111 1111 1111.
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        className="flex-1 border-border text-foreground"
                                        onClick={() => setStep('shipping')}
                                    >
                                        Back
                                    </Button>
                                    <Button type="submit" size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                                        Review Order
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Review Step */}
                        {step === 'review' && (
                            <div className="bg-card border border-border rounded-sm p-8 space-y-6">
                                <h2 className="text-2xl font-bold text-foreground">Review Order</h2>

                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center pb-4 border-b border-border">
                                            <div>
                                                <p className="font-medium text-foreground">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        className="flex-1 border-border text-foreground"
                                        onClick={() => setStep('payment')}
                                    >
                                        Back
                                    </Button>
                                    <Button type="submit" size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                                        Place Order
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-sm p-8 sticky top-24 space-y-6">
                            <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <div>
                                            <p className="text-foreground">{item.name}</p>
                                            <p className="text-muted-foreground">x{item.quantity}</p>
                                        </div>
                                        <p className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-6 space-y-3">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
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

                            <div className="border-t border-border pt-6 flex justify-between text-xl font-bold text-foreground">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
