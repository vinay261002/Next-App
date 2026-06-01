import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, RotateCcw, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/lib/mockData'

export default function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted to-background" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
            Curated Excellence
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover carefully selected home goods and lifestyle products that elevate your living space.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                Shop Now <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-muted">
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <Truck className="w-12 h-12 mx-auto text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Free Shipping</h3>
              <p className="text-muted-foreground">On orders over $100. Fast delivery worldwide.</p>
            </div>
            <div className="text-center space-y-4">
              <RotateCcw className="w-12 h-12 mx-auto text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Easy Returns</h3>
              <p className="text-muted-foreground">30-day return policy. No questions asked.</p>
            </div>
            <div className="text-center space-y-4">
              <Award className="w-12 h-12 mx-auto text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Premium Quality</h3>
              <p className="text-muted-foreground">Handpicked products from trusted brands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-2">Featured Collection</h2>
            <p className="text-muted-foreground">Discover our handpicked selection of exceptional items.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Lighting', 'Furniture', 'Decor'].map((category) => (
              <Link key={category} href={`/products?category=${category}`}>
                <div className="group relative h-64 overflow-hidden rounded-sm bg-card hover:shadow-lg transition">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <div className="absolute inset-0 flex items-end justify-start p-6">
                    <h3 className="text-2xl font-bold text-white">{category}</h3>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                author: 'Sarah M.',
                text: 'LUXE has completely transformed my home. The quality is exceptional and the customer service is outstanding.',
              },
              {
                author: 'James L.',
                text: 'I was impressed by the attention to detail in every product. Highly recommended for anyone looking for premium items.',
              },
              {
                author: 'Emma R.',
                text: 'Finally found a place that understands quality and style. Will definitely be a repeat customer!',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-8 rounded-sm border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Elevate Your Space?</h2>
          <p className="text-lg opacity-90">Browse our complete collection and find pieces that speak to you.</p>
          <Link href="/products">
            <Button size="lg" className="bg-accent-foreground hover:bg-accent-foreground/90 text-accent gap-2">
              Explore Now <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
