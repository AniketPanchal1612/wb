const mongoose = require ('mongoose');

const reportSchema = new mongoose.Schema({
  eventType:{type:String},
  sTime: {type:String},
  eTime:{type:String},
  date:{type:String},
  perfectCount: { type: Number, default: 0 },
  totalCount: { type: Number, default: 0 },
  withoutCapCount: { type: Number, default: 0 },
  withoutLabelCount: { type: Number, default: 0 },
  withoutBothCount: { type: Number, default: 0 }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
