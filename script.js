

// --------------- buttons -------------------
const btnbuscar = document.getElementById('btnBuscar');
btnbuscar.addEventListener('click', getCep);
btnbuscar.addEventListener("touchstart", getCep);

const newbusca = document.getElementById('newbusca');
newbusca.addEventListener('click', NewSearch);



// -----------------  div elements ---------------------
let endereco = document.getElementById('endereco');
let bairro = document.getElementById('bairro');
let cidade = document.getElementById('cidade');
let estado = document.getElementById('estado');
let embedmap = document.getElementById("embedmap");

// --------------- sections divs -------------------
let results = document.getElementById("results");
let search = document.getElementById("search");


// --------------  Functions ---------------------
function getCep(e) {

    let cep = document.getElementById('cep').value;
    e.preventDefault();
    cep.replace('-', ''); // retira todos os ' - ' para cep sem espaços
    let url = 'https://brasilapi.com.br/api/cep/v1/' + cep; // monta url
    let map = 'https://maps.google.com/maps?q=' + cep + '&z=16&output=embed'; // monta url do mapa
    let dados = null;

    // verifica se o input foi preenchido e faz a requisição do cep
    if (cep != "") {
        fetch(url)
        // Tratamento do sucesso
        .then(response => response.json())  
        .then(data => {
            dados = data;
            // console.log(dados)
            endereco.innerHTML = dados.street;
            bairro.innerHTML = dados.neighborhood;
            cidade.innerHTML = dados.city;
            estado.innerHTML = dados.state;
            embedmap.src = map;
               
            // erro ao buscar cep ou usuario digitar errado
            if (dados.type == "service_error" || dados.type == 'validation_error') {
                endereco.innerHTML = 'Não Encontrado';
                bairro.innerHTML = 'Não Encontrado';
                cidade.innerHTML = 'Não Encontrado';
                estado.innerHTML = 'Não Encontrado';
                embedmap.src = 'https://miro.medium.com/max/620/1*viqIrYzAw_SbAb8TqShNIA.png';
                ErroAlert();
            }
        })
          //error
            .catch(err => { alert('Cep não encontrado. Tente Novamente!', err)});
               
        
        // ativa e desativa as sessoes da pagiana 
        search.style.display = "none";
        results.style.display = "flex";
        
         } else {
           results.style.display = "none";
         }
};

function NewSearch() {
    search.style.display = "flex";
    results.style.display = "none";
    document.getElementById('cep').value = '';
}

function ErroAlert() {
    setTimeout(function () { alert('Oooops Endereço Não Encontrado \nTente Novamente!'); NewSearch(); }, 1000);
}