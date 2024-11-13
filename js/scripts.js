let imgDado = document.getElementById("img-dado"); //elementos DOM
let aduioDado = document.getElementById("audioDado")
let audioGanar = document.getElementById("audioGanar")
let botonLanzar = document.getElementById("lanzar");
let divPuntajeTurno = document.getElementById("puntaje-turno");
let divPuntajeGanar = document.getElementById("puntaje-ganar");
let botonPasar = document.getElementById("pasar");
let botonIniciar = document.getElementById("iniciar");
let botonSiguiente = document.getElementById("siguiente");
let divLanzarPasar = document.getElementById("lanzarPasar");
let divPuntosDado = document.getElementById("puntosDado");
let colClases = document.getElementsByClassName("color-turno"); //variable array queguarda todos los elementos que van a cambiar de color al cambiar de turno
let switchSonido = document.getElementById("switch-sonido");
let botonSonido = document.getElementById("boton-sonido");
let sonido = true; //booleano para controlar la reproduccion de sonidos
let divP1 = document.getElementById("p1"); // div que contiene el jugador y el puntaje
let divP2 = document.getElementById("p2");
let divP3 = document.getElementById("p3");
let divP4 = document.getElementById("p4");
let acuP1 = document.getElementById("acumuladoP1"); // span que muestra el puntaje acumulado en la partida
let acuP2 = document.getElementById("acumuladoP2");
let acuP3 = document.getElementById("acumuladoP3");
let acuP4 = document.getElementById("acumuladoP4");
let eb = false; // easter egg
let ev = document.getElementById("e");

// inicializacion y debug de puntajes
let p1 = 0; //variable que guarda el puntaje acumulado en lapartida
let p2 = 0;
let p3 = 0;
let p4 = 0;
// ---

let acumulado = 0; // variable usada como contenedor temporal del puntaje acumulado de cadajugador para hacer validaciones en cada turno
let arrDivP = [divP1, divP2, divP3, divP4]; //array que contiene los div de informacion para hacer iteraciones
let arrAcuP = [acuP1, acuP2, acuP3, acuP4]; //array que contiene los span de puntaje acumulado para hacer iteraciones
let arrP = [p1, p2, p3, p4]; //array que contiene el puntaje acumulado para iterar validaciones
let jugadaTurno = 0; // variable usada como contenedor temporal del puntaje obtenido en cada turno
let valNumJugadores; // variable usada para guardar el numero de jugadores seleccionados al inicalizar
let valPuntajeGanar; // variable usada para guardar el puntaje necesario para ganar seleccionado al inicializar
let intNumJgs; // variable que guarda el parseInt del numero de jugadores para hacer validaciones
let intPtjGan; // variable que guarda el parseInt del puntaje necesario para ganar para hacer validaciones
let turno = 0; // inicializacion de la variable que lleva el turno actual
let cambioColores; // variable usada como contenedor temporal que guarda el ID del intervalo que da color al div de jugadores en cada turno
let intervalos = {}; // array para guardar el ID de los intervalos para garantizar su desactivacion
let coloresOpacos = ["slategray", "#327c6e", "#346a14", "#812853", "#af5a32"]; // paleta de colores del sitio
let coloresMedios = ["slategray", "#3ca08c", "#4ea919", "#ad336c", "#b96f3e"]
let coloresBrillantes = ["whitesmoke", "#89ffe7", "#dbffc7", "#ff84bd", "#f5b18a"];
let noRepetir = 0; // variable usada como contenedor temporal para guardar el randomizador de imagenes y sonidos

// Funciones de inicializacion de juego

