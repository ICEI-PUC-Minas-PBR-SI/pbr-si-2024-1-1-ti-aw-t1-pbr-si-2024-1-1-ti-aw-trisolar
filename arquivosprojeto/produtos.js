$(document).on("click", ".btn-comprar", function() {
  var produtoId = $(this).data("produto-id");

  // Primeira requisição GET para obter informações do produto
  fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtos", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao obter produtos: ' + response.status);
      }
      return response.json();
  })
  .then(data => {
      var Produto = data;
      // Segunda requisição POST para adicionar produto ao carrinho
      return fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtoacionado", {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
              id: produtoId,
              nome: Produto[produtoId - 1].nome,
              descriçao: Produto[produtoId - 1].descriçao,
              preco: Produto[produtoId - 1].preco,
              img: Produto[produtoId - 1].img
          })
      });
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao enviar dados: ' + response.status);
      }
      return response.json();
  })
  .then(() => {
      // Após adicionar com sucesso, mostrar alerta e redirecionar para carrinho.html

      window.location.href = 'carrinho.html';

  })
  .catch(error => {

  });
});












function Carrinho(){

  fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtoacionado", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
var Produto = data;


document.getElementById('descriçao').innerHTML=Produto[(Produto.length-1)].descriçao;
document.getElementById('precoproduto').innerHTML=Produto[(Produto.length-1)].preco;
document.getElementById('Nomeproduto').innerHTML=Produto[(Produto.length-1)].nome;
document.getElementById('imagemproduto').src =Produto[(Produto.length-1)].img;

})}

function Cartao() {
  var qtde = document.getElementById('quantidade').value;

  fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtoacionado", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => response.json())
  .then( data => {
      var Produto = data;


      return fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtoacionado", {
          method: "POST",
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
              id: Produto[Produto.length - 1].id,
              nome: Produto[Produto.length - 1].nome,
              descriçao: Produto[Produto.length - 1].descriçao,
              preco: Produto[Produto.length - 1].preco,
              img: Produto[Produto.length - 1].img,
              qtde: qtde
          })
      })  
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Erro ao enviar dados: ' + response.status);
    }
    return response.json();
})
.then(() => {
    // Após adicionar com sucesso, mostrar alerta e redirecionar para carrinho.html

    window.location.href = 'cartoes.html';

})
.catch(error => {

});



}








function Comprando(){

  fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtoacionado", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
var Produto=data;

document.getElementById('preco').innerHTML=`<p><strong>Preço: </strong></p><p>R$ ${(Produto[(Produto.length-1)].preco).toFixed(2)}</p>`;
document.getElementById('total').innerHTML=`<p><strong>Total a pagar: </strong></p><p>R$ ${(Produto[(Produto.length-1)].preco*Produto[(Produto.length-1)].qtde).toFixed(2)}</p>`
document.getElementById('nomeproduto').innerHTML=`<p><strong>Nome: </strong></p><p> ${Produto[(Produto.length-1)].nome}</p>`



});

}



function Pagamento(){
  document.getElementById('Fompagar').addEventListener('submit', function(event) {
    event.preventDefault();
    fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtoacionado", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      var Produto = data;
      if(document.getElementById('cvv').value && document.getElementById('expiryDate').value && document.getElementById('cardNumber').value){


        fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtocomprado", {
          method: "POST",
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
              id: Produto[Produto.length - 1].id,
              nome: Produto[Produto.length - 1].nome,
              descriçao: Produto[Produto.length - 1].descriçao,
              preco: Produto[Produto.length - 1].preco,
              img: Produto[Produto.length - 1].img,
              qtde: Produto[Produto.length - 1].qtde
          })
        });
        window.location.href = 'andamento.html';
      }
    });
  });
}



function Mostrarandamento(){
  fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Produtocomprado", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    var Produto = data;
var mensagem;
Produto.forEach(function (obj) {
    mensagem = `
     <style>
    .styled-div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 10%; /* Ajuste conforme necessário */
      border: 2px solid grey;
      text-align: center;
    }

    .styled-div .top-blue {
      background-color: blue;
      width: 100%;
      height: 20%; /* 20% da altura total */
    }

    .styled-div .content {
      flex-grow: 1; /* Ocupa o restante do espaço */
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  </style>
 <br>
    <div class="styled-div">
  <div class="top-blue"></div>
  <div class="content">
  <br>
                   <br><span class='campo'>Nome</span>: ${obj.nome}<p>__</p>
                    <br><span class='campo'>Preço</span>: ${obj.preco}<p>__</p>
                    <br><span class='campo'>Quantidade</span>: ${obj.qtde}<p>__</p>
                    <br><span class='campo'>Previsao</span>:10 dias uteis para chegar o produto.
                  <br><hr>  </div>
</div>`;

                  document.getElementById('mostraProduto').innerHTML=mensagem;            
  });

});


}