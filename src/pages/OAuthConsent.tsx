import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Nedostaje authorization_id.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      setAccount(sess.session.user.email ?? null);
      try {
        const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) {
          setError(error.message);
          return;
        }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(data);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Zahtjev nije moguće učitati.");
      }
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauth.approveAuthorization(authorizationId)
        : await oauth.denyAuthorization(authorizationId);
      if (error) {
        setBusy(false);
        setError(error.message);
        return;
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) {
        setBusy(false);
        setError("Autorizacijski poslužitelj nije vratio povratnu adresu.");
        return;
      }
      window.location.href = target;
    } catch (e: any) {
      setBusy(false);
      setError(e?.message ?? "Radnja nije uspjela.");
    }
  }

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "aplikacija";

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <meta name="robots" content="noindex,nofollow" />
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        {error ? (
          <>
            <h1 className="text-lg font-semibold text-foreground">Zahtjev nije moguće obraditi</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </>
        ) : !details ? (
          <p className="text-sm text-muted-foreground">Učitavanje…</p>
        ) : (
          <>
            <h1 className="text-lg font-semibold text-foreground">
              Poveži {clientName} s Automind računom
            </h1>
            <p className="text-sm text-muted-foreground">
              Prijavljeni ste kao <strong>{account}</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              {clientName} će moći koristiti Automind alate za čitanje podataka u vaše ime. Ovo ne
              zaobilazi pravila pristupa aplikacije — dostupni su samo alati za čitanje.
            </p>
            {details?.redirect_uri && (
              <p className="text-xs text-muted-foreground break-all">
                Povratna adresa: {details.redirect_uri}
              </p>
            )}
            {typeof details?.scope === "string" && details.scope && (
              <p className="text-xs text-muted-foreground">Tražena dopuštenja: {details.scope}</p>
            )}
            <div className="flex gap-3 pt-2">
              <button
                disabled={busy}
                onClick={() => decide(true)}
                className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
              >
                Odobri
              </button>
              <button
                disabled={busy}
                onClick={() => decide(false)}
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground disabled:opacity-60"
              >
                Odustani
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
