// Faz TODOS os carrosséis da página funcionarem (o de destaques e a galeria de imagens).
//   .slide ou .shot ... os slides (um aparece por vez)
//   .prev e .next ..... as setas
//   .pos .............. o contador "1 / 5"
//   data-auto="7000" .. se tiver, passa sozinho a cada 7000 ms
document.querySelectorAll('.carousel').forEach(carrossel => {
  const slides = [...carrossel.querySelectorAll('.slide, .shot')];
  const intervalo = Number(carrossel.dataset.auto) || 0;       
  const reduzirMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let atual = 0;                                                  
  let relogio = null;                                        
  let pausadoPeloUsuario = reduzirMovimento;               

  carrossel.style.setProperty('--tempo', intervalo + 'ms');        

  const areaMiniaturas = carrossel.querySelector('.thumbs');
  if (areaMiniaturas && !areaMiniaturas.children.length) {
    areaMiniaturas.innerHTML = slides.map((s, k) => {
      const foto = s.querySelector('img');
      return `<button type="button" aria-label="Ver imagem ${k + 1}: ${foto.alt}"><img src="${foto.src}" alt="" loading="lazy"></button>`;
    }).join('');
  }
  const miniaturas = [...carrossel.querySelectorAll('.thumbs button')];

  // Mostra o slide número n (depois do último vem o primeiro denovo)
  function mostrar(n) {
    atual = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === atual));
    miniaturas.forEach((m, k) => m.setAttribute('aria-current', k === atual));

    const pos = carrossel.querySelector('.pos');
    if (pos) pos.textContent = `${atual + 1} / ${slides.length}`;
    const legenda = carrossel.querySelector('.legenda');
    if (legenda) legenda.textContent = slides[atual].querySelector('img').alt;
  }

  // ---------- Passagem automática ----------
  function barra(ligada) {
    carrossel.classList.remove('rodando');
    if (ligada) { void carrossel.offsetWidth; carrossel.classList.add('rodando'); }   
  }
  function parar() { clearInterval(relogio); relogio = null; barra(false); }
  function iniciar() {
    parar();
    if (intervalo && !pausadoPeloUsuario) {
      relogio = setInterval(() => { mostrar(atual + 1); barra(true); }, intervalo);
      barra(true);
    }
  }
  // Quando a pessoa navega na mão, mostra o slide e recomeça a contagem dos 7 segundos
  function ir(n) { mostrar(n); iniciar(); }

  // ---------- Botões ----------
  carrossel.querySelector('.prev').onclick = () => ir(atual - 1);
  carrossel.querySelector('.next').onclick = () => ir(atual + 1);
  miniaturas.forEach((m, k) => m.onclick = () => ir(k));
  carrossel.addEventListener('keydown', e => {                     
    if (e.key === 'ArrowLeft') ir(atual - 1);
    if (e.key === 'ArrowRight') ir(atual + 1);
  });


  const botaoPausa = carrossel.querySelector('.pausa');
  function atualizarPausa() {
    if (!botaoPausa) return;
    botaoPausa.textContent = pausadoPeloUsuario ? '▶' : '⏸';
    botaoPausa.setAttribute('aria-label', pausadoPeloUsuario ? 'Retomar a passagem automática' : 'Pausar a passagem automática');
  }
  if (botaoPausa) botaoPausa.onclick = () => { pausadoPeloUsuario = !pausadoPeloUsuario; atualizarPausa(); iniciar(); };

  // Enquanto o mouse está em cima (ou o foco está dentro), não passa sozinho
  carrossel.addEventListener('mouseenter', parar);
  carrossel.addEventListener('focusin', parar);
  carrossel.addEventListener('mouseleave', iniciar);
  carrossel.addEventListener('focusout', iniciar);

  // Botão de tela cheia 
  const botaoTela = carrossel.querySelector('.tela');
  const palco = carrossel.querySelector('.palco');
  if (botaoTela) {
    if (!palco.requestFullscreen) botaoTela.hidden = true;
    else botaoTela.onclick = () => document.fullscreenElement ? document.exitFullscreen() : palco.requestFullscreen();
  }

  mostrar(0);
  atualizarPausa();
  iniciar();
});
