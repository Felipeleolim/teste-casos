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

## Casos completos para produção

A pasta [`casos/`](casos/) contém a coleção completa, pronta para ser diagramada, impressa e montada em envelopes:

- [`01-a-safira-de-aurora.md`](casos/01-a-safira-de-aurora.md) — 3 a 5 pessoas · 45 min · 12+
- [`02-o-ultimo-trem.md`](casos/02-o-ultimo-trem.md) — 4 a 6 pessoas · 75 min · 14+
- [`03-o-arquivo-das-chaves.md`](casos/03-o-arquivo-das-chaves.md) — 5 a 8 pessoas · 90 min · 14+
- [`04-quem-levou-o-bolo.md`](casos/04-quem-levou-o-bolo.md) — 2 a 4 pessoas · 25 min · 10+

Cada dossiê traz instruções de montagem, abertura, personagens, rodadas de pistas, cartão de acusação e solução lacrada. Leia [`LEIA-PRIMEIRO.md`](casos/LEIA-PRIMEIRO.md) antes de montar os kits: os arquivos incluem spoilers e não devem ser entregues inteiros a clientes.

Os produtos, preços e e-mail em `index.html` / `app.js` são demonstrativos e podem ser substituídos pelos dados reais da loja.
