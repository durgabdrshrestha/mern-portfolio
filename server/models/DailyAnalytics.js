import mongoose from "mongoose";

const dailyAnalyticsSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    pageViews: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

const DailyAnalytics = mongoose.model("DailyAnalytics", dailyAnalyticsSchema);

export default DailyAnalytics;