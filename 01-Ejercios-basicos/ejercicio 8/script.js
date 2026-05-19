/* NEXUS-7 // script.js */

const el = id => document.getElementById(id);
const KEY = 'nexus_ciudadanos';

/* ── Estado global ── */
let expedienteActual = null;   // objeto del expediente en pantalla
let modoArchivo = false;  // ¿estamos viendo uno guardado?

/* ── localStorage ── */
function getCiudadanos() { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
function setCiudadanos(arr) { localStorage.setItem(KEY, JSON.stringify(arr)); }

/* ── Reloj ── */
function actualizarReloj() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    el('reloj').textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
actualizarReloj();
setInterval(actualizarReloj, 1000);

/* ── Datos ── */
const sectores = [
    'Sector 4 — Zona Industrial', 'Sector 7 — Zona Controlada',
    'Sector 1 — Núcleo Corporativo', 'Sector 12 — Periferia',
    'Sector 9 — Domo Norte', 'Sector 3 — Puerto Libre',
];

const ocupaciones = [
    'Técnico de Redes Neurales', 'Operario de Domo',
    'Analista de Datos Biomédicos', 'Custodio de Sector',
    'Ingeniero de Implantes', 'Repartidor de Zonas Restringidas',
    'Programador de IA Subalterno', 'Escáner de Tránsito',
];

const clasesGeneticas = ['OMEGA-3', 'DELTA-7', 'SIGMA-1', 'ALPHA-2', 'BETA-5', 'GAMMA-9'];

const implantesPool = [
    'Filtro ocular nocturno v3.1', 'Módulo de memoria expandida',
    'Regulador cardíaco NeuroSync', 'Interfaz neural BCI-X',
    'Rastreador GPS subdérmico', 'Traductor lingüístico L-17',
    'Supresor de emociones Tier-2', 'Escáner retinal integrado',
    'Reflex boost muscular v2',
];

const infraccionesPool = [
    { desc: 'Acceso a zona restringida sin permiso', sev: 'alta' },
    { desc: 'Contacto con individuo de bajo índice social', sev: 'media' },
    { desc: 'Distribución de información no autorizada', sev: 'alta' },
    { desc: 'Ausencia a control biométrico mensual', sev: 'baja' },
    { desc: 'Desconexión de rastreador por más de 2h', sev: 'media' },
    { desc: 'Comercio no registrado en zona gris', sev: 'media' },
    { desc: 'Modificación de implante sin licencia', sev: 'alta' },
    { desc: 'Exceso de velocidad en corredor 7-B', sev: 'baja' },
    { desc: 'Reunión grupal sin registro previo', sev: 'baja' },
    { desc: 'Uso de encriptado no estándar', sev: 'alta' },
];

const mensajesCarga = [
    'ACCEDIENDO A BASE DE DATOS...',
    'VERIFICANDO HUELLAS BIOMÉTRICAS...',
    'DESENCRIPTANDO EXPEDIENTE...',
    'CARGANDO REGISTRO GENÉTICO...',
    'COMPILANDO HISTORIAL DE INFRACCIONES...',
];

/* ── Utilidades ── */
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

function elegirVarios(arr, min, max) {
    const n = min + Math.floor(Math.random() * (max - min + 1));
    return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function generarID() {
    const num = Math.floor(Math.random() * 9000000 + 1000000);
    const letra = 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 23)];
    return `CIV-2087-${num}-${letra}`;
}

function generarFecha() {
    const y = 2040 + Math.floor(Math.random() * 30);
    const m = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const d = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    return `${d}/${m}/${y}`;
}

function infoConfianza(val) {
    if (val >= 70) return { color: '#00ff9d', texto: 'ACTIVO', clase: 'estado-activo' };
    if (val >= 40) return { color: '#ffd700', texto: 'EN OBSERVACIÓN', clase: 'estado-observacion' };
    return { color: '#ff2d55', texto: 'SOSPECHOSO', clase: 'estado-sospechoso' };
}

/* ── Avatar pixel ── */
function generarAvatar(nombre) {
    const paletas = [
        ['#00ff9d', '#00cfff'], ['#ff2d55', '#ff9f0a'],
        ['#bf5af2', '#00cfff'], ['#ffd700', '#ff2d55'], ['#30d158', '#00cfff'],
    ];
    let seed = 0;
    for (let i = 0; i < nombre.length; i++) seed = (seed * 31 + nombre.charCodeAt(i)) | 0;
    seed = Math.abs(seed);

    const [c1, c2] = paletas[seed % paletas.length];
    const COLS = 8, ROWS = 10, SIZE = 13;

    function next() {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed % 3;
    }

    let rects = '';
    for (let r = 0; r < ROWS; r++) {
        const mitad = Array.from({ length: COLS / 2 }, next);
        [...mitad, ...[...mitad].reverse()].forEach((val, c) => {
            if (!val) return;
            rects += `<rect x="${c * SIZE}" y="${r * SIZE}" width="${SIZE}" height="${SIZE}" fill="${val === 1 ? c1 : c2}"/>`;
        });
    }

    const w = COLS * SIZE, h = ROWS * SIZE;
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
}

