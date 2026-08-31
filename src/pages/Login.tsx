import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function safeNext(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export default function Login() {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = next;
    });
  }, [next]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = next;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}${next}` },
        });
        if (error) throw error;
        setMessage("Provjerite e-poštu za potvrdu računa, zatim se prijavite.");
      }
    } catch (err: any) {
      setMessage(err?.message ?? "Prijava nije uspjela.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <meta name="robots" content="noindex,nofollow" />
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-foreground">
          {mode === "signin" ? "Prijava" : "Registracija"}
        </h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-pošta"
          autoComplete="email"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lozinka"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Molimo pričekajte…" : mode === "signin" ? "Prijavi se" : "Registriraj se"}
        </button>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-xs text-muted-foreground underline"
        >
          {mode === "signin" ? "Nemate račun? Registrirajte se" : "Već imate račun? Prijavite se"}
        </button>
      </form>
    </main>
  );
}
