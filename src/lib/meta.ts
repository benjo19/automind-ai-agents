declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackMetaLead = (source: "demo_form" | "book_call") => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: source });
  }
};
