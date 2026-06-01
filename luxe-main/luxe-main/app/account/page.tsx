'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { User, ShoppingBag, Settings } from 'lucide-react'
import Image from 'next/image'

interface Order {
    id: string
    date: string
    items: any[]
    subtotal: number
    shipping: number
    tax: number
    total: number
    status: string
    shippingAddress: {
        fullName: string
        email: string
        phone: string
        street: string
        city: string
        state: string
        zipCode: string
        country: string
    }
}

export default function AccountPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'settings'>('orders')

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
        setOrders(savedOrders)
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-foreground mb-12">My Account</h1>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-border mb-12">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-4 py-3 font-medium border-b-2 transition ${activeTab === 'orders'
                                ? 'border-accent text-accent'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <ShoppingBag className="inline mr-2" size={20} />
                        Order History
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-4 py-3 font-medium border-b-2 transition ${activeTab === 'profile'
                                ? 'border-accent text-accent'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <User className="inline mr-2" size={20} />
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-3 font-medium border-b-2 transition ${activeTab === 'settings'
                                ? 'border-accent text-accent'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Settings className="inline mr-2" size={20} />
                        Settings
                    </button>
                </div>

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        {orders.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-6">No orders yet</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="bg-card border border-border rounded-sm p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg">{order.id}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(order.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-foreground">${order.total.toFixed(2)}</p>
                                            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded capitalize">
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="border-t border-border pt-6">
                                        <p className="text-sm font-medium text-foreground mb-4">{order.items.length} item(s)</p>
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex gap-4">
                                                    <div className="relative w-16 h-16 flex-shrink-0 bg-muted rounded overflow-hidden">
                                                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-foreground">{item.name}</p>
                                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="border-t border-border mt-6 pt-6">
                                        <p className="text-sm font-medium text-foreground mb-3">Shipped to:</p>
                                        <p className="text-sm text-muted-foreground">{order.shippingAddress.fullName}</p>
                                        <p className="text-sm text-muted-foreground">{order.shippingAddress.street}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="max-w-2xl">
                        <div className="bg-card border border-border rounded-sm p-8 space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                                    <p className="px-4 py-2 bg-muted text-foreground rounded">John</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                                    <p className="px-4 py-2 bg-muted text-foreground rounded">Doe</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                                <p className="px-4 py-2 bg-muted text-foreground rounded">john@example.com</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                                <p className="px-4 py-2 bg-muted text-foreground rounded">+1 (555) 000-0000</p>
                            </div>

                            <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="max-w-2xl">
                        <div className="bg-card border border-border rounded-sm p-8 space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">Settings</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive order updates and promotions</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                                </div>

                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <div>
                                        <p className="font-medium text-foreground">Newsletter</p>
                                        <p className="text-sm text-muted-foreground">Get exclusive offers and new arrivals</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                                </div>

                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <div>
                                        <p className="font-medium text-foreground">SMS Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive text updates about orders</p>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="border-t border-border pt-6">
                                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
