import { useMemo, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarClock, Loader2, Video, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { trackMetaLead } from "@/lib/meta";

// 30-min slots between 09:00 and 17:00, weekdays only, next 14 days
function buildSlots() {
  const slots: { value: string; label: string; dayKey: string; dayLabel: string }[] = [];
  const now = new Date();
  for (let d = 0; d < 14; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() + d);
    const dow = day.getDay();
    if (dow === 0 || dow === 6) continue;
    const dayKey = day.toISOString().slice(0, 10);
    const dayLabel = day.toLocaleDateString("hr-HR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });
    for (let h = 9; h < 17; h++) {
      for (const m of [0, 30]) {
        const slot = new Date(day);
        slot.setHours(h, m, 0, 0);
        if (slot.getTime() < Date.now() + 60 * 60_000) continue;
        slots.push({
          value: slot.toISOString(),
          label: slot.toLocaleTimeString("hr-HR", { hour: "2-digit", minute: "2-digit" }),
          dayKey,
          dayLabel,
        });
      }
    }
  }
  return slots;
}

const BookCall = () => {
  const slots = useMemo(buildSlots, []);
  const days = useMemo(() => {
    const seen = new Set<string>();
    return slots
      .filter((s) => (seen.has(s.dayKey) ? false : seen.add(s.dayKey)))
      .map((s) => ({ key: s.dayKey, label: s.dayLabel }));
  }, [slots]);

  const [day, setDay] = useState<string>(days[0]?.key ?? "");
  const [slot, setSlot] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    meetLink?: string;
    start: string;
  } | null>(null);

  const daySlots = slots.filter((s) => s.dayKey === day);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!slot) {
      toast.error("Odaberite termin.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("book-call", {
        body: { ...form, start: slot },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Greška");
      trackMetaLead("book_call");
      setConfirmed({ meetLink: data.meetLink, start: data.start });
      toast.success("Termin rezerviran!", {
        description: "Provjerite e-mail za poveznicu na Google Meet.",
      });
    } catch (err: any) {
      console.error(err);
      toast.error("Rezervacija nije uspjela", {
        description: err?.message || "Pokušajte ponovno za nekoliko trenutaka.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="py-20 md:py-28 bg-secondary/30 scroll-mt-20">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <CalendarClock className="h-4 w-4" />
              Besplatan razgovor — 30 min
            </div>
            <h2 className="font-bold text-3xl md:text-5xl mb-4 tracking-tight">
              Zakažite <span className="gradient-text">poziv</span> s nama
            </h2>
            <p className="text-lg text-muted-foreground">
              Odaberite termin koji vam odgovara. Šaljemo vam poveznicu na Google Meet i potvrdu
              na e-mail.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            {confirmed ? (
              <div className="glass-card p-8 md:p-12 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 mx-auto text-accent" />
                <h3 className="text-2xl font-bold">Termin potvrđen 🎉</h3>
                <p className="text-muted-foreground">
                  {new Date(confirmed.start).toLocaleString("hr-HR", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
                {confirmed.meetLink && (
                  <a
                    href={confirmed.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                  >
                    <Video className="h-4 w-4" /> Otvori Google Meet
                  </a>
                )}
                <p className="text-sm text-muted-foreground">
                  Poslali smo potvrdu i pozivnicu na <strong>{form.email}</strong>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card p-6 md:p-10 rounded-2xl space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Datum</Label>
                    <Select value={day} onValueChange={(v) => { setDay(v); setSlot(""); }}>
                      <SelectTrigger><SelectValue placeholder="Odaberite dan" /></SelectTrigger>
                      <SelectContent>
                        {days.map((d) => (
                          <SelectItem key={d.key} value={d.key}>{d.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Vrijeme</Label>
                    <Select value={slot} onValueChange={setSlot}>
                      <SelectTrigger><SelectValue placeholder="Odaberite termin" /></SelectTrigger>
                      <SelectContent>
                        {daySlots.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bc-name">Ime i prezime *</Label>
                    <Input
                      id="bc-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ivan Horvat"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bc-email">E-mail *</Label>
                    <Input
                      id="bc-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ivan@tvrtka.hr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bc-phone">Telefon</Label>
                    <Input
                      id="bc-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+385 91 ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bc-company">Tvrtka</Label>
                    <Input
                      id="bc-company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Naziv tvrtke"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bc-notes">O čemu želite razgovarati?</Label>
                  <Textarea
                    id="bc-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Npr. AI recepcionar za frizerski salon..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Rezerviram...</>
                  ) : (
                    <><CalendarClock className="mr-2 h-5 w-5" /> Potvrdi termin</>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Slanjem prihvaćate da vas kontaktiramo radi pripreme razgovora.
                </p>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BookCall;
