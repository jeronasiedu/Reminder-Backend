import JWT from 'jsonwebtoken'
const authenticate = async (req, res, next) => {
  const authHeaders = req.headers.authorization
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    return res.status(401).json({
      msg: 'Invalid token',
    })
  }
  try {
    const token = authHeaders.split(' ')[1]
    const decoded = JWT.verify(token, process.env.JWT_SECRET)
    req.user = {
      userID: decoded.userID,
      username: decoded.username,
      email: decoded.email,
    }
    next()
  } catch (error) {
    res.status(401).json({
      msg: 'Invalid token',
    })
  }
}
export default authenticate
