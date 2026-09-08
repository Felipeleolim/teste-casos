# Pista & Papel

Uma vitrine digital em português para uma papelaria vender **casos investigativos de mesa**: jogos de conversa com envelopes, personagens, pistas físicas e uma solução lacrada.

## Abrir localmente

Como o projeto é estático, basta servir a pasta com qualquer servidor HTTP. Exemplo:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Então abra `http://localhost:4173`.

## O que a experiência inclui

- Catálogo com filtros por nível de investigação
- Detalhes de cada dossiê em modal
- Maleta de pedidos com total e reserva por e-mail
- Recomendador de caso conforme grupo, tempo e clima
- Área de revenda para papelarias
- Layout responsivo, sem dependências de build

Os produtos, preços e e-mail em `index.html` / `app.js` são demonstrativos e podem ser substituídos pelos dados reais da loja.
