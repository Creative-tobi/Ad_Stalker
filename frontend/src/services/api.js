// src/services/api.js
const API_URL = "https://ad-stalker.onrender.com/api";

export const campaignService = {
  // GET: Fetch all campaigns with metrics and insights
  async getAll() {
    try {
      const res = await fetch(`${API_URL}/campaigns`);
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // POST: Add a new manual campaign
  async create(data) {
    try {
      const res = await fetch(`${API_URL}/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};
