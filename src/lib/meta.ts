declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

interface MetaPixelFunction {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: MetaPixelFunction;
}

export const META_PIXEL_ID = "1813054276548528";
export const COOKIE_CONSENT_KEY = "cookie_consent";

export const initMetaPixel = () => {
  if (typeof window === "undefined" || window.fbq) return;
  try {
    if (localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted") return;
  } catch {
    return;
  }

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as MetaPixelFunction;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
};

export const trackMetaLead = (source: "demo_form" | "book_call") => {
  initMetaPixel();
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: source });
  }
};
