// Formulário de contato (só existe na contato.html). O envio é de mentira: não tem servidor,

$('#form').onsubmit = e => {
  e.preventDefault();                                   // não deixa a página recarregar
  const aviso = $('#fmsg');
  const emailOk = /^\S+@\S+\.\S+$/.test($('#email').value);   // confere se parece um e-mail

  if (!$('#nome').value || !emailOk || !$('#msg').value) {
    aviso.textContent = 'Preencha nome, e-mail válido e mensagem.';
    return;
  }
  aviso.textContent = 'Mensagem enviada! (simulação: sem servidor)';
  e.target.reset();                              
};