function InicializarReglas() { // funcion para determinar el numero de jugadores y los puntos necesarios para ganar
    valNumJugadores = document.getElementById("numJugadores").value; // obtiene el valor del select de numero de jugadores
    valPuntajeGanar = document.getElementById("puntajeGanar").value; // obtiene el valor del select de numero de jugadores
    intNumJgs = parseInt(valNumJugadores); // obtiene el entero del numero de jugadores para realizar validaciones
    intPtjGan = parseInt(valPuntajeGanar); // obtiene el entero del puntaje necesario para ganar para realizar validaciones
    document.getElementById("divSeleccion").style.display = "none"; //esconde el div para inicializar las reglas
    IniciarJuego(intNumJgs, intPtjGan); // llama la funcion para iniciarel juego con los argumentos de numero de jugadores y puntaje para ganar
}

function IniciarJuego(numJgs, pts) { // funcion para inicializar el area de juego y mostrar los div necesarios dependiendo del nuemero de jugadores
    for (let i = 0; i < numJgs; i++) { // iteracion dependiente del numero de jugadores pasado como argumento
        arrDivP[i].style.display = "block"; // itera entre los elementos div de cada jugador para cambiar su estado de "none" a block"
    }
    divPuntosDado.style.display = "flex"; // Muestra el div de puntos y juego
    divPuntajeTurno.style.display = "block"; // Muestra el div de puntos del turno
    divPuntajeGanar.style.display = "block"; // Muestra el div de los puntos para ganar
    divLanzarPasar.style.display = "flex"; // Muestra el div de botones de juego
    divPuntajeGanar.textContent = "Puntaje para ganar: " + pts; // inicializa el div informativo con los puntos necesarios para acabar la partida pasados como argumento
    SiguienteTurno(); // llama la funcion para inicializar los turnos
}
// ---

// Funciones esteticas y animaciones

function CambiarColores() { // funcion para cambiar los colores de los componentes en el array colClases a la paleta de colores de cada turno
    for (let i = 0; i < colClases.length; i++) { //itera dentro del array
        colClases[i].style.backgroundColor = coloresOpacos[turno]; // aplica color oscuro al fondo
        colClases[i].style.borderColor = coloresBrillantes[turno]; // aplica color brillante a bordes
        //colClases[i].style.color = coloresBrillantes[turno]; // aplica color brillante a texto
    }
}

function TurnoBorde(element) { // efecto de pulsacion para el div contenedor del puntaje del turno actual
    let indice = 0; //indice para iterar entre los colores
    let colores = [coloresBrillantes[turno], "whitesmoke"]; // array que contiene el array con la paleta de colores y el color blanco para bordes
    let background = [coloresOpacos[turno], coloresMedios[turno]]; // array que contiene los array de colores opacos y medios para el fondo
    cambioColores = setInterval(() => { // variable que contendra el valor del intervalo en el que se ejecutara indefinidamente el bloque de codigo
        element.style.borderColor = colores[indice]; //cambia el color del borde
        element.style.backgroundColor = background[indice]; // cambia el color de fondo
        indice = (indice + 1) % colores.length; // operador MOD que no deja que el indice se salga de los limites (el resultado siempre sera entre 0 y arry.lenght)
    }, 600); //el intervalo se repite cada 600 ms
    intervalos[element.id] = cambioColores; // guarda el ID del intervalo en el indice correspndiente al elemento HTML
}

function PararTurnoBorde(element) { //funcion para detener el efecto de pulsacion
    let clear = intervalos[element.id]; //guarda temporalmente el ID del intervalo a detener
    clearInterval(clear); //detiene el intervalo
    intervalos[element.id] = null; //elimina el ID del array de intervalos
    element.style.borderColor = coloresBrillantes[turno]; // cambia el color de fondo y de borde del div a los correspondientes del turno actual
    element.style.backgroundColor = coloresOpacos[turno];
}

function ColorBotonAudio() { // cambia el color del boton de audio para que corresponda al color del jugador
    switchSonido.classList.add('fade-out'); //añade la clase fade-out para desvanecer la iamgen actual
    setTimeout(() => { // se ejecuta con timeout para darle tiempo a la imagen de desvanecer
        if (sonido) {   //si el sonido esta activado...
            switchSonido.src = "./images/on_" + turno + ".png"; // cambia la imagen a la version activa del color de turno actual
        } else { //si el sonido esta desactivado...
            switchSonido.src = "./images/off_" + turno + ".png"; // cambia la imagen a la version desactivada del color de turno actual
        }
        switchSonido.onload = () => { //cuando la imagen termine de cargar
            switchSonido.classList.remove('fade-out'); //remueve el fade-out
            switchSonido.classList.add('fade'); //añade fade-in para que reaparezca
        };
    }, 200); //timeout de 200 ms
}

function Ef() {
    if (eb) {// estado ON
        eb = false; // cambia a OFF
        console.log("Desactivado");
    } else { // estado OFF
        eb = true; // cambia a ON
        console.log("Activado");
    }
}

function BotonAudio() { //switch para el booleano que controla si se reproducen los sonidos
    if (sonido) {// estado ON
        sonido = false; // cambia a OFF
    } else { // estado OFF
        sonido = true; // cambia a ON
    }
    ColorBotonAudio(); //cambia la imagen del boton de sonido al color de turno y su respectica representacion de ON y OFF
}
// ---

// Funciones de flujo de juego

function SiguienteTurno() { // funcion que lleva el flujo de juego al cambiar el turno actual
    let turnoanterior = turno; // variable que guarda el numero de turno inmediatamente anterior
    turno = turno + 1; // incrementa el turno en 1
    if (turno > intNumJgs) { // no permite que numero de turno sea mayor al numero de jugadores
        turno = 1 // si el numero de turno supera la numero de jugadores, reinicia el ciclo de turnos (vuelve a empezar en el turno 1)
    }
    if (turnoanterior != 0) { // cuando se inicia el juego, la variable turnoanterior == 0. el if impide que se corra este bloque al inicio de la partida (inidice array '-1')
        PararTurnoBorde(arrDivP[turnoanterior - 1]); // llama la funcion para detener el intervalo de pulsacion del div del jugador anterior
        // (el rango de turno es 1 a intNumJgs(2/3/4) el indice del array van de 0 a 3, por eso el indice debe ser turnoanterior-1)
    }
    TurnoBorde(arrDivP[turno - 1]); // llama la funcion para iniciar el intervalo de pulsacion en el div del jugador del turno actual
    ColorBotonAudio(); //cambia el color del boton de audio al color del jugador del turno actual
    divPuntajeTurno.textContent = ("Jugador " + turno + ", tu turno!"); //muestra el mensaje de cambio de turno
    CambiarColores(); // cambia la paleta de colores dela pagina a la del jugador del turno actual
    HabilitarBotones(); // habilita los botones de juego para empezar el turno
}

function LanzarDado(event) { // funcion para lanzar el dado, obtener el puntaje del turno y reproducir el sonido del dado
    let tirada = NumRandom(1, 6); //llama la funcion para obtener una tirada de dado (numero aleatorio entre 1 y 6)
    let randomizar; // inicializa la variable para guardar un numero que randomiza las imagenes y los sonidos
    do { // ciclo do while paraque el numero de randomizacion de imagenes y sonidos no sea el mismo 2 veces seguidas
        randomizar = NumRandom(1, 4); // obtiene un numero aleatorio entre 1 y 4
    } while (randomizar == noRepetir); // compara si el numero obtenido es igual al numero anterior guardado en la variable noRepetir
    noRepetir = randomizar // guarda el numero obtenido para ser comparado en la proxima ejecucion
    CambiarDado(tirada, randomizar); // funcion para cambiar la imagen del dado dependiendo de la tirada de dado y el randomizador de imagenes y sonidos
    divPuntajeTurno.textContent = tirada; // muestra la tirada obtenida en un div
    Jugar(arrP[turno - 1], tirada); // funcion para calcular la suma de las tiradas del turno y el acumulado total
    if (tirada == 1) { // cuando la tirada de dado es == 1 el turno se pirde
        let audio = new Audio("./assets/D_perder.mp3"); // crea un objeto de tipo sonido con un archivo de audio de tirada de dado especial para el 1
        audio.volume = 0.7; // controla el volumen del audio
        if (sonido) { // si el switch de sonido se encuentra en estado ON...
            audio.play(); // reproduce el sonido de tirada == 1
        }
        DeshabilitarBotones(); // funcion para deshabilitar los botones de juego y habilitar el boton de siguiente jugador
        Sacudir(tirada); // agrega un efecto visual a la tirada == 1
        jugadaTurno = 0; // actualiza la variable para que el puntaje se pierda
        acumulado = 0; // actualiza la variable para que pueda ser usada por el siguiente jugador
    } else if ((arrP[turno - 1] + jugadaTurno) >= intPtjGan) { // evalua si el puntaje obtenido en el turno es suficiente para ganar la partida
        Pasar(event); //llama la funcion para actualizar el puntaje y terminar el juego
    } else { // si el puntaje no es el necesario para ganar...
        let audio = new Audio("./assets/D_" + randomizar + ".mp3"); // crea un objeto de tipo sonido utilizando el randomizador para el archivo
        if (sonido) { // si el switch de sonido se encuentra en estado ON...
            audio.play(); // reproduce el sonido randomizado
        }
    }
}

function NumRandom(min, max) { // randomizador que usa los argumentos min y max como el rango de los numeros generados
    return Math.floor(Math.random() * (max - min + 1)) + min; //ver archivo ./assets/NumRandomExplicacion.txt para la explicacion del codigo
}

function CambiarDado(val1, val2) { /// funcion para cambiar y randomizar la imagen del dado usando como argumentos 2 valores
    imgDado.src = "./images/" + val1 + "_" + val2 + ".png"; // cambia el src del elemento HTML img que muestra el dado
    // val1 (tirada del dado con valores 1 - 6), determina las imagenes con la cara superior del dado respectiva a la tirada
    // val2 (randomizador con valores 1 - 4), determina la variacion de la imagen con diferentes caras a los lados
}

function HabilitarBotones() { // funcion para activar los botones de juego al inicio del turno
    botonLanzar.disabled = false; // activa el boton delanzar
    botonPasar.disabled = false; // activa el boton de pasar
    botonSiguiente.disabled = true; // desactiva el boton para cambiar de jugador
    botonLanzar.style.backgroundColor = coloresOpacos[turno]; // cambia el color de fondo del boton lanzar
    botonLanzar.style.borderColor = coloresBrillantes[turno]; // cambia el color de borde del boton lanzar
    //botonLanzar.style.color = coloresBrillantes[turno]; // cambia el color detexto del boton lanzar
    botonPasar.style.backgroundColor = coloresOpacos[turno]; //boton pasar
    botonPasar.style.borderColor = coloresBrillantes[turno];
    //botonPasar.style.color = coloresBrillantes[turno];
    botonSiguiente.style.backgroundColor = "slategray"; // colores "desactivados" para el boton siguiente
    botonSiguiente.style.borderColor = "whitesmoke";
    //botonSiguiente.style.color = "whitesmoke";
}

function DeshabilitarBotones() { // funcion para desactivar los botones de juego al tirar un 1 y activar el boton de siguiente jugador
    botonLanzar.disabled = true; // desactiva el boton lanzar
    botonPasar.disabled = true; // desactiva el boton pasar
    botonSiguiente.disabled = false; // activa el boton siguiente
    botonLanzar.style.backgroundColor = "slategray"; // colores "desactivados" para lanzar y pasar
    botonLanzar.style.borderColor = "whitesmoke";
    //botonLanzar.style.color = "whitesmoke";
    botonPasar.style.backgroundColor = "slategray";
    botonPasar.style.borderColor = "whitesmoke";
    //botonPasar.style.color = "whitesmoke";
    botonSiguiente.style.backgroundColor = coloresOpacos[turno]; // colores del turno actual para el boton siguiente
    botonSiguiente.style.borderColor = coloresBrillantes[turno];
    //botonSiguiente.style.color = coloresBrillantes[turno];
}

