"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Heart, Sparkles, Users, ArrowRight, Star, Package, Wand2, Clock, Shield, Zap, Award, MessageSquare, ShoppingBag, Menu } from "lucide-react"
import { useEffect, useState } from "react"

interface LandingPageProps {
  onStart: () => void
  onAuthRequired: () => void
}

interface FloatingElement {
  x: number
  y: number
  rotation: number
  scale: number
  icon: React.ReactNode
  color: string
  duration: number
  delay: number
}

type Page = 'home' | 'how-it-works' | 'categories' | 'about'

export default function LandingPage({ onStart, onAuthRequired }: LandingPageProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>('home')

  // Smooth scroll to top when changing pages
  const handlePageChange = (page: Page) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setCurrentPage(page)
  }

  useEffect(() => {
    setIsMounted(true)

    const createElements = () => {
      const icons = [
        { icon: <Gift className="w-10 h-10" />, color: "text-pink-600" },
        { icon: <Heart className="w-10 h-10" />, color: "text-rose-600" },
        { icon: <Star className="w-10 h-10" />, color: "text-purple-600" },
        { icon: <Sparkles className="w-10 h-10" />, color: "text-pink-500" },
        { icon: <Package className="w-10 h-10" />, color: "text-rose-500" },
        { icon: <Award className="w-10 h-10" />, color: "text-purple-500" },
        { icon: <Wand2 className="w-10 h-10" />, color: "text-pink-600" },
        { icon: <ShoppingBag className="w-10 h-10" />, color: "text-rose-600" }
      ]

      return Array.from({ length: 20 }, () => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)]
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 1 + Math.random() * 0.8,
          icon: randomIcon.icon,
          color: randomIcon.color,
          duration: 8 + Math.random() * 6,
          delay: Math.random() * 2
        }
      })
    }

    setElements(createElements())
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-5xl mx-auto text-center space-y-12"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mb-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gift className="w-12 h-12 text-white" />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full blur-lg opacity-70"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.5, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Perfect Gifts,
                <br />
                Every Time
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Discover meaningful gifts tailored to your loved ones. Our AI-powered recommendations make gift-giving
                effortless and memorable.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onStart}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Find a Gift
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={onAuthRequired}
                  variant="outline"
                  size="lg"
                  className="border-2 border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign In
                  <Wand2 className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">Takes less than 3 minutes</p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-3">Personalized</h3>
                    <p className="text-gray-600">
                      Tailored recommendations based on personality, interests, and relationship
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-8 h-8 text-rose-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-3">AI-Powered</h3>
                    <p className="text-gray-600">Smart algorithms analyze preferences to suggest the perfect gift</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-3">For Everyone</h3>
                    <p className="text-gray-600">Perfect gifts for family, friends, partners, and colleagues</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Special Features Section */}
            <motion.div
              className="w-full max-w-6xl mx-auto mt-24 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Special Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-pink-100 rounded-lg">
                        <Clock className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Quick Delivery</h3>
                        <p className="text-gray-600 text-sm">Get your gifts delivered within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-rose-100 rounded-lg">
                        <Shield className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Secure Payments</h3>
                        <p className="text-gray-600 text-sm">100% secure payment processing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Lightning Fast</h3>
                        <p className="text-gray-600 text-sm">Instant gift recommendations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-pink-100 rounded-lg">
                        <Award className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Quality Assured</h3>
                        <p className="text-gray-600 text-sm">Curated selection of premium gifts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-rose-100 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">24/7 Support</h3>
                        <p className="text-gray-600 text-sm">Always here to help you</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Easy Returns</h3>
                        <p className="text-gray-600 text-sm">30-day hassle-free returns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.footer
              className="w-full bg-white/80 backdrop-blur-sm border-t border-pink-100 mt-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="w-full px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">About Us</h3>
                    <p className="text-gray-600 text-sm">
                      Making gift-giving easier and more meaningful with AI-powered recommendations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">How it Works</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">Gift Categories</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">Special Occasions</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">Blog</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">Contact Us</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">FAQs</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">Shipping Info</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-pink-600">Returns</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Subscribe to get gift ideas and special offers
                    </p>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:border-pink-400"
                      />
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-pink-100 mt-8 pt-8 text-center text-sm text-gray-600">
                  <p>© 2024 Gift Recommendation App. All rights reserved.</p>
                </div>
              </div>
            </motion.footer>
          </motion.div>
        )
      case 'how-it-works':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-4xl mx-auto px-4 py-12"
          >
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              How It Works
            </h1>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-2">Tell Us About Them</h3>
                  <p className="text-gray-600">Share details about the person you're shopping for</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                  <p className="text-gray-600">Our AI analyzes preferences and suggests perfect gifts</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">3</div>
                  <h3 className="text-xl font-semibold mb-2">Get Your Gift</h3>
                  <p className="text-gray-600">Choose from personalized recommendations</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )
      case 'categories':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-6xl mx-auto px-4 py-12"
          >
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Gift Categories
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Birthday', 'Anniversary', 'Wedding', 'Holiday', 'Graduation', 'Housewarming'].map((category) => (
                <Card key={category} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category}</h3>
                    <p className="text-gray-600">Find the perfect {category.toLowerCase()} gift</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-4xl mx-auto px-4 py-12"
          >
            <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-gray-600">Making gift-giving easier and more meaningful with AI-powered recommendations.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Our Story</h3>
                  <p className="text-gray-600">Started with a simple idea: everyone deserves to give and receive perfect gifts.</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100">
      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => handlePageChange('home')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Gift className="w-8 h-8 text-pink-600" />
                <span className="ml-2 text-xl font-semibold text-gray-800">GiftFinder</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handlePageChange('home')}
                className={`text-gray-600 hover:text-pink-600 transition-colors ${currentPage === 'home' ? 'text-pink-600' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => handlePageChange('how-it-works')}
                className={`text-gray-600 hover:text-pink-600 transition-colors ${currentPage === 'how-it-works' ? 'text-pink-600' : ''}`}
              >
                How it Works
              </button>
              <button
                onClick={() => handlePageChange('categories')}
                className={`text-gray-600 hover:text-pink-600 transition-colors ${currentPage === 'categories' ? 'text-pink-600' : ''}`}
              >
                Categories
              </button>
              <button
                onClick={() => handlePageChange('about')}
                className={`text-gray-600 hover:text-pink-600 transition-colors ${currentPage === 'about' ? 'text-pink-600' : ''}`}
              >
                About
              </button>
              <Button
                onClick={onAuthRequired}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-pink-600"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/80 backdrop-blur-md border-t border-pink-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  handlePageChange('home')
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-md ${currentPage === 'home' ? 'text-pink-600' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  handlePageChange('how-it-works')
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-md ${currentPage === 'how-it-works' ? 'text-pink-600' : ''}`}
              >
                How it Works
              </button>
              <button
                onClick={() => {
                  handlePageChange('categories')
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-md ${currentPage === 'categories' ? 'text-pink-600' : ''}`}
              >
                Categories
              </button>
              <button
                onClick={() => {
                  handlePageChange('about')
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-md ${currentPage === 'about' ? 'text-pink-600' : ''}`}
              >
                About
              </button>
              <Button
                onClick={onAuthRequired}
                variant="outline"
                className="w-full mt-2 border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Floating background elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {elements.map((element, i) => (
            <motion.div
              key={i}
              className={`absolute ${element.color} opacity-35 drop-shadow-lg`}
              initial={{ 
                x: element.x,
                y: element.y,
                rotate: element.rotation,
                scale: element.scale
              }}
              animate={{
                x: [
                  element.x,
                  element.x + (Math.random() - 0.5) * 150,
                  element.x
                ],
                y: [
                  element.y,
                  element.y + (Math.random() - 0.5) * 150,
                  element.y
                ],
                rotate: element.rotation + 360,
                scale: [
                  element.scale,
                  element.scale * 1.2,
                  element.scale
                ]
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 pt-24"
      >
        {renderPage()}
      </motion.div>
    </div>
  )
}
