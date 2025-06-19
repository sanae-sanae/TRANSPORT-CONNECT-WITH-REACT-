import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: true,
      trim: true
    },
    lastName: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: { 
      type: String, 
      trim: true
    },
    password: { 
      type: String, 
      select: false
    },
    role: {
      type: String,
      enum: ['shipper', 'driver', 'admin'],
      default: 'shipper',
      required: true
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    rating: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5
    },
    googleId: { 
      type: String, 
      select: false 
    },
    githubId: { 
      type: String, 
      select: false 
    },
    method: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local'
    },
    verificationOTP: String,
    otpExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { 
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.googleId;
        delete ret.githubId;
        delete ret.verificationOTP;
        delete ret.otpExpiry;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpires;
        return ret;
      }
    }
  }
);

userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model('User', userSchema);