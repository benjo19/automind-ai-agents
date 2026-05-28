import { useState, useCallback, useEffect, useRef } from "react";
import { useConversation } from "@elevenlabs/react";
import { Phone, PhoneOff, Mic, Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AGENT_ID_STORAGE_KEY = "automind_elevenlabs_agent_id";
const LEAD_ID_STORAGE_KEY = "automind_lead_id";

const getOrCreateLeadId = (): string => {
  try {
    let id = localStorage.getItem(LEAD_ID_STORAGE_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(LEAD_ID_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `lead_${Date.now()}`;
  }
};

const readUtm = (): Record<string, string> => {
  const result: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = params.get(k);
      if (v) result[k] = v;
      else {
        const stored = localStorage.getItem(`automind_${k}`);
        if (stored) result[k] = stored;
      }
    });
    // Persist for later sessions
    Object.entries(result).forEach(([k, v]) => localStorage.setItem(`automind_${k}`, v));
  } catch {
    // ignore
  }
  return result;
};

const sendAnalytics = (payload: Record<string, unknown>) => {
  supabase.functions
    .invoke("voice-analytics", { body: payload })
    .catch((e) => console.error("voice-analytics error", e));
};

const VoiceDemo = () => {
  const [agentId, setAgentId] = useState<string>("");
  const [tempAgentId, setTempAgentId] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const stopCauseRef = useRef<string>("user_ended");

  useEffect(() => {
    const stored = localStorage.getItem(AGENT_ID_STORAGE_KEY) || "";
    setAgentId(stored);
    setTempAgentId(stored);
  }, []);

  const finalizeSession = useCallback((cause: string) => {
    if (!sessionIdRef.current || !startTimeRef.current) return;
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    sendAnalytics({
      event: "end",
      session_id: sessionIdRef.current,
      stop_cause: cause,
      duration_seconds: durationSeconds,
    });
    sessionIdRef.current = null;
    startTimeRef.current = null;
    stopCauseRef.current = "user_ended";
  }, []);

  const conversation = useConversation({
    onConnect: () => toast.success("Razgovor je započeo"),
    onDisconnect: () => {
      toast.info("Razgovor je završen");
      finalizeSession(stopCauseRef.current);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Greška u razgovoru. Provjerite Agent ID i pokušajte ponovno.");
      stopCauseRef.current = "error";
      finalizeSession("error");
    },
  });

  const startCall = useCallback(async () => {
    if (!agentId) {
      toast.error("Postavite ElevenLabs Agent ID");
      setShowSettings(true);
      return;
    }
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { data, error } = await supabase.functions.invoke("elevenlabs-token", {
        body: { agentId },
      });
      if (error || !data?.token) {
        throw new Error(error?.message || data?.error || "Nije moguće dohvatiti token");
      }

      // Init analytics session
      const sessionId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `vs_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      sessionIdRef.current = sessionId;
      startTimeRef.current = Date.now();
      stopCauseRef.current = "user_ended";

      sendAnalytics({
        event: "start",
        session_id: sessionId,
        agent_id: agentId,
        lead_id: getOrCreateLeadId(),
        utm: readUtm(),
        referrer: typeof document !== "undefined" ? document.referrer : "",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });

      await conversation.startSession({
        conversationToken: data.token,
        connectionType: "webrtc",
      });
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Greška pri pokretanju razgovora";
      toast.error(msg);
      if (sessionIdRef.current) {
        finalizeSession("start_failed");
      }
    } finally {
      setIsConnecting(false);
    }
  }, [agentId, conversation, finalizeSession]);

  const endCall = useCallback(async () => {
    stopCauseRef.current = "user_ended";
    await conversation.endSession();
  }, [conversation]);

  // Fire end event if user closes the tab mid-call
  useEffect(() => {
    const handler = () => {
      if (sessionIdRef.current && startTimeRef.current) {
        const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        try {
          const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-analytics`;
          const blob = new Blob(
            [
              JSON.stringify({
                event: "end",
                session_id: sessionIdRef.current,
                stop_cause: "page_unload",
                duration_seconds: durationSeconds,
              }),
            ],
            { type: "application/json" },
          );
          navigator.sendBeacon?.(url, blob);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const saveAgentId = () => {
    localStorage.setItem(AGENT_ID_STORAGE_KEY, tempAgentId.trim());
    setAgentId(tempAgentId.trim());
    setShowSettings(false);
    toast.success("Agent ID spremljen");
  };

  const isConnected = conversation.status === "connected";

  return (
    <section id="voice-demo" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Glasovni demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Razgovarajte s našim AI recepcionarom
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kliknite na gumb, dopustite mikrofon i postavite pitanje kao da zovete vlastiti salon ili servis. Odgovara u stvarnom vremenu.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
          <div className="flex flex-col items-center gap-6">
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                isConnected
                  ? conversation.isSpeaking
                    ? "bg-primary/20 scale-110 animate-pulse"
                    : "bg-primary/10"
                  : "bg-slate-100"
              }`}
            >
              <Mic
                className={`w-14 h-14 ${
                  isConnected ? "text-primary" : "text-slate-400"
                }`}
              />
            </div>

            <div className="text-center">
              <p className="font-semibold text-slate-900">
                {isConnected
                  ? conversation.isSpeaking
                    ? "AI govori..."
                    : "Slušam vas..."
                  : "Spreman za razgovor"}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {isConnected
                  ? "Govorite prirodno, kao u telefonskom razgovoru"
                  : "Trajanje demo razgovora: ~2 minute"}
              </p>
            </div>

            {!isConnected ? (
              <Button
                size="lg"
                onClick={startCall}
                disabled={isConnecting}
                className="rounded-full px-8"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Povezivanje...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5 mr-2" />
                    Pokreni razgovor
                  </>
                )}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="destructive"
                onClick={endCall}
                className="rounded-full px-8"
              >
                <PhoneOff className="w-5 h-5 mr-2" />
                Završi razgovor
              </Button>
            )}

            <button
              onClick={() => setShowSettings((s) => !s)}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mt-2"
            >
              <Settings className="w-3 h-3" />
              {agentId ? "Promijeni Agent ID" : "Postavi Agent ID"}
            </button>

            {showSettings && (
              <div className="w-full max-w-md mt-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ElevenLabs Agent ID
                </label>
                <div className="flex gap-2">
                  <Input
                    value={tempAgentId}
                    onChange={(e) => setTempAgentId(e.target.value)}
                    placeholder="agent_xxxxxxxxxxxx"
                    className="flex-1"
                  />
                  <Button onClick={saveAgentId} size="sm">
                    Spremi
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Kreirajte agenta u ElevenLabs dashboardu i zalijepite ID ovdje. Sprema se lokalno u vaš preglednik.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceDemo;
