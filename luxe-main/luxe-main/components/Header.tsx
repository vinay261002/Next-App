'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Heart, Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export function Header() {
    const { itemCount } = useCart()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
            setSearchQuery('')
        }
    }

    return (
        <header className="sticky top-0 z-50 bg-background border-b border-border">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-foreground">LUXE</h1>
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/products" className="text-foreground hover:text-accent transition">
                            Shop
                        </Link>
                        <Link href="/products?category=Lighting" className="text-foreground hover:text-accent transition">
                            Lighting
                        </Link>
                        <Link href="/products?category=Furniture" className="text-foreground hover:text-accent transition">
                            Furniture
                        </Link>
                        <Link href="/products?category=Decor" className="text-foreground hover:text-accent transition">
                            Decor
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 bg-muted text-foreground placeholder:text-muted-foreground rounded border border-border focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Search size={18} className="text-muted-foreground" />
                            </button>
                        </div>
                    </form>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <Link href="/wishlist" className="text-foreground hover:text-accent transition">
                            <Heart size={20} />
                        </Link>
                        <Link href="/cart" className="relative text-foreground hover:text-accent transition">
                            <ShoppingCart size={20} />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/account" className="hidden md:block text-foreground hover:text-accent transition text-sm">
                            Account
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-foreground"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="md:hidden pt-4 border-t border-border mt-4">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 bg-muted text-foreground placeholder:text-muted-foreground rounded border border-border focus:outline-none focus:border-accent"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Search size={18} className="text-muted-foreground" />
                                </button>
                            </div>
                        </form>
                        <div className="space-y-2">
                            <Link
                                href="/products"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded transition"
                            >
                                Shop
                            </Link>
                            <Link
                                href="/products?category=Lighting"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded transition"
                            >
                                Lighting
                            </Link>
                            <Link
                                href="/products?category=Furniture"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded transition"
                            >
                                Furniture
                            </Link>
                            <Link
                                href="/products?category=Decor"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded transition"
                            >
                                Decor
                            </Link>
                            <Link
                                href="/account"
                                className="block px-4 py-2 text-foreground hover:bg-muted rounded transition"
                            >
                                Account
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}
