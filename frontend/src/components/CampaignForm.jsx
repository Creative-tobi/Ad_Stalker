import React, { useState } from "react";
import { Plus, X, Save, BarChart3 } from "lucide-react";
import { campaignService } from "../services/api";

export default function CampaignForm({ onRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    adSpend: "",
    revenue: "",
    clicks: "",
    impressions: "",
    conversions: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await campaignService.create(form);
    setLoading(false);
    setIsOpen(false);
    onRefresh();
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-lg">
        <Plus size={18} strokeWidth={3} /> New Scenario
      </button>
    );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full p-10 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Simulation
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-slate-400">
              Campaign Name
            </label>
            <input
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-slate-400">
                Spend ($)
              </label>
              <input
                type="number"
                required
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                value={form.adSpend}
                onChange={(e) => setForm({ ...form, adSpend: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-slate-400">
                Revenue ($)
              </label>
              <input
                type="number"
                required
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                value={form.revenue}
                onChange={(e) => setForm({ ...form, revenue: e.target.value })}
              />
            </div>
          </div>
          {/* Repeat for other fields as needed */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition flex justify-center gap-2">
            {loading ? (
              "Processing..."
            ) : (
              <>
                <Save size={20} /> Build Scenario
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
