const express = require('express');

const app = express();

app.use(express.json());

const ambiente = process.env.AMBIENTE || 'desenvolvimento';

// Consultar pagamentos
app.get('/pagamentos', (req, res) => {

    res.json([
        {
            id: 1,
            pedido: 1,
            valor: 2500,
            status: 'aprovado',
            ambiente: ambiente
        },
        {
            id: 2,
            pedido: 2,
            valor: 150,
            status: 'pendente',
            ambiente: ambiente
        }
    ]);

});

app.listen(5355, () => {
    console.log(`Serviço de Pagamentos rodando na porta 5355`);
});