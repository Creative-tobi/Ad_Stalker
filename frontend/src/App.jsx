import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  Link as LinkIcon,
  FileText,
  AlertCircle,
} from "lucide-react";
import { campaignService } from "./services/api";
import { exportToPDF } from "./utils/export";

// Components
import KPICards from "./components/KPICards";
import PerformanceChart from "./components/PerformanceChart";
import CampaignForm from "./components/CampaignForm";
import ConnectAccounts from "./components/ConnectAccounts";
import InsightPanel from "./components/InsightPanel";

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);

  // Load data from Backend
  const loadData = async () => {
    try {
      const data = await campaignService.getAll();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      setError("Server Unreachable. Ensure Backend is running on port 5000.");
    }
  };

  // Simulated Sync with "Real" Data
  const handleConnect = () => {
    setIsSyncing(true);
    setTimeout(async () => {
      await loadData();
      setIsConnected(true);
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-xl text-white">
              <LayoutGrid size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black">AdPulse Dashboard</h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                SaaS Analytics v1.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && (
              <>
                <button
                  onClick={() => exportToPDF("dashboard-content")}
                  className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm">
                  <FileText size={18} className="text-blue-500" /> Export PDF
                </button>
                <CampaignForm onRefresh={loadData} />
              </>
            )}
          </div>
        </header>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-8 flex items-center gap-3 border border-red-100 font-bold">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {!isConnected ? (
          /* Landing/Connection State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
              <LinkIcon size={40} />
            </div>
            <h2 className="text-4xl font-black mb-4">Connect Ad Accounts</h2>
            <p className="text-slate-500 mb-10 max-w-md text-lg leading-relaxed">
              Sync your real marketing performance data from Meta or Google to
              generate AI ROI insights instantly.
            </p>
            <ConnectAccounts onConnect={handleConnect} isLoading={isSyncing} />
          </div>
        ) : (
          /* Live Dashboard State */
          <div
            id="dashboard-content"
            className="animate-in fade-in duration-700">
            <KPICards campaigns={campaigns} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[500px]">
                <h3 className="text-lg font-black text-slate-800 mb-6">
                  Spend vs Revenue Analytics
                </h3>
                <PerformanceChart data={campaigns} />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  Optimization Insights
                </h3>
                <InsightPanel campaigns={campaigns} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
