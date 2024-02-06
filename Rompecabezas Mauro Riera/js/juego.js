// representación del tablero del juego
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Para ir guardando la posición vacia del rompecabezas
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora.
function chequearSiGano(){
    var Ultimo = 0; // Representa el ultimo dato dado en la grilla
    var Actual = 0; // Representa el dato actual dado en la grilla
        for (var fila = 0; fila < grilla.length; fila++){
        for (var columna = 0; columna < grilla.length; columna++){ // Se verifica el orden de las piezas del rompecabezas fijandose cada columna y fila
            Actual = grilla[fila][columna]
            if (Actual < Ultimo) return false; //Representa que si el ultimo valor dado es mayor al actual se marca como falso y se inicia el procedimiento devuelta
            Ultimo = Actual;
        }
    }
    return true;
}



// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
    alert("Felicitaciones, Has Ganado");
    iniciar();
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  // Modifico posición en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];
  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  // Modifico posición en el DOM
  var elementoPieza1 = document.getElementById('pieza'+pieza1);
  var elementoPieza2 = document.getElementById('pieza'+pieza2);

  var padre = elementoPieza1.parentNode;

  //Se hace variables clones para conservar el valor de ambos elementos
  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  //Se reemplaza el clon con el valor original
  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);

}


// Actualiza la posición de la pieza vacía
function actualizarposicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}

// Para chequear si la posición está dentro de la grilla.
function posicionValida(fila, columna){
  return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);

}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
function moverEnDireccion(direccion){

  var nuevaFilaPiezaBlanca;
  var nuevaColumnaPiezaBlanca;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaBlanca = posicionVacia.fila-1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo  
  else if (direccion == 38) {
    nuevaFilaPiezaBlanca = posicionVacia.fila+1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna-1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna+1;
  }
  // Se chequea si la nueva posición es válida, si lo es, se intercambia 
  if (posicionValida(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
    actualizarposicionVacia(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
  }

}


// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();  
      },500);
    } 
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
