const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dayreportSchema = new Schema(
  {
    Date: Date,
    timeslots: Array,
    tables: { type: Schema.Types.ObjectId, ref: "Table" }
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
