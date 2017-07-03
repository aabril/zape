import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  imagefile: { type: Object, required: true}
}, {timestamps: true});

ImageSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.__v;
  }
});

export default mongoose.model('Image', ImageSchema)