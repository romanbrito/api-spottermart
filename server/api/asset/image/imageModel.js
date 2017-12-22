import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema ({
  img: {
    data: Buffer, contentType: String
  },
  Business: {
    type: Schema.Types.ObjectId,
    ref: 'asset',
    //required: true
  }
});

export default mongoose.model('image', ImageSchema);