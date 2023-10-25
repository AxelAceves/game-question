   // Obtener referencia al botón
    const botonComenzar = document.getElementById('comenzar');

    // Agregar un evento al botón cuando se hace clic
    botonComenzar.addEventListener('click', function() {
      // Crear un elemento de audio
      const audio = new Audio('https://files.catbox.moe/6e7mex.mp3');
      
      // Reproducir el archivo de música
      audio.play();
    });
 const colors = [
    { r: 249, g: 213, b: 229 }, // #F9D5E5
    { r: 199, g: 206, b: 234 }, // #C7CEEA
    { r: 253, g: 226, b: 228 }, // #FDE2E4
    { r: 226, g: 240, b: 203 }  // #E2F0CB
];

setInterval(function() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Seleccionar un color aleatorio de la lista

    const divElement = document.getElementById("color-changing-div");
    divElement.style.backgroundColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`; // Cambiar el color de fondo

}, 2000); // 2000 milisegundos = 2 segundos
    // Obtener referencia al elemento del puntaje
    const scoreElement = document.getElementById('score');
    const scoreText = scoreElement.innerText;

    // Extraer el porcentaje de aciertos del texto
    const percentage = parseInt(scoreText);

    // Verificar si el porcentaje de aciertos es superior al 40%
    if (percentage > 40) {
      // Crear un elemento de audio
      const audio = new Audio('https://files.catbox.moe/1f183d.mp3');
      
      // Reproducir el archivo de música
      audio.play();
    }

//total preguntas del juego
const TOTAL_PREGUNTAS = 10;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 60;
//estructura para almacenar las preguntas
const bd_juego = [
  {
      id:'A',
      pregunta:"¿Qué es la radio cognitiva? Tu Respuesta Enpieza Con La Letra empieza con la letra : A",
      respuesta:"adaptativa"
  },
  {
    id:'B',
    pregunta:"¿Cuál es el término en inglés que se usa para describir un programa malicioso que se propaga a través de archivos adjuntos de correo electrónico? Tu Respuesta Enpieza Con La Letra empieza con la letra : M",
    respuesta:"malware"
  },
  {
    id:'C',
    pregunta:"¿Cuál es el nombre de un lenguaje de programación ampliamente utilizado para desarrollo web? Tu Respuesta Enpieza Con La Letra empieza con la letra : J",
    respuesta:"javaScript"
  },
  {
    id:'D',
    pregunta:"¿Archivo que controla los periféricos que se conectan a la computadora? Tu Respuesta Enpieza Con La Letra empieza con la letra : D ",
    respuesta:"driver"
  },
  {
    id:'E',
    pregunta:"¿Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir texto normal a texto cifrado? Tu Respuesta Enpieza Con La Letra empieza con la letra : E",
    respuesta:"encriptar"
  },
  {
    id:'F',
    pregunta:"¿Cómo se llama el proceso de ocultar información dentro de otra información, como ocultar un mensaje secreto en una imagen? Tu Respuesta Enpieza Con La Letra empieza con la letra : E",
    respuesta:"Esteganografía"
  },
  {
    id:'G',
    pregunta:"¿Qué término se utiliza para describir la práctica de escribir código de programación sin errores o fallos? Tu Respuesta Enpieza Con La Letra empieza con la letra : D",
    respuesta:"Depuración"
  },
  {
    id:'H',
    pregunta:"¿lenguaje utilizado para la estructura a las páginas web? Tu Respuesta Enpieza Con La Letra empieza con la letra : H ",
    respuesta:"html"
  },
  {
    id:'I',
    pregunta:"¿Aspecto que presentan los programas tras su ejecución mediante el cual ejercemos la comunicación con éstos? Tu Respuesta Enpieza Con La Letra empieza con la letra : I",
    respuesta:"interfaz"
  },
  {
    id:'J',
    pregunta:"¿Lenguaje de programación con el cual se diseño el sistema operativo Android? Tu Respuesta Enpieza Con La Letra empieza con la letra : J",
    respuesta:"java"
  },
]

//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0]
var cantidadAcertadas = 0;

//variable que mantiene el num de pregunta acual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

//Creamos el circúlo con las letras de la A a la Z
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(95 + 120 * Math.cos(angle));
  const y = Math.round(95 + 120 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
  numPreguntaActual++;
  //controlo si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual>=TOTAL_PREGUNTAS){
    numPreguntaActual=0;
  }

  if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
    while(estadoPreguntas[numPreguntaActual]==1){
      numPreguntaActual++;
      if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
      }
    }
  
    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.add("pregunta-actual");
  }
  else{
    clearInterval(countdown);
    mostrarPantallaFinal();
  }

}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value==""){
      alert("Debe ingresar un valor!!");
      return;
    }
    //obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  //controlo si la respuesta es correcta
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    //alert("Respuesta correcta")
    cantidadAcertadas++;

    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");

  }else{
    //alert("respuesta incorrecta")
    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    //quito l clase del estilo de pregunta actual
    document.getElementById(letra).classList.remove("pregunta-actual");
    //agrego la clase del estilo de pregunta mal respondida
    document.getElementById(letra).classList.add("mal-respondida");

  }
  respuesta.value="";
  cargarPregunta();
}


//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  var letra =  bd_juego[numPreguntaActual].id;
  document.getElementById(letra).classList.remove("pregunta-actual");

  cargarPregunta();
});







// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
  countdown = setInterval(() => {
    // Restar un segundo al tiempo restante
    timeLeft--;
  
    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;
  
    // Si el tiempo llega a 0, detener el cronómetro
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = (cantidadAcertadas*100)/10 + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}




  function refreshPage() {
    window.location.href = window.location.href;
  }
