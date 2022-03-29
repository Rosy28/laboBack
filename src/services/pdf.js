const pool = require('../database/keys.js'),
    queryPU = require('../database/querys.js'),
    pdf = require('html-pdf');



const createPdf = async (req, res) => {
    const { idpacient, idpedid } = req.body;
    
    const response = await pool.query(queryPU, [idpacient, idpedid]);
    const response2 = JSON.stringify(response);
    const content = '<p>' + response2 + '<p/>';

    pdf.create(content).toFile('./downloads/Report.pdf', function(err, res) {
        if(err){
            console.log('El error es: ' + err);
        } else {
            console.log(res);
        }
    });

    res.json(response.rows)
}

module.exports = { createPdf };