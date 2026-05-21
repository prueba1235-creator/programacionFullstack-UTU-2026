
const titulo = document.querySelector('#miTitulo');
const boton = document.querySelector('#miBoton');

boton.addEventListener('click', () => {
    titulo.textContent = '¡Texto Cambiado con Éxito!';
});


const parrafo = document.querySelector('#miParrafo');
const btnHtml = document.querySelector('#btnHtml');

btnHtml.addEventListener('click', () => {

    parrafo.innerHTML = 'Texto en <strong>negrita</strong> y <em>cursiva</em>.';
});


const imagen = document.querySelector('#miImagen');
const btnImagen = document.querySelector('#btnImagen');

btnImagen.addEventListener('click', () => {

    imagen.src = 'https://picsum.photos';
});

const input = document.querySelector('#miInput');
const btnInput = document.querySelector('#btnInput');
const resultadoInput = document.querySelector('#resultadoInput');

btnInput.addEventListener('click', () => {

    resultadoInput.textContent = input.value;
});


const caja = document.querySelector('#miCaja');
const btnAgregarClase = document.querySelector('#btnAgregarClase');
const btnQuitarClase = document.querySelector('#btnQuitarClase');

btnAgregarClase.addEventListener('click', () => {
    caja.classList.add('texto-rojo');
});

btnQuitarClase.addEventListener('click', () => {
    caja.classList.remove('texto-rojo');
});


const btnModoOscuro = document.querySelector('#btnModoOscuro');

btnModoOscuro.addEventListener('click', () => {

    document.body.classList.toggle('modo-oscuro');
});


const lista = document.querySelector('#miLista');
const btnAgregarLista = document.querySelector('#btnAgregarLista');

btnAgregarLista.addEventListener('click', () => {

    const nuevoItem = document.createElement('li');


    nuevoItem.textContent = 'Nuevo elemento agregado';

    lista.appendChild(nuevoItem);
});

const formulario = document.querySelector('#miFormulario');
const contenedorTarjetas = document.querySelector('#contenedorTarjetas');

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const nombre = document.querySelector('#nombre').value;
    const color = document.querySelector('#color').value;
    const mensaje = document.querySelector('#mensaje').value;


    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.className = 'caja';


    nuevaTarjeta.innerHTML = `
        <h3>${nombre}</h3>
        <p>${mensaje}</p>
        <p>Color favorito: ${color}</p>
    `;


    nuevaTarjeta.style.color = color;

    // Agregar la tarjeta al contenedor visual
    contenedorTarjetas.appendChild(nuevaTarjeta);

    formulario.reset(); // Limpia los campos del formulario
});
