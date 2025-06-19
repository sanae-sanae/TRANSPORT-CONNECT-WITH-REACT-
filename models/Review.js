import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
      required: true
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Announcement',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500
    },
    roleContext: {
      type: String,
      enum: ['driver', 'shipper'],
      required: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
reviewSchema.virtual('reviewer', {
  ref: 'User',
  localField: 'fromUser',
  foreignField: '_id',
  justOne: true,
  select: 'firstName lastName avatar'
});
reviewSchema.virtual('recipient', {
  ref: 'User',
  localField: 'toUser',
  foreignField: '_id',
  justOne: true,
  select: 'firstName lastName'
});
reviewSchema.virtual('requestDetails', {
  ref: 'Request',
  localField: 'request',
  foreignField: '_id',
  justOne: true,
  select: 'createdAt status'
});
reviewSchema.virtual('announcementDetails', {
  ref: 'Announcement',
  localField: 'announcement',
  foreignField: '_id',
  justOne: true,
  select: 'departure destination departureDate'
});
reviewSchema.index({ fromUser: 1, request: 1 }, { unique: true });
reviewSchema.index({ toUser: 1, createdAt: -1 });
reviewSchema.index({ roleContext: 1, rating: 1 });
reviewSchema.pre('save', async function(next) {
  if (!this.roleContext) {
    const fromUser = await User.findById(this.fromUser);
    if (fromUser) {
      this.roleContext = fromUser.role;
    }
  }
  next();
});
reviewSchema.statics.getAverageRating = async function(userId) {
  const result = await this.aggregate([
    { $match: { toUser: userId } },
    { $group: { _id: null, averageRating: { $avg: "$rating" } } }
  ]);
  
  return result[0]?.averageRating || 0;
};
reviewSchema.post('save', async function(doc) {
  const User = mongoose.model('User');
  const averageRating = await doc.constructor.getAverageRating(doc.toUser);
  
  await User.findByIdAndUpdate(doc.toUser, { 
    rating: parseFloat(averageRating.toFixed(1)) 
  });
});
reviewSchema.post('remove', async function(doc) {
  const User = mongoose.model('User');
  const averageRating = await doc.constructor.getAverageRating(doc.toUser);
  
  await User.findByIdAndUpdate(doc.toUser, { 
    rating: parseFloat(averageRating.toFixed(1)) 
  });
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;