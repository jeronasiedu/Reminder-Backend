class customError extends Error {
  constructor(message, status) {
    super(message)
    this.message = message
    this.status = status
  }
}
export default customError
