let buscarFormulario = document.getElementById("form_buscar");
let entradaDatos = document.getElementById("input");
var contenido = document.querySelector("#contenido");

//Listeners

buscarFormulario.addEventListener("submit", function(e) {
  e.preventDefault();
  let query = entradaDatos.value;
  console.log("resultado de la busqueda" + query);
  busqueda(query);
  entradaDatos.value = "";
});

entradaDatos.addEventListener("click", function(e) {
  e.preventDefault();
  console.log("hiciste click");
  mostrar();
});

busqueda_tendencias();

sugerencias();

//Funciones

function mostrar() {
  document.getElementById("busqueda_sugerida").style.display = "block";
}

function ocultar() {
  document.getElementById("busqueda_sugerida").style.display = "none";
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
    let width = object.images.fixed_width.width;
    let height = object.images.fixed_height.height;

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
        let width = object.images.fixed_width.width;
        let height = object.images.fixed_height.height;

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
          let width = object.images.fixed_width.width;
          let height = object.images.fixed_height.height;

          cont_sugerencias.innerHTML += `
          
          <div class="nuevo_item"> 
           
          <p class= "parrafo_surerencias">${title}</p>
          <img src=${url} width="288px" height="298px" alt="">
          <button class="ver_mas">Ver mas...</button>
          
          </div>
    
         `;
        });
      });
    console.log(query);
  }
}

////CAMBIO DE ESTILOS/////

let cambio = document.getElementById("cambio_css");
 //Listeners

 cambio.addEventListener("change", function (e) {
  e.preventDefault();
  console.log("hiciste click");
    
  changeStyles(GetSelectedValue);
});



var lightStyle = true;
function changeStyles() {
  if (lightStyle == 1) {
      document.getElementById('styles').href = "css/style.css";
      lightStyle = false;
  }
  else {
      document.getElementById('styles').href = "css/style_dark.css";
      lightStyle = true;
  }

}



function GetSelectedValue() {
  var e = document.getElementById("cambio_css");
  var result = e.options[e.selectedIndex].value;
  
}
