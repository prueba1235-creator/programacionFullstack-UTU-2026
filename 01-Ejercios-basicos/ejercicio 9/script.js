//1

/*
console.log("Hola Mundo");
*/

//2

/*
    let nombre = prompt("nombre ");

    console.log(`Hola ${nombre}`);
*/

//3

/*
let primerNumero = prompt("Ingresa el primer número:");
let segundoNumero = prompt("Ingresa el segundo número:");

let resultado = Number(primerNumero) + Number(segundoNumero);

console.log(`La susma de los números es: ${resultado}`);

*/

//4

/*
let edad = Number(prompt("Ingresa edad: "))

if (edad>=18) {
     console.log("es mayor");
} else {
    console.log("es menor");
}

*/

//5

/*
let numero = Number(prompt("ingresa numero: "));

if (numero % 2 === 0) {
    console.log("es par")
} else {
    console.log("es impar")
}

*/

//6

/*
let num1 = Number(prompt("ingresa primer numero"));
let num2 = Number(prompt("ingresa segundo numero"));
let num3 = Number(prompt("ingresa tercer numero"));

let mayor = Math.max(num1, num2, num3);

console.log(`El número mayor es: ${mayor}`);

*/

//7

/*

let nota = Number(prompt("Ingresa una nota del 1 al 10:"));

if (nota >= 1 && nota <= 5) {
    console.log("Insuficiente");
} else if (nota >= 6 && nota <= 8) {
    console.log("Aceptable");
} else if (nota >= 9 && nota <= 10) {
    console.log("Muy bien");
} else {
    console.log("Nota no válida. Ingresa un número del 1 al 10.");
}

*/

//8

/*
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

*/

//9

/*
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}

*/

//10

/*
let contraseña = prompt("ingresa contraseña:  ")

if (contraseña === "1234") {
    console.log("Correcta")
} else {
    console.log("incorrecta")
}

*/

//11

/*
let sumaTotal = 0;
let numero;

while (numero !== 0) {
    numero = Number(prompt("Ingresa un número"));
    
    sumaTotal += numero; 
}

console.log(`La suma total de los números es: ${sumaTotal}`);

*/

//12

/*
let num1 = Number(prompt("ingresa primer numero"));
let num2 = Number(prompt("ingresa segundo numero"));

let operacion = prompt("Elige una operación (+, -, *, /):")

switch (operacion) {
    case "+":
        resultado = num1 + num2;
        break;
    case "-":
        resultado = num1 - num2;
        break;
    case "*":
        resultado = num1 * num2;
        break;
    case "/":
        resultado = num1 / num2;
        break;
    default:
        resultado = "Operación no válida";
}

console.log(`Resultado: ${resultado}`);

*/

//13

/*

let opcion = prompt("1-Saludar, 2-Fecha, 3-Random");

switch (opcion) {
    case "1": console.log("¡Hola!"); break;
    case "2": console.log(new Date().toLocaleDateString()); break;
    case "3": console.log(Math.floor(Math.random() * 100)); break;
}

*/

//14 

/*
const secreto = Math.floor(Math.random() * 10) + 1;
let intento;

while (intento !== secreto) {
    intento = Number(prompt("Adivina del 1 al 10:"));
}

console.log("¡Ganaste!");

*/

//15

/*
let contadorPares = 0;
let numero;

while (numero !== 0) {
    numero = Number(prompt("Ingresa un número (0 para salir):"));

    if (numero !== 0 && numero % 2 === 0) {
        contadorPares++;
    }
}

console.log(`Cantidad de números pares: ${contadorPares}`);

*/

//16

/*

let nombres = ["Juan", "María", "Pedro", "Ana", "Luis"];

console.log(nombres);

*/

//17

/* 

let nombres = ["Juan", "María", "Pedro", "Ana", "Luis"];

for (let i = 0; i < nombres.length; i++) {
    console.log(nombres[i]);
}

*/

//18

/* 

let numeros = [5, 12, 3, 25, 8];

console.log(`Mayor: ${Math.max(...numeros)}`);
console.log(`Menor: ${Math.min(...numeros)}`);

*/ 

//19

/*

let notas = [8, 7, 10, 6, 9];
let suma = 0;


for (let nota of notas) {
    suma += nota;
}

let promedio = suma / notas.length;

console.log(`El promedio es: ${promedio}`);

*/

//20

/*

let nombres = [];

while (true) {
    let nombre = prompt("Ingresa un nombre: ");
    if (nombre === "salir") break;
    nombres.push(nombre);
}

console.log(nombres);

*/

//21

/*

let nombres = ["Juan", "María", "Pedro", "Ana", "Luis"];

console.log(nombres.length);

*/

//22

/*
const numeros = [1, 2, 3, 4, 5, 6];
for (let num of numeros) {
    if (num % 2 === 0) console.log("Par:", num);
}

*/

//23

/*
const frutas = ["manzana", "plátano", "fresa"];
console.log("¿Tiene fresa?:", frutas.includes("fresa"));

*/

//24

/*
const animales = ["perro", "gato", "ave"];
animales.pop();
console.log("Sin el último:", animales);

*/

//25

/*

const colores = ["rojo", "verde"];
colores.push("azul");
console.log("Con el nuevo:", colores);

*/







