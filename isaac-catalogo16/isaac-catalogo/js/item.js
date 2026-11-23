// Página de detalhes: mostra o item pedido na URL, tipo item.html?id=51 (dados no js/itens.js).
const COMO_FUNCIONA = {
  a: 'Item ativo: fica no espaço de item ativo, é usado com a barra de espaço e recarrega ao limpar salas.',
  p: 'Item passivo: o efeito é permanente a partir do momento em que você o pega.'
};

// ---------- Isaac com o item equipado (só itens passivos) ----------
// A imagem vem da wiki do Rebirth, com nome no padrão Collectible_NOME_appearance.png.
const PASTA_IMAGENS_WIKI = 'https://bindingofisaacrebirth.wiki.gg/images/';

function mostrarEquipado(item) {
  if (item.tipo !== 'p' || item.wiki === null) return;   // ativo não muda o visual; wiki:null = sem imagem

  // nome do arquivo na wiki: troca ’ por ' e espaço por _
  const nomeNaWiki = (item.wiki || item.nome).replace(/’/g, "'").replace(/ /g, '_');

  const imagem = new Image();
  imagem.alt = `Isaac com ${item.nome} equipado`;
  imagem.referrerPolicy = 'no-referrer';
  imagem.onload = () => {                                // só mostra o quadro se a imagem existir
    $('#equipado .quadro').append(imagem);
    $('#equipado').hidden = false;
  };
  imagem.src = PASTA_IMAGENS_WIKI + encodeURIComponent(`Collectible_${nomeNaWiki}_appearance.png`);
}

const id = Number(new URLSearchParams(location.search).get('id'));   // pega o número depois de "?id="
const pos = ITENS.findIndex(i => i.id === id);                       // posição dele na lista (-1 = não existe)
const caixa = $('#detalhe');

if (pos < 0) {
  // Alguém digitou um id que não existe
  caixa.innerHTML = '<h2>Item não encontrado</h2><p><a href="itens.html">Voltar para a lista de itens</a></p>';
} else {
  const item = ITENS[pos];
  document.title = `${item.nome} – Catálogo dos 100 Itens de The Binding of Isaac`;

  // Campos extras (recarga, desbloqueio, obs): só mostra os que o item tiver
  const extras = [['Recarga', item.recarga], ['Desbloqueio', item.desbloqueio], ['Observações', item.obs]]
    .filter(([, valor]) => valor);

  // Vizinhos pros botões "anterior" e "próximo"
  const anterior = ITENS[pos - 1];
  const proximo = ITENS[pos + 1];

  // "Mais itens do mesmo tipo": os 4 próximos do mesmo tipo (depois do atual, dando a volta no fim)
  const mesmoTipo = ITENS.filter(i => i.tipo === item.tipo && i.id !== item.id);
  const sugestoes = mesmoTipo.filter(i => i.id > item.id).concat(mesmoTipo.filter(i => i.id < item.id)).slice(0, 4);

  // Tags do molde abaixo:
  //   <h2>/<h3> títulos · <p> parágrafos · <a> links · <img> imagens · <span class="tag"> etiqueta do tipo
  //   <div class="detail"> divide a página em duas colunas (imagem à esquerda, texto à direita)
  //   <figure>/<figcaption> imagem com legenda (o quadro do Isaac equipado)
  //   <dl>/<dt>/<dd> lista de "termo: descrição" (Recarga, Desbloqueio, Observações)
  //   <div class="pager"> a linha com os botões anterior / voltar / próximo
  caixa.innerHTML = `
    <h2>${item.id}. ${item.nome}</h2>
    <p class="crumbs"><a href="itens.html">Os 100 itens</a> › ${item.nome}</p>

    <div class="detail">
      <div class="coluna-img">
        <img src="${item.img}" alt="Sprite de ${item.nome}" width="200" height="200">
        <!-- quadro do Isaac com o item equipado: começa escondido e só aparece se a imagem carregar -->
        <figure class="equipado" id="equipado" hidden>
          <div class="quadro"></div>
          <figcaption>Isaac com o item equipado<br>
            <small>Imagem: <a href="https://bindingofisaacrebirth.wiki.gg/" target="_blank" rel="noopener">Rebirth Wiki</a> (CC BY-SA 4.0)</small></figcaption>
        </figure>
      </div>

      <div>
        <span class="tag">${TIPOS[item.tipo]}</span>
        <h3>Efeito</h3><p>${item.efeito}</p>
        <h3>Como funciona</h3><p>${COMO_FUNCIONA[item.tipo]}</p>
        ${extras.length ? '<dl class="dados">' + extras.map(([nome, valor]) => `<dt>${nome}</dt><dd>${valor}</dd>`).join('') + '</dl>' : ''}
        <p><a href="https://bindingofisaac.fandom.com/wiki/Special:Search?query=${encodeURIComponent(item.nome)}" target="_blank" rel="noopener">Ver na wiki do jogo (em inglês) ↗</a></p>
      </div>
    </div>

    <div class="pager">
      ${anterior ? `<a class="btn alt" href="item.html?id=${anterior.id}">◀ ${anterior.nome}</a>` : '<span></span>'}
      <a class="btn alt" href="itens.html">Voltar à lista</a>
      ${proximo ? `<a class="btn alt" href="item.html?id=${proximo.id}">${proximo.nome} ▶</a>` : '<span></span>'}
    </div>

    <h3>Mais itens do mesmo tipo</h3>
    <div class="grid">${sugestoes.map(i => cartao(i, false)).join('')}</div>`;

  mostrarEquipado(item);
}
