"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Gift, MapPin, Sparkles } from "lucide-react"
import type { UserProfile, Budget } from "@/app/page"

interface SurpriseModeProps {
  onExit: () => void
  userProfile: UserProfile | null
  budget: Budget | null
}

export default function SurpriseMode({ onExit, userProfile, budget }: SurpriseModeProps) {
  const [step, setStep] = useState<"intro" | "shipping" | "confirmation">("intro")
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    specialInstructions: "",
  })

  const handleShippingSubmit = () => {
    setStep("confirmation")
  }

  if (step === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto w-full">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-6 mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">Surprise Gift Mode</CardTitle>
              <p className="text-gray-600 text-lg leading-relaxed">
                Let us surprise {userProfile?.recipientName || "your recipient"} with a carefully curated gift! Our team
                will hand-pick something special within your ${budget?.min}-${budget?.max} budget and ship it directly
                to them.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">What makes this special:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Gift className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                    Hand-curated by our gift experts
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                    Beautifully wrapped with a personal note
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                    Direct shipping to recipient
                  </li>
                </ul>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={onExit}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Results
                </Button>

                <Button
                  onClick={() => setStep("shipping")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Continue to Shipping
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "shipping") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto w-full">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Shipping Information</CardTitle>
              <p className="text-gray-600">Where should we send the surprise gift?</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Recipient's Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, name: e.target.value }))}
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }))}
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, city: e.target.value }))}
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, state: e.target.value }))}
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="10001"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, zipCode: e.target.value }))}
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special delivery instructions or gift message..."
                  value={shippingInfo.specialInstructions}
                  onChange={(e) => setShippingInfo((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                  className="border-purple-200 focus:border-purple-400"
                  rows={3}
                />
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep("intro")}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleShippingSubmit}
                  disabled={!shippingInfo.name || !shippingInfo.address || !shippingInfo.city}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Complete Order
                  <Gift className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mb-6 mx-auto">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</CardTitle>
            <p className="text-gray-600 text-lg leading-relaxed">
              Your surprise gift for {userProfile?.recipientName || "your recipient"} is being prepared! We'll send you
              tracking information once it ships.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">What happens next:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Our team will curate the perfect gift within 24 hours</li>
                <li>• You'll receive an email confirmation with tracking details</li>
                <li>• Expected delivery: 3-5 business days</li>
                <li>• The recipient will receive a beautifully wrapped surprise!</li>
              </ul>
            </div>

            <div className="text-center pt-6">
              <Button
                onClick={onExit}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Find Another Gift
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
