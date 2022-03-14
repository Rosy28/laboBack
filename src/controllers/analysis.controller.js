const pool = require('../database/keys.js');

const getAnalysis = async (req, res) => {
    const response = await pool.query('SELECT idanalisis, nombre, precio FROM tipo_analisis');
    res.json(response.rows);
}

const getAnalysisById = async (req, res) => {
    const response = await pool.query('SELECT nombre, precio FROM tipo_analisis WHERE idanalisis = $1', [req.params.id]);
    res.json(response.rows);
}

const createAnalysis = async (req, res) => {
    const { name, price } = req.body;

    const response = await pool.query('SELECT iTipo($1, $2)', [name, price]);
    console.log(response);
    res.json({
        message: 'Analysis created succesfully',
        body: {
            user: { name, price }
        }
    });
}

const deleteAnalysis = async (req, res) => {
    const response = await pool.query('SELECT dTipo($1)', [req.params.id]);
    console.log(response);
    res.json({
        message: 'Analysis deleted succesffully',
        body: response.rows
    });
}

const updateAnalysis = async (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;

    const response = await pool.query('SELECT uTipo($1, $2, $3)', [name, price, id]);
    console.log(response);
    res.json({
        message: 'Analysis updated succesfully',
        body: {
            user: { name, price }
        }
    });
}

module.exports = {
    getAnalysis,
    getAnalysisById,
    createAnalysis,
    deleteAnalysis,
    updateAnalysis
}