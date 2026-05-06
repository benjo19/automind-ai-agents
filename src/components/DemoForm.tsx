import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Send, ArrowRight, ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/i18n";

const WEBHOOK_URL = "https://hook.eu2.make.com/5bkttym22undrj5o8gg5l7vnktk978m1";
const CTA_EMAIL = "auto.mind.ai2025@gmail.com";

const DemoForm = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formLoadedAt] = useState(() => Date.now());
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", industry: "", budget: "",
    interests: [] as string[], deadline: "", message: "",
    consentGdpr: false, consentNewsletter: false,
  });

  useEffect(() => {
    try {
      const prefill = sessionStorage.getItem("prefill_email");
      if (prefill) {
        setFormData((prev) => ({ ...prev, email: prefill }));
        sessionStorage.removeItem("prefill_email");
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }));
  };

  const goToStep2 = () => {
    if (!formData.name || !formData.email || !formData.company) {
      toast.error(t.demoForm.requiredError);
      return;
    }
    setStep(2);
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.consentGdpr) { toast.error(t.demoForm.gdprError); return; }
    setIsLoading(true);
    try {
      const elapsed = Date.now() - formLoadedAt;
      const urlParams = new URLSearchParams(window.location.search);
      const payload = {
        type: "demo_request",
        source: "demo-form", client_id: "AUTOMIND", page_url: window.location.href, language,
        submitted_at: new Date().toISOString(),
        submitted_after_ms: elapsed,
        utm: { utm_source: urlParams.get("utm_source") || "", utm_medium: urlParams.get("utm_medium") || "", utm_campaign: urlParams.get("utm_campaign") || "" },
        ...formData,
      };
      const response = await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", company: "", industry: "", budget: "", interests: [], deadline: "", message: "", consentGdpr: false, consentNewsletter: false });
        setStep(1);
        navigate("/hvala");
      } else { throw new Error("Network response was not ok"); }
    } catch (err) {
      console.error("DemoForm submit error:", err);
      toast.error(t.demoForm.submitError, { description: t.demoForm.submitErrorDescription });
    }
    finally { setIsLoading(false); }
  };

  return (
    <section id="demo" className="py-20 md:py-32 relative glow-bg scroll-mt-20">
      <div className="container px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {t.demoForm.titleStart} <span className="gradient-text">{t.demoForm.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.demoForm.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-2xl space-y-6">
              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className={step === 1 ? "text-foreground font-semibold" : ""}>{t.demoForm.step1}</span>
                  <span className={step === 2 ? "text-foreground font-semibold" : ""}>{t.demoForm.step2}</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-accent" />
                  <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 2 ? "bg-accent" : "bg-secondary"}`} />
                </div>
              </div>

              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.demoForm.name}</Label>
                      <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t.demoForm.namePlaceholder} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t.demoForm.emailPlaceholder} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.demoForm.phone}</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder={t.demoForm.phonePlaceholder} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t.demoForm.company}</Label>
                      <Input id="company" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder={t.demoForm.companyPlaceholder} />
                    </div>
                  </div>
                  <Button type="button" variant="hero" size="lg" className="w-full" onClick={goToStep2}>
                    {t.demoForm.next} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry">{t.demoForm.industry}</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                        <SelectTrigger><SelectValue placeholder={t.demoForm.industryPlaceholder} /></SelectTrigger>
                        <SelectContent>
                          {["retail", "services", "hospitality", "construction", "it", "manufacturing", "healthcare", "education", "other"].map((value, index) => (
                            <SelectItem key={value} value={value}>{t.demoForm.industries[index]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">{t.demoForm.budget}</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                        <SelectTrigger><SelectValue placeholder={t.demoForm.budgetPlaceholder} /></SelectTrigger>
                        <SelectContent>
                          {["small", "medium", "large", "custom"].map((value, index) => (
                            <SelectItem key={value} value={value}>{t.demoForm.budgets[index]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>{t.demoForm.interestsLabel}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {["chat", "voice", "ponude", "crm", "email"].map((value, index) => (
                        <div key={value} className="flex items-center space-x-2">
                          <Checkbox id={value} checked={formData.interests.includes(value)} onCheckedChange={(checked) => handleInterestChange(value, checked as boolean)} />
                          <label htmlFor={value} className="text-sm cursor-pointer">{t.demoForm.interests[index]}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">{t.demoForm.deadline}</Label>
                    <Input id="deadline" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} placeholder={t.demoForm.deadlinePlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.demoForm.message}</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t.demoForm.messagePlaceholder} rows={4} />
                  </div>
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="gdpr" checked={formData.consentGdpr} onCheckedChange={(checked) => setFormData({ ...formData, consentGdpr: checked as boolean })} required />
                      <label htmlFor="gdpr" className="text-sm leading-relaxed cursor-pointer">{t.demoForm.gdpr}</label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="newsletter" checked={formData.consentNewsletter} onCheckedChange={(checked) => setFormData({ ...formData, consentNewsletter: checked as boolean })} />
                      <label htmlFor="newsletter" className="text-sm leading-relaxed cursor-pointer">{t.demoForm.newsletter}</label>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="button" variant="hero-outline" size="lg" className="sm:w-auto" onClick={() => setStep(1)} disabled={isLoading}>
                      <ArrowLeft className="mr-2 h-5 w-5" /> {t.demoForm.back}
                    </Button>
                    <Button type="submit" variant="hero" size="lg" className="flex-1" disabled={isLoading}>
                      {isLoading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />{t.demoForm.sending}</>) : (<><Send className="mr-2 h-5 w-5" />{t.demoForm.submit}</>)}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DemoForm;
