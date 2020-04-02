let comenzar_btn = document.getElementById("btn_comenzar");
let capturar_btn = document.getElementById("boton_capturar");
let capturar_gifo = document.getElementById("recordButton");
/*let video = document.querySelector('#pantalla');*/

//listeners

//  Aquí podrás crear tus propios guifos
comenzar_btn.addEventListener("click", () => {
  document.getElementById("gifos").style.display = "none";
  document.getElementById("capturar").style.display = "block";

 
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
.then(stream => video.srcObject = stream)
.catch(console.error);
});
  

// Un Chequeo Antes de Empezar
capturar_btn.addEventListener("click", () => {
  document.getElementById("capturar").style.display = "none";
  document.getElementById("uploadedGIF").style.display = "block";
});


// Capturando Tu Guifo
capturar_gifo.addEventListener("click", () => {
  document.getElementById("capturando").style.display = "none";
  document.getElementById("uploadedGIF").style.display = "block";
});










var recording = false; //FLAG para indicar si se esta grabando, inicia como false
var recorder; //objeto de la libreria de grabacion
var video = document.getElementById("recording"); // elemento video para ver lo que se esta grabando
var preview = document.getElementById("uploadedGIF");
const apiKey = "uFuzmjfOW3bDP4ESmEQamkTeo0bGIhFL"; // key para usar la API de GIPHY

async function captureGIF() {
  if (recording) {
    // si se esta grabando se detiene la grabacion
    result = await stopRecording();
    uploadGIF(result); // PASO 4 se carga el GIF grabado
  } else {
    // si no se esta grabando se inicia la grabacion
    startRecord();
  }
}

async function startRecord() {
  //----------------PASO 1---------------------------------
  var stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  });
  //----------------FIN PASO 1---------------------------------
  /*video.style.display = 'block';*/
  /*preview.style.display = 'none';*/
  //----------------PASO 2---------------------------------
  recorder = new RecordRTCPromisesHandler(stream, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 250
  });
  console.log(recording);
  recorder.startRecording();
  recording = true; //el FLAG cambia a true para indicar que se esta grabando.
  document.getElementById("recordButton").innerHTML = "Detener";
  video.srcObject = stream;
  video.play();
  //----------------FIN PASO 2---------------------------------
}

async function stopRecording() {
  recorder.stopRecording();
  recording = false;
  video.pause();
  //----------------PASO 3---------------------------------
  let blob = await recorder.getBlob();
  recorder.destroy();
  return blob;
  //----------------FIN PASO 3---------------------------------
}

async function uploadGIF(recordedGIF) {
  //PASO 4----------------
  let form = new FormData();
  form.append("file", recordedGIF, "example.gif");
  let result = await fetch(
    "https://upload.giphy.com/v1/gifs?api_key=" + apiKey,
    {
      method: "POST",
      body: form
    }
  );
  if (result.status == 200) {
    let parsedResult = await result.json();
    let gifId = parsedResult.data.id;
    alert("GIF cargado con exito");
    showUploadedGIF(gifId);
    video.style.display = "none";
  } else {
    alert("hubo un error al cargar el GIF");
    console.log(result);
  }
}

async function showUploadedGIF(gifId) {
  //PASO 5---------------------------

  var uploadedGIF = await fetch(
    "https://api.giphy.com/v1/gifs/" + gifId + "?api_key=" + apiKey
  );
  if (uploadedGIF.status == 200) {
    let uploadedGIFData = await uploadedGIF.json();
    localStorage.setItem("gif " + gifId, JSON.stringify(uploadedGIFData));
    // A PARTIR DE ACA ES OPCIONAL
    preview.style.display = "block";
    preview.src = uploadedGIFData.data.images.fixed_height.url;
    document.getElementById("recordButton").innerHTML = "Grabar";
  }
}
