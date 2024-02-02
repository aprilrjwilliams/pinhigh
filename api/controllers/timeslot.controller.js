const TimeslotModel = require("../models/timeslot-schema");

exports.addTimeslot = async (req, res) => {
  const timeslot = new TimeslotModel({
    date: req.body.date,
    startTime: req.body.startTime,
    bay: req.body.bay,
    user_id: req.body.user_id,
  });
  console.log("in post ", timeslot);
  timeslot.save().then(() => {
    res.status(200).json({
      message: "Post submitted",
    });
  });
};

exports.getTimeslots = async (req, res, next) => {
  console.log('here')
  let timeslot = {};
  if (req.query.user_id) {
    timeslot = { user_id: req.query.user_id };
  } else if (req.query.bay) {
    timeslot = { date: req.query.date, bay: req.query.bay };
  } else {
    timeslot = { date: req.query.date };
  }

  console.log("new timeslot ", timeslot);

  TimeslotModel.find(timeslot)
    .then((data) => {
      console.log("data ", data);
      res.json({ timeslots: data });
    })
    .catch(() => {
      console.log("Error fetching timeslots");
    });
};

exports.deleteTimeslot = async (req, res) => {
  TimeslotModel.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Timeslot Deleted",
    });
  });
}
