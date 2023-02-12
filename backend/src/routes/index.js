const router = require('express').Router()
const userRoutes = require('./user.routes')
const journalRoutes = require('./journal.routes')
const postRoutes = require('../routes/post.routes')
const timelineRoutes = require('../routes/timeline.routes')
const { checkToken } = require('../middlewares/auth')

router.use('/user', userRoutes)
router.use('/journal', checkToken, journalRoutes)
router.use('/post', checkToken, postRoutes)
router.use('/timeline', timelineRoutes)
module.exports = router
