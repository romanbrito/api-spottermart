import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: {
    type:String,
    required:true
  },
  // array of ids from the users
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

export default mongoose.model('message', MessageSchema);