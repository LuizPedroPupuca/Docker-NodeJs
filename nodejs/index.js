const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.connect();

app.get('/', (req, res) => {
    // Inserir o nome "Luiz" no banco de dados
    connection.query('INSERT INTO people (name) VALUES (?)', ['Luiz'], (error, results) => {
        if (error) throw error;

        // Consultar todos os nomes no banco de dados
        connection.query('SELECT * FROM people', (error, results) => {
            if (error) throw error;
            let names = results.map(result => result.name).join(', ');
            res.send(`<h1>Full Cycle Rocks!</h1><br>Lista de nomes cadastrados: ${names}`);
        });
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});