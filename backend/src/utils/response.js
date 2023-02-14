class Response {
  constructor(data = null, message = null) {
    ;(this.data = data), (this.message = message)
  }
  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message || 'Successfull Process',
    })
  }
  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message || 'Successfully Created !',
    })
  }
  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message || 'Bad Request',
    })
  }
  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message || 'Unauthorized , Please Logged In ',
    })
  }
  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message || 'Requested Page Is Not Available',
    })
  }
  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message: this.data || 'To Many Request Slow Down !',
    })
  }
  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message || 'Internal Server Error',
    })
  }
}
module.exports = Response
