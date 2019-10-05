const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dayreportSchema = new Schema(
  {
    restaurant: { type: Schema.Types.ObjectId, ref: "owner" },
    date: Date,
    open: Boolean,
    timeslots: Schema.Types.Mixed,
    weekdays: Schema.Types.Mixed,
    tables: Schema.Types.Mixed
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const DayReport = model("DayReport", dayreportSchema);

module.exports = DayReport;
