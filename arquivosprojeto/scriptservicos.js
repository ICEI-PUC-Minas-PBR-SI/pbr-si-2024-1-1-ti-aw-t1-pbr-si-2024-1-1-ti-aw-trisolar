var url = "https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/user";
function enviar() {
  var nome = document.getElementById("campoNOME").value;
  var email = document.getElementById("campoEMAIL").value;
  var cpf = document.getElementById("campoCPF").value;
  var num = document.getElementById("campoConta").value;
  var logradouro = document.getElementById("campoLogradouro").value;
  var municipioestado = document.getElementById("campoMunicipioEstado").value;
  var dateInput = document.getElementById("campoData").value;
  var date = new Date(dateInput);
  var data = Data(date);

  var pagamento = "PIX"; // = document.getElementById("campoPagamento").value;
  var radios = document.getElementsByName('opcaoDePagamento');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      pagamento = radios[i].value;
      break;
    }
  }


  var conta = calculoTotalAPagar(num);
  //buscarBanco(cpf);
  //if (buscarBanco == false) {
  //alert("Não foi possível encontrar o cpf informado.");
  //} else
  salvarDados(nome, email, cpf, conta, data, logradouro, municipioestado, pagamento);
  document.getElementById("campoNOME").value = "";
  document.getElementById("campoEMAIL").value = "";
  document.getElementById("campoCPF").value = "";
  document.getElementById("campoConta").value = "";
  document.getElementById("campoData").value = "";
  document.getElementById("campoLogradouro").value = "";
  document.getElementById("campoMunicipioEstado").value = "";
  document.getElementById("campoPagamento").value = "";
}
async function salvarDados(nome, email, cpf, conta, data, logradouro, municipioestado, pagamento) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      nome: nome,
      email: email,
      cpf: cpf,
      conta: conta,
      logradouro: logradouro,
      municipioestado: municipioestado,
      data: data.toISOString().split('T')[0],
      pagamento: pagamento,
    }),
  })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      buscarBanco(cpf)
    });
}
async function buscarBanco(cpf) {
  await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      for (var i = 0; i < json.lenght; i++) {
        if (json[i].cpf == cpf) {
          document.getElementById("nometxt").innerHTML = imprimeNOME(json[i].nome);
          document.getElementById("emailtxt").innerHTML = imprimeEMAIL(json[i].email);
          document.getElementById("cpftxt").innerHTML = imprimeCPF(json[i].cpf);
          document.getElementById("logradourotxt").innerHTML = imprimeLOGRADOURO(json[i].logradouro);
          document.getElementById("municipioestadotxt").innerHTML = imprimeMUNICIPIOESTADO(json[i].municipioestado);
          document.getElementById("contatxt").innerHTML = imprimeTOTALAPAGAR(json[i].conta);
          document.getElementById("datatxt").innerHTML = imprimeDATA(json[i].data);
          document.getElementById("pagamentotxt").innerHTML = imprimePAGEMENTO(json[i].pagamento);
        } else
          document.getElementById("nometxt").innerHTML = "Registro não cadastrado corretamente";
      }
    });
}
function calculoTotalAPagar(num) {
  var numero = parseFloat(num);
  var total = numero * 0.202;
  return total.toFixed(2);
}
function Data(date) {
  var resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() + 30);
  return resultDate;
}
