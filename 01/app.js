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
};
//variable con direcciones
let paraDonde;
let papel = document.querySelector("canvas"); //seleccionamos el item
let ctx = papel.getContext("2d"); //especificamos que trabajamos en 2d

let looper = () => {
  //para mover la serpiente se borra del canvas y se vuelve a dibujar
  //refere
  const sq = controles.bicho[0];
  let dx = controles.direccion.x;
  let dy = controles.direccion.y;
  sq.x += dx;
  sq.y += dy;
  requestAnimationFrame(dibujar);
  setTimeout(looper, INTERVALO);
};

//que teclas apreto el usuario ?
document.onkeydown = (e) => {
  paraDonde = DIRECCION[e.key];
  const [x, y] = paraDonde;
  if (-x !== controles.direccion.x && -y !== controles.direccion.y) {
    controles.direccion.x = x;
    controles.direccion.y = y;
  }
  console.log(paraDonde);
};
let dibujar = (color) => {
  ctx.clearRect(0, 0, 500, 500); //pedimos que borre el canvas actual
  ctx.fillStyle = "yellow"; //definiendo color
  const sq = controles.bicho[0]; //guarda en una constante devuelta la cabeza del bicho
  ctx.fillRect(sq.x * PESO, sq.y * PESO, PESO, PESO); //creo un rectangulo (x,y,w,h) sq.x y sq.y ya cambiaron del valor anterior
};

//cuando el documento carga...
window.onload = () => {
  looper();
};
