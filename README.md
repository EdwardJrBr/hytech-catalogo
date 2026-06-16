# HY TECH Catálogo de Smartphones

Este projeto é um catálogo estático de smartphones criado com HTML, CSS e JavaScript puro.

## Como funciona

A página `index.html` exibe os aparelhos disponíveis no catálogo da HY TECH.

A página `admin.html` permite gerenciar os produtos localmente, com recursos para cadastrar, editar, remover e alterar o status dos aparelhos exibidos na página principal.

Os dados são salvos no `localStorage` do navegador, usando a chave `hytech_products`. Por isso, as alterações feitas no painel administrativo ficam disponíveis no mesmo navegador em que foram cadastradas.

No painel admin também é possível informar a quantidade disponível em estoque e personalizar a miniatura de cada produto. A miniatura pode ser preenchida com um caminho/URL ou enviada como arquivo local, ficando salva no `localStorage`.

## Como testar

Para testar o catálogo, basta abrir o arquivo `index.html` no navegador.

Para editar os produtos, abra o arquivo `admin.html` no mesmo navegador.

## Configurações

O número do WhatsApp fica no arquivo `js/app.js`, na constante `whatsappNumber`.

O logo da loja deve ser salvo como:

```text
assets/logo.png
```

Se a imagem do logo não carregar, o site mantém o logo textual como fallback visual.

As miniaturas dos aparelhos ficam em:

```text
assets/products/catalog
```

Cada arquivo segue o nome do modelo, por exemplo `iphone-15-pro-max.png`. Para trocar por uma foto mais exata, substitua o PNG correspondente mantendo o mesmo nome.

## Como resetar os produtos

Para restaurar os produtos iniciais, abra o console do navegador e execute:

```js
localStorage.removeItem("hytech_products")
```

Depois, recarregue a página.

## Próximos passos recomendados

- Trocar `localStorage` por banco de dados.
- Adicionar login no admin.
- Implementar upload real de imagens.
- Integrar com WhatsApp oficial ou CRM.
