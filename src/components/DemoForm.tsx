import { useState, FormEvent } from "react";
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
import { Loader2, Send } from "lucide-react";

const WEBHOOK_URL = "https://hook.make.com/TVOJ_WEBHOOK";
const CTA_EMAIL = "auto.mind.ai2025@gmail.com";
const CTA_PHONE = "0995085933";

const DemoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    budget: "",
    interests: [] as string[],
    deadline: "",
    message: "",
    consentGdpr: false,
    consentNewsletter: false,
  });

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.consentGdpr) {
      toast.error("Morate prihvatiti uvjete zaštite podataka");
      return;
    }

    setIsLoading(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
      };

      const payload = {
        source: "lovable",
        client_id: "AUTOMIND",
        page_url: window.location.href,
        utm: utmData,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: formData.industry,
        budget: formData.budget,
        interests: formData.interests,
        deadline: formData.deadline,
        message: formData.message,
        consent_gdpr: formData.consentGdpr,
        consent_newsletter: formData.consentNewsletter,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Hvala! Upit je poslan ✅", {
          description: "Kontaktirat ćemo vas u najkraćem mogućem roku.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          industry: "",
          budget: "",
          interests: [],
          deadline: "",
          message: "",
          consentGdpr: false,
          consentNewsletter: false,
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      toast.error(`Greška! Pošaljite e-mail na ${CTA_EMAIL}`, {
        description: "Ispričavamo se zbog neugodnosti.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 md:py-32 relative bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-4">
            Zatraži <span className="gradient-text">demo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ispunite formu i naš tim će vas kontaktirati u roku 24h
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-2xl space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ime i prezime *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Vaše ime"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="vas@email.com"
                />
              </div>
            </div>

            {/* Phone & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+385 91 000 0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Tvrtka *</Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Naziv tvrtke"
                />
              </div>
            </div>

            {/* Industry & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="industry">Djelatnost *</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberite djelatnost" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Maloprodaja</SelectItem>
                    <SelectItem value="services">Usluge</SelectItem>
                    <SelectItem value="it">IT/Tehnologija</SelectItem>
                    <SelectItem value="manufacturing">Proizvodnja</SelectItem>
                    <SelectItem value="healthcare">Zdravstvo</SelectItem>
                    <SelectItem value="education">Obrazovanje</SelectItem>
                    <SelectItem value="other">Ostalo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budžet *</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberite budžet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (49€/mj)</SelectItem>
                    <SelectItem value="pro">Pro (149€/mj)</SelectItem>
                    <SelectItem value="premium">Premium (299€/mj)</SelectItem>
                    <SelectItem value="custom">Prilagođeno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label>Što vas zanima? *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "chat", label: "Chat bot" },
                  { value: "voice", label: "Voice bot" },
                  { value: "ponude", label: "Auto-ponude" },
                  { value: "crm", label: "CRM" },
                  { value: "email", label: "E-mail sekvence" },
                ].map((interest) => (
                  <div key={interest.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest.value}
                      checked={formData.interests.includes(interest.value)}
                      onCheckedChange={(checked) => handleInterestChange(interest.value, checked as boolean)}
                    />
                    <label htmlFor={interest.value} className="text-sm cursor-pointer">
                      {interest.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">Željeni rok implementacije</Label>
              <Input
                id="deadline"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                placeholder="npr. odmah, za 2 tjedna, sljedeći mjesec..."
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Dodatna poruka</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Opišite vaše potrebe ili postavite pitanje..."
                rows={4}
              />
            </div>

            {/* Consents */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="gdpr"
                  checked={formData.consentGdpr}
                  onCheckedChange={(checked) => setFormData({ ...formData, consentGdpr: checked as boolean })}
                  required
                />
                <label htmlFor="gdpr" className="text-sm leading-relaxed cursor-pointer">
                  Prihvaćam uvjete zaštite podataka i suglasan sam da me Automind kontaktira vezano uz moj upit. *
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.consentNewsletter}
                  onCheckedChange={(checked) => setFormData({ ...formData, consentNewsletter: checked as boolean })}
                />
                <label htmlFor="newsletter" className="text-sm leading-relaxed cursor-pointer">
                  Želim primati newsletter s novostima i ponudama.
                </label>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Šaljem...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Pošalji upit
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DemoForm;