// -> // (control de tiempo para hacer la tirada == 1 mas significativa):

function Sacudir(val) { // funcion para sacudir el div que muestra la tirada de dado, utiliza un valor como argumento para ser mostrado como mensaje
    divPuntajeTurno.classList.add('shake'); // añade la clase shake que inicia la animacion CSS
    let defColor = divPuntajeTurno.style.color + ""; // variable para almacenar temporalmente el valor de color de texto (como string) del div que muestra la tirada
    divPuntajeTurno.style.color = "red"; // cambia el color  de texto del div de tirada
    divPuntajeTurno.addEventListener('animationend', () => { // espera a que la animacion termine
        divPuntajeTurno.classList.remove('shake'); //remueve la animacion
        divPuntajeTurno.style.color = defColor; // cambia al color de texto predeterminado
        setTimeout(() => { // espera 500 ms 
            divPuntajeTurno.textContent = val + " ... Pierdes el turno!"; // añade texto informativo
        }, 500); // espera 500 ms para ejecutar el bloque decodigo

    });
}

// -> // ---

function Jugar(p, tirada) { // funcion para calulcar el puntaje de cada turno, usando como argumentos las variables de puntaje y la tirada de dado
    acumulado = p; //obtiene el valor acumulado del jugadir actual (el argumento p es pasado a la funcion como el inidice [turno actual - 1] del array arrP{puntaje de jugadores 1 a 4})
    if (tirada != 1) { // si la tirada es diferente a 1...
        jugadaTurno = jugadaTurno + tirada; // la variable jugada turno llevara la sumatoria de las tiradas
        arrAcuP[turno - 1].textContent = jugadaTurno + acumulado; // actualiza el texto informativo del acumulado + el puntaje conseguido del turno actual
    } else { // si la tirada == 1
        arrAcuP[turno - 1].textContent = p; // actualiza el texto informativo al puntaje acumulado antes de empezar el turno
    }
}

/* -> // Pasar() se usa manualmente para guardar el puntaje, pero LanzarDado() llamara a
Pasar() automaticamente cuando la tirada + acumulado >= al puntaje para ganar, de lo 
contrario, el jugador tendria que guardar el puntaje manualmente una vez se llegue al objetivo
pulsando el boton Pasar para ganar:*/

function Pasar(event) { // funcion para guardar el puntaje obtenido en el turno y evaluar si el puntaje es sufuciente para ganar
    let guardar = jugadaTurno + acumulado // guarda en una variable temporal la suma del acumulado  y los puntos obtenidos en el turno actual
    if (guardar > 0) { //evalua si se hicieron tiradas en el turno ya que jugadaTurno y acumulado solo se actualizan si se usa el boton Lanzar
        arrP[turno - 1] = guardar; // se actualiza el nuevo puntaje en la variable respectiva para el jugador del turno actual
    }
    jugadaTurno = 0; // se actualizan las variables temporales para el siguiente jugador
    acumulado = 0;
    if (arrP[turno - 1] < intPtjGan) { // si el puntaje es menor al necesario para ganar...
        DeshabilitarBotones(); // se llama la funcion para deshabilitarlos botones de juego y habilitar el boton de siguiente jugador
        arrAcuP[turno - 1].textContent = arrP[turno - 1]; // se actualiza el puntaje informativo del acumulado para que corresponda al nuevo puntaje acumulado
        divPuntajeTurno.textContent = "Puntaje guardado!"; // se muestra un texto informativo para indicar que se guardo el puntajo 
    } else { //si el puntaje es mayor o igual al necesario para ganar
        Ganador(); // se llama la funcion para cerrar el juego
        reproducirGifEnPosicion(event); // se llama la funcion para reproducir una anumacion
    }
}

