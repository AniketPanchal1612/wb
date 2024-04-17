const Report = require('../models/reportmodel');
const DailyReport = require('../models/dreportmodel')
// Controller function to create a new report
exports.createReport = async (req, res) => {
  try {
    const { eventType, sTime, date } = req.body;

    if (eventType === 'start') {
      // Create a new report
      const report = new Report(req.body);
      await report.save();
      console.log('Report saved:', report);

      // Increment the total sessions count in daily report
      let dailyReport = await DailyReport.findOne({ date });
      if (!dailyReport) {
        dailyReport = new DailyReport({ date });
      }
      dailyReport.totalSessions += 1;
      await dailyReport.save();

      res.status(201).json({ message: 'Report saved successfully' });
    } else if (eventType === 'stop') {
      // Update an existing report
      const existingReport = await Report.findOne({ sTime, date });
      if (!existingReport) {
        return res.status(404).json({ error: 'Report not found' });
      }

      // Update counters
      existingReport.eTime = req.body.eTime || existingReport.eTime;
      existingReport.perfectCount = req.body.perfectCount || existingReport.perfectCount;
      existingReport.totalCount = req.body.totalCount || existingReport.totalCount;
      existingReport.withoutCapCount = req.body.withoutCapCount || existingReport.withoutCapCount;
      existingReport.withoutLabelCount = req.body.withoutLabelCount || existingReport.withoutLabelCount;
      existingReport.withoutBothCount = req.body.withoutBothCount || existingReport.withoutBothCount;
      existingReport.eventType = 'stop';

      await existingReport.save();
      console.log('Report updated:', existingReport);

      // Update daily report counts
      let dailyReport = await DailyReport.findOne({ date });
      if (!dailyReport) {
        return res.status(404).json({ error: 'Daily report not found for the session date' });
      }

      dailyReport.totalPerfectCount += existingReport.perfectCount;
      dailyReport.totalCount += existingReport.totalCount;
      dailyReport.totalWithoutCapCount += existingReport.withoutCapCount;
      dailyReport.totalWithoutLabelCount += existingReport.withoutLabelCount;
      dailyReport.totalWithoutBothCount += existingReport.withoutBothCount;
      await dailyReport.save();

      res.status(200).json({ message: 'Report updated successfully' });
    } else {
      res.status(400).json({ error: 'Invalid eventType' });
    }
  } catch (err) {
    console.error('Error saving/updating report:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.getAllDailyReports = async (req, res) => {
  try {
    const dailyReports = await DailyReport.find();
    res.status(200).json(dailyReports);
  } catch (err) {
    console.error('Error fetching daily reports:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get all session reports
exports.getAllSessionReports = async (req, res) => {
  try {
    const sessionReports = await Report.find();
    res.status(200).json(sessionReports);
  } catch (err) {
    console.error('Error fetching session reports:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getDailyReportById = async (req, res) => {
  try {
    const dailyReport = await DailyReport.findById(req.params.id);
    if (!dailyReport) {
      return res.status(404).json({ error: 'Daily report not found' });
    }
    res.status(200).json(dailyReport);
  } catch (err) {
    console.error('Error fetching daily report:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a single session report by ID
exports.getSessionReportById = async (req, res) => {
  try {
    const sessionReport = await Report.findById(req.params.id);
    if (!sessionReport) {
      return res.status(404).json({ error: 'Session report not found' });
    }
    res.status(200).json(sessionReport);
  } catch (err) {
    console.error('Error fetching session report:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get session reports by date range
exports.getSessionReportsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    
    // Check if both start date and end date are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Both start date and end date are required' });
    }
    
    // Find session reports within the specified date range
    const sessionReports = await Report.find({
      date: { $gte: startDate, $lte: endDate },
    });
    
    res.status(200).json(sessionReports);
  } catch (err) {
    console.error('Error fetching session reports by date range:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller function to get daily reports by date range
exports.getDailyReportsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    
    // Check if both start date and end date are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Both start date and end date are required' });
    }
    
    // Find daily reports within the specified date range
    const dailyReports = await DailyReport.find({
      date: { $gte: startDate, $lte: endDate },
    });
    
    res.status(200).json(dailyReports);
  } catch (err) {
    console.error('Error fetching daily reports by date range:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
