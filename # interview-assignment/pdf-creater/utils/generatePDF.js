const puppeteer = require('puppeteer');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');

const compileTemplate = async (templateName, data) => {
    const filePath = path.join(__dirname, '..', 'views', `${templateName}.html`);
    const html = fs.readFileSync(filePath, 'utf-8');
    return hbs.compile(html)(data);
};

exports.generatePDF = async (quotation) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const products = await Promise.all(quotation.products.map(async (productId) => {
        const product = await Product.findById(productId);
        return {
            name: product.name,
            qty: product.qty,
            rate: product.rate,
            total: product.qty * product.rate * (1 + product.gst / 100),
        };
    }));

    const total = products.reduce((sum, product) => sum + product.total, 0);

    const htmlContent = await compileTemplate('invoiceTemplate', {
        date: new Date().toLocaleDateString(),
        user: quotation.user,
        invoiceNumber: quotation._id.toString(),
        products,
        total,
    });

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return pdfBuffer;
};
