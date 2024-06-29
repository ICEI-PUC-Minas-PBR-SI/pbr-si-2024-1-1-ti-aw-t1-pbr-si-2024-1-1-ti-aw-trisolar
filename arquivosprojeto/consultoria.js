function submitForm(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const form = document.getElementById('formConsultoria');
  const formData = new FormData(form);

  const nome = formData.get('nome');
  const cpf = formData.get('cpf');
  const cep = formData.get('cep');
  const descricao = formData.get('descricao');

  buscarCEP(cep)
      .then(endereco => {
          // Limpa os campos do formulário após o envio
          document.getElementById('nome').value = '';
          document.getElementById('cpf').value = '';
          document.getElementById('cep').value = '';
          document.getElementById('descricao').value = '';

          // Envia os dados com método POST
          fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Consultoria", {
              method: "POST",
              headers: { "Content-type": "application/json; charset=UTF-8" },
              body: JSON.stringify({
                  nome: nome,
                  cpf: cpf,
                  local: endereco,
                  descricao: descricao
              })
          })
          .then((response) => response.json())
          .then((json) => {
              console.log(json);
          })
          .catch(error => console.error('Erro ao cadastrar a consultoria:', error));
      })
      .catch(error => {
          alert(error.message);
          console.error(error);
      });
}

function forEach() {
  fetch("https://6de37009-3575-460f-9413-c8e682bb76a6-00-q2wcunlj54gi.janeway.replit.dev/Consultoria", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  })
      .then(response => response.json())
      .then(data => {
          const listaConsultoria = document.getElementById('ConsultoriaAntiga');
          listaConsultoria.innerHTML = ''; // Limpa o conteúdo existente

          data.forEach(function (obj) {
              const htmlConsultoria = `
                  <div class="sucesso">
                      <p class="card-text">Nome do Consultor: <span id="nomeConsultor">${obj.nome}</span></p>
                      <p class="card-text">Local: <span id="local">${obj.local}</span></p>
                      <p class="card-text">Horário: A definir</p>
                      <p class="card-text">Taxa de Transporte: R$ A definir</p>
                      <p class="card-text">Valor Total da Consultoria: R$ A definir</p>
                      <hr>
                  </div>
              `;
              listaConsultoria.innerHTML += htmlConsultoria;
          });
      })
      .catch(error => {
          console.error('Erro ao buscar dados:', error);
      });
}

//api do cep
function buscarCEP(cep) {
  const urlViaCep = `https://viacep.com.br/ws/${cep}/json/`;

  return fetch(urlViaCep)
      .then(response => response.json())
      .then(data => {
          if (!data.erro) {
              const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
              const urlMapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(endereco)}.json?access_token=${mapboxgl.accessToken}`;

              return fetch(urlMapbox)
                  .then(response => response.json())
                  .then(data => {
                      console.log('API Response:', data); // Log para verificar a resposta da API
                      if (data.features.length > 0) {
                          const [longitude, latitude] = data.features[0].center;

                          // Remove o marcador anterior se existir
                          if (marker) {
                              marker.remove();
                          }

                          // Adiciona o novo marcador no mapa
                          marker = new mapboxgl.Marker()
                              .setLngLat([longitude, latitude])
                              .addTo(map);

                          // Centraliza o mapa no novo marcador
                          map.flyTo({
                              center: [longitude, latitude],
                              zoom: 14
                          });

                          return endereco;
                      } else {
                          throw new Error('Localização não encontrada. Tente novamente.');
                      }
                  });
          } else {
              throw new Error('CEP inválido. Tente novamente.');
          }
      });
}

//api do mapa e o mapa 
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9kcmlnb2dvdWxhcnQiLCJhIjoiY2x4d2FoZHBnMmdpeDJqcHV0aXo3bHJpbSJ9.2cNX1K3MzuV_cH-HoviIAw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.5, 40],
  zoom: 9
});

map.addControl(new mapboxgl.NavigationControl());

let marker;
