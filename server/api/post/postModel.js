import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  text: {
    type:String,
    required:true
  },
  // array of ids from the users
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  categories: [ // array of objectIds
    {type: Schema.Types.ObjectId, ref: 'category'}
    ]
});

export default mongoose.model('post', PostSchema);