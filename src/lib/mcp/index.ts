import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getAdAccount from "./tools/get-ad-account";
import listCampaigns from "./tools/list-campaigns";
import getCampaignInsights from "./tools/get-campaign-insights";
import getCampaignDetails from "./tools/get-campaign-details";
import listAdSets from "./tools/list-ad-sets";
import setCampaignStatus from "./tools/set-campaign-status";
import setCampaignDailyBudget from "./tools/set-campaign-daily-budget";
import setAdSetStatus from "./tools/set-ad-set-status";
import setAdSetDailyBudget from "./tools/set-ad-set-daily-budget";

// Direct Supabase auth issuer (never the .lovable.cloud proxy).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "automind-ai-agents",
  title: "automind-ai-agents",
  version: "0.2.0",
  instructions:
    "Private Automind tools for the Meta ad account act_336967666. The account is private and access is limited to Automind admins. Read tools: get_ad_account, list_campaigns, get_campaign_details, list_ad_sets, get_campaign_insights. Write tools: set_campaign_status, set_campaign_daily_budget, set_ad_set_status, set_ad_set_daily_budget. Never call a write tool without an explicit, specific confirmation from the user naming the object and the new value; always show the current value first and pass confirmed=true only after that confirmation. Daily budgets are capped by a server-side hard cap. Creating new campaigns, ad sets or ads is not supported in this version.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    getAdAccount,
    listCampaigns,
    getCampaignDetails,
    listAdSets,
    getCampaignInsights,
    setCampaignStatus,
    setCampaignDailyBudget,
    setAdSetStatus,
    setAdSetDailyBudget,
  ],
});

