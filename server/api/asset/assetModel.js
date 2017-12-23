import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  BusinessName: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'image',
    //required: true
  }
});

export default mongoose.model('asset', AssetSchema);