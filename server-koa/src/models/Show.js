import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  performers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],
  settings: {
    allowRequests: {
      type: Boolean,
      default: true
    },
    maxRequestsPerUser: {
      type: Number,
      default: 3
    },
    requestDeadline: Date
  }
}, {
  timestamps: true
});

// Index for efficient querying
showSchema.index({ date: 1, status: 1 });
showSchema.index({ createdBy: 1 });

// Method to check if show is accepting requests
showSchema.methods.isAcceptingRequests = function() {
  if (!this.settings.allowRequests) return false;
  if (this.status !== 'published') return false;
  if (this.settings.requestDeadline && new Date() > this.settings.requestDeadline) return false;
  return true;
};

// Method to get public show data
showSchema.methods.toPublic = function() {
  return {
    id: this._id,
    name: this.name,
    date: this.date,
    location: this.location,
    description: this.description,
    status: this.status,
    performers: this.performers,
    settings: {
      allowRequests: this.settings.allowRequests,
      maxRequestsPerUser: this.settings.maxRequestsPerUser,
      requestDeadline: this.settings.requestDeadline
    },
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export const Show = mongoose.model('Show', showSchema); 