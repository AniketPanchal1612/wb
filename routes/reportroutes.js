const express = require('express');
const router = express.Router();
const reportController = require("../controller/reportlogic")

// Route for creating a new report
router.post('/createreport', reportController.createReport);
router.get('/get-sessions-reports',reportController.getAllSessionReports)
router.get('/get-daily-reports',reportController.getAllDailyReports)
router.get('/get-session-report/:id',reportController.getSessionReportById)
router.get('/get-daily-report/:id',reportController.getDailyReportById)
router.post('/session-report-by-date',reportController.getSessionReportsByDateRange)
router.post('/daily-report-by-date',reportController.getDailyReportsByDateRange)



module.exports = router;