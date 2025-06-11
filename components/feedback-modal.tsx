"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X, Star, Heart } from "lucide-react"
import { apiClient } from "@/components/api-client"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  giftId: string
  giftName: string
  recommendationId: string
}

export default function FeedbackModal({ isOpen, onClose, giftId, giftName, recommendationId }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0)
  const [meaningful, setMeaningful] = useState<string>("")
  const [wouldGive, setWouldGive] = useState<string>("")
  const [comments, setComments] = useState<string>("")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.submitFeedback({
        recommendationId,
        giftId,
        rating,
        meaningful: meaningful === "yes",
        wouldGive: wouldGive === "yes",
        comments,
      })

      onClose()
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 mx-auto">
            <Heart className="w-8 h-8 text-white" />
          </div>

          <CardTitle className="text-xl font-bold text-gray-800">How was this recommendation?</CardTitle>
          <p className="text-gray-600 text-sm">Help us improve by sharing your thoughts on "{giftName}"</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="space-y-3">
              <Label>Overall Rating</Label>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="p-1">
                    <Star className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Meaningful */}
            <div className="space-y-3">
              <Label>Was this gift suggestion meaningful?</Label>
              <RadioGroup value={meaningful} onValueChange={setMeaningful}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="meaningful-yes" />
                  <Label htmlFor="meaningful-yes">Yes, very meaningful</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="meaningful-no" />
                  <Label htmlFor="meaningful-no">Not really</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Would Give */}
            <div className="space-y-3">
              <Label>Would you give this to the recipient?</Label>
              <RadioGroup value={wouldGive} onValueChange={setWouldGive}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="would-give-yes" />
                  <Label htmlFor="would-give-yes">Yes, definitely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="would-give-no" />
                  <Label htmlFor="would-give-no">Probably not</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">Additional Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Any other thoughts about this recommendation?"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="border-purple-200 focus:border-purple-400"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || rating === 0 || !meaningful || !wouldGive}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
