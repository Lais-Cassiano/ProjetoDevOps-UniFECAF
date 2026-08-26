const express = require('express');

const app = express();

app.use(express.json());

// request and response
app.get('/pedidos', (req, res) => {

    res.json([
        {
            id: 1,
            cliente: 'João',
            produto: 'Notebook',
            status: 'criado'
        },
        {
            id: 2,
            cliente: 'Maria',
            produto: 'Mouse',
            status: 'criado'
        }
    ]);

})

app.listen(5353, () => {
    console.log('Serviço de pedidos rodando na porta 5353');
})