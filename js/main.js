let buscarFormulario = document.getElementById("form_buscar");
let entradaDatos = document.getElementById("input");
var contenido = document.querySelector("#contenido");

//Listeners

buscarFormulario.addEventListener("submit", function(e) {
  console.log('listener de submit');
  e.preventDefault();
  let query = entradaDatos.value;
  console.log("resultado de la busqueda" + query);
  busqueda(query);
  entradaDatos.value = "";
});

entradaDatos.addEventListener("click", function(e) {
  console.log('listener de click');
  e.preventDefault();
  console.log("hiciste click");
  mostrar();
});

busqueda_tendencias();
ocultar();
sugerencias();



//Funciones

function mostrar() {
  document.getElementById("busqueda_sugerida").style.display = "block";
   document.getElementById("btn-buscar").style.background = "#F7C9F3"; /* para bloquear el boton buscar antes de escribir  */
}

function ocultar() {
  document.getElementById("busqueda_sugerida").style.display = "none";
  document.getElementById("btn-buscar").style.display = "disabled"; /* para bloquear el boton buscar antes de escribir  */
  document.getElementById("btn-buscar").style.background = "#E6E6E6"; /* para bloquear el boton buscar antes de escribir  */
}

function busqueda(query) {
  const apiKey = "uFuzmjfOW3bDP4ESmEQamkTeo0bGIhFL&=";
  const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=20`;
  const contenido = document.getElementById("contenido");
  fetch(path)
    .then(res => res.json())
    .then(datos => {
      /*console.log(datos.data[0].images.original.url);*/
      crear(datos);
    });
}

function reset() {
  let element = document.getElementById("contenido");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function crear(datos) {
  reset();
  datos.data.forEach(function(object) {
    console.log(object);

    let url = object.images.fixed_width.url;

    contenido.innerHTML += `

      <div class="nuevo_item"> 
      <img src=${url} width="288px" height="298px" alt="">
    
      </div>

     `;
    ocultar();
  });
}

function busqueda_tendencias() {
  const apiKey = "uFuzmjfOW3bDP4ESmEQamkTeo0bGIhFL&=";
  const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;
  const contenido = document.getElementById("cont_tendencias");
  fetch(path)
    .then(res => res.json())
    .then(datos => {
      datos.data.forEach(function(object) {
        console.log(object);

        let url = object.images.fixed_width.url;

        cont_tendencias.innerHTML += `
    
          <div class="nuevo_item"> 
          <img src=${url} width="288px" height="298px" alt="">
        
          </div>
    
         `;
      });
    });
}

function sugerencias() {
  var names = [
    "Jonathanvanness",
    "SailorMercury",
    "Fab Five",
    "Unicorns&Rainbows"
  ];

  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
    query = names[i];

    const apiKey = "uFuzmjfOW3bDP4ESmEQamkTeo0bGIhFL&=";
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`;
    const contenido = document.getElementById("cont_sugerencias");
    fetch(path)
      .then(res => res.json())
      .then(datos => {
        datos.data.forEach(function(object) {
          console.log(object);

          let url = object.images.fixed_width.url;
          let title = object.title;

          cont_sugerencias.innerHTML += `
          
          <div class="nuevo_item"> 
          <div class="cont_parrafo">
          <p class= "parrafo_surerencias">${title} </p>

          </div>
          <div class="cont_item">
          <img src=${url} width="280px" height="280px" alt="">
          <button class="ver_mas" onclick = "busqueda(query)" >Ver mas...</button>
          </div>
          </div>
    
         `;
        });
      });
    console.log(query);
  }
}

var lightStyle = true;
function setDayStyles() {
  document.getElementById("styles").href = "css/style.css";
  ocultar1();
}
function setDarkStyles() {
  document.getElementById("styles").href = "css/style_dark.css";
  ocultar1();
}

function mostrar1() {
  document.getElementById("contenedor_botones").style.display = "block";
}

function ocultar1() {
  document.getElementById("contenedor_botones").style.display = "none";
}

function mostrar_ocultar1() {
  let contenedor_botones = document.getElementById("contenedor_botones");
  if (contenedor_botones.style.display == "none") {
    mostrar1();
    document.getElementById("btn_flecha").value = "ocultar1";
  } else {
    ocultar1();
    document.getElementById("btn_flecha").value = "mostrar1";
  }
}
