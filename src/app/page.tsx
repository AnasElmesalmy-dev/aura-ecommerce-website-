'use client'

import { ShoppingBag, Search, Menu, X, Truck, RefreshCw, Shield, Plus, Minus, Trash2, CheckCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Product {
  id: number
  name: string
  price: string
  priceNumber: number
  image: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface Notification {
  id: number
  title: string
  description: string
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [notification, setNotification] = useState<Notification | null>(null)

  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Linen Blend Wide-Leg Trousers',
      price: '¥1,290',
      priceNumber: 1290,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
      category: 'new'
    },
    {
      id: 2,
      name: 'Silk Button-Up Shirt',
      price: '¥980',
      priceNumber: 980,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
      category: 'bestseller'
    },
    {
      id: 3,
      name: 'Cashmere Oversized Cardigan',
      price: '¥1,590',
      priceNumber: 1590,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop',
      category: 'sustainable'
    },
    {
      id: 4,
      name: 'Cotton Relaxed Blazer',
      price: '¥1,450',
      priceNumber: 1450,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
      category: 'new'
    },
    {
      id: 5,
      name: 'Organic Cotton T-Shirt',
      price: '¥590',
      priceNumber: 590,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      category: 'sustainable'
    },
    {
      id: 6,
      name: 'Merino Wool Sweater',
      price: '¥1,180',
      priceNumber: 1180,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
      category: 'bestseller'
    },
    {
      id: 7,
      name: 'Linen Summer Dress',
      price: '¥1,350',
      priceNumber: 1350,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
      category: 'new'
    },
    {
      id: 8,
      name: 'Recycled Denim Jacket',
      price: '¥1,680',
      priceNumber: 1680,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=500&fit=crop',
      category: 'sustainable'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Products', description: 'Browse our complete collection' },
    { id: 'new', name: 'New Arrivals', description: 'Discover our latest collection' },
    { id: 'bestseller', name: 'Best Sellers', description: 'Most loved by our customers' },
    { id: 'sustainable', name: 'Sustainable Edit', description: 'Eco-friendly fashion choices' }
  ]

  const trustBadges = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over ¥800' },
    { icon: RefreshCw, title: '30-Day Returns', description: 'Hassle-free returns' },
    { icon: Shield, title: 'Secure Checkout', description: '100% secure payments' }
  ]

  // Filter products based on category and search
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Show notification
  const showNotification = (title: string, description: string) => {
    setNotification({ id: Date.now(), title, description })
    setTimeout(() => setNotification(null), 3000)
  }

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    showNotification('Added to cart', `${product.name} has been added to your cart`)
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
    showNotification('Removed from cart', 'Item has been removed from your cart')
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.priceNumber * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Navigation functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handleShopNow = () => {
    setSelectedCategory('all')
    scrollToSection('products')
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    scrollToSection('products')
  }

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#f5e6d3]">
      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right-4">
          <Alert className="bg-white border-[#d4af37] shadow-lg">
            <CheckCircle className="h-4 w-4 text-[#d4af37]" />
            <AlertDescription>
              <div className="font-semibold text-[#1a365d]">{notification.title}</div>
              <div className="text-sm text-gray-600">{notification.description}</div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#1a365d] sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => {
                setSelectedCategory('all')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">AURA</h1>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('products')}
                className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
              >
                Shop
              </button>
              <button
                onClick={() => scrollToSection('categories')}
                className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
              >
                Collections
              </button>
              <button
                onClick={() => scrollToSection('trust-badges')}
                className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
              >
                Contact
              </button>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-[#d4af37] transition-colors p-2"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetTrigger asChild>
                  <button className="text-white hover:text-[#d4af37] transition-colors p-2 relative">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-[#d4af37] text-[#1a365d] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center p-0">
                        {cartCount}
                      </Badge>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md bg-white">
                  <SheetHeader>
                    <SheetTitle className="text-[#1a365d]">Shopping Cart ({cartCount} items)</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col h-[calc(100vh-180px)]">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-lg">Your cart is empty</p>
                        <Button
                          onClick={() => {
                            setCartOpen(false)
                            scrollToSection('products')
                          }}
                          className="mt-4 bg-[#d4af37] hover:bg-[#c9a32f] text-[#1a365d]"
                        >
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-y-auto space-y-4">
                          {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-24 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-[#1a365d] text-sm">{item.name}</h4>
                                <p className="text-[#d4af37] font-bold mt-1">{item.price}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-[#1a365d]">Total:</span>
                            <span className="text-[#d4af37]">¥{cartTotal.toLocaleString()}</span>
                          </div>
                          <Button
                            className="w-full bg-[#d4af37] hover:bg-[#c9a32f] text-[#1a365d] font-semibold py-6"
                            onClick={() => {
                              showNotification('Checkout initiated', 'Redirecting to checkout...')
                            }}
                          >
                            Proceed to Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white hover:text-[#d4af37] transition-colors p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-gray-200 hover:text-white transition-colors text-sm font-medium py-2 text-left"
                >
                  Shop
                </button>
                <button
                  onClick={() => scrollToSection('categories')}
                  className="text-gray-200 hover:text-white transition-colors text-sm font-medium py-2 text-left"
                >
                  Collections
                </button>
                <button
                  onClick={() => scrollToSection('trust-badges')}
                  className="text-gray-200 hover:text-white transition-colors text-sm font-medium py-2 text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('footer')}
                  className="text-gray-200 hover:text-white transition-colors text-sm font-medium py-2 text-left"
                >
                  Contact
                </button>
              </div>
            </nav>
          )}

          {/* Search Bar */}
          {searchOpen && (
            <div className="py-4 border-t border-gray-700 animate-in slide-in-from-top-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-gray-600 text-white placeholder-gray-400 focus-visible:ring-[#d4af37]"
                  autoFocus
                />
              </div>
              {searchQuery && (
                <div className="mt-3 text-sm text-gray-300">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop"
              alt="Hero - Fashion Model"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/80 to-[#1a365d]/40" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Elevate Your Everyday
              </h2>
              <p className="text-lg sm:text-xl text-gray-200 mb-8">
                Discover timeless elegance and sustainable fashion for the modern lifestyle
              </p>
              <Button
                onClick={handleShopNow}
                className="bg-[#d4af37] hover:bg-[#c9a32f] text-[#1a365d] font-semibold px-8 py-6 text-lg rounded-none transition-all transform hover:scale-105"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        {/* Category Section */}
        <section id="categories" className="py-16 sm:py-24 bg-[#f5e6d3]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`border-0 shadow-lg hover:shadow-xl transition-shadow bg-white cursor-pointer group ${
                    selectedCategory === category.id ? 'ring-2 ring-[#d4af37]' : ''
                  }`}
                >
                  <CardContent className="p-6 sm:p-8 text-center">
                    <h3 className={`text-lg sm:text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors ${
                      selectedCategory === category.id ? 'text-[#d4af37]' : 'text-[#1a365d]'
                    }`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className={`w-12 h-1 mx-auto transition-all ${
                      selectedCategory === category.id ? 'bg-[#d4af37] w-16' : 'bg-[#d4af37] group-hover:w-16'
                    }`} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a365d] mb-2">
                {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              {searchQuery && (
                <p className="text-gray-600">
                  Search results for "{searchQuery}"
                </p>
              )}
              {filteredProducts.length === 0 && (
                <p className="text-gray-500 mt-4">No products found matching your criteria.</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      onClick={() => addToCart(product)}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#d4af37] hover:bg-[#c9a32f] text-[#1a365d] font-semibold px-6 py-2 rounded-none opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Quick Add
                    </Button>
                    <Badge className="absolute top-4 left-4 bg-[#1a365d]">
                      {categories.find(c => c.id === product.category)?.name}
                    </Badge>
                  </div>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-[#1a365d] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[#d4af37] font-bold text-lg">{product.price}</p>
                    <Button
                      onClick={() => {
                        addToCart(product)
                        setCartOpen(true)
                      }}
                      variant="outline"
                      className="w-full mt-4 border-[#d4af37] text-[#1a365d] hover:bg-[#d4af37] hover:text-[#1a365d]"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section id="trust-badges" className="py-16 sm:py-24 bg-[#f5e6d3]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              {trustBadges.map((badge, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <badge.icon className="w-8 h-8 text-[#1a365d]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a365d] mb-2">{badge.title}</h3>
                  <p className="text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-[#1a365d] text-white py-8 sm:py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div className="sm:col-span-1">
              <h3 className="text-2xl font-bold mb-4 tracking-wider">AURA</h3>
              <p className="text-gray-400 text-sm">Elevating everyday fashion with timeless elegance and sustainable choices.</p>
              <Button
                onClick={() => {
                  scrollToSection('products')
                }}
                variant="outline"
                className="mt-4 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a365d]"
              >
                Shop Now
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <button onClick={() => handleCategoryClick('new')} className="hover:text-[#d4af37] transition-colors text-left w-full">
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('bestseller')} className="hover:text-[#d4af37] transition-colors text-left w-full">
                    Best Sellers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('sustainable')} className="hover:text-[#d4af37] transition-colors text-left w-full">
                    Sustainable Edit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      scrollToSection('products')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    All Products
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <button
                    onClick={() => {
                      showNotification('About Us', 'Aura is a premium fashion brand dedicated to sustainable and elegant clothing.')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      showNotification('Careers', 'Join our team and help shape the future of sustainable fashion.')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      showNotification('Press', 'Media inquiries and press releases.')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    Press
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      showNotification('Contact', 'Email us at hello@aura.com or call +1 (555) 123-4567')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <button
                    onClick={() => {
                      showNotification('FAQ', 'Frequently asked questions about our products and services.')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      showNotification('Shipping Info', 'Free shipping on orders over ¥800. Delivery within 5-7 business days.')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    Shipping
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      showNotification('Returns', '30-day hassle-free returns. Contact us for return instructions.')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    Returns
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      showNotification('Size Guide', 'Check our size guide for the perfect fit.')
                    }}
                    className="hover:text-[#d4af37] transition-colors text-left w-full"
                  >
                    Size Guide
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Aura. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
