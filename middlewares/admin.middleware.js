const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

module.exports = async (req, res, next) => {
  const token = req.session.token;
  if (!token){
    req.flash("errors", "No Token Provided");
    return res.redirect('/auth/login');
  }
  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data;
    next();
  } catch (err) {
    req.flash("errors", "Invalid Token");
    return res.redirect('/auth/login');
  }
}
