const PDFDocument = require('pdfkit'),
        pool = require('../database/keys.js'),
      { queryPU } = require('../database/querys.js');


const buildPdf = async (req, res) => { 
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=invoice.pdf'
    });

    const doc = new PDFDocument();
    doc.on('data', (chunk) => stream.write(chunk));
    doc.on('end', () => stream.end());

    const { idpacient, idpedid } = req.body;

    const response = await pool.query(queryPU, [idpacient, idpedid]);

    doc.fontSize(25).text(JSON.stringify(response));
    doc.end();
}


module.exports = { buildPdf };






