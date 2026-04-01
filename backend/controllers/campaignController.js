const { calculateMetrics } = require("../utils/math");
const { getCampaignInsights } = require("../services/insightService");
const Campaign = require("../models/campaign");

// Mock Database
let campaigns = [
  new Campaign({
    name: "Search_Ads_Main",
    adSpend: 1000,
    clicks: 500,
    impressions: 10000,
    conversions: 20,
    revenue: 2500,
  }),
];

exports.getAllCampaigns = (req, res) => {
  try {
    const enriched = campaigns.map((c) => {
      const metrics = calculateMetrics(c);
      const { insights, status } = getCampaignInsights(metrics, c);
      return { ...c, metrics, insights, status };
    });
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCampaign = (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    campaigns.push(newCampaign);
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ error: "Invalid Data" });
  }
};
