'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.trim()) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
        }
    }

    return (
        <footer className="bg-card border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">LUXE</h3>
                        <p className="text-muted-foreground text-sm">
                            Curated home goods and lifestyle products for the discerning customer.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/products" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=Lighting" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    Lighting
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=Furniture" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    Furniture
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=Decor" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    Decor
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
                        <p className="text-muted-foreground text-sm mb-3">Get exclusive offers and updates.</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-3 py-2 bg-background text-foreground placeholder:text-muted-foreground text-sm rounded border border-border focus:outline-none focus:border-accent"
                            />
                            <button
                                type="submit"
                                className="px-3 py-2 bg-accent text-accent-foreground text-sm font-medium rounded hover:opacity-90 transition"
                            >
                                Subscribe
                            </button>
                            {subscribed && <p className="text-accent text-xs">Thank you for subscribing!</p>}
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">© 2024 LUXE. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
