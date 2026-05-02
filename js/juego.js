/* ==========================================================================
   🕹️ APPWISE CLICKER - TAREA DE SEMANA 5
   Objetivo: Aplicar Eventos, setInterval y LocalStorage.
========================================================================== */



let monedas = 0;
let mineros = 0;
let costoMinero = 10;

// 2. ATRAPAMOS LOS ELEMENTOS DEL DOM
const btnMinar = document.querySelector("#btn-minar");
const btnComprarMinero = document.querySelector("#btn-comprar-minero");
const btnReset = document.querySelector("#btn-reset");

const displayMonedas = document.querySelector("#display-monedas");
const displayMps = document.querySelector("#display-mps"); // Monedas por segundo
const displayMineros = document.querySelector("#display-mineros");
const displayCosto = document.querySelector("#display-costo");
const clave = 'KEY_STORAGE_MONEDAS'
function cargarPartida() {

    monedas = parseInt(localStorage.getItem(clave)) || 0
    mineros = parseInt(localStorage.getItem(clave)) || 0
    costoMinero = parseInt(localStorage.getItem(clave)) || 10
    actualizarPantalla();
}

function guardarPartida() {
    localStorage.setItem(clave, monedas)
    localStorage.setItem(clave, mineros)
    localStorage.setItem(clave, costoMinero)
}

function actualizarPantalla() {
  // Esta función ya te la damos lista. Dibuja los datos en el HTML.
  displayMonedas.textContent = monedas;
  displayMps.textContent = mineros;
  displayMineros.textContent = mineros;
  displayCosto.textContent = costoMinero;

  // Deshabilitar el botón de compra si no alcanza el dinero
  if (monedas >= costoMinero) {
    btnComprarMinero.disabled = false;
  } else {
    btnComprarMinero.disabled = true;
  }
}

btnMinar.addEventListener("click", () => {
  monedas++

  guardarPartida()
  actualizarPantalla()
});


btnComprarMinero.addEventListener("click", () => {
  if(monedas < costoMinero) {
    alert('No tienes suficientes monedas')
    return
  }

  monedas -=costoMinero
  mineros++
  costoMinero = Math.floor(costoMinero * 1.5)

  guardarPartida()
  actualizarPantalla()
});

// Evento para borrar todo (Modo Dios)
btnReset.addEventListener("click", () => {
  if (confirm("¿Estás seguro de perder todo tu progreso?")) {
    localStorage.clear();
    monedas = 0;
    mineros = 0;
    costoMinero = 10;
    actualizarPantalla();
  }
});

setInterval(() => {
    if(mineros > 0) {
        monedas += mineros
        guardarPartida()
        actualizarPantalla()
    }
}, 1000)
cargarPartida();
