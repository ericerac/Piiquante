const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
      console.log("on est là auth");
      //console.log(userId);

    const token = req.headers.authorization.split(' ')[1]; // récupère le token dans le header
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décrypte le token
    const userId = decodedToken.userId; // récupère l'id du token
    if (req.body.userId && req.body.userId !== userId) { // compare l'id du token avec l'id utilisateur
      throw 'Invalid user ID';
    } else {
      next();  // si Id identhique passe au middleware suivant " la route est protégée"
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};