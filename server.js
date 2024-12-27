const express = require('express');
const path = require('path');
const XLSX = require('xlsx');
const app = express();
const port = 3000;

// Servir el archivo index.html desde la raíz
app.use(express.static(__dirname)); // Ahora incluye la raíz del proyecto

// Servir archivos estáticos de la carpeta public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Endpoint para obtener los datos del archivo Excel
app.get('/api/nota', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'notas.xlsx');
    
    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);
    const data = {};

    // Procesar todas las hojas y almacenarlas en un objeto
    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        data[sheetName] = XLSX.utils.sheet_to_json(sheet);
    });

    res.json(data); // Devolver los datos en formato JSON
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
