import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getAdAccount from "./tools/get-ad-account";
import listCampaigns from "./tools/list-campaigns";
import getCampaignInsights from "./tools/get-campaign-insights";

// Direct Supabase auth issuer (never the .lovable.cloud proxy).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "automind-ai-agents",
  title: "automind-ai-agents",
  version: "0.1.0",
  instructions:
    "Private, read-only Automind tools for the Meta ad account act_336967666. Access is limited to Automind admins. Use get_ad_account for account status, list_campaigns to find campaigns, and get_campaign_insights for performance metrics of a single campaign. No write, budget or spend operations are available.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getAdAccount, listCampaigns, getCampaignInsights],
});
