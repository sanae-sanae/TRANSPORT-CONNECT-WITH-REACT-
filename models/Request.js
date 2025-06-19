import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Announcement',
      required: true
    },
    shipper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    packageDetails: {
      dimensions: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
      },
      weight: { type: Number, required: true },
      type: { 
        type: String,
        enum: ['general', 'fragile', 'perishable', 'hazardous'],
        default: 'general'
      },
      description: String
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);
requestSchema.virtual('shipperDetails', {
  ref: 'User',
  localField: 'shipper',
  foreignField: '_id',
  justOne: true,
  select: 'firstName lastName email phone rating'
});
requestSchema.virtual('announcementDetails', {
  ref: 'Announcement',
  localField: 'announcement',
  foreignField: '_id',
  justOne: true,
  select: 'departure destination driver departureDate'
});
requestSchema.index({ shipper: 1, status: 1 });
requestSchema.index({ announcement: 1, status: 1 });

export default mongoose.model('Request', requestSchema);