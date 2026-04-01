import React from "react";
import { Loader2 } from "lucide-react";

export default function ConnectAccounts({ onConnect, isLoading }) {
  return (
    <button
      disabled={isLoading}
      onClick={onConnect}
      className="flex items-center gap-3 px-10 py-5 bg-[#1877F2] text-white rounded-3xl font-black shadow-2xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <h1>facebook</h1>
      )}
      {isLoading ? "Synchronizing Data..." : "Connect Meta Ads"}
    </button>
  );
}
