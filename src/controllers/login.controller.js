const pool = require('../database/keys.js'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    config = require('../configs/config'),
    bcrypt = require('bcryptjs');


const authentication = async (req, res) => {
    const { email, pwd, rol } = req.body;
    let response;
    let id, name, lastnames, finalPwd, validation;

    switch (rol) {
        case 'recep':
            response = await pool.query('SELECT * FROM recepcionista where email = $1', [email]);

            if (response.rowCount > 0) {

                id = response.rows[0].idrecepcionista;
                name = response.rows[0].nombre;
                lastnames = response.rows[0].apellidos;
                finalPwd = response.rows[0].pwd;

                validation = await bcrypt.compare(pwd, finalPwd);

                if (validation) {

                    const payload = {
                        check: true,
                        id: id,
                        name: name,
                        lastnames: lastnames,
                        rol: rol
                    };
                    const token = jwt.sign(payload, config.key, { expiresIn: 1440 });
                    res.json({
                        message: 'Autenticación correcta',
                        status: 'true',
                        token: token
                    });
                } else {
                    res.json({
                        mensaje: 'Usuario o contraseña incorrectos',
                        status: 'false'
                    });
                }
            } else {
                res.json({
                    mensaje: 'Usuario no encontrado',
                    status: 'false'
                })
            }
        break;
        case 'pacient':
            response = await pool.query('SELECT * FROM paciente where email = $1', [email]);

            if (response.rowCount > 0) {

                id = response.rows[0].idpaciente;
                name = response.rows[0].nombre;
                lastnames = response.rows[0].apellidos;
                finalPwd = response.rows[0].pwd;

                validation = await bcrypt.compare(pwd, finalPwd);

                if (validation) {

                    const payload = {
                        check: true,
                        id: id,
                        name: name,
                        lastnames: lastnames,
                        rol: rol
                    };
                    const token = jwt.sign(payload, config.key, {
                        expiresIn: 1440
                    });
                    res.json({
                        message: 'Autenticación correcta',
                        status: 'true',
                        token: token
                    });
                } else {
                    res.json({
                        mensaje: 'Usuario o contraseña incorrectos',
                        status: 'false'
                    });
                }
            } else {
                res.json({
                    mensaje: 'Usuario no encontrado',
                    status: 'false'
                })
            }
            break;
        case 'lab':
            response = await pool.query('SELECT * FROM laboratorista where email = $1', [email]);

            if (response.rowCount > 0) {

                id = response.rows[0].idlaboratorista;
                name = response.rows[0].nombre;
                lastnames = response.rows[0].apellidos;
                finalPwd = response.rows[0].pwd;

                validation = await bcrypt.compare(pwd, finalPwd);

                if (validation) {

                    const payload = {
                        check: true,
                        id: id,
                        name: name,
                        lastnames: lastnames,
                        rol: rol
                    };
                    const token = jwt.sign(payload, config.key, {
                        expiresIn: 1440
                    });
                    res.json({
                        message: 'Autenticación correcta',
                        status: 'true',
                        token: token
                    });
                } else {
                    res.json({
                        messaje: 'Usuario o contraseña incorrectos',
                        status: 'false'
                    });
                }
            } else {
                res.json({
                    messaje: 'Usuario no encontrado',
                    status: 'false'
                });
            }
            break;
        default:
            res.json({
                message: 'Selecciona un tipo de user'
            });
            break;
    }
};

const protectedRoutes = express.Router();
protectedRoutes.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, config.key, (err, decoded) => {
            if (err) {
                return res.json({
                    message: 'Token inválida'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            message: 'Token no proveída'
        });
    }
});

module.exports = {
    authentication,
    protectedRoutes
}