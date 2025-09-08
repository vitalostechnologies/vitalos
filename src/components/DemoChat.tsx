import React, { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant" | "system"; text: string; ts: number };

const SUGGESTIONS = [
  "I feel anxious right now",
  "Give me a 2-minute breathing exercise",
  "I’m stressed and can’t focus",
  "Help me sleep better tonight",
  "How can I track my mood?",
];

const cannedReply = (text: string): string => {
  const t = text.toLowerCase();

  // crisis / safety first
  if (/(suicide|harm myself|kill myself|end it|hurt myself)/.test(t)) {
    return [
      "**I’m really sorry you’re feeling this way.**",
      "Please seek immediate help:",
      "- In the UK: **Call 999** for emergencies, or **111** for urgent advice.",
      "- Samaritans: **116 123** (free, 24/7), or visit **samaritans.org**.",
      "If you can, consider reaching out to someone you trust.",
    ].join("\n");
  }

  // quick intent matches
  if (/anxious|anxiety|panic/.test(t)) {
    return [
      "Let’s try a short grounding exercise (about 2 minutes):",
      "1) **Box breathing** — inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat x4.",
      "2) Name **5 things you can see**, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
      "Would you like me to **guide a timed box-breath** now?",
    ].join("\n");
  }

  if (/sleep|insomnia|tired|rest/.test(t)) {
    return [
      "For better sleep tonight:",
      "- Reduce screens 60–90 mins before bed.",
      "- Try a **10-minute wind-down**: dim lights, light stretch, slow breathing.",
      "- Keep your room cool and dark.",
      "Want a **5-minute pre-sleep routine** you can follow now?",
    ].join("\n");
  }

  if (/stress|overwhelmed|focus|work/.test(t)) {
    return [
      "When stress spikes, try a **focus sprint**:",
      "- Pick one tiny task you can finish in 10 minutes.",
      "- Silence notifications, start a timer, and do just that.",
      "- After 10 minutes, stand up, drink water, and reassess.",
      "I can also guide a **2-minute breathing reset** if you’d like.",
    ].join("\n");
  }

  if (/breath|breathe|breathing/.test(t)) {
    return [
      "Let’s do **box breathing** together (~2 mins):",
      "• Inhale **4**… Hold **4**… Exhale **4**… Hold **4**.",
      "• Repeat x6 cycles. Keep shoulders relaxed; breathe through the nose if comfy.",
      "Tell me when you’re ready to start a **timed** version.",
    ].join("\n");
  }

  if (/mood|track|journal|log/.test(t)) {
    return [
      "Simple mood tracking idea:",
      "- Rate your mood 1–5 once per day (morning or night).",
      "- Add one note: a trigger or a win.",
      "- Review weekly to spot patterns (sleep, social time, caffeine).",
      "Want a **printable one-pager** format?",
    ].join("\n");
  }

  // default supportive response
  return [
    "Thanks for sharing. I’m a **demo** version — not medical advice.",
    "I can guide **breathing**, quick **grounding**, **sleep** wind-downs, and simple **mood tracking**.",
    "Tell me how you’re feeling in a sentence, or tap a suggestion below.",
  ].join("\n");
};

const typingDelay = (text: string) => {
  // Simulate “thinking”: 40ms per char capped
  return Math.min(1800, 40 * text.length);
};

const DemoChat: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      role: "system",
      ts: Date.now(),
      text:
        "⚠️ This is a **demo** for illustration only — not medical advice. If you’re in crisis, call **999** (UK), **111** for urgent advice, or **116 123** for Samaritans.",
    },
    {
      role: "assistant",
      ts: Date.now() + 1,
      text:
        "Hi, I’m the Vitalos wellness demo. How are you feeling today? You can try one of the suggestions below.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isTyping,
    [input, isTyping]
  );

  useEffect(() => {
    // auto scroll to bottom on new message
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    const userText = text.trim();
    if (!userText || isTyping) return;

    const userMsg: Msg = { role: "user", text: userText, ts: Date.now() };
    const replyText = cannedReply(userText);

    setMessages((m) => [...m, userMsg]);
    setIsTyping(true);

    const delay = typingDelay(replyText);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: replyText, ts: Date.now() },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
    setInput("");
  };

  const reset = () => {
    setMessages([
      {
        role: "system",
        ts: Date.now(),
        text:
          "⚠️ Demo only — not medical advice. For emergencies call **999** (UK). For urgent help, dial **111** or Samaritans **116 123**.",
      },
      {
        role: "assistant",
        ts: Date.now() + 1,
        text:
          "Welcome back. How are you feeling? Try a quick prompt below to get started.",
      },
    ]);
    setInput("");
    setIsTyping(false);
  };

  const exportTxt = () => {
    const lines = messages
      .filter((m) => m.role !== "system")
      .map((m) => `${m.role === "user" ? "You" : "Assistant"}: ${m.text}`)
      .join("\n\n");
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vitalos-demo-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#50E3C2] animate-pulse" />
          <p className="text-sm text-white/80">Vitalos Wellness Demo</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="text-xs px-3 py-1 rounded-full border border-white/10 hover:border-white/20"
          >
            Reset
          </button>
          <button
            onClick={exportTxt}
            className="text-xs px-3 py-1 rounded-full border border-white/10 hover:border-white/20"
          >
            Export
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="h-[420px] overflow-y-auto px-5 py-4 space-y-3"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={[
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                m.role === "user"
                  ? "bg-[#50E3C2]/20 border border-[#50E3C2]/30"
                  : m.role === "system"
                  ? "bg-yellow-500/10 border border-yellow-500/30"
                  : "bg-white/5 border border-white/10",
              ].join(" ")}
            >
              {/* simple markdown-ish bold support for **text** */}
              <span
                dangerouslySetInnerHTML={{
                  __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 text-sm bg-white/5 border border-white/10">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-5 pb-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:border-white/20"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type how you’re feeling…"
            className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-2 outline-none focus:border-[#50E3C2]"
            aria-label="Message"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="px-4 py-2 rounded-xl bg-[#50E3C2] text-black font-semibold disabled:opacity-40"
            aria-label="Send"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-xs text-white/50">
          Demo only. Not medical advice. In emergencies call <strong>999</strong> (UK).
        </p>
      </form>
    </div>
  );
};

export default DemoChat;
