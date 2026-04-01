import React from "react";
import { DollarSign, MousePointer2, Target, TrendingUp } from "lucide-react";

const Card = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
    </div>
    <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
      <Icon size={24} />
    </div>
  </div>
);

export default function KPICards({ campaigns }) {
  const totals = campaigns.reduce(
    (acc, curr) => ({
      spend: acc.spend + curr.adSpend,
      rev: acc.rev + curr.revenue,
      clicks: acc.clicks + curr.clicks,
    }),
    { spend: 0, rev: 0, clicks: 0 },
  );

  const avgRoi =
    totals.spend > 0
      ? (((totals.rev - totals.spend) / totals.spend) * 100).toFixed(1)
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        title="Ad Spend"
        value={`$${totals.spend.toLocaleString()}`}
        icon={DollarSign}
        color="bg-blue-600"
      />
      <Card
        title="Revenue"
        value={`$${totals.rev.toLocaleString()}`}
        icon={TrendingUp}
        color="bg-emerald-500"
      />
      <Card
        title="Total Clicks"
        value={totals.clicks.toLocaleString()}
        icon={MousePointer2}
        color="bg-indigo-500"
      />
      <Card
        title="Avg ROI"
        value={`${avgRoi}%`}
        icon={Target}
        color="bg-violet-600"
      />
    </div>
  );
}
