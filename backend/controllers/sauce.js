
const Sauce = require('../models/sauces');
const fs = require('fs');

const jwt = require('jsonwebtoken');
//---------------------------------------------------------
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // extrait 
    console.log(sauceObject);
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      // génère l'URL de l'image (Http: server images nom)
    });
    console.log(sauce);
    sauce.save()
      .then(() => res.status(201).json({ message: 'sauce  enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  };
//---------------------------------------------------------
  exports.getAllSauce =(req, res, next) => {
    Sauce.find(req.params.userId)
       .then(salsa => res.status(200).json(salsa))
       .catch(error => res.status(400).json({ error }));
   };
 
   exports.getOneSauce = (req, res, next) => { // cherche l'id de l'objet dans l'URL
     Sauce.findOne({_id: req.params.id})       // _id =  dans la base de données
                                               // req.params.Id = id de l'URL
       .then(salsa => {
           res.status(200).json(salsa);
         console.log(salsa);
     })
       .catch(error => res.status(404).json({ error }));
   };

//---------------------------------------------------------
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      // Récupère le token de la requête pour le comparer avec l'userId du créateur de la sauce
      const token = req.headers.authorization.split(" ")[1];
     console.log(req.body.userId, req.headers.authorization.split(" ")[1]);
     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décrypte le token
    const userId = decodedToken.userId; // récupère l'id du token
    console.log(req.body.userId, userId);
     // ------------------------------------------------------------------------------------
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                // 1º Arg objet à modifier 2º Arg nouvel objet modifié avec l'Id correspondant
      .then(() => res.status(200).json({ message: ' sauce  modifiée '}))
      .catch(error => res.status(400).json({ error }));
  };
//---------------------------------------------------------
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; // Pour récuprer le nom du fichier
        // 1-trouver l'URL du fichier 2- sectionner l'Url en deux autour du mot /image/ que contient l'Url
        // 3- Retourne un tableau de deux éléments, avec [1] on garde le deuxième qui est le nom
        fs.unlink(`images/${filename}`, () => { // fonction du pakage fs qui supprime le fichier
            // 1º argument Nom du fichier 2º callback qui supprime l'objet de la BDD
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Votre sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  
//---------------------------------------------------------

 exports.likeSauce =(req, res, next) => {
     
     console.log(req.body)
     
     Sauce.findOne({_id : req.params.id})
     
     .then(salsa =>{
      
        let user = req.body.userId;
        let like = (req.body.like);      
        let UsersLiked = salsa.usersLiked;   //  [salsa.usersLiked] 
        let UsersDisliked = salsa.usersDisliked;  //  [salsa.usersDisliked] 
       
        
         
         console.log(typeof(req.body.like));

         // like = 1 user pas present dans userliked-----
        if (like > 0 && !UsersLiked.includes(user)){
           console.log("like = 1");
           Sauce.updateOne(
             {_id : req.params.id},
             {
               $inc:{likes: 1},
               $push: {usersLiked:user},
             }
           ).then(res.status(200).json(salsa))
           .catch();
         }

         // like = 0 user present dans userliked-----

         if (like === 0 && UsersLiked.includes(user)){
           console.log("like = 0 L");
           Sauce.updateOne(
             {_id : req.params.id},
             {
               $inc:{likes: -1},
               $pull: {usersLiked:user},
             }
           ).then(res.status(200).json(salsa))
           .catch();
         }

         // like = 0 user present dans userDisliked-----

         if (like === 0 && UsersDisliked.includes(user)){
           console.log("like = 0 D");
           Sauce.updateOne(
             {_id : req.params.id},
             {
               $inc:{dislikes: -1},
               $pull: {usersDisliked:user},
             }
           ).then(res.status(200).json(salsa))
           .catch();
         }

          // like = - 1 user pas present dans userliked-----
          if (like < 0 && !UsersDisliked.includes(user)){
            console.log("like = -1");
            Sauce.updateOne(
              {_id : req.params.id},
              {
                $inc: {dislikes: 1},
                $push: {usersDisliked:user},
              }
            ).then(res.status(200).json(salsa))
            .catch();
          }
         
        res.status(200).json();
      })
      .catch(error => res.status(405).json({ error }));
    }


  const setLike = (user,like)=>{
     
   };

  const deleteLike = ()=>{
     Sauce.updateOne(
      {_id : req.params.id},
      {
      $inc: { likes: -1},
      $pull: { usersLiked:req.body.userId},
      }
      ).then(res.status(201).json(salsa))
      .catch(error => res.status(401).json({ error }));
    }