const pool = require('../database/keys.js');
const { queryP, queryL} = require('../database/querys.js');


const getAnalysisOrder = async (req, res) => {
    const response = await pool.query('SELECT * FROM analisis_pedidosV');
    res.json(response.rows);
}

const getAnalysisOrderByNameP = async (req, res) => {
    const response = await pool.query(queryP, [req.params.id]);
    res.json(response.rows);
}

const getAnalysisOrderByNameL = async (req, res) => {
    const response = await pool.query(queryL, [req.params.id]);
    res.json(response.rows);
}

const createAnalysisOrder = async (req, res) => {
    const { idPac, idRecep, idLab, idAna, idStatus } = req.body;

    const response = await pool.query('SELECT iPedido($1, $2, $3, $4, $5)', [idPac, idRecep,
                                                                            idLab, idAna,
                                                                            idStatus]);
    console.log(response);
    res.json({
        message: 'Analysis order created succesfully',
        body: {
            user: { idPac, idRecep, idLab, idAna, idStatus }
        }
    });
}

const deleteAnalysisOrder = async (req, res) => {
    const response = await pool.query('SELECT dPedido($1)', [req.params.id]);
    console.log(response);
    res.json({
        message: 'Analysis order deleted succesffully',
        body: response.rows
    });
}

const updateAnalysisOrder = async (req, res) => {
    const id = req.params.id;
    const { idStatus } = req.body;

    const response = await pool.query('SELECT uPedido($1)', [idStatus, id]);
    console.log(response);
    res.json({
        message: 'Analysis order updated succesfully',
        body: {
            user: { idStatus }
        }
    });
}

module.exports = {
    getAnalysisOrder,
    getAnalysisOrderByNameP,
    getAnalysisOrderByNameL,
    createAnalysisOrder,
    deleteAnalysisOrder,
    updateAnalysisOrder
}