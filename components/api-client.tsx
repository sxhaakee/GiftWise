"use client"

const API_BASE_URL = process.env.NODE_ENV === "production" ? "https://your-api-domain.com" : "http://localhost:3001"

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem("auth_token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async saveProfile(profileData: any) {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      throw new Error("Failed to save profile")
    }

    return response.json()
  }

  async saveQuiz(profileId: string, quizData: any) {
    const response = await fetch(`${API_BASE_URL}/api/quiz`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ profileId, ...quizData }),
    })

    if (!response.ok) {
      throw new Error("Failed to save quiz")
    }

    return response.json()
  }

  async saveBudget(profileId: string, budgetData: any) {
    const response = await fetch(`${API_BASE_URL}/api/budget`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ profileId, ...budgetData }),
    })

    if (!response.ok) {
      throw new Error("Failed to save budget")
    }

    return response.json()
  }

  async getRecommendations(profileId: string) {
    const response = await fetch(`${API_BASE_URL}/api/recommend?profileId=${profileId}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to get recommendations")
    }

    return response.json()
  }

  async getSurpriseGift(profileId: string) {
    const response = await fetch(`${API_BASE_URL}/api/surprise?profileId=${profileId}`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to get surprise gift")
    }

    return response.json()
  }

  async submitFeedback(feedbackData: any) {
    const response = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(feedbackData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit feedback")
    }

    return response.json()
  }

  async trackClick(giftId: string, recommendationId: string) {
    const response = await fetch(`${API_BASE_URL}/api/track-click`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ giftId, recommendationId }),
    })

    if (!response.ok) {
      throw new Error("Failed to track click")
    }

    return response.json()
  }

  async getHistory() {
    const response = await fetch(`${API_BASE_URL}/api/history`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to get history")
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()
