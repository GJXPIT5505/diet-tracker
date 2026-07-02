"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon, BotIcon, UserIcon, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      text: "Halo! Saya adalah AI Dietitian Anda. Ada yang bisa saya bantu hari ini terkait target nutrisi atau rekomendasi makanan Anda?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Mocking API delay for MVP
      await new Promise(r => setTimeout(r, 1500));
      
      const reply = "Tentu! Untuk malam ini, saya merekomendasikan makan malam yang tinggi protein dan rendah karbohidrat agar proses recovery otot optimal saat Anda tidur. Anda bisa mencoba salad dada ayam panggang dengan sedikit olive oil, atau tumis brokoli dengan putih telur. Apakah Anda memiliki bahan-bahan tersebut?";
      
      const modelMsg: Message = { id: (Date.now() + 1).toString(), role: "model", text: reply };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="px-4 py-4 border-b bg-white dark:bg-slate-950 flex items-center gap-3">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full text-purple-600">
          <BotIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg">AI Dietitian</h1>
          <p className="text-xs text-slate-500">Selalu ada untuk mendukung diet Anda</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden p-4 md:p-8 flex justify-center">
        <Card className="w-full max-w-3xl flex flex-col h-[calc(100vh-120px)] shadow-md border-0">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-green-600 text-white" : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"}`}>
                    {msg.role === "user" ? <UserIcon className="w-5 h-5" /> : <BotIcon className="w-5 h-5" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === "user" 
                      ? "bg-green-600 text-white rounded-tr-sm" 
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center">
                    <BotIcon className="w-5 h-5" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    <span className="text-sm text-slate-500">Berpikir...</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <div className="p-4 border-t bg-slate-50/50 dark:bg-slate-900/50">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya soal resep, kalori, atau tips diet..." 
                className="flex-1 bg-white dark:bg-slate-950"
                disabled={isLoading}
              />
              <Button type="submit" disabled={!input.trim() || isLoading} className="bg-purple-600 hover:bg-purple-700 text-white">
                <SendIcon className="w-4 h-4" />
                <span className="sr-only">Kirim</span>
              </Button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}
