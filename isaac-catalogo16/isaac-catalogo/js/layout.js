// Esse arquivo monta o que se repete em TODAS as páginas: topo (logo), menu, rodapé,
// botão de acessibilidade e as janelinhas (login e acessibilidade).

const paginaAtual = document.body.dataset.pagina;

const linkMenu = (href, texto, pagina) =>
  `<a href="${href}"${pagina === paginaAtual ? ' aria-current="page"' : ''}>${texto}</a>`;

// ---------- Parte de cima da página ----------
const topo = `
<!-- <a class="skip">: link escondido que aparece quando você aperta Tab. Pula direto pro conteúdo (ajuda quem usa teclado) -->
<a class="skip" href="#main">Ir para o conteúdo</a>

<!-- <header>: o cabeçalho do site (a faixa com a logo) -->
<header class="wiki">
  <!-- <h1>: o título principal da página (só existe um por página). Aqui ele é a logo, que é uma <img> -->
  <h1 class="logo"><img src="img/logo.png" alt="The Binding of Isaac"></h1>
  <p class="sub">Catálogo dos 100 itens (versão vanilla)</p>
  <img class="isaac" src="img/isaac.png" alt="Isaac chorando">
</header>

<!-- <nav>: o menu de navegação. aria-label dá um nome pra ele no leitor de tela -->
<nav class="tabsnav" aria-label="Navegação da wiki">
  <!-- cada linkMenu(...) vira um <a href="..."> (link). O da página atual ganha aria-current="page" -->
  ${linkMenu('index.html', 'Início', 'home')}
  ${linkMenu('index.html#sobre', 'Sobre o jogo')}
  ${linkMenu('index.html#destaques', 'Destaques')}
  ${linkMenu('index.html#video', 'Vídeo')}
  ${linkMenu('itens.html', 'Os 100 itens', 'itens')}
  ${linkMenu('contato.html', 'Contato', 'contato')}
  <!-- aria-haspopup="dialog": avisa que esse botão abre uma janelinha. O <span id="who"> é onde aparece "Entrar" ou "Olá, fulano" -->
  <button class="navlogin" id="btnLogin" aria-haspopup="dialog"><span id="who">Entrar</span></button>
</nav>`;

// ---------- Parte de baixo da página ----------
const rodape = `
<!-- <footer>: o rodapé do site -->
<footer><p>Projeto acadêmico · Desenvolvimento de Interfaces 2/2026 · Conteúdo inspirado na wiki do
  <a href="https://bindingofisaacrebirth.fandom.com/wiki/Binding_of_Isaac:_Rebirth_Wiki">Binding of Isaac Fandom</a>.
  The Binding of Isaac é marca de seus criadores.</p></footer>

<!-- botão redondo fixo no canto de baixo (♿ = símbolo de acessibilidade) -->
<button class="a11y-fab" id="btnA11y" aria-haspopup="dialog" aria-label="Abrir opções de acessibilidade"><span aria-hidden="true">♿&#xFE0E;</span></button>

<!-- <dialog>: uma janelinha que abre por cima da página (o JS abre com showModal()).
     aria-labelledby liga a janelinha ao título dela -->
<dialog id="dlgLogin" aria-labelledby="tl">
  <!-- <form method="dialog">: formulário que, ao enviar, só fecha a janelinha -->
  <form method="dialog" id="fl">
    <h2 id="tl">Entrar</h2>
    <!-- <label> + <input>: nome do campo + o campo. type="password" esconde o que é digitado -->
    <label for="lu">Usuário</label><input id="lu" required autocomplete="username">
    <label for="lp">Senha</label><input id="lp" type="password" required autocomplete="current-password">
    <!-- value="ok"/"cancel": o JS lê isso pra saber qual botão foi apertado. formnovalidate = "Fechar" não exige campos preenchidos -->
    <p><button class="btn" value="ok">Entrar</button> <button class="btn alt" value="cancel" formnovalidate>Fechar</button></p>
  </form>
</dialog>

<!-- janelinha de acessibilidade: tema, tamanho da fonte e contraste (os botões são ligados no js/comum.js) -->
<dialog id="dlgA11y" aria-labelledby="ta">
  <h2 id="ta">Acessibilidade</h2>
  <p><button class="btn alt" id="tTheme">Alternar claro/escuro</button></p>
  <p>
    <!-- A− e A+ = menor e maior (&minus; é o sinal de menos) -->
    <button class="btn alt" id="fMinus" aria-label="Diminuir fonte">A−</button>
    <button class="btn alt" id="fPlus" aria-label="Aumentar fonte">A+</button>
    <button class="btn alt" id="tContrast">Alto contraste</button>
  </p>
  <p><button class="btn" id="closeA">Fechar</button></p>
</dialog>`;

// Coloca o topo antes do <main> e o rodapé depois dele
const principal = document.querySelector('main');
principal.insertAdjacentHTML('beforebegin', topo);
principal.insertAdjacentHTML('afterend', rodape);
