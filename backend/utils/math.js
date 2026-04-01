/**
 * Professional marketing math with safety guards
 */
const calculateMetrics = (campaign) => {
  const { adSpend, clicks, impressions, conversions, revenue } = campaign;

  const safeDiv = (n, d) => (d > 0 ? n / d : 0);

  const ctr = (safeDiv(clicks, impressions) * 100).toFixed(2);
  const cpc = safeDiv(adSpend, clicks).toFixed(2);
  const cpa = safeDiv(adSpend, conversions).toFixed(2);
  const roi = (safeDiv(revenue - adSpend, adSpend) * 100).toFixed(2);

  return {
    ctr: parseFloat(ctr),
    cpc: parseFloat(cpc),
    cpa: parseFloat(cpa),
    roi: parseFloat(roi),
  };
};

module.exports = { calculateMetrics };
