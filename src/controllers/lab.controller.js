const pool = require('../database/keys.js');
const bcrypt = require('bcryptjs');

const rounds = 5;
let finalPwd;

const getLab = async (req, res) => {
    const response = await pool.query('SELECT idLaboratorista, nombre, apellidos FROM laboratorista');
    res.json(response.rows);
}

const getLabById = async (req, res) => {
    const response = await pool.query('SELECT nombre, apellidos FROM laboratorista WHERE idLaboratorista = $1', [req.params.id]);
    res.json(response.rows);
}

const createLab = async (req, res) => {
    const { name, lastnames, email, pwd } = req.body;

    finalPwd = await bcrypt.hash(pwd, rounds);
    console.log(finalPwd);

    const response = await pool.query('SELECT iLabor($1, $2, $3, $4)', [name, lastnames, email, finalPwd]);
    console.log(response);
    res.json({
        message: 'Lab created succesfully',
        body: {
            user: {name, lastnames, email}
        }
    });
}

const deleteLab = async (req, res) => {
    const response = await pool.query('SELECT dLabor($1)', [req.params.id]);
    console.log(response);
    res.json({
        message: 'Lab deleted succesffully',
        body: response.rows
    });
}

const updateLab = async(req, res) => {
    const id = req.params.id;
    const { name, lastnames, email, pwd } = req.body;
    
    finalPwd = await bcrypt.hash(pwd, rounds);
    console.log(finalPwd);

    const response = await pool.query('SELECT uLabor($1, $2, $3, $4, $5)', [name, lastnames, email, finalPwd, id]);
    console.log(response);
    res.json('Lab updated');
}

module.exports = {
    getLab,
    getLabById,
    createLab,
    deleteLab,
    updateLab
}