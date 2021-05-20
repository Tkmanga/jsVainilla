//ancho y alto de mi canvas
const TABLERO = 500;
//intervalo del loop
const INTERVALO = 80;
//tamaño de cuadrado
const PESO = 10;
//config de direcciones
const DIRECCION = {
  A: [-1, 0],
  D: [1, 0],
  S: [0, 1],
  W: [0, -1],
  a: [-1, 0],
  d: [1, 0],
  s: [0, 1],
  w: [0, -1],
  ArrowDown: [0, 1],
  ArrowUp: [0, -1],
  ArrowRight: [1, 0],
  ArrowLeft: [-1, 0],
};
//control  y seteo de direccion/bicho
let controles = {
  direccion: { x: 1, y: 0 },
  bicho: [{ x: 0, y: 0 }],
  comida: { x: 0, y: 250 },
  jugando: false,
};
//variable con direcciones
let paraDonde;
let papel = document.querySelector("canvas"); //seleccionamos el item
let ctx = papel.getContext("2d"); //especificamos que trabajamos en 2d

let looper = () => {
  //para mover la serpiente se borra del canvas y se vuelve a dibujar
  //referencio la cabeza
  const sq = controles.bicho[0];
  //atrapado
  let atrapado = sq.x === controles.comida.x && sq.y === controles.comida.y;
  if (atrapado) {
    //llamo a una funcion por que conectaron ambos valores
    dibujarOtraComida();
  }
  //referencio posicion actual
  let dx = controles.direccion.x;
  let dy = controles.direccion.y;
  //le sumo la direccion a su posicion
  sq.x += dx;
  sq.y += dy;
  //llamo a la animacion dibujar
  requestAnimationFrame(dibujar);
  //vuelvo a llamar la funcion basada en un INTERVALO
  setTimeout(looper, INTERVALO);
};
let dibujarOtraComida = () => {
  let nuevaPosi = random();
  let comida = controles.comida;
  comida.x = nuevaPosi.x;
  comida.y = nuevaPosi.y;
};
//que teclas apreto el usuario ?
document.onkeydown = (e) => {
  //guardo en padonde la direccion
  paraDonde = DIRECCION[e.key];
  //deconstruyo de padonde
  const [x, y] = paraDonde;
  //valido que no se pueda ir para direccion contraria
  if (-x !== controles.direccion.x && -y !== controles.direccion.y) {
    //asigno las direcciones a mis controles
    controles.direccion.x = x;
    controles.direccion.y = y;
  }
  console.log(paraDonde);
};
let dibujar = () => {
  ctx.clearRect(0, 0, TABLERO, TABLERO); //pedimos que borre el canvas actual
  const sq = controles.bicho[0]; //guarda en una constante devuelta la cabeza del bicho
  const victima = controles.comida;
  dibujarActores("yellow", sq.x, sq.y);
  dibujarActores("red", victima.x, victima.y);
};
let dibujarActores = (color, x, y) => {
  console.log("dibujar actores", color, x, y);
  ctx.fillStyle = color; //definiendo color
  ctx.fillRect(x * PESO, y * PESO, PESO, PESO); //creo un rectangulo (x,y,w,h) sq.x y sq.y ya cambiaron del valor anterior
};
let random = () => {
  let direccion = Object.values(DIRECCION);
  return {
    x: parseInt((Math.random() * TABLERO) / PESO),
    y: parseInt((Math.random() * TABLERO) / PESO),
    d: direccion[parseInt(Math.random() * 11)],
  };
};
//cuando el documento carga...
window.onload = () => {
  posiciones = random();

  let head = controles.bicho[0];
  head.x = posiciones.x;
  head.y = posiciones.y;
  console.log(posiciones.d);
  controles.direccion.x = posiciones.d[0];
  controles.direccion.y = posiciones.d[1];
  console.log(head, controles.bicho);
  //posicion random de la comida
  posicionComida = random();
  let comida = controles.comida;
  comida.x = posicionComida.x;
  comida.y = posicionComida.y;
  looper();
};
