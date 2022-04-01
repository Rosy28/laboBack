const PDFDocument = require('pdfkit');

function buildPdf(dataCallback, endCallback){
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.fontSize(25).text('Some heading');
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

module.exports = { releasePdf };






