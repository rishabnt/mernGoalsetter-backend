const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)

// Add MW Protect function as second parameter to protect this route. Not needed for Register and Login as user doesn't need to login for these. 
router.get('/me', protect, getMe)

module.exports = router