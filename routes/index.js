var express = require('express');
var router = express.Router();
const fs = require('fs');

// Faltan estas extenciones
/* bcrypt = require('bcrypt');
const multer = require('multer');
*/
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/register', function(req, res) {
    res.render('userRegisterForm');
});

router.post('/register', function(req, res, next) {
    const body = req.body;

    if (body.password != body.repeat_password) {
        return res.send('ERROR');
    }

    const arrayDeUsuarios = JSON.parse(fs.readFileSync('data/usuarios.json'));
    const ultimoItemDelArray = arrayDeUsuarios[arrayDeUsuarios.length - 1];

    const usuarioAGuardar = {
        id: (ultimoItemDelArray.id + 1),
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: body.password
    };

    //Como guardar json.
    // Requerir fs
    // Parsear con stringify
    //Guardar el objeto con parse

    arrayDeUsuarios.push(usuarioAGuardar);
    fs.writeFileSync('data/usuarios.json', JSON.stringify(arrayDeUsuarios));

    return res.send('todo esta bien');



});
module.exports = router;