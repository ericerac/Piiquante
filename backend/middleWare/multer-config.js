const multer = require('multer');

const MIME_TYPES = {  // dico des extensions images possibles 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // requête, fichier, callback
    callback(null, 'images');    // nom du dossier
  },
  filename: (req, file, callback) => {    // requête, fichier, callback
    const name = file.originalname.split(' ').join('_');  // nom d'origine du fichier
                                // "split et join" remplace d'éventuels espace dans le nom du fichier
    const extension = MIME_TYPES[file.mimetype]; // selection dans le dico l'extension correspondante au mimetype du fichier
    callback(null, name + '.' + extension); // génere un nom unique du fichier //  + '.' + extension
    // Date.now() = timestype du fichier pour le rendre unique
  },
});

module.exports = multer({storage}).single('image'); 
// .single = fichier unique. 'image' = type de fichier