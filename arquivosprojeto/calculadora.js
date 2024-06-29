document.getElementById('calculateBtn').addEventListener('click', function() {
  var num1 = document.getElementById('num1').value.trim();
  var num2 = document.getElementById('num2').value.trim();
  var num3 = document.getElementById('num3').value.trim();

  if (num1 === '' || num2 === '' || num3 === '') {
      alert("Por favor, preencha todos os campos."); return;
  }

  var Checkbox1 = document.getElementById('Checkbox1').checked;
  var Checkbox2 = document.getElementById('Checkbox2').checked;

  if (!Checkbox1 && !Checkbox2) {
      alert("Por favor, selecione uma opção."); return;
  }

  if (Checkbox1 && Checkbox2) {
      alert("Por favor, selecione apenas uma opção."); return;
  }

  var resultado;
  var mediaConta = (parseFloat(num1) + parseFloat(num2) + parseFloat(num3)) / 3;

  //tarifa média no Brasil = 0,72 R$/kWh
  //irradiação solar média no Brasil = 5.15 Wh/m²
  //painel = 277W/dia com 5.15 Wh/m² de irradiação, 80% de aproveitamento

  if (Checkbox1) {
      var Total = Math.ceil(mediaConta / (0.72 * ((277 * 5.15 * 0.8) / 1000 * 30)));
      resultado = 'Resultado:' + '\n\n' + 'Serão necessárias ' + Total + ' placas solares para saciar 100% do seu consumo de energia mensal.';
      document.getElementById('resultado').innerText = resultado; 
  }

  //gera aproximadamente 335kWh/mês

  if (Checkbox2){
      var Total = Math.ceil((mediaConta / 0.72) / 335);
      resultado = 'Resultado:' + '\n\n' + 'Serão necessários ' + Total + ' geradores solares fotovoltaicos de 2,73 kWp para saciar 100% do seu consumo de energia mensal.';
      document.getElementById('resultado').innerText = resultado;
  }  
});
