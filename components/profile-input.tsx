"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, User, Gift, Heart, Sparkles, Star, ShoppingCart, Menu } from "lucide-react"
import type { UserProfile } from "@/app/page"
import { apiClient } from "@/components/api-client"
import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion"

interface ProfileInputProps {
  onNext: () => void
  onBack: () => void
  onProfileComplete: (profile: UserProfile) => void
  initialProfile: UserProfile | null
}

const hobbiesOptions = [
  "Reading",
  "Gaming",
  "Cooking",
  "Gardening",
  "Photography",
  "Music",
  "Sports",
  "Art",
  "Travel",
  "Technology",
  "Fashion",
  "Fitness",
  "Movies",
  "Crafts",
  "Outdoors",
  "Collecting",
]

const occasions = [
  "Birthday",
  "Anniversary",
  "Christmas",
  "Valentine's Day",
  "Mother's Day",
  "Father's Day",
  "Graduation",
  "Wedding",
  "Housewarming",
  "Thank You",
  "Apology",
  "Just Because",
  "Promotion",
  "Retirement",
  "Baby Shower",
]

export default function ProfileInput({ onNext, onBack, onProfileComplete, initialProfile }: ProfileInputProps) {
  const [profile, setProfile] = useState<UserProfile>({
    recipientName: "",
    age: "",
    gender: "",
    relationship: "",
    hobbies: [],
    occasion: "",
  })

  const { isAuthenticated } = useAuth()
  const [isMounted, setIsMounted] = useState(false)
  const [elements, setElements] = useState<any[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile)
    }
  }, [initialProfile])

  useEffect(() => {
    setIsMounted(true)
    const icons = [
      { icon: <Gift className="w-6 h-6" />, color: "text-pink-500" },
      { icon: <Heart className="w-6 h-6" />, color: "text-rose-500" },
      { icon: <Star className="w-6 h-6" />, color: "text-purple-500" },
      { icon: <Sparkles className="w-6 h-6" />, color: "text-pink-400" },
      { icon: <ShoppingCart className="w-6 h-6" />, color: "text-rose-400" }
    ]
    const createElements = () =>
      Array.from({ length: 12 }, () => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)]
        return {
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100),
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          icon: randomIcon.icon,
          color: randomIcon.color,
          duration: 18 + Math.random() * 8,
          delay: Math.random() * 4
        }
      })
    setElements(createElements())
    const handleResize = () => setElements(createElements())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleHobbyChange = (hobby: string, checked: boolean) => {
    if (checked) {
      setProfile((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, hobby],
      }))
    } else {
      setProfile((prev) => ({
        ...prev,
        hobbies: prev.hobbies.filter((h) => h !== hobby),
      }))
    }
  }

  const handleNext = async () => {
    if (profile.recipientName && profile.age && profile.gender && profile.relationship && profile.occasion) {
      try {
        if (isAuthenticated) {
          // Save to backend if authenticated
          const result = await apiClient.saveProfile({
            recipientName: profile.recipientName,
            age: profile.age,
            gender: profile.gender,
            relationship: profile.relationship,
            hobbies: profile.hobbies,
            occasion: profile.occasion,
          })

          // Update profile with server ID
          const updatedProfile = { ...profile, id: result.profileId }
          onProfileComplete(updatedProfile)
        } else {
          // Just save locally if not authenticated
          onProfileComplete(profile)
        }
        onNext()
      } catch (error) {
        console.error("Failed to save profile:", error)
        // Continue anyway with local storage
        onProfileComplete(profile)
        onNext()
      }
    }
  }

  const isValid = profile.recipientName && profile.age && profile.gender && profile.relationship && profile.occasion

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
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
            </div>
          </div>
        )}
      </nav>
      {/* Floating background elements */}
      {isMounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {elements.map((element, i) => (
            <motion.div
              key={i}
              className={`absolute ${element.color} opacity-20 drop-shadow-lg`}
              initial={{
                x: element.x,
                y: element.y,
                rotate: element.rotation,
                scale: element.scale
              }}
              animate={{
                x: [element.x, element.x + (Math.random() - 0.5) * 80, element.x],
                y: [element.y, element.y + (Math.random() - 0.5) * 80, element.y],
                rotate: element.rotation + 180,
                scale: [element.scale, element.scale * 1.1, element.scale]
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
      {/* Main Form Content */}
      <div className="relative z-10 w-full">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 mx-auto">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Tell us about the recipient</CardTitle>
            <p className="text-gray-600">Help us understand who you're shopping for</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Recipient's Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Sarah"
                  value={profile.recipientName}
                  onChange={(e) => setProfile((prev) => ({ ...prev, recipientName: e.target.value }))}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age Range</Label>
                <Select value={profile.age} onValueChange={(value) => setProfile((prev) => ({ ...prev, age: value }))}>
                  <SelectTrigger className="border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-12">0-12 years</SelectItem>
                    <SelectItem value="13-17">13-17 years</SelectItem>
                    <SelectItem value="18-25">18-25 years</SelectItem>
                    <SelectItem value="26-35">26-35 years</SelectItem>
                    <SelectItem value="36-50">36-50 years</SelectItem>
                    <SelectItem value="51-65">51-65 years</SelectItem>
                    <SelectItem value="65+">65+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={profile.gender}
                  onValueChange={(value) => setProfile((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={profile.relationship}
                  onValueChange={(value) => setProfile((prev) => ({ ...prev, relationship: value }))}
                >
                  <SelectTrigger className="border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="partner">Partner/Spouse</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="colleague">Colleague</SelectItem>
                    <SelectItem value="acquaintance">Acquaintance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occasion">Occasion</Label>
              <Select
                value={profile.occasion}
                onValueChange={(value) => setProfile((prev) => ({ ...prev, occasion: value }))}
              >
                <SelectTrigger className="border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent>
                  {occasions.map((occasion) => (
                    <SelectItem key={occasion} value={occasion.toLowerCase()}>
                      {occasion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Hobbies & Interests (optional)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hobbiesOptions.map((hobby) => (
                  <div key={hobby} className="flex items-center space-x-2">
                    <Checkbox
                      id={hobby}
                      checked={profile.hobbies.includes(hobby)}
                      onCheckedChange={(checked) => handleHobbyChange(hobby, checked as boolean)}
                      className="border-purple-300 data-[state=checked]:bg-purple-500"
                    />
                    <Label htmlFor={hobby} className="text-sm font-normal">
                      {hobby}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={onBack}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isValid}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
