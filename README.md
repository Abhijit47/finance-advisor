# SmartWealth Assistant - PromptWars Virtual Submission

## Challenge Vertical: Personal AI Assistant for Financial Planning
## Target Persona: Young professionals and students
## Chosen Logic: Intent-driven generative budgeting

**Problem Statement:** Many individuals lack access to personalized, actionable, and secure financial advice, making it difficult to effectively budget their income and plan for long-term targets like saving for a home, car, or retirement. Financial inclusion requires simplified, secure, and intelligent tooling.

**Solution:** The SmartWealth Assistant addresses this problem directly by providing a secure, intelligent personal finance assistant that processes user income, expenses, and goals to dynamically generate an interactive, actionable budget dashboard.


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

## 📊 Testing Coverage Report

We have implemented an integration and UI rendering testing suite using **Jest** and **React Testing Library**. Below is our latest coverage report demonstrating robust stability across core paths:

```text
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |   85.71 |    51.61 |      80 |   91.22 |                   
 app              |   83.72 |       44 |      70 |   87.17 |                   
  page.tsx        |   83.72 |       44 |      70 |   87.17 | 37,59,73,137-204  
 components/ui    |    87.5 |    83.33 |     100 |     100 |                   
  button.tsx      |    87.5 |       80 |     100 |     100 | 52                
  input.tsx       |     100 |      100 |     100 |     100 |                   
  scroll-area.tsx |      80 |      100 |     100 |     100 |                   
 lib              |     100 |      100 |     100 |     100 |                   
  utils.ts        |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
```
