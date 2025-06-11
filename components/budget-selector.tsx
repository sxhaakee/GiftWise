"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react"
import type { Budget } from "@/app/page"

interface BudgetSelectorProps {
  onNext: () => void
  onBack: () => void
  onBudgetSelect: (budget: Budget) => void
  initialBudget: Budget | null
}

const budgetRanges = [
  { min: 5, max: 20, label: "Small & Sweet", description: "Thoughtful gifts under $20" },
  { min: 20, max: 50, label: "Just Right", description: "Perfect balance of quality and value" },
  { min: 50, max: 100, label: "Special Occasion", description: "For those meaningful moments" },
  { min: 100, max: 250, label: "Premium Choice", description: "High-quality, lasting gifts" },
  { min: 250, max: 500, label: "Luxury Experience", description: "Exceptional and memorable" },
]

export default function BudgetSelector({ onNext, onBack, onBudgetSelect, initialBudget }: BudgetSelectorProps) {
  const [selectedRange, setSelectedRange] = useState<Budget | null>(null)
  const [customBudget, setCustomBudget] = useState([50])

  useEffect(() => {
    if (initialBudget) {
      setSelectedRange(initialBudget)
      setCustomBudget([initialBudget.max])
    }
  }, [initialBudget])

  const handleRangeSelect = (range: Budget) => {
    setSelectedRange(range)
  }

  const handleCustomBudget = (value: number[]) => {
    setCustomBudget(value)
    const budget = { min: Math.max(5, value[0] - 20), max: value[0] }
    setSelectedRange(budget)
  }

  const handleNext = () => {
    if (selectedRange) {
      onBudgetSelect(selectedRange)
      onNext()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 mx-auto">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">What's your budget?</CardTitle>
            <p className="text-gray-600">Choose a range that feels comfortable for you</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Preset Budget Ranges */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 mb-4">Popular Budget Ranges</h3>
              {budgetRanges.map((range) => (
                <div
                  key={`${range.min}-${range.max}`}
                  onClick={() => handleRangeSelect(range)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedRange?.min === range.min && selectedRange?.max === range.max
                      ? "border-purple-400 bg-purple-50"
                      : "border-purple-100 hover:border-purple-300 hover:bg-purple-50/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{range.label}</h4>
                      <p className="text-sm text-gray-600">{range.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">
                        ${range.min} - ${range.max}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Budget Slider */}
            <div className="space-y-4 pt-6 border-t border-purple-100">
              <h3 className="font-semibold text-gray-700">Or set a custom budget</h3>
              <div className="space-y-4">
                <div className="px-4">
                  <Slider
                    value={customBudget}
                    onValueChange={handleCustomBudget}
                    max={500}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-purple-600">Up to ${customBudget[0]}</p>
                  <p className="text-sm text-gray-500">We'll find great options within your range</p>
                </div>
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
                disabled={!selectedRange}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Find Gifts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
