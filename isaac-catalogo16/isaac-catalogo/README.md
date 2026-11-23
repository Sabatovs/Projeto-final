# Catálogo dos itens – The Binding of Isaac (versão vanilla)

Site com (HTML + CSS + JavaScript). para abrir na pagina inicial vá no `index.html` no navegador.


## Páginas
- `index.html` – início: sobre o jogo, itens em destaque, vídeo, galeria de imagens e botão para a pagina dos itens
- `itens.html` – lista dos itens (busca e abas Todos, Ativos e Passivos)
- `item.html` – detalhes de um item : descrição, sprite e se for item passivo o sprite do isaac se ele mudar ao pegar o item(`item.html?id=NÚMERO`)
- `contato.html` – formulário de contato

## Código
- `css/style.css` – todos os estilos; as cores e a fonte ficam nas variáveis do topo (o tema claro troca só o fundo preto do site)
- `js/layout.js` – monta topo, menu, rodapé e janelinhas
- `js/comum.js` – tema claro/escuro, fonte, contraste e login
- `js/itens.js` – os dados dos itens
- `js/catalogo.js` (lista), `js/item.js` (detalhes), `js/home.js` e `js/carrossel.js` (carrosséis), `js/contato.js` (formulário)

## Imagens (`img/`)
- `logo.png`, `isaac.png`, `icone-itens.png`
- `sala.png` (moldura de tijolos) e `sala-chao.png` (chão)
- `itens/001.png … 110.png` – sprites dos itens 
- `jogo/` – imagens da galeria da página inicial

## Como mexer
- **Trocar o vídeo:** mude o código depois de `/embed/` no `index.html`.
- **Itens em destaque:** edite a lista `DESTAQUES` no `js/itens.js`.
- **Menu / rodapé:** edite o `js/layout.js`.

