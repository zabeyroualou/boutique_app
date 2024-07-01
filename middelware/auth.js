const jwt = require('jsonwebtoken');
const secretKey = 'votre_clé_secrète'; // Assurez-vous que cela correspond à votre clé secrète

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;