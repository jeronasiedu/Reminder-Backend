import Note from '../db/models/Note.js'
import handler from 'express-async-handler'
import customError from '../errors/customError.js'
// create note
const createNote = handler(async (req, res) => {
  req.body.createdBy = req.user.userID
  const { text, type } = req.body
  if (!text || !type) {
    throw new customError(`Can't create an empty note`)
  }
  const note = await Note.create(req.body)
  return res.status(201).json({ note })
})

// Get notes
const getNotes = handler(async (req, res) => {
  const createdBy = req.user.userID
  const notes = await Note.find({ createdBy }).populate('type', 'name -_id')
  return res.status(200).json({ notes })
})
// delete note
const deleteNote = handler(async (req, res) => {
  const { id } = req.body
  if (!id) {
    throw new customError('Provide an id', 400)
  }
  const deletedNote = await Note.findByIdAndDelete(id)
  if (!deletedNote) {
    throw new customError(`No note found with id ${id}`)
  }
  return res.status(200).json({
    msg: 'Note has been removed successfully',
  })
})
export { getNotes, deleteNote, createNote }
