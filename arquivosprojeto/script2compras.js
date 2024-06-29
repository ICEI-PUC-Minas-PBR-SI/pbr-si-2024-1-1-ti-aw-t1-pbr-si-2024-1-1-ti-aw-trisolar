const url = "https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/user";
function imprimeNOME(vetor) {
  var mensagem = "";
  vetor.forEach(function(obj) {
    mensagem = ` <span class='campo'>Nome </span>: ${obj.nome}`;
  });
  return mensagem;
}
function imprimeEMAIL(vetor) {
  var mensagem1 = "";
  vetor.forEach(function(obj) {
    mensagem1 = `<span class='campo'>Email </span>: ${obj.email}`;
  });
  return mensagem1;
}

function imprimeCPF(vetor) {
  var mensagem2 = "";
  vetor.forEach(function(obj) {
    mensagem2 = `<span class='campo'>CPF / CNPJ </span>: ${obj.cpf}`;
  });
  return mensagem2;
}
function imprimeLOGRADOURO(vetor) {
  var mensagem3 = "";
  vetor.forEach(function(obj) {
    mensagem3 = `<span class='campo'>Logradouro </span>: ${obj.logradouro}`;
  });
  return mensagem3;
}
function imprimeMUNICIPIOESTADO(vetor) {
  var mensagem4 = "";
  vetor.forEach(function(obj) {
    mensagem4 = `<span class='campo'>Municipio/Estado </span>: ${obj.municipioestado}`;
  });
  return mensagem4;
}
function imprimeTOTALAPAGAR(vetor) {
  var mensagem6 = "";
  vetor.forEach(function(obj) {
    mensagem6 = `<span class='campo'>Total a pagar </span>: $${obj.conta}`;
  });
  return mensagem6;
}
function imprimeDATA(vetor) {
  var mensagem7 = "";
  vetor.forEach(function(obj) {
    mensagem7 = `<span class='campo'>Próximo Vencimento </span>: ${obj.data}`;
  });
  return mensagem7;
}
function imprimePAGAMENTO(vetor) {
  var mensagem8 = "";
  vetor.forEach(function(obj) {
    mensagem8 = `<span class='campo'>Forma de pagamento: <br></span> ${obj.pagamento}`;
  });
  return mensagem8;
}
async function buscarBanco() {
  await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      document.getElementById("nometxt").innerHTML = imprimeNOME(json);
      document.getElementById("emailtxt").innerHTML = imprimeEMAIL(json);
      document.getElementById("cpftxt").innerHTML = imprimeCPF(json);
      document.getElementById("logradourotxt").innerHTML = imprimeLOGRADOURO(json);
      document.getElementById("municipioestadotxt").innerHTML = imprimeMUNICIPIOESTADO(json);
      document.getElementById("contatxt").innerHTML = imprimeTOTALAPAGAR(json);
      document.getElementById("datatxt").innerHTML = imprimeDATA(json);
      document.getElementById("pagamentotxt").innerHTML = imprimePAGAMENTO(json);
    });
}