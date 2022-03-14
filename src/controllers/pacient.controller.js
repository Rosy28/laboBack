const pool = require('../database/keys.js');
const bcrypt = require('bcryptjs');

const rounds = 5;
let finalPwd;

const getPacient = async (req, res) => {
    const response = await pool.query('SELECT idpaciente, nombre, apellidos FROM paciente');
    res.json(response.rows);
}

const getPacientById = async (req, res) => {
    const response = await pool.query('SELECT nombre, apellidos, email FROM paciente WHERE idPaciente = $1', [req.params.id]);
    res.json(response.rows);
}

const createPacient = async (req, res) => {
    const { name, lastnames, email, pwd } = req.body;

    finalPwd = await bcrypt.hash(pwd, rounds);
    console.log(finalPwd);

    const response = await pool.query('SELECT iPaciente($1, $2, $3, $4)', [name, lastnames, email, finalPwd]);
    console.log(response);
    res.json({
        message: 'User created succesfully',
        body: {
            user: {name, lastnames, email}
        }
    });
}

const deletePacient = async (req, res) => {
    const response = await pool.query('SELECT dPaciente($1)', [req.params.id]);
    console.log(response);
    res.json({
        message: 'User deleted succesffully',
        body: response.rows
    });
}

const updatePacient = async(req, res) => {
    const id = req.params.id;
    const { name, lastnames, email, pwd } = req.body;
    
    finalPwd = await bcrypt.hash(pwd, rounds);
    console.log(finalPwd);

    const response = await pool.query('SELECT uPaciente($1, $2, $3, $4, $5)', [name, lastnames, email, finalPwd, id]);
    console.log(response);
    res.json('User updated');
}

module.exports = {
    getPacient,
    getPacientById,
    createPacient,
    deletePacient,
    updatePacient
}