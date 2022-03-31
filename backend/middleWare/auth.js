const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("on est là auth");

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId; // récupère l'id du token
    if (req.body.userId && req.body.userId !== userId) {
      // compare l'id du token avec l'id utilisateur
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
