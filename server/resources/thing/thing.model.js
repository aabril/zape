import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ThingSchema = new Schema({
  active: {type: Boolean , default: false},
  name: {type: String , required: true},
  info: {type: String , required: true},
  user : { type: Schema.ObjectId, ref: 'User', required: true }
}, {timestamps: true});

ThingSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.__v;
  }
});

export default mongoose.model('Thing', ThingSchema)