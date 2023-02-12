const validate = schema => async (req, res, next) => {
  const { value, error } = schema.validate(req.body)
  console.log(value)
  if (error) {
    console.log(error)

    if (error.details && error.details[0].message) {
      res.json(error.details[0].message)
      return
    } else {
      res.json({
        message: 'Please fill the form carefully ',
      })
      return
    }
  }
  // const user = await Object.assign(req, value)
  next()
}
module.exports = validate
