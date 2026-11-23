// Página inicial: monta os slides do carrossel "Itens em destaque".
// Quais itens aparecem é só escolher os nomes na lista DESTAQUES, lá no js/itens.js.

const destaques = DESTAQUES.map(nome => ITENS.find(i => i.nome === nome));

$('#slides').innerHTML = destaques.map(i => `
  <div class="slide">
    <img src="${i.img}" alt="" width="140" height="140">
    <div><h3>${i.nome}</h3><span class="tag">${TIPOS[i.tipo]}</span><p>${i.efeito}</p></div>
  </div>`).join('');
