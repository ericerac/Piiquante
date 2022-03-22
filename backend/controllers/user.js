
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');


const User = require('../models/user')
const jwt = require('jsonwebtoken');
const cryptoJs = require('crypto-js');


// -----------SIGNUP----------------

exports.signup = (req, res, next) => {
    console.log(req.body,"signup");
    User.findOne({email: req.body.email })
  .then(email =>{
console.log(email);

  bcrypt.hash(req.body.password, 8)  // 8 boucle de hash du password
  .then(hash =>{
    const user = new User({     // schema des données
      email: req.body.email,  // récupère l'email 
      password: hash         // récupère le password chiffré
    }); 
    user.save()
    .then(() => res.status(201).json({ message: 'Compte utilisateur crée' }))
    .catch(error => res.status(400).json({ error }));
  })
//}
  })
    .catch(error => res.status(500).json({ error }));
};


//------LOGIN-----------
  exports.login = (req, res, next) => {
console.log(req.body.email);
    
    User.findOne({ email: req.body.email}) // cherche l'utilisateur par son email dans la BDD
    
      .then(user => {
        if (!user) {     
          console.log("email pas trouvé ");              // si il n'existe pas renvoi l'erreur 401
          return res.status(401).json({ error: ' Compte utilisateur non trouvé !' });
        }
        // bcrypt compare les hash de la requête "1º argument" et de la BDD "2º argument"
        bcrypt.compare(req.body.password, user.password) // return boolean
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '12h' }
                )
              });
          })
          .catch(error => res.status(500).json({ error }));

      })
      .catch(error => res.status(500).json({ error })); // problème de serveur
  };


  