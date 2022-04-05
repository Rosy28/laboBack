const PDFDocument = require('pdfkit'),
        pool = require('../database/keys.js'),
      { queryP } = require('../database/querys.js');

const buildPdf = async (req, res) => { 
    const doc = new PDFDocument();
    doc.on('data', req);
    doc.on('end', res);

    const response = await pool.query(queryP, [req.params.id]);

    doc.fontSize(25).text(response);
    doc.end();
}

const releasePdf = async (req, res, next) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=invoice.pdf'
    });

    buildPdf(
        (chunk) => stream.write(chunk),
        () => stream.end()
    );
}

module.exports = { buildPdf, releasePdf };






