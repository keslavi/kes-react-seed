import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  song: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    artist: {
      type: String,
      required: true,
      trim: true
    },
    notes: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: Number,
    default: 0
  },
  tip: {
    amount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'refunded'],
      default: 'pending'
    }
  },
  performerNotes: String,
  completedAt: Date
}, {
  timestamps: true
});

// Indexes for efficient querying
requestSchema.index({ show: 1, user: 1 });
requestSchema.index({ status: 1, createdAt: -1 });

// Method to check if request can be modified
requestSchema.methods.canBeModified = function() {
  return ['pending', 'approved'].includes(this.status);
};

// Method to get public request data
requestSchema.methods.toPublic = function() {
  return {
    id: this._id,
    show: this.show,
    user: this.user,
    song: this.song,
    status: this.status,
    priority: this.priority,
    tip: {
      amount: this.tip.amount,
      status: this.tip.status
    },
    performerNotes: this.performerNotes,
    completedAt: this.completedAt,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

export const Request = mongoose.model('Request', requestSchema); 