const PdfPrinter = require('pdfmake'),
    fs = require('fs');


const fonts = require('./fonts'),
    styles = require('./styles');
const { content } = require('./pdfContent');

let docDefinition = {
    content: content,
    styles: styles
};

const printer = new PdfPrinter(fonts);

const createPdf = async (req, res) => {
    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('./pdfs/pdfTest.pdf'));
    pdfDoc.end();

    res.json({
        message: 'Ahí va la cosa'
    });
};

module.exports = { createPdf };







