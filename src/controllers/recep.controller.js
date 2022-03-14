const pool = require('../database/keys.js');
const bcrypt = require('bcryptjs');

const rounds = 5;
let finalPwd;

const getRecep = async (req, res) => {
    const response = await pool.query('SELECT * FROM recepcionista');
    res.json(response.rows);
}

const getRecepById = async (req, res) => {
    const response = await pool.query('SELECT nombre, apellidos, email FROM recepcionista WHERE idRecepcionista = $1', [req.params.id]);
    res.json(response.rows);
}

const createRecep = async (req, res) => {
    const { name, lastnames, email, pwd } = req.body;

    finalPwd = await bcrypt.hash(pwd, rounds);
    console.log(finalPwd);

    const response = await pool.query('SELECT iRecep($1, $2, $3, $4)', [name, lastnames, email, finalPwd]);
    console.log(response);
    res.json({
        message: 'Recep created succesfully',
        body: {
            user: {name, lastnames, email}
        }
    });
}

const deleteRecep = async (req, res) => {
    const response = await pool.query('SELECT dRecep($1)', [req.params.id]);
    console.log(response);
    res.json({
        message: 'Recep deleted succesffully',
        body: response.rows
    });
}

const updateRecep = async(req, res) => {
    const id = req.params.id;
    const { name, lastnames, email, pwd } = req.body;
    
    finalPwd = await bcrypt.hash(pwd, rounds);
    console.log(finalPwd);

    const response = await pool.query('SELECT uRecep($1, $2, $3, $4, $5)', [name, lastnames, email, finalPwd, id]);
    console.log(response);
    res.json('Recep updated');
}

module.exports = {
    getRecep,
    getRecepById,
    createRecep,
    deleteRecep,
    updateRecep
}