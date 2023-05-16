const express = require('express')

// Call express router to be able to Route requests to correct Controller.
const router = express.Router()

const { getNotes, setNote, putNote, deleteNote } = require('../controllers/noteController')

// Middleware protect function that runs before the Route function is run, to check login token is present. 
const { protect } = require('../middleware/authMiddleware')

// Routes data for same route to multiple Controllers for different request types. 
router.route('/').get(protect, getNotes).post(protect, setNote)
router.route('/:id').post(protect, putNote).delete(protect, deleteNote)

module.exports = router