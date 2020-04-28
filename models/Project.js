const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: 'owner' },
  name: String,
  id: String,
  owned: Boolean,
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
