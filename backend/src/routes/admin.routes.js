const router = require('express').Router()
const { deneme } = require('../controllers/admin.controller')

router.post('/', deneme)
module.exports = router
