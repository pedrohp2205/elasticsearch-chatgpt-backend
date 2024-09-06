const fs = require('fs');

function DeleteFolder(path) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error('Erro ao apagar o arquivo:', err);
        } else {
            console.log('Arquivo apagado com sucesso.');
        }
    });
}

module.exports = DeleteFolder