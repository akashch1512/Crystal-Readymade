import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const AddressSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = model('Address', AddressSchema);

export default Address;