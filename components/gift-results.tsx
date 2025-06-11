"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Sparkles, Star, ShoppingCart, Gift, Menu } from "lucide-react"
import { motion } from "framer-motion"
import type { UserProfile, QuizAnswers, Budget } from "@/app/page"
import { apiClient } from "@/components/api-client"

interface GiftResultsProps {
  onBack: () => void
  onSurpriseMode: () => void
  userProfile: UserProfile | null
  quizAnswers: QuizAnswers | null
  budget: Budget | null
}

interface GiftRecommendation {
  id: string
  name: string
  price: number
  description: string
  reason: string
  imageUrl: string
  category: string
  tags: string[]
  rating: number
  reviews: number
  link: string
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

// Mock gift recommendations based on user input
const generateRecommendations = (
  profile: UserProfile | null,
  quiz: QuizAnswers | null,
  budget: Budget | null,
): GiftRecommendation[] => {
  const baseRecommendations: GiftRecommendation[] = [
    {
      id: "1",
      name: "Personalized Photo Album",
      price: 35,
      description: "Custom photo album with beautiful leather binding and personalized engraving",
      reason: "Perfect for someone sentimental who values memories and personal connections",
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Personalized",
      tags: ["Sentimental", "Personalized", "Memories"],
      rating: 4.8,
      reviews: 127,
      link: "#",
    },
    {
      id: "2",
      name: "Wireless Charging Station",
      price: 45,
      description: "Sleek bamboo wireless charging station for multiple devices",
      reason: "Great for tech-savvy individuals who appreciate practical and modern solutions",
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Tech",
      tags: ["Practical", "Tech", "Modern"],
      rating: 4.6,
      reviews: 89,
      link: "#",
    },
    {
      id: "3",
      name: "Artisan Coffee Subscription",
      price: 60,
      description: "3-month subscription to premium artisan coffee from around the world",
      reason: "Perfect for coffee lovers who enjoy trying new experiences and flavors",
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Experience",
      tags: ["Experience", "Gourmet", "Subscription"],
      rating: 4.9,
      reviews: 203,
      link: "#",
    },
    {
      id: "4",
      name: "Meditation Cushion Set",
      price: 55,
      description: "Organic cotton meditation cushion with matching mat for mindfulness practice",
      reason: "Ideal for wellness enthusiasts who value self-care and mindfulness",
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Wellness",
      tags: ["Wellness", "Mindfulness", "Self-care"],
      rating: 4.7,
      reviews: 156,
      link: "#",
    },
    {
      id: "5",
      name: "Cooking Class Experience",
      price: 85,
      description: "Hands-on cooking class with a professional chef in your city",
      reason: "Great for food lovers who enjoy learning new skills and social experiences",
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Experience",
      tags: ["Experience", "Learning", "Social"],
      rating: 4.8,
      reviews: 94,
      link: "#",
    },
    {
      id: "6",
      name: "Smart Plant Monitor",
      price: 40,
      description: "Bluetooth plant monitor that tracks soil moisture, light, and temperature",
      reason: "Perfect for plant lovers who appreciate technology that helps with their hobbies",
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "Tech",
      tags: ["Tech", "Gardening", "Smart Home"],
      rating: 4.5,
      reviews: 78,
      link: "#",
    },
  ]

  // Filter by budget
  if (budget) {
    return baseRecommendations.filter((gift) => gift.price >= budget.min && gift.price <= budget.max).slice(0, 6)
  }

  return baseRecommendations.slice(0, 6)
}

export default function GiftResults({ onBack, onSurpriseMode, userProfile, quizAnswers, budget }: GiftResultsProps) {
  const [recommendations, setRecommendations] = useState<GiftRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const createElements = () => {
      const icons = [
        { icon: <Gift className="w-6 h-6" />, color: "text-pink-500" },
        { icon: <Heart className="w-6 h-6" />, color: "text-rose-500" },
        { icon: <Star className="w-6 h-6" />, color: "text-purple-500" },
        { icon: <Sparkles className="w-6 h-6" />, color: "text-pink-400" },
        { icon: <ShoppingCart className="w-6 h-6" />, color: "text-rose-400" }
      ]

      return Array.from({ length: 15 }, () => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)]
        return {
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100),
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          icon: randomIcon.icon,
          color: randomIcon.color,
          duration: 15 + Math.random() * 10,
          delay: Math.random() * 5
        }
      })
    }

    setElements(createElements())

    // Handle window resize
    const handleResize = () => {
      setElements(createElements())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleGiftClick = async (giftId: string) => {
    try {
      await apiClient.trackClick(giftId, "current-recommendation-id")
    } catch (error) {
      console.error("Failed to track click:", error)
    }
  }

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      setError(null)
      try {
        if (userProfile?.id) {
          // Fetch from API if we have a profile ID
          const result = await apiClient.getRecommendations(userProfile.id)
          setRecommendations(result.recommendations)
        } else if (userProfile && budget) {
          // Log the payload for debugging
          console.log('Sending to /api/generate-gifts:', { userProfile, quizAnswers, budget });
          // Call our OpenAI-powered API route
          const res = await fetch('/api/generate-gifts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userProfile, quizAnswers, budget })
          })
          if (!res.ok) throw new Error('Failed to fetch recommendations')
          const data = await res.json()
          setRecommendations(data.recommendations || [])
        } else {
          // Use mock data if no API integration
          const gifts = generateRecommendations(userProfile, quizAnswers, budget)
          setRecommendations(gifts)
        }
      } catch (error: any) {
        setError(error.message || 'Failed to fetch recommendations')
        // Fallback to mock data
        const gifts = generateRecommendations(userProfile, quizAnswers, budget)
        setRecommendations(gifts)
      } finally {
        setLoading(false)
      }
    }
    setTimeout(fetchRecommendations, 1500)
  }, [userProfile, quizAnswers, budget])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Finding perfect gifts...</h3>
          <p className="text-gray-600">Our AI is analyzing preferences and curating personalized recommendations</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm p-8 text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">Try Again</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100">
      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Gift className="w-8 h-8 text-pink-600" />
                <span className="ml-2 text-xl font-semibold text-gray-800">GiftFinder</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Button
                onClick={onBack}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={onSurpriseMode}
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Surprise Me
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
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={onSurpriseMode}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Surprise Me
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Floating background elements */}
      {isMounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {elements.map((element, i) => (
            <motion.div
              key={i}
              className={`absolute ${element.color} opacity-25 drop-shadow-lg`}
              initial={{ 
                x: element.x,
                y: element.y,
                rotate: element.rotation,
                scale: element.scale
              }}
              animate={{
                x: [
                  element.x,
                  element.x + (Math.random() - 0.5) * 100,
                  element.x
                ],
                y: [
                  element.y,
                  element.y + (Math.random() - 0.5) * 100,
                  element.y
                ],
                rotate: element.rotation + 180,
                scale: [
                  element.scale,
                  element.scale * 1.1,
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

      <div className="relative min-h-screen px-4 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Perfect Gifts for {userProfile?.recipientName || "Your Recipient"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on their personality, interests, and your budget of ${budget?.min}-${budget?.max}, here are our top
              recommendations
            </p>
          </div>

          {/* Gift Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendations.map((gift) => (
              <Card
                key={gift.id}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={gift.imageUrl || "/placeholder.svg"}
                      alt={gift.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 text-purple-600 border-0">${gift.price}</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{gift.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(gift.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {gift.rating} ({gift.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">{gift.description}</p>

                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-purple-700">
                        <strong>Why we picked this:</strong> {gift.reason}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {gift.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={() => handleGiftClick(gift.id)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-200 text-purple-600">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" onClick={onBack} className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modify Preferences
            </Button>

            <Button
              onClick={onSurpriseMode}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Surprise Me Instead
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
