# SmartWealth Assistant - PromptWars Virtual Submission

A smart, dynamic AI Financial Advisor built for the PromptWars Virtual hackathon. Designed with rapid intent-driven development, strict security principles, robust API integrations, and comprehensive test coverage.

## 🏆 Problem Statement Alignment

**Problem Statement:** Many individuals lack access to personalized, actionable, and secure financial advice, making it difficult to effectively budget their income and plan for long-term targets like saving for a home, car, or retirement. Financial inclusion requires simplified, secure, and intelligent tooling.

**Solution:** The SmartWealth Assistant addresses this problem directly by providing a secure, intelligent personal finance assistant that processes user income, expenses, and goals to dynamically generate an interactive, actionable budget dashboard.

**Target Persona:** Young Professionals, Students, and Individuals seeking to establish a strong financial foundation but lacking access to human financial planners.

## 🛠 Tech Stack & Architecture

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Lucide React for iconography 
- **AI Integration (Google Service #1):** Google Gemini API (`gemini-1.5-flash`) via the `@google/generative-ai` SDK
- **Maps Integration (Google Service #2):** Google Maps Embed API for local branch queries
- **Security Validation:** `zod` schema validation on the server side
- **Testing Coverage:** Automated UI and interaction tests powered by `Jest` and `React Testing Library`
- **Theming:** Full Light/Dark mode support via `next-themes`

## 🔒 Security Measures
Crucially, we prioritized security by adopting an intent-driven **Next.js Server API Route** architecture. 
- API keys are processed strictly on the Node.js server side.
- Keys are never exposed through local browser storage, thwarting XSS vulnerabilities.
- Input validation is rigidly sanitized using `zod` schemas.
- Strict Content Security Policies (CSP) defined via HTTP headers.

## 🚀 Running the App Locally

To ensure security, we are not exposing our production API key in the repository's source code. You will need to provide your own Gemini API key to run the project.

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the root directory and add your key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Run `npm run dev` to start the Next.js development server.
5. Navigate to `http://localhost:3000` to test out the assistant!
6. To run the automated testing suite, use `npm run test`.