/* ── Scanner ── */
function dispararScanner() {
    const linea = el('scanner-line');
    linea.classList.remove('scanning');
    void linea.offsetWidth;
    linea.classList.add('scanning');
}

/* ── Toast ── */
function mostrarToast(msg, esRojo = false) {
    const t = el('toast');
    t.textContent = msg;
    t.className = 'toast' + (esRojo ? ' red' : '');
    void t.offsetWidth;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

/* ── Navegación entre secciones ── */
function mostrarSeccion(nombre) {
    ['intro', 'loading', 'expediente', 'archivo'].forEach(s => {
        el(s + '-section').style.display = 'none';
    });
    el(nombre + '-section').style.display = 'block';

    el('nav-nuevo').classList.toggle('active', nombre !== 'archivo');
    el('nav-archivo').classList.toggle('active', nombre === 'archivo');
}

function actualizarContadorNav() {
    el('nav-count').textContent = getCiudadanos().length;
}

/* ══════════════════════════════════════
   GENERAR EXPEDIENTE
══════════════════════════════════════ */
function generarExpediente(nombre) {
    const datos = {
        id: generarID(),
        nombre: nombre.toUpperCase(),
        fecha: generarFecha(),
        sector: rand(sectores),
        ocupacion: rand(ocupaciones),
        gen: rand(clasesGeneticas),
        confianza: 10 + Math.floor(Math.random() * 90),
        implantes: elegirVarios(implantesPool, 2, 4),
        infracciones: elegirVarios(infraccionesPool, 1, 4),
        avatar: generarAvatar(nombre),
    };
    expedienteActual = datos;
    renderizarExpediente(datos);
}

function renderizarExpediente(datos) {
    const info = infoConfianza(datos.confianza);

    el('avatar-pixel').innerHTML = datos.avatar;
    el('avatar-id').textContent = datos.id.slice(0, 18);
    el('exp-nombre').textContent = datos.nombre;
    el('exp-id').textContent = datos.id;
    el('exp-fecha').textContent = datos.fecha;
    el('exp-sector').textContent = datos.sector;
    el('exp-ocupacion').textContent = datos.ocupacion;
    el('exp-gen').textContent = datos.gen;
    el('trust-valor').textContent = `${datos.confianza} / 100`;

    const fill = el('trust-fill');
    fill.style.width = '0%';
    fill.style.background = info.color;
    setTimeout(() => { fill.style.width = datos.confianza + '%'; }, 100);

    const badge = el('estado-badge');
    badge.textContent = info.texto;
    badge.className = 'estado-badge ' + info.clase;

    el('implant-list').innerHTML = datos.implantes
        .map(i => `<span class="implant-tag">${i}</span>`).join('');

    el('infra-body').innerHTML = datos.infracciones.map(inf => {
        const y = 2080 + Math.floor(Math.random() * 7);
        const m = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
        return `<tr>
      <td>${m}/${y}</td>
      <td>${inf.desc}</td>
      <td><span class="sev-badge sev-${inf.sev}">${inf.sev.toUpperCase()}</span></td>
    </tr>`;
    }).join('');

    // Botón guardar: muestra "ACTUALIZAR" si ya existe, "GUARDAR" si es nuevo
    const yaGuardado = getCiudadanos().some(c => c.id === datos.id);
    el('btn-guardar').textContent = yaGuardado ? 'ACTUALIZAR' : 'GUARDAR CIUDADANO';
}

/* ── Animación de carga ── */
function mostrarCarga(nombre) {
    mostrarSeccion('loading');
    let progreso = 0, paso = 0;
    const bar = el('loading-bar'), msg = el('loading-msg');
    bar.style.width = '0%';

    const iv = setInterval(() => {
        progreso = Math.min(progreso + 4 + Math.floor(Math.random() * 8), 100);
        bar.style.width = progreso + '%';
        if (paso < mensajesCarga.length && progreso > paso * 20) msg.textContent = mensajesCarga[paso++];

        if (progreso >= 100) {
            clearInterval(iv);
            setTimeout(() => {
                generarExpediente(nombre);
                modoArchivo = false;
                mostrarSeccion('expediente');
                setTimeout(dispararScanner, 100);
            }, 400);
        }
    }, 80);
}

/* ══════════════════════════════════════
   GUARDAR
══════════════════════════════════════ */
function guardarExpediente() {
    if (!expedienteActual) return;
    const lista = getCiudadanos();
    const idx = lista.findIndex(c => c.id === expedienteActual.id);

    if (idx >= 0) {
        lista[idx] = expedienteActual;
        mostrarToast('// EXPEDIENTE ACTUALIZADO');
    } else {
        lista.push(expedienteActual);
        mostrarToast('// CIUDADANO REGISTRADO EN EL SISTEMA');
    }

    setCiudadanos(lista);
    actualizarContadorNav();
    el('btn-guardar').textContent = 'ACTUALIZAR';
}

/* ══════════════════════════════════════
   ARCHIVO
══════════════════════════════════════ */
function mostrarArchivo(filtro = '') {
    mostrarSeccion('archivo');
    actualizarContadorNav();
    renderizarArchivo(filtro);
}

function renderizarArchivo(filtro = '') {
    const todos = getCiudadanos();
    const query = filtro.trim().toLowerCase();
    const filtrados = query
        ? todos.filter(c =>
            c.nombre.toLowerCase().includes(query) ||
            c.id.toLowerCase().includes(query)
        )
        : todos;

    const grid = el('ciudadanos-grid');
    const empty = el('empty-state');

    if (filtrados.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    grid.innerHTML = filtrados.map(c => tarjetaCiudadano(c)).join('');
}

function tarjetaCiudadano(c) {
    const info = infoConfianza(c.confianza);
    const svgMini = c.avatar; // se escala via CSS
    return `
    <div class="citizen-card" id="card-${c.id}">
      <div class="card-top">
        <div class="card-avatar-mini">${svgMini}</div>
        <div class="card-info">
          <div class="card-name">${c.nombre}</div>
          <div class="card-id">${c.id}</div>
          <span class="card-estado ${info.clase}" style="color:${info.color};border-color:${info.color}">${info.texto}</span>
        </div>
      </div>
      <div class="card-bar-wrap">
        <div class="card-bar-fill" style="width:${c.confianza}%;background:${info.color}"></div>
      </div>
      <div class="card-actions">
        <button class="btn-ver"      onclick="verCiudadano('${c.id}')">VER</button>
        <button class="btn-eliminar" onclick="eliminarCiudadano('${c.id}')">ELIMINAR</button>
      </div>
    </div>`;
}

/* ── Ver ciudadano guardado ── */
function verCiudadano(id) {
    const ciudadano = getCiudadanos().find(c => c.id === id);
    if (!ciudadano) return;

    expedienteActual = ciudadano;
    modoArchivo = true;
    renderizarExpediente(ciudadano);
    mostrarSeccion('expediente');
    setTimeout(dispararScanner, 100);

    // Cambiar botón "NUEVO" por "VOLVER AL ARCHIVO"
    el('btn-nuevo').textContent = '← ARCHIVO';
}

/* ── Eliminar ciudadano ── */
function eliminarCiudadano(id) {
    const lista = getCiudadanos().filter(c => c.id !== id);
    setCiudadanos(lista);
    actualizarContadorNav();
    mostrarToast('// CIUDADANO ELIMINADO DEL SISTEMA', true);

    const card = document.getElementById('card-' + id);
    if (card) {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.4s';
        setTimeout(() => renderizarArchivo(el('search-input').value), 420);
    }
}

/* ══════════════════════════════════════
   EVENTOS
══════════════════════════════════════ */

// Generar
el('btn-generar').addEventListener('click', () => {
    const nombre = el('nombre-input').value.trim();
    if (nombre.length < 2) {
        el('nombre-input').style.outline = '1px solid #ff2d55';
        return;
    }
    el('nombre-input').style.outline = '';
    mostrarCarga(nombre);
});

el('nombre-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') el('btn-generar').click();
});

// Guardar
el('btn-guardar').addEventListener('click', guardarExpediente);

// Nuevo / Volver
el('btn-nuevo').addEventListener('click', () => {
    if (modoArchivo) {
        modoArchivo = false;
        el('btn-nuevo').textContent = '< NUEVO';
        mostrarArchivo(el('search-input').value);
    } else {
        expedienteActual = null;
        el('nombre-input').value = '';
        mostrarSeccion('intro');
        setTimeout(() => el('nombre-input').focus(), 100);
    }
});

// Nav
el('nav-nuevo').addEventListener('click', () => {
    expedienteActual
        ? mostrarSeccion('expediente')
        : mostrarSeccion('intro');
});

el('nav-archivo').addEventListener('click', () => mostrarArchivo(el('search-input').value));

// Búsqueda en tiempo real
el('search-input').addEventListener('input', e => renderizarArchivo(e.target.value));

/* ── Inicio ── */
actualizarContadorNav();