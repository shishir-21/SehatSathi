"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { chatWithAI } from "@/lib/api";

type Message = {
  _id: string;
  role: "user" | "ai";
  text?: string;
  data?: {
    summary: string;
    advice: string[];
    diet: string[];
    schedule: string[];
    severity: "low" | "medium" | "high";
    recommendDoctor: boolean;
  };
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { _id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Hit backend API
      const aiResponse = await chatWithAI(text);
      
      const aiMsg: Message = { _id: (Date.now() + 1).toString(), role: "ai", data: aiResponse };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { _id: Date.now().toString(), role: "ai", text: "Sorry, the ML endpoint failed to respond." }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: "Fever 🌡️", query: "I have a strong fever and body ache" },
    { label: "Cold 🤧", query: "I have a cough and cold" },
    { label: "Headache 🤕", query: "I have a headache" },
    { label: "Chest Pain 💔", query: "I have severe chest pain and breathing problem" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-80px)] flex flex-col md:flex-row gap-6">
      
      {/* LEFT: Chat Section (WhatsApp Style) */}
      <div className="flex-1 bg-[#f0f2f5] border border-gray-200 rounded-3xl overflow-hidden flex flex-col shadow-sm relative">
        
        {/* Chat Header */}
        <div className="bg-white px-6 py-4 border-b flex items-center justify-between shadow-sm z-10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex justify-center items-center text-2xl border-2 border-blue-600">🤖</div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">MediBrain AI</h2>
                <p className="text-sm text-green-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                </p>
              </div>
           </div>
        </div>

        {/* Safety Warning */}
        <div className="bg-yellow-50 text-yellow-800 text-sm font-semibold p-3 text-center border-b border-yellow-200 z-10">
          ⚠️ This is an AI analysis, not a medical diagnosis. Please consult a doctor for severe symptoms.
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover">
          
          {messages.length === 0 && (
             <div className="text-center text-gray-500 bg-white/90 p-6 rounded-2xl max-w-sm mx-auto shadow-sm mt-10">
                <p className="font-semibold text-lg text-gray-800">Hi! Tell me how you're feeling.</p>
                <p className="text-sm mt-2">I can analyze your symptoms and suggest home remedies or alert you to see a doctor.</p>
             </div>
          )}

          {messages.map((msg) => (
            <div key={msg._id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "user" ? (
                // User Bubble
                <div className="max-w-[70%] bg-blue-600 text-white p-4 rounded-3xl rounded-tr-sm shadow-md">
                   {msg.text}
                </div>
              ) : (
                // AI Bubble
                <div className="max-w-[85%] bg-white border border-gray-200 p-5 rounded-3xl rounded-tl-sm shadow-md text-gray-800">
                   {msg.text ? (
                     <p>{msg.text}</p>
                   ) : msg.data ? (
                     <div className="space-y-4">
                        {/* Severity Banner */}
                        {msg.data.severity === "high" && (
                          <div className="bg-red-100 text-red-800 p-3 rounded-xl font-bold animate-pulse flex items-center gap-2 border border-red-300">
                             🚨 HIGH SEVERITY: {msg.data.summary}
                          </div>
                        )}
                        {msg.data.severity === "medium" && (
                          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-xl font-bold border border-yellow-300">
                             🟡 MEDIUM SEVERITY: {msg.data.summary}
                          </div>
                        )}
                        {msg.data.severity === "low" && (
                          <div className="bg-green-100 text-green-800 p-3 rounded-xl font-bold border border-green-300">
                             🟢 LOW SEVERITY: {msg.data.summary}
                          </div>
                        )}

                        {/* Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                           <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                             <h4 className="font-bold text-blue-900 mb-2 border-b border-blue-200 pb-1">🩹 Advice</h4>
                             <ul className="list-disc pl-4 text-sm text-blue-800 space-y-1">
                               {msg.data.advice?.map((item, i) => <li key={i}>{item}</li>)}
                             </ul>
                           </div>
                           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                             <h4 className="font-bold text-orange-900 mb-2 border-b border-orange-200 pb-1">🍲 Diet</h4>
                             <ul className="list-disc pl-4 text-sm text-orange-800 space-y-1">
                               {msg.data.diet?.map((item, i) => <li key={i}>{item}</li>)}
                             </ul>
                           </div>
                           <div className="md:col-span-2 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                             <h4 className="font-bold text-indigo-900 mb-2 border-b border-indigo-200 pb-1">⏱️ Schedule</h4>
                             <ul className="list-disc pl-4 text-sm text-indigo-800 space-y-1">
                               {msg.data.schedule?.map((item, i) => <li key={i}>{item}</li>)}
                             </ul>
                           </div>
                        </div>

                        {/* Doctor Link */}
                        {msg.data.recommendDoctor && (
                           <div className="mt-4 pt-4 border-t w-full">
                              <p className="text-sm font-semibold text-gray-600 mb-3 text-center">Medical consultation is recommended for these symptoms.</p>
                              <Link 
                                href="/" 
                                className={`block w-full text-center font-bold py-3 rounded-xl shadow-sm transition ${msg.data.severity === 'high' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                              >
                                Book a Doctor Now &rarr;
                              </Link>
                           </div>
                        )}
                     </div>
                   ) : null}
                </div>
              )}
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
                <div className="bg-white border p-4 rounded-3xl rounded-tl-sm shadow-sm flex gap-2">
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
             </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Chat Input Section */}
        <div className="bg-white p-4 border-t flex flex-col gap-3">
          {/* Quick Actions */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
             {quickActions.map(action => (
                <button 
                  key={action.label} 
                  onClick={() => handleSend(action.query)}
                  disabled={loading}
                  className="whitespace-nowrap bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-full text-sm font-bold transition disabled:opacity-50"
                >
                  {action.label}
                </button>
             ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex gap-2"
          >
            <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Describe your symptoms (e.g. fever and dry cough)..." 
               disabled={loading}
               className="flex-1 bg-gray-100 text-gray-900 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            />
            <button 
               type="submit" 
               disabled={loading || !input.trim()}
               className="bg-blue-600 text-white w-14 h-14 rounded-full flex justify-center items-center shadow-md hover:bg-blue-700 transition disabled:opacity-50"
            >
               ➤
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT: Health Tracker Profile */}
      <div className="w-full md:w-80 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col h-full overflow-y-auto">
         <h3 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">🩺 Health Tracker</h3>
         
         <div className="space-y-6">
            <div>
               <label className="block text-sm font-bold text-gray-600 mb-2">Current Temperature (°F)</label>
               <input type="number" placeholder="98.6" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-600 mb-2">Active Symptoms</label>
               <input type="text" placeholder="e.g. Cough" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-600 mb-2">Current Medicines</label>
               <textarea placeholder="Paracetamol 500mg" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none" />
            </div>

            <button className="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-sm hover:bg-green-700 transition">
              Save Vitals
            </button>
         </div>

         <div className="mt-auto pt-6 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3">🔔 Reminders (Phase 2)</h4>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center text-sm text-gray-500">
               Medicine & water reminders will be active in the next release.
            </div>
         </div>
      </div>
    </div>
  );
}
