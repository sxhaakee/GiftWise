# Gift Recommendation Application

This is a modern web application built with Next.js that provides personalized gift recommendations. Users can input recipient details, answer a short quiz about their interests and personality, and specify a budget. The application then uses an AI model (via the AIML API) to generate unique and thoughtful gift suggestions tailored to the recipient.

## Features

*   **Personalized Recommendations:** Get gift ideas based on detailed user profiles, quiz answers, and budget.
*   **Interactive Quiz:** A guided process to collect recipient preferences and refine recommendations.
*   **AI-Powered:** Integrates with the AIML API to leverage powerful language models for creative gift suggestions.
*   **Responsive Design:** Optimized for a seamless experience across various devices.
*   **Modern UI:** Built with shadcn/ui components for a sleek and intuitive user interface.

## Technologies Used

*   **Next.js:** React framework for building server-side rendered and static web applications.
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **shadcn/ui:** Reusable components built with Radix UI and Tailwind CSS.
*   **AIML API:** For accessing large language models to generate gift recommendations.
*   **pnpm:** A fast, disk space efficient package manager.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/sxhaakee/GiftWise.git
cd gift-recommendation-app
```

### 2. Install Dependencies

This project uses `pnpm`. If you don't have it installed, you can install it globally:
```bash
npm install -g pnpm
```

Then, install the project dependencies:
```bash
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of your project and add your AIML API key:

```
AIML_API_KEY="YOUR_AIML_API_KEY"
```
Replace `"YOUR_AIML_API_KEY"` with your actual API key obtained from [aimlapi.com](https://aimlapi.com/).

### 4. Run the Development Server

```bash
pnpm dev
```

The application will now be running on `http://localhost:3000` (or `http://localhost:3001` if port 3000 is in use).

## Project Structure

*   `pages/api/generate-gifts.ts`: The API route responsible for connecting to the AIML API and generating gift recommendations.
*   `components/`: Contains various reusable React components for the UI, including the `gift-results.tsx` which handles the API call.
*   `app/`: Next.js application root.
*   `public/`: Static assets like images.
*   `styles/`: Global styles.

## How it Works

The frontend collects user input for `userProfile`, `quizAnswers`, and `budget`. This data is then sent to the `/api/generate-gifts` endpoint. This API route constructs a prompt based on the user's input and sends it to the AIML API's chat completions endpoint (`https://api.aimlapi.com/v1/chat/completions`) using the `google/gemma-3n-e4b-it` model. The AI processes the prompt and returns a JSON array of gift recommendations, which is then displayed in the application. 