const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const User = require('../models/userModel')

//@desc Get goals
//@route GET /api/goals
//@access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({user: req.user.id})
  res.status(200).json(notes)
})

//@desc Set goal
//@route SET /api/goals
//@access Private
const setNote = asyncHandler(async (req, res) => {

  if(!req.body.text && !req.body.audioText) {
    res.status(400)
    throw new Error('Please add text or a recording')
  }

  const note = await Note.create({
    text: req.body.text ? req.body.text : '', 
    audioText: req.body.audioText ? req.body.audioText : '',
    user: req.user.id,
  })

  res.status(200).json(note)
})

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const putNote = asyncHandler(async (req, res) => {
  if(!req.body.text && !req.body.audioText) {
    res.status(400)
    throw new Error('Please add text or a recording')
  }

  const note = await Note.findById(req.params.id)

  if(!note) {
    res.status(400)
    throw new Error("Note not found")
  }

  //Check for user
  if(!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the goal user
  if(note.user.toString() !== req.user.id) {
    res.status(401) 
    throw new Error("User not authorized")
  }
  // console.log(req.body)
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedNote)
})

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if(!note) {
    res.status(400)
    throw new Error("Note not found")
  }

  //Check for user
  if(!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the goal user
  if(note.user.toString() !== req.user.id) {
    res.status(401) 
    throw new Error("User not authorized")
  }

  const deletedNote = await Note.deleteOne(note)

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getNotes, setNote, putNote, deleteNote
}