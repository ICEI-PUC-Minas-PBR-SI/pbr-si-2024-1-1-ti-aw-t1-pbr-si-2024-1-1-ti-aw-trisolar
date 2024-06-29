async function login() {
  const senha = document.getElementById('senha').value;
  const email = document.getElementById('email').value;

  if (!senha || !email) {
      alert("Por favor, preencha todos os campos.");
      return;
  }

  try {
      const response = await fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/usuario?" + new URLSearchParams({senha, email}).toString());
      if (!response.ok) {
          throw new Error('Erro na requisição');
      }
      const usuario = await response.json();
      if (usuario.length === 1 && usuario[0].email === email && usuario[0].senha === senha) {
          alert("Autenticado com sucesso");
          window.location.replace("./creditos.html");
          return;
      }
      alert('Usuário não encontrado');
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao tentar realizar login');
  }
}

async function cadastrar() {
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const senha = document.getElementById('senha').value;
  const email = document.getElementById('email').value;

  if (!nome || !sobrenome || !senha || !email) {
      alert("Por favor, preencha todos os campos.");
      return;
  }

  const param = { nome, sobrenome, senha, email };

  try {
      const response = await fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/usuario", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(param)
      });

      if (!response.ok) {
          throw new Error('Erro na requisição');
      }

      const usuario = await response.json();

      if (usuario.id) {
          alert("Usuário cadastrado");
          window.location.replace("./login.html");
          return;
      }
      alert("Erro ao cadastrar");
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao tentar realizar cadastro');
  }
}
