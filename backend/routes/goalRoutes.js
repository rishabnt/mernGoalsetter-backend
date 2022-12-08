const express = require('express')

// Call express router to be able to Route requests to correct Controller.
const router = express.Router()

const { getGoals, setGoal, putGoal, deleteGoal } = require('../controllers/goalController')

// Middleware protect function that runs before the Route function is run, to check login token is present. 
const { protect } = require('../middleware/authMiddleware')

// Routes data for same route to multiple Controllers for different request types. 
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').post(protect, putGoal).delete(protect, deleteGoal)

module.exports = router