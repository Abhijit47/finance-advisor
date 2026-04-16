# SmartWealth Assistant - PromptWars Virtual Submission

A smart, dynamic AI Financial Advisor built for the PromptWars Virtual hackathon. Designed with rapid intent-driven development and strict security principles.

## 🏆 Project Details

### What We Have Done
We built a secure, intelligent personal finance assistant that processes your income, expenses, and financial goals, and dynamically generates actionable budgets. The interface features a split-pane layout with an AI Chat on one side and a dynamic Financial Dashboard on the other. 

Crucially, we prioritized security by migrating the architecture to **Next.js Server API Routes**, ensuring that the Google Gemini API keys are processed strictly on the server side and never exposed to the client or the local browser storage.

### Tech Stack Used
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Lucide React for iconography + Glassmorphism aesthetic
- **AI Integration:** Google Gemini API (`gemini-1.5-flash`) via the `@google/generative-ai` SDK
- **Theming:** Full Light/Dark mode support via `next-themes`

### 🚀 Running the App Locally

To ensure security, we are not exposing our production API key in the repository's source code. You will need to provide your own Gemini API key to run the project.

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the root directory and add your key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Run `npm run dev` to start the Next.js development server.
5. Navigate to `http://localhost:3000` to test out the assistant!

### 🔮 Future Features & Roadmap
While the current version is complete and highly functional, we plan to implement the following features in the future to elevate the project:
1. **Plaid / OpenBanking Integration:** Allow users to securely link real bank accounts to automatically ingest transaction history for the AI to analyze, instead of relying solely on manual input.
2. **Exportable PDF Reports:** A feature to instantly download the generated budget, action plan, and charts as a beautifully formatted PDF.
3. **Database Integration:** Integrate a database (like Firebase or Supabase) to store User Profiles and past chat context, allowing the AI to remember long-term goals across different sessions.
4. **Interactive Goal Tracking:** Implement dynamic charting libraries (like Recharts) to visually project savings accumulation over time against target milestones.
