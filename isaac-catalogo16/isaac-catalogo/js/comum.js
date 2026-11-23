const $ = s => document.querySelector(s);
const raiz = document.documentElement; 

const guardar = (chave, valor) => { try { localStorage.setItem(chave, valor); } catch (e) {} };
const ler = chave => { try { return localStorage.getItem(chave); } catch (e) { return null; } };

// Tipos de item (a/p) e o cartãozinho de item, usados em mais de uma página
const TIPOS = { a: 'Ativo', p: 'Passivo' };
// O texto entre crases (`...`) é um "molde" de HTML. O ${...} dentro dele é trocado pelo valor de verdade.
// Tags usadas no cartão:
//   <a class="card" href=...> ... o cartão inteiro é um link pra página do item
//   <img ... alt="">          ... o sprite do item (alt vazio = só decoração, o nome já está no texto)
//   <h3>                      ... o nome do item
//   <span class="tag">        ... a etiqueta "Ativo" / "Passivo"
//   <p>                       ... o efeito (só aparece se comEfeito for verdadeiro)
const cartao = (i, comEfeito) => `
  <a class="card" href="item.html?id=${i.id}">
    <img src="${i.img}" alt="" width="64" height="64">
    <h3>${i.id}. ${i.nome}</h3>
    <span class="tag">${TIPOS[i.tipo]}</span>
    ${comEfeito ? `<p>${i.efeito}</p>` : ''}
  </a>`;

// ---------- Volta as escolhas salvas da última visita ----------
let fonte = Number(ler('fonte')) || 100;           // tamanho da fonte, em %
raiz.dataset.theme = ler('tema') || 'dark';        // o site abre no escuro
raiz.style.fontSize = fonte + '%';
if (ler('contraste')) raiz.dataset.contrast = 'high';
if (ler('usuario')) $('#who').textContent = 'Olá, ' + ler('usuario');

// ---------- Janelinha de acessibilidade ----------
$('#btnA11y').onclick = () => $('#dlgA11y').showModal();
$('#closeA').onclick = () => $('#dlgA11y').close();

// Troca entre escuro e claro 
$('#tTheme').onclick = () => {
  raiz.dataset.theme = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
  guardar('tema', raiz.dataset.theme);
};

// Aumenta ou diminui a fonte de 10 em 10%, entre 80% e 150%
function mudarFonte(passo) {
  fonte = Math.min(150, Math.max(80, fonte + passo));
  raiz.style.fontSize = fonte + '%';
  guardar('fonte', fonte);
}
$('#fPlus').onclick = () => mudarFonte(10);
$('#fMinus').onclick = () => mudarFonte(-10);

// Liga/desliga o alto contraste
$('#tContrast').onclick = () => {
  const ligado = raiz.dataset.contrast === 'high';
  if (ligado) delete raiz.dataset.contrast; else raiz.dataset.contrast = 'high';
  guardar('contraste', ligado ? '' : '1');
};

// ---------- Login (de mentira: só guarda o nome e mostra ) ----------
$('#btnLogin').onclick = () => $('#dlgLogin').showModal();
$('#fl').onsubmit = e => {
  const nome = $('#lu').value;
  if (e.submitter && e.submitter.value === 'ok' && nome) {
    $('#who').textContent = 'Olá, ' + nome;
    guardar('usuario', nome);
  }
};
