const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema(
  {
    dayreport: { type: Schema.Types.ObjectId, ref: "DayReport" },
    tablenumber: String,
    tablecapacity: Number,
    timeslots: Object,
    date: Date
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
