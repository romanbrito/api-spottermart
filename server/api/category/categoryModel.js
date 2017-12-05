import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model('category', CategorySchema);

