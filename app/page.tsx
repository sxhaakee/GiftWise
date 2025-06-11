"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import LandingPage from "@/components/landing-page"
import ProfileInput from "@/components/profile-input"
import InterestQuiz from "@/components/interest-quiz"
import BudgetSelector from "@/components/budget-selector"
import GiftResults from "@/components/gift-results"
import SurpriseMode from "@/components/surprise-mode"
import AuthModal from "@/components/auth-modal"
import { useAuth } from "@/hooks/use-auth"

export type UserProfile = {
  id?: string
  recipientName: string
  age: string
  gender: string
  relationship: string
  hobbies: string[]
  occasion: string
}

export type QuizAnswers = {
  lifestyle: string
  personality: string
  interests: string[]
  giftStyle: string
}

export type Budget = {
  min: number
  max: number
}

export default function GiftRecommendationApp() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)
  const [budget, setBudget] = useState<Budget | null>(null)
  const [surpriseMode, setSurpriseMode] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const { user, isAuthenticated } = useAuth()

  const steps = ["landing", "profile", "quiz", "budget", "results"]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToSurpriseMode = () => {
    if (!isAuthenticated) {
      setShowAuth(true)
      return
    }
    setSurpriseMode(true)
  }

  const exitSurpriseMode = () => {
    setSurpriseMode(false)
  }

  const handleAuthRequired = () => {
    setShowAuth(true)
  }

  if (surpriseMode) {
    return <SurpriseMode onExit={exitSurpriseMode} userProfile={userProfile} budget={budget} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-purple-100">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-purple-700">
                Step {currentStep} of {steps.length - 1}
              </h2>
              <div className="flex items-center space-x-4">
                {isAuthenticated && <span className="text-sm text-gray-600">Welcome, {user?.name}</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToSurpriseMode}
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Surprise Me
                </Button>
              </div>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={currentStep > 0 ? "pt-20" : ""}>
        {currentStep === 0 && <LandingPage onStart={nextStep} onAuthRequired={handleAuthRequired} />}

        {currentStep === 1 && (
          <ProfileInput
            onNext={nextStep}
            onBack={prevStep}
            onProfileComplete={setUserProfile}
            initialProfile={userProfile}
            onAuthRequired={handleAuthRequired}
          />
        )}

        {currentStep === 2 && (
          <InterestQuiz
            onNext={nextStep}
            onBack={prevStep}
            onQuizComplete={setQuizAnswers}
            initialAnswers={quizAnswers}
            userProfile={userProfile}
          />
        )}

        {currentStep === 3 && (
          <BudgetSelector
            onNext={nextStep}
            onBack={prevStep}
            onBudgetSelect={setBudget}
            initialBudget={budget}
            userProfile={userProfile}
          />
        )}

        {currentStep === 4 && (
          <GiftResults
            onBack={prevStep}
            userProfile={userProfile}
            quizAnswers={quizAnswers}
            budget={budget}
            onSurpriseMode={goToSurpriseMode}
          />
        )}
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={() => setShowAuth(false)} />
      )}
    </div>
  )
}
