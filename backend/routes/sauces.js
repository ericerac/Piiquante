const express = require('express');
const router = express.Router();
const sauceControl = require('../controllers/sauce')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

// Création et sauvegarde  dans la base de données
 router.post('/', auth, multer, sauceControl.createSauce);
 // mettre auth au debut

 // comptage des like
 router.post('/:id/like', auth, sauceControl.likeSauce)

// modifier 
 router.put('/:id', auth, multer, sauceControl.modifySauce);

// Supprimer 
 router.delete('/:id', auth, sauceControl.deleteSauce );

 // renvoi le tableau de toute les sauces
 router.get('/', auth, sauceControl.getAllSauce);

 // renvoi une sauce précise définie par son Id
 router.get('/:id', auth, sauceControl.getOneSauce);

module.exports = router;