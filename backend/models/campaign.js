class Campaign {
  constructor({ name, adSpend, clicks, impressions, conversions, revenue }) {
    this.id = Date.now();
    this.name = name || "Untitled Campaign";
    this.adSpend = Number(adSpend) || 0;
    this.clicks = Number(clicks) || 0;
    this.impressions = Number(impressions) || 0;
    this.conversions = Number(conversions) || 0;
    this.revenue = Number(revenue) || 0;
    this.createdAt = new Date();
  }
}

module.exports = Campaign;
