import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  active: {type: Boolean , default: false},
}, {timestamps: true});

ImageSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.__v;
  }
});

export default mongoose.model('Image', ImageSchema)