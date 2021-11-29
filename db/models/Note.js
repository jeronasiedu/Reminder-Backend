import mongoose from 'mongoose'
const NoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'Type',
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
})
export default mongoose.model('Note', NoteSchema)
