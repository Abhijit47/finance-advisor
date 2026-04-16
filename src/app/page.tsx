"use client";

import React, { useState } from "react";
import { PieChart, Loader2, Sparkle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface FinancialPlan {
  budgeting: {
    necessities: number;
    wants: number;
    savings: number;
  };
  advice: string;
  actionItems: string[];
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<FinancialPlan | null>(null);

  const parseFinancialPlan = (text: string) => {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setPlan(JSON.parse(jsonMatch[0]));
      }
    } catch (e) {
      console.error("Failed to parse financial plan JSON from response", e);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: currentInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const responseText = data.responseText;
      console.log(responseText);
      const cleanMessage = responseText.replace(/\{[\s\S]*\}/, "").trim();
      console.log(cleanMessage);

      setMessages((prev) => [
        ...prev,
        { role: "model", content: cleanMessage },
      ]);
      parseFinancialPlan(responseText);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: `Error: ${error instanceof Error ? error.message : ""}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid grid-cols-2 gap-6 h-full w-full mx-auto bg-background text-foreground max-w-(--breakpoint-xl)">
      {/* Chat Section */}
      <section className="col-span-full lg:col-span-1 border-r border-border/40 flex flex-col bg-card/50">
        <ScrollArea className="h-130 w-full">
          <div className="flex-1 h-full overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground animate-in fade-in duration-500">
                <Sparkle className="size-4 animate-pulse" />
                <p>Hello! I am your AI Financial Advisor.</p>
                <p className="text-sm mt-1">
                  Tell me about your income, expenses, and goals to get started.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background border text-foreground rounded-2xl px-5 py-4 shadow-sm flex space-x-2">
                  <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4 border-t border-border/40 bg-background/50 backdrop-blur">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="E.g. I make $5000 a month and want to save for a house"
              className="flex-1 bg-background px-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-ring shadow-sm transition-shadow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium shadow-sm transition hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="col-span-full lg:col-span-1 p-8 bg-muted/20 overflow-y-auto">
        {plan ? (
          <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-700">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              Your Financial Dashboard
            </h2>

            <div className="bg-background border rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Advisor Summary
              </h3>
              <p className="text-foreground font-medium text-lg leading-snug">
                {plan.advice}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-background border rounded-2xl p-5 border-l-4 border-l-chart-1 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <span className="text-3xl font-bold text-chart-1">
                  {plan.budgeting.necessities}%
                </span>
                <span className="text-sm text-muted-foreground mt-2 font-medium">
                  Necessities
                </span>
              </div>
              <div className="bg-background border rounded-2xl p-5 border-l-4 border-l-chart-4 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <span className="text-3xl font-bold text-chart-4">
                  {plan.budgeting.wants}%
                </span>
                <span className="text-sm text-muted-foreground mt-2 font-medium">
                  Wants
                </span>
              </div>
              <div className="bg-background border rounded-2xl p-5 border-l-4 border-l-chart-2 shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                <span className="text-3xl font-bold text-chart-2">
                  {plan.budgeting.savings}%
                </span>
                <span className="text-sm text-muted-foreground mt-2 font-medium">
                  Savings
                </span>
              </div>
            </div>

            <div className="bg-background border rounded-2xl p-6 shadow-sm mt-4">
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                Recommended Action Plan
              </h3>
              <ul className="space-y-4">
                {plan.actionItems.map((item, index) => (
                  <li key={index} className="flex gap-4 text-sm group">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {index + 1}
                    </div>
                    <span className="pt-1 text-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border rounded-2xl p-6 shadow-sm mt-4">
               <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                  Find Local Banks & Planners
               </h3>
               <div className="w-full h-[250px] rounded-xl overflow-hidden border">
                 <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_MAPS_KEY || "AIzaSyDummyKeyForMapsEmbedAPI1234"}&q=financial+advisors+near+me`}
                 ></iframe>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground animate-in fade-in duration-1000">
            <div className="w-24 h-24 mb-6 rounded-3xl bg-background border shadow-sm flex items-center justify-center transform rotate-3">
              <PieChart className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-medium">No Dashboard Data Yet</p>
            <p className="text-sm text-center max-w-sm mt-2">
              Start a conversation with the advisor to immediately generate your
              personalized budget and action plan.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
