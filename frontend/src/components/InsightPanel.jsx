import React from "react";
import { Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

export default function InsightPanel({ campaigns }) {
  return (
    <div className="space-y-4">
      {campaigns.map((camp) => (
        <div
          key={camp.id}
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-hover hover:border-blue-200">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-slate-800">{camp.name}</h4>
            <span
              className={`text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter ${
                camp.status === "Good"
                  ? "bg-green-100 text-green-700"
                  : camp.status === "Poor"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
              }`}>
              {camp.status}
            </span>
          </div>
          <ul className="space-y-2">
            {camp.insights.map((msg, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-slate-500 items-start">
                <Lightbulb
                  size={16}
                  className="text-blue-500 mt-0.5 shrink-0"
                />
                <span>{msg}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
