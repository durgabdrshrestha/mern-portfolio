import DailyAnalytics from "../models/DailyAnalytics.js";

const dateKey = (date) => date.toISOString().slice(0, 10);

export const recordPageView = async (req, res) => {
  try {
    const date = dateKey(new Date());
    await DailyAnalytics.updateOne(
      { date },
      { $inc: { pageViews: 1 }, $setOnInsert: { date } },
      { upsert: true }
    );

    res.status(204).end();
  } catch (error) {
    console.error("Record page view error:", error.message);
    res.status(500).json({ success: false, message: "Unable to record page view" });
  }
};

export const getAnalyticsSummary = async (req, res) => {
  try {
    const today = dateKey(new Date());
    const startDate = dateKey(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000));
    const daily = await DailyAnalytics.find({ date: { $gte: startDate, $lte: today } })
      .sort({ date: 1 })
      .select("date pageViews -_id")
      .lean();
    const pageViewsLast30Days = daily.reduce((total, item) => total + item.pageViews, 0);

    res.status(200).json({
      success: true,
      summary: {
        pageViewsToday: daily.find((item) => item.date === today)?.pageViews || 0,
        pageViewsLast30Days,
        dailyAverage: Math.round((pageViewsLast30Days / 30) * 10) / 10,
      },
      daily,
    });
  } catch (error) {
    console.error("Get analytics summary error:", error.message);
    res.status(500).json({ success: false, message: "Unable to load analytics" });
  }
};