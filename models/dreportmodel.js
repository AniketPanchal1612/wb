const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
  date: { type: String, unique: true }, // Unique date for each daily report
  totalSessions: { type: Number, default: 0 }, // Total number of sessions for the day
  totalCount: { type: Number, default: 0 },
  totalPerfectCount: { type: Number, default: 0 }, // Total perfect counts for all sessions
  totalWithoutCapCount: { type: Number, default: 0 }, // Total without cap counts for all sessions
  totalWithoutLabelCount: { type: Number, default: 0 }, // Total without label counts for all sessions
  totalWithoutBothCount: { type: Number, default: 0 }, // Total without cap and label counts for all sessions
});

const DailyReport = mongoose.model('DailyReport', dailyReportSchema);

module.exports = DailyReport;
