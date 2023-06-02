const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.token;
  if (!token)
    return res.status(400).send({
      data: { success: false, message: "No Token Provided" },
      errorNode: { errorCode: 1, errorMsg: "No Token Provided" },
    });
  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data;
    next();
  } catch (err) {
    return res.status(400).send({
      data: { success: false, message: "Invalid Token" },
      errorNode: { errorCode: 2, errorMsg: "Invalid Token" },
    });
  }
};
