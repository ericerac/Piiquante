const http = require('http'); // import package http

const app = require ('./app') // importe le fichier app.js

app.set ('port',process.env.PORT || 3000 ) // informe express du port qui sera utilisé

const server = http.createServer(app); // app est la fonction du fichier app.js qui répondra a la requête

server.listen(process.env.PORT || 3000); // écoute les requête