/* -> // event se usa como argumento en LanzarDado(event) para despues ser usado como argumento en 
Pasar(event) y por ultimo ser usado como argumento en reproducirGifEnPosicion(event), ya que
event hace referencia al EventListener(click) del boton lanzar (que desencadena las 3 funciones
mencionadas) para obtener las coordenadas del puntero, necesarias para la animacion de ganar */
// -> // ---

// ---

// Funciones para finalizar el juego

function Ganador() { // funcion para desactivartodos los botones y mostrar el jugador del turno actual comoganador
    botonLanzar.disabled = true; // desactiva todos los botones
    botonPasar.disabled = true;
    botonSiguiente.disabled = true;
    botonLanzar.style.backgroundColor = "slategray"; // colores "desactivados" para los botones de juego
    botonLanzar.style.borderColor = "whitesmoke";
    //botonLanzar.style.Color = "whitesmoke";
    botonPasar.style.backgroundColor = "slategray";
    botonPasar.style.borderColor = "whitesmoke";
    //botonPasar.style.Color = "whitesmoke";
    botonSiguiente.style.backgroundColor = "slategray";
    botonSiguiente.style.borderColor = "whitesmoke";
    //botonSiguiente.style.Color = "whitesmoke";
    divPuntajeTurno.textContent = "El Jugador " + turno + " es el Ganador!!!"; // cambia el texto informativo al jugador ganador

}

function reproducirGifEnPosicion(event) { // funcion para reproducir un gif en la posicion del puntero y un sonido

    let audio = new Audio("./assets/win.mp3"); // crea un objeto de tipo sonido con el audio que se reproduce al ganar
    if (sonido) { //si el sonido esta activado...
        audio.play(); // reproduce el sonido
    }

    if (!eb) {
        let x = event.clientX; // Obtener las coordenadas X y Y del mouse (en el momento del clic)
        let y = event.clientY; // clientX/Y se refiere a la coordenada horizontal del ratón dentro de la ventana del navegador.


        let gif = document.createElement("img"); // Crea el elemento HTML img para el GIF
        gif.src = "./assets/win.gif"; // Cambia el src de img a la URL del gif
        gif.style.position = "absolute"; // se configura a posicion absoluta para no intervenir con los demas elementos del DOM
        gif.style.left = `${x - 75}px`; // se ajusta para centrar el GIF alrededor del clic
        gif.style.top = `${y - 65}px`;
        gif.style.width = "150px"; // Tamaño del GIF
        gif.style.height = "150px";


        document.body.appendChild(gif); // Añade el GIF al documento


        gif.onload = function () { // ejecuta el bloque después de que el Gif termine de reproducirse
            setTimeout(function () {
                gif.remove(); // Eliminar el GIF 
            }, 3700); // Este tiempo debe coincidir con la duración del GIF (aprox)
        };
    } else { //easter egg
        let posl = imgDado.style.left;
        let post = imgDado.style.top;
        imgDado.style.position = "absolute";
        imgDado.style.left = posl;
        imgDado.style.top = post
        imgDado.src = "./assets/win.gif";
        imgDado.style.width = "15%";
        imgDado.style.height = "30%";
        setTimeout(function () {
            imgDado.remove();
        }, 3700);
    }
}

// ---

// EventListeners de botones

botonLanzar.addEventListener("click", LanzarDado);
botonIniciar.addEventListener("click", InicializarReglas);
botonPasar.addEventListener("click", Pasar);
botonSiguiente.addEventListener("click", SiguienteTurno);
botonSonido.addEventListener("click", BotonAudio);
ev.addEventListener("click", Ef);

document.addEventListener("keydown", function(event) {
    
    if (event.code === "KeyL") {
        botonLanzar.click(); // Dispara el evento click en el botón Lanzar
    }
    if (event.code === "Space") {
        botonPasar.click(); 
    }
    if (event.code === "KeyP") {
        botonSiguiente.click();
    }
    if (event.code === "KeyI" & document.getElementById("divSeleccion").style.display != "none") {
        botonIniciar.click();
    }
});