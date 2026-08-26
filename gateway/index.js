const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/pedidos', createProxyMiddleware({
    target: 'http://pedidos:5353',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/pedidos'
    }
}));

app.use('/estoque', createProxyMiddleware({
    target: 'http://estoque:5354',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/estoque'
    }
}));

app.use('/pagamentos', createProxyMiddleware({
    target: 'http://pagamentos:5355',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/pagamentos'
    }
}));

app.listen(5350, () => {
    console.log('API Gateway rodando na porta 5350');
});