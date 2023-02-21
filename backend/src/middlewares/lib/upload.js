const multer = require('multer')
const path = require('path')
const fs = require('fs')

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['images/jpg', 'image/gif', 'image/jpeg', 'image/png']
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new Error('This photo type does not supported'), false)
  }
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename)
    fs.mkdirSync(path.join(rootDir, '/public/uploads'), { recursive: true })
    cb(null, path.join(rootDir, '/public/uploads'))
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    if (!req.savedImages) req.savedImages = []
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    req.savedImages = [...req.savedImages, path.join(file.fieldname + '-' + uniqueSuffix + '.' + extension)]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})

const upload = multer({ storage: storage, fileFilter: fileFilter }).array('images')

module.exports = upload
