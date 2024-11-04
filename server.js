const express = require("express");
const qr = require("qrcode");
const app = express();
const path = require('path');
const PORT = 9090;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generateQR', async (req, res) => {
    try {
        const { url } = req.body;
        const qrCodeImage = await qr.toDataURL(url);
        res.json({ qrCodeImage });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
