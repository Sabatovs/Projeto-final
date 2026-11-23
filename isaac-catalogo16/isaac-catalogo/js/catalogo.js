// Página "Os 100 itens": desenha os cartões e faz a busca e as abas (Todos / Ativos / Passivos).
// Os dados vêm do js/itens.js (lista ITENS).
let filtro = '';   // '' = todos, 'a' = só ativos, 'p' = só passivos

// Refaz a lista de cartões de acordo com o que foi digitado e a aba escolhida
function desenhar() {
  const busca = $('#q').value.trim().toLowerCase();

  // fica só com os itens da aba atual que tenham o texto da busca no nome ou no efeito
  const lista = ITENS.filter(i =>
    (!filtro || i.tipo === filtro) && (i.nome + ' ' + i.efeito).toLowerCase().includes(busca));

  $('#grid').innerHTML = lista.map(i => cartao(i, true)).join('');

  const ativos = ITENS.filter(i => i.tipo === 'a').length;
  $('#count').textContent = `${lista.length} de ${ITENS.length} itens (${ativos} ativos, ${ITENS.length - ativos} passivos)`;
}

$('#q').oninput = desenhar;   

// Clicar numa aba: marca ela como selecionada e filtra a lista
const abas = document.querySelectorAll('[role=tab]');
abas.forEach(aba => {
  aba.onclick = () => {
    abas.forEach(a => a.setAttribute('aria-selected', a === aba));
    filtro = aba.dataset.f;
    desenhar();
  };
});

desenhar();   
