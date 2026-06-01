'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { products, categories, searchProducts } from '@/lib/mockData'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { ChevronDown, X } from 'lucide-react'

export default function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductsContent searchParams={searchParams} />
        </Suspense>
    )
}

function ProductsContent({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const [searchParamsData, setSearchParamsData] = useState<any>(null)
    const [showFilters, setShowFilters] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('featured')
    const [priceRange, setPriceRange] = useState([0, 500])

    // Use useEffect instead of useState to handle the Promise
    useEffect(() => {
        searchParams.then((params) => {
            if (params.category) {
                setSelectedCategory(params.category as string)
            }
            if (params.search) {
                setSearchQuery(params.search as string)
            }
            setSearchParamsData(params)
        })
    }, [searchParams])

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...products]

        // Search filter
        if (searchQuery) {
            filtered = searchProducts(searchQuery)
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter((p) => p.category === selectedCategory)
        }

        // Price filter
        filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case 'featured':
            default:
                // Keep original order
                break
        }

        return filtered
    }, [searchQuery, selectedCategory, priceRange, sortBy])

    const handleClearFilters = () => {
        setSelectedCategory(null)
        setSearchQuery('')
        setPriceRange([0, 500])
        setSortBy('featured')
    }

    const hasActiveFilters =
        selectedCategory || searchQuery || sortBy !== 'featured' || priceRange[0] > 0 || priceRange[1] < 500

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Shop Products</h1>
                    <p className="text-muted-foreground">Explore our complete collection of premium items.</p>
                </div>

                <div className="flex gap-6">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="space-y-6 sticky top-24">
                            {/* Search */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-3">Search</h3>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-3 py-2 bg-card text-foreground placeholder:text-muted-foreground border border-border rounded focus:outline-none focus:border-accent"
                                />
                            </div>

                            {/* Category Filter */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-3">Category</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`block w-full text-left px-3 py-2 rounded transition ${!selectedCategory
                                            ? 'bg-accent text-accent-foreground'
                                            : 'hover:bg-muted text-foreground'
                                            }`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`block w-full text-left px-3 py-2 rounded transition ${selectedCategory === cat
                                                ? 'bg-accent text-accent-foreground'
                                                : 'hover:bg-muted text-foreground'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-muted-foreground">Min: ${priceRange[0]}</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="500"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Max: ${priceRange[1]}</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="500"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-3">Sort By</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 bg-card text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <Button
                                    onClick={handleClearFilters}
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-border text-foreground hover:bg-muted"
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Mobile Filters Button */}
                        <div className="lg:hidden mb-6 flex gap-2">
                            <Button
                                onClick={() => setShowFilters(!showFilters)}
                                variant="outline"
                                className="border-border text-foreground"
                            >
                                Filters <ChevronDown size={18} />
                            </Button>
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <div className="lg:hidden mb-6 p-4 bg-card border border-border rounded space-y-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-3 py-2 bg-background text-foreground border border-border rounded focus:outline-none focus:border-accent"
                                />
                                <select
                                    value={selectedCategory || ''}
                                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                                    className="w-full px-3 py-2 bg-background text-foreground border border-border rounded"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 bg-background text-foreground border border-border rounded"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        )}

                        {/* Results Info */}
                        <div className="mb-8 flex justify-between items-center">
                            <p className="text-muted-foreground">
                                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">No products found.</p>
                                <Button
                                    onClick={handleClearFilters}
                                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                                >
                                    Clear Filters and Try Again
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}