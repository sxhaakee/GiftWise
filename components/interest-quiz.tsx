"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Brain, Home, Palette, Zap } from "lucide-react"
import type { QuizAnswers } from "@/app/page"

interface InterestQuizProps {
  onNext: () => void
  onBack: () => void
  onQuizComplete: (answers: QuizAnswers) => void
  initialAnswers: QuizAnswers | null
}

const quizQuestions = [
  {
    id: "lifestyle",
    question: "What best describes their lifestyle?",
    icon: Home,
    options: [
      { value: "homebody", label: "Homebody - Loves cozy nights in", emoji: "🏠" },
      { value: "adventurer", label: "Adventurer - Always seeking new experiences", emoji: "🌍" },
      { value: "social", label: "Social butterfly - Loves being around people", emoji: "🦋" },
      { value: "minimalist", label: "Minimalist - Prefers simple, quality items", emoji: "✨" },
    ],
  },
  {
    id: "personality",
    question: "How would you describe their personality?",
    icon: Brain,
    options: [
      { value: "creative", label: "Creative & Artistic", emoji: "🎨" },
      { value: "practical", label: "Practical & Logical", emoji: "🔧" },
      { value: "sentimental", label: "Sentimental & Emotional", emoji: "💝" },
      { value: "fun-loving", label: "Fun-loving & Playful", emoji: "🎉" },
    ],
  },
  {
    id: "interests",
    question: "What type of activities do they enjoy most?",
    icon: Zap,
    options: [
      { value: "tech", label: "Technology & Gadgets", emoji: "📱" },
      { value: "wellness", label: "Health & Wellness", emoji: "🧘" },
      { value: "learning", label: "Learning & Self-improvement", emoji: "📚" },
      { value: "entertainment", label: "Entertainment & Games", emoji: "🎮" },
    ],
  },
  {
    id: "giftStyle",
    question: "What type of gift would make them happiest?",
    icon: Palette,
    options: [
      { value: "experiential", label: "Experiences over things", emoji: "🎭" },
      { value: "practical", label: "Something useful for daily life", emoji: "🛠️" },
      { value: "luxury", label: "A special treat or luxury item", emoji: "💎" },
      { value: "personalized", label: "Something personal and meaningful", emoji: "💌" },
    ],
  },
]

export default function InterestQuiz({ onNext, onBack, onQuizComplete, initialAnswers }: InterestQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})

  useEffect(() => {
    if (initialAnswers) {
      setAnswers(initialAnswers)
    }
  }, [initialAnswers])

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz complete
      if (answers.lifestyle && answers.personality && answers.interests && answers.giftStyle) {
        onQuizComplete({
          lifestyle: answers.lifestyle,
          personality: answers.personality,
          interests: [answers.interests],
          giftStyle: answers.giftStyle,
        })
        onNext()
      }
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      onBack()
    }
  }

  const question = quizQuestions[currentQuestion]
  const IconComponent = question.icon
  const currentAnswer = answers[question.id as keyof QuizAnswers]
  const isLastQuestion = currentQuestion === quizQuestions.length - 1
  const canProceed = currentAnswer !== undefined

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 mx-auto">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">{question.question}</CardTitle>
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <RadioGroup
              value={(currentAnswer as string) || ""}
              onValueChange={(value) => handleAnswer(question.id, value)}
              className="space-y-4"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="border-purple-300 text-purple-600"
                  />
                  <Label htmlFor={option.value} className="flex items-center space-x-3 cursor-pointer flex-1">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium text-gray-700">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrev}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentQuestion === 0 ? "Back" : "Previous"}
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isLastQuestion ? "Continue" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
