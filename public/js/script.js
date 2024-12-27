let excelData = {};

window.onload = () => {
    // Cargar los datos desde el servidor
    fetch('/api/nota')
        .then(response => response.json())
        .then(data => {
            excelData = data; // Almacenar los datos del archivo Excel
        })
        .catch(err => console.error('Error al cargar los datos:', err));
};

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value.trim();
    if (!query) {
        document.getElementById('result').innerHTML = '';
        return;
    }

    let resultHTML = '';
    let found = false;

    // Buscar en todas las hojas cargadas
    for (const sheetName in excelData) {
        if (excelData.hasOwnProperty(sheetName)) {
            excelData[sheetName].forEach(row => {
                if (row.Código && row.Código.toString() === query) {
                    // Verificar si el campo de la nota está vacío o es undefined
                    const nota = (row.nota !== undefined && row.nota !== null && row.nota !== '') 
                        ? row.nota 
                        : 'Aún no se ha agregado tu nota';
                    resultHTML = `
                        <p>Nombre: ${row.Nombres} ${row.Apellidos}</p>
                        <p>Código: ${row.Código}</p>
                        <p>Nota: ${nota}</p>
                    `;
                    found = true;
                }
            });
        }
    }
    

    if (!found) {
        resultHTML = `<p>No se encontró el código.</p>`;
    }

    document.getElementById('result').innerHTML = resultHTML;
});
