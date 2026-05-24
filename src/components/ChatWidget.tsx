import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-lead`;
const CHAT_CLIENT_KEY = "automind_chat_client_key";

const getClientKey = () => {
  try {
    const existing = localStorage.getItem(CHAT_CLIENT_KEY);
    if (existing) return existing;
    const next = crypto.randomUUID();
    localStorage.setItem(CHAT_CLIENT_KEY, next);
    return next;
  } catch {
    return crypto.randomUUID();
  }
};

const newClientKey = () => {
  const next = crypto.randomUUID();
  try {
    localStorage.setItem(CHAT_CLIENT_KEY, next);
  } catch {}
  return next;
};

const ChatWidget = () => {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: t.chat.greeting }]);
  const [clientKey, setClientKey] = useState(getClientKey);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages((prev) => {
      const hasUserMessage = prev.some((message) => message.role === "user");
      return hasUserMessage ? prev : [{ role: "assistant", content: t.chat.greeting }];
    });
  }, [t.chat.greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    const userMsg: Msg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    let assistantContent = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const upsert = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: assistantContent };
        return copy;
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          clientKey,
          language,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (resp.status === 429) {
        setError(t.chat.rateLimit);
        setMessages((prev) => prev.slice(0, -1));
        setLoading(false);
        return;
      }
      if (resp.status === 402) {
        setError(t.chat.unavailable);
        setMessages((prev) => prev.slice(0, -1));
        setLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        throw new Error(t.chat.commError);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            // Custom server event for lead submission
            if (parsed.event === "lead_submitted") {
              setLeadSent(true);
              continue;
            }
            if (parsed.event === "lead_error") {
              setError(t.chat.leadError);
              continue;
            }
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // If model produced no text (only tool call), give a friendly fallback
      if (!assistantContent.trim()) {
        upsert(
          t.chat.leadFallback,
        );
      }
    } catch (e) {
      console.error(e);
      setError(t.chat.genericError);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setClientKey(newClientKey());
    setMessages([{ role: "assistant", content: t.chat.greeting }]);
    setInput("");
    setLeadSent(false);
    setError(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.chat.close : t.chat.open}
        className={cn(
          "fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-accent via-accent-pink to-accent-cyan text-white",
          "shadow-glow hover:scale-110 hover:shadow-[0_0_50px_hsl(var(--accent-pink)/0.5)] transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          !open && "animate-pulse-glow",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 origin-bottom-right",
          "bottom-24 right-5 w-[calc(100vw-2.5rem)] max-w-[380px] h-[min(560px,calc(100vh-8rem))]",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        )}
        role="dialog"
        aria-label="AI chat"
      >
        <div className="flex flex-col h-full glass-card rounded-2xl overflow-hidden border border-accent/20 shadow-glow relative">
          {/* Top rainbow accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink to-transparent" />
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-accent/15 bg-background/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent via-accent-pink to-accent-cyan flex items-center justify-center text-white font-semibold text-sm shadow-[0_0_15px_hsl(var(--accent-pink)/0.4)]">
                  A
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-accent-emerald border-2 border-background shadow-[0_0_8px_hsl(var(--accent-emerald)/0.6)]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Ana · Automind</div>
                <div className="text-xs text-muted-foreground">{t.chat.status}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetConversation}
                aria-label="Novi razgovor"
                title="Novi razgovor"
                className="text-muted-foreground hover:text-accent-pink transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.chat.closeShort}
                className="text-muted-foreground hover:text-accent-pink transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap break-words shadow-sm",
                    m.role === "user"
                      ? "bg-gradient-to-br from-accent to-accent-pink text-white rounded-br-sm shadow-[0_4px_12px_hsl(var(--accent-pink)/0.25)]"
                      : "bg-accent/5 border border-accent/15 text-foreground rounded-bl-sm",
                  )}
                >
                  {m.content || (
                    <span className="inline-flex gap-1 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-pink animate-pulse" />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {leadSent && (
              <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-accent-emerald/10 border border-accent-emerald/30 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent-emerald shrink-0 mt-0.5" />
                <span>
                  {t.chat.leadSent}
                </span>
              </div>
            )}

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-2">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-accent/15 bg-background/50">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.chat.placeholder}
                disabled={loading}
                aria-label={t.chat.messageLabel}
                className="flex-1 bg-accent/5 border border-accent/15 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all disabled:opacity-60"
              />
              <Button
                onClick={send}
                disabled={loading || !input.trim()}
                size="icon"
                variant="hero"
                className="rounded-full h-10 w-10 shrink-0"
                aria-label={t.chat.send}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Powered by Automind AI
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
