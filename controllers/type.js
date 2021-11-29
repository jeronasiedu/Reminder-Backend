import Type from '../db/models/Type.js'
import Note from '../db/models/Note.js'
import handler from 'express-async-handler'
import customError from '../errors/customError.js'
// create type
const createType = handler(async (req, res) => {
  const { name } = req.body
  req.body.createdBy = req.user.userID
  if (!name) {
    throw new customError('Provide type', 400)
  }
  const type = await Type.create(req.body)
  return res.status(201).json({
    type,
  })
})
// get types
const getTypes = handler(async (req, res) => {
  const createdBy = req.user.userID
  const types = await Type.find({ createdBy })
  return res.status(200).json({
    types,
  })
})

const deleteType = handler(async (req, res) => {
  const createdBy = req.user.userID
  const { id } = req.body
  if (!id) {
    throw new customError('Provide id', 400)
  }
  const deletedType = await Type.findByIdAndDelete(id, { new: true })
  const deletedNote = await Note.deleteMany(
    { type: id, createdBy },
    { new: true }
  )

  if (!deletedType) {
    throw new customError(`No type found for id ${id}`)
  }
  if (!deletedNote) {
    console.log(deletedNote)
    throw new customError(`We couldn't delete the notes for this  type`)
  }
  return res.status(200).json({
    msg: 'Type deleted with all its notes',
  })
})
export { createType, getTypes, deleteType }
