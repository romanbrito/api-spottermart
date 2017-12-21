import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  BusinessName: {
    type: String,
    required: true
  },
  img: {
    data: Buffer, contentType: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

export default mongoose.model('asset', AssetSchema);