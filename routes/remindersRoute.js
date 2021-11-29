import express from 'express'
const router = express.Router()
import { getNotes, createNote, deleteNote } from '../controllers/note.js'
import { getTypes, createType, deleteType } from '../controllers/type.js'
// NOTE
router.get('/getNotes', getNotes)
router.post('/createNote', createNote)
router.delete('/deleteNote', deleteNote)
// NOTE TYPE
router.get('/getTypes', getTypes)
router.post('/createType', createType)
router.delete('/deleteType', deleteType)

export default router
