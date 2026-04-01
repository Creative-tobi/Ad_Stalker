const getCampaignInsights = (metrics, campaign) => {
  const insights = [];
  const { ctr, cpc, roi } = metrics;

  if (ctr < 1.0) insights.push("Low CTR: Ad creative needs improvement.");
  if (cpc > 3.0) insights.push("High CPC: Narrow your target audience.");
  if (roi < 0)
    insights.push("Negative ROI: Campaign is currently unprofitable.");
  if (roi > 200) insights.push("High ROI: Scalable opportunity detected.");

  let status = "Average";
  if (roi > 100 && ctr > 1.5) status = "Good";
  if (roi < 0) status = "Poor";

  return {
    insights: insights.length ? insights : ["Stable performance."],
    status,
  };
};

module.exports = { getCampaignInsights };
