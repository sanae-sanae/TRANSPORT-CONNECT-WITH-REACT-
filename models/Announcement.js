import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    driver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    departure: { 
      type: String, 
      required: true,
      trim: true
    },
    destination: { 
      type: String, 
      required: true,
      trim: true
    },
    steps: [{ 
      type: String,
      trim: true
    }],
    maxDimensions: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true }
    },
    cargoType: { 
      type: String, 
      required: true,
      enum: ['general', 'fragile', 'perishable', 'hazardous', 'oversized']
    },
    availableCapacity: { 
      type: Number, 
      required: true,
      min: 1
    },
    departureDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'canceled'],
      default: 'active'
    },
    requests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request'
    }]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);
announcementSchema.virtual('driverDetails', {
  ref: 'User',
  localField: 'driver',
  foreignField: '_id',
  justOne: true,
  select: 'firstName lastName rating isVerified'
});
announcementSchema.index({ departure: 'text', destination: 'text' });
announcementSchema.index({ status: 1, departureDate: 1 });

export default mongoose.model('Announcement', announcementSchema);