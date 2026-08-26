const express = require('express');

const app = express();

app.use(express.json());

// Consultar estoque
app.get('/estoque', (req, res) => {

    res.json([
        {
            id: 1,
            produto: 'Notebook',
            quantidade: 10,
            disponivel: true
        },
        {
            id: 2,
            produto: 'Mouse',
            quantidade: 25,
            disponivel: true
        }
    ]);

});

app.listen(5354, () => {
    console.log('Serviço de Estoque rodando na porta 5354');
});