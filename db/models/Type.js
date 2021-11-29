import mongoose from 'mongoose'
const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})
export default mongoose.model('Type', TypeSchema)
