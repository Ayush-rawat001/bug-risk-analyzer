import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema({
  bugId: {
    type: String,
    required: true,
    unique: true
  },
  bugTitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  relatedProject: {
    type: String,
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  },
  riskScore: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Bug = mongoose.model('Bug', bugSchema);

export default Bug;

