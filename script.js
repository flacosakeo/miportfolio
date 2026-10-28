// ==========================================
// CONFIGURACIÓN DE JSONBIN.IO
// ==========================================
const JSONBIN_BIN_ID = "6ae21af9ac6210605a59931b";
const JSONBIN_API_KEY = "$2a$10$h1ga/gCzgjCsMbB4gsFkruH5UR0wrQ4tXHDXQHC2gr5FTFiy.b/p.";
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Datos de Cloudinary
const CLOUDINARY_CLOUD_NAME = uxnunjxj;
const CLOUDINARY_UPLOAD_PRESET = ml_default;

// ==========================================
// 1. CONTROL DE MODALES NATIVOS (<dialog>)
// ==========================================
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.showModal();
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.close();
}

document.querySelectorAll('dialog').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
});

// ==========================================
// 2. GESTIÓN DEL TEMA (MODO CLARO / OSCURO)
// ==========================================
function inicializarTema() {
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  let currentTheme = localStorage.getItem('theme') || 'dark';

  function aplicarTema(tema) {
    if (tema === 'dark') {
      document.documentElement.classList.add('dark');
      if (themeIcon) themeIcon.className = 'bi bi-sun-fill text-amber-400';
      if (themeText) themeText.innerText = 'Modo Claro';
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIcon) themeIcon.className = 'bi bi-moon-fill text-slate-700';
      if (themeText) themeText.innerText = 'Modo Oscuro';
    }
    localStorage.setItem('theme', tema);
  }

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
      aplicarTema(currentTheme);
    });
  }

  aplicarTema(currentTheme);
}

// ==========================================
// 3. DATOS DE RESPALDO (POR DEFECTO)
// ==========================================
const datosPredeterminados = {
  perfil: {
    nombre: "Eduardo Lazarte",
    titulo: "Desarrollador de Software & Analista de Sistemas",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    email: "eduardolazarte1984@gmail.com",
    ubicacion: "San Salvador de Jujuy, Argentina",
    telefono: "+54 9 388 123-4567"
  },
  sobreMi: "Profesional proactivo y altamente responsable, con sólida formación en análisis de sistemas, desarrollo web Full Stack y procesos de facturación sanatorial. Apasionado por la tecnología, la arquitectura limpia y el trabajo colaborativo.",
  redes: [
    { id: "red_1", icono: "bi-linkedin", url: "https://linkedin.com" },
    { id: "red_2", icono: "bi-github", url: "https://github.com" }
  ],
  experiencias: [
    {
      id: "exp_1",
      titulo: "Obra Social Prepaga BRAMED S.R.L.",
      subtitulo: "Facturación Sanatorial | 2021 - Presente",
      desc: "Liquidación y facturación médica, nomenclador nacional y NBU."
    },
    {
      id: "exp_2",
      titulo: "Clínica Mayo S.A.",
      subtitulo: "Facturación Sanatorial",
      desc: "Auditoría arancelaria y gestión administrativa sanitaria."
    }
  ],
  educacion: [
    {
      id: "edu_1",
      titulo: "Analista en Sistemas de Computación",
      subtitulo: "Nivel Superior",
      desc: "Algoritmos, estructuras de datos, diseño de bases de datos relacionales.",
      link: ""
    },
    {
      id: "edu_2",
      titulo: "Full Stack Developer",
      subtitulo: "Certificación Profesional",
      desc: "Desarrollo con JavaScript, Node.js y frameworks modernos.",
      link: ""
    }
  ],
  proyectos: [
    {
      id: "pro_1",
      titulo: "CRUD con Base de Datos",
      subtitulo: "Aplicación Full Stack",
      desc: "Sistema interactivo para gestión y visualización de registros en producción.",
      link: "https://github.com"
    },
    {
      id: "pro_2",
      titulo: "Simulador de Token & Encriptador",
      subtitulo: "Frontend Interactivo",
      desc: "Manipulación de cadenas y criptografía ligera en JavaScript.",
      link: "https://github.com"
    }
  ],
  habilidades: [
    { id: "hab_1", nombre: "HTML5", nivel: 90 },
    { id: "hab_2", nombre: "CSS3 / Tailwind", nivel: 85 },
    { id: "hab_3", nombre: "JavaScript", nivel: 80 },
    { id: "hab_4", nombre: "Git & GitHub", nivel: 75 },
    { id: "hab_5", nombre: "Node.js", nivel: 70 },
    { id: "hab_6", nombre: "SQL", nivel: 75 }
  ]
};

// ==========================================
// 4. ESTADO & SINCRONIZACIÓN REMOTA (JSONBIN)
// ==========================================
let modoAdmin = false;
let cvData = { ...datosPredeterminados };
let observerHabilidades = null;

// Cargar datos remotos desde JSONBin
async function cargarDatosRemotos() {
  const syncLabel = document.getElementById('syncStatus');
  if (syncLabel) syncLabel.classList.remove('hidden');

  try {
    const res = await fetch(`${JSONBIN_URL}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY
      }
    });

    if (res.ok) {
      const json = await res.json();
      if (json.record && Object.keys(json.record).length > 2) {
        cvData = json.record;
        localStorage.setItem('cvData', JSON.stringify(cvData));
      }
    } else {
      // Respaldo en localStorage si la API falla o no tiene conexión
      const local = localStorage.getItem('cvData');
      if (local) cvData = JSON.parse(local);
    }
  } catch (err) {
    console.warn("Sin conexión con JSONBin, usando respaldo local:", err);
    const local = localStorage.getItem('cvData');
    if (local) cvData = JSON.parse(local);
  } finally {
    if (syncLabel) syncLabel.classList.add('hidden');
    actualizarInterfaz();
  }
}

// Guardar en la nube (JSONBin) y en localStorage
async function guardarDatos() {
  localStorage.setItem('cvData', JSON.stringify(cvData));

  const syncLabel = document.getElementById('syncStatus');
  if (syncLabel) {
    syncLabel.innerHTML = '<i class="bi bi-arrow-repeat animate-spin mr-1"></i> Guardando en la nube...';
    syncLabel.classList.remove('hidden');
  }

  try {
    const res = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY
      },
      body: JSON.stringify(cvData)
    });

    if (res.ok && syncLabel) {
      syncLabel.innerHTML = '<i class="bi bi-cloud-check mr-1 text-emerald-300"></i> Guardado en vivo';
      setTimeout(() => syncLabel.classList.add('hidden'), 3000);
    }
  } catch (err) {
    console.error("Error al guardar en JSONBin:", err);
    if (syncLabel) {
      syncLabel.innerHTML = '<i class="bi bi-exclamation-triangle mr-1 text-rose-300"></i> Error en nube (guardado local)';
    }
  }
}

// ==========================================
// 5. RENDERIZADO EN EL DOM
// ==========================================
function actualizarInterfaz() {
  renderPerfil();
  renderSobreMi();
  renderRedes();
  renderExperiencia();
  renderEducacion();
  renderProyectos();
  renderHabilidades();
  controlarBotonesAdmin();
}

function renderPerfil() {
  const p = cvData.perfil || {};
  document.getElementById('profileNombre').innerText = p.nombre || "Tu Nombre";
  document.getElementById('profileTitulo').innerText = p.titulo || "Tu Título";
  document.getElementById('profileImg').src = p.foto || "https://via.placeholder.com/150";
  document.getElementById('profileEmail').innerText = p.email || "";
  document.getElementById('profileUbicacion').innerText = p.ubicacion || "";
  document.getElementById('profileTelefono').innerText = p.telefono || "";
}

function renderSobreMi() {
  document.getElementById('sobreMiTexto').innerText = cvData.sobreMi || "";
}

function renderRedes() {
  const contenedor = document.getElementById('listaRedes');
  if (!contenedor) return;

  if (!cvData.redes || cvData.redes.length === 0) {
    contenedor.innerHTML = `<span class="text-xs text-slate-400">Sin redes añadidas</span>`;
    return;
  }

  contenedor.innerHTML = cvData.redes.map(r => `
    <div class="social-item">
      <a href="${r.url}" target="_blank" class="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-accent hover:text-slate-950 transition-all text-sm">
        <i class="bi ${r.icono}"></i>
      </a>
      ${modoAdmin ? `
        <button onclick="editarRed('${r.id}')" class="social-edit-btn" title="Editar red">
          <i class="bi bi-pencil"></i>
        </button>
        <button onclick="eliminarRed('${r.id}')" class="social-delete-btn" title="Eliminar red">
          <i class="bi bi-x"></i>
        </button>
      ` : ''}
    </div>
  `).join('');
}

function renderExperiencia() {
  const contenedor = document.getElementById('listaExperiencias');
  if (!contenedor) return;

  if (!cvData.experiencias || cvData.experiencias.length === 0) {
    contenedor.innerHTML = `<p class="text-xs text-slate-400">No hay experiencias cargadas.</p>`;
    return;
  }

  contenedor.innerHTML = cvData.experiencias.map(item => `
    <div class="timeline-item">
      <div class="flex justify-between items-start gap-2">
        <div>
          <h4 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">${item.titulo}</h4>
          <span class="text-xs font-semibold text-accent">${item.subtitulo}</span>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">${item.desc}</p>
        </div>
        ${modoAdmin ? `
          <div class="flex items-center gap-1 shrink-0">
            <button onclick="editarItem('experiencias', '${item.id}')" class="text-sky-500 hover:text-sky-600 p-1 text-sm" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button onclick="eliminarElemento('experiencias', '${item.id}')" class="text-rose-500 hover:text-rose-600 p-1 text-sm" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderEducacion() {
  const contenedor = document.getElementById('listaEducacion');
  if (!contenedor) return;

  if (!cvData.educacion || cvData.educacion.length === 0) {
    contenedor.innerHTML = `<p class="text-xs text-slate-400">No hay registros de educación.</p>`;
    return;
  }

  contenedor.innerHTML = cvData.educacion.map(item => `
    <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col justify-between">
      <div>
        <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1">${item.titulo}</h4>
        <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 mb-2">${item.subtitulo}</span>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">${item.desc}</p>
      </div>
      <div class="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800/60">
        ${item.link ? `<a href="${item.link}" target="_blank" class="text-xs text-accent hover:underline flex items-center gap-1"><i class="bi bi-link-45deg"></i> Ver Enlace</a>` : '<span></span>'}
        ${modoAdmin ? `
          <div class="flex items-center gap-1">
            <button onclick="editarItem('educacion', '${item.id}')" class="text-sky-500 hover:text-sky-600 p-1 text-xs" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button onclick="eliminarElemento('educacion', '${item.id}')" class="text-rose-500 hover:text-rose-600 p-1 text-xs" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderProyectos() {
  const contenedor = document.getElementById('listaProyectos');
  if (!contenedor) return;

  if (!cvData.proyectos || cvData.proyectos.length === 0) {
    contenedor.innerHTML = `<p class="text-xs text-slate-400">No hay proyectos cargados.</p>`;
    return;
  }

  contenedor.innerHTML = cvData.proyectos.map(item => `
    <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col justify-between">
      <div>
        <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1">${item.titulo}</h4>
        <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">${item.subtitulo}</span>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">${item.desc}</p>
      </div>
      <div class="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800/60">
        ${item.link ? `<a href="${item.link}" target="_blank" class="px-3 py-1 rounded-full text-xs font-medium border border-accent text-accent hover:bg-accent hover:text-slate-950 transition-all flex items-center gap-1"><i class="bi bi-box-arrow-up-right"></i> Ver Proyecto</a>` : '<span></span>'}
        ${modoAdmin ? `
          <div class="flex items-center gap-1">
            <button onclick="editarItem('proyectos', '${item.id}')" class="text-sky-500 hover:text-sky-600 p-1 text-xs" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button onclick="eliminarElemento('proyectos', '${item.id}')" class="text-rose-500 hover:text-rose-600 p-1 text-xs" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderHabilidades() {
  const contenedor = document.getElementById('listaHabilidades');
  if (!contenedor) return;

  if (!cvData.habilidades || cvData.habilidades.length === 0) {
    contenedor.innerHTML = `<span class="text-xs text-slate-400">Sin habilidades registradas</span>`;
    return;
  }

  contenedor.innerHTML = cvData.habilidades.map(hab => {
    const porcentaje = Math.min(100, Math.max(1, parseInt(hab.nivel, 10) || 50));
    return `
      <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/70 bg-slate-50 dark:bg-slate-950/40 space-y-2">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">${hab.nombre}</span>
            ${modoAdmin ? `
              <div class="flex items-center gap-1">
                <button onclick="editarHabilidad('${hab.id}')" class="text-sky-500 hover:text-sky-600 p-0.5 text-xs" title="Editar">
                  <i class="bi bi-pencil"></i>
                </button>
                <button onclick="eliminarHabilidad('${hab.id}')" class="text-rose-500 hover:text-rose-600 p-0.5 text-xs" title="Eliminar">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            ` : ''}
          </div>
          <span class="text-xs font-bold text-accent skill-percent-label" data-target="${porcentaje}">0%</span>
        </div>
        
        <div class="skill-track w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div class="skill-progress-bar h-2.5 rounded-full" 
               data-target="${porcentaje}" 
               style="width: 0%;"></div>
        </div>
      </div>
    `;
  }).join('');

  iniciarObserverHabilidades();
}

// ==========================================
// 6. ANIMACIÓN AL HACER SCROLL (INTERSECTIONOBSERVER)
// ==========================================
function iniciarObserverHabilidades() {
  const seccion = document.getElementById('habilidades');
  if (!seccion) return;

  const animarBarras = () => {
    const barras = seccion.querySelectorAll('.skill-progress-bar');
    const labels = seccion.querySelectorAll('.skill-percent-label');

    barras.forEach(barra => {
      const valorFinal = barra.getAttribute('data-target') || '50';
      barra.style.width = valorFinal + '%';
    });

    labels.forEach(label => {
      const finalVal = parseInt(label.getAttribute('data-target'), 10) || 50;
      animarContador(label, finalVal);
    });
  };

  const resetearBarras = () => {
    const barras = seccion.querySelectorAll('.skill-progress-bar');
    const labels = seccion.querySelectorAll('.skill-percent-label');

    barras.forEach(barra => {
      barra.style.width = '0%';
    });
    labels.forEach(label => {
      label.innerText = '0%';
    });
  };

  if ('IntersectionObserver' in window) {
    if (observerHabilidades) observerHabilidades.disconnect();

    observerHabilidades = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animarBarras();
        } else {
          resetearBarras();
        }
      });
    }, { threshold: 0.15 });

    observerHabilidades.observe(seccion);
  } else {
    animarBarras();
  }
}

function animarContador(elemento, valorFinal) {
  let actual = 0;
  const duracion = 800;
  const pasos = 25;
  const incremento = valorFinal / pasos;
  const tiempoPaso = duracion / pasos;

  const timer = setInterval(() => {
    actual += incremento;
    if (actual >= valorFinal) {
      elemento.innerText = valorFinal + '%';
      clearInterval(timer);
    } else {
      elemento.innerText = Math.round(actual) + '%';
    }
  }, tiempoPaso);
}

// ==========================================
// 7. INGRESO Y SESIÓN ADMIN
// ==========================================
const ADMIN_USER = "admin";
const ADMIN_PASS = "30726244";

function inicializarLoginAdmin() {
  const formLogin = document.getElementById('formLogin');
  const btnLogout = document.getElementById('btnLogout');

  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('loginUser').value.trim();
      const pass = document.getElementById('loginPass').value.trim();
      const errorMsg = document.getElementById('loginError');

      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        modoAdmin = true;
        errorMsg.classList.add('hidden');
        cerrarModal('modalLogin');
        formLogin.reset();
        actualizarInterfaz();
      } else {
        errorMsg.classList.remove('hidden');
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      modoAdmin = false;
      actualizarInterfaz();
    });
  }
}

function controlarBotonesAdmin() {
  const adminPanel = document.getElementById('adminPanel');
  const btnOpenLogin = document.getElementById('btnOpenLogin');
  const botonesAdmin = document.querySelectorAll('.btn-admin');

  if (modoAdmin) {
    adminPanel.classList.remove('hidden');
    btnOpenLogin.classList.add('hidden');
    botonesAdmin.forEach(btn => btn.classList.remove('hidden'));
  } else {
    adminPanel.classList.add('hidden');
    btnOpenLogin.classList.remove('hidden');
    botonesAdmin.forEach(btn => btn.classList.add('hidden'));
  }
}

// ==========================================
// 8. EDICIÓN DE PERFIL & SOBRE MÍ
// ==========================================
// ==========================================
// 8. EDICIÓN DE PERFIL CON SUBIDA A CLOUDINARY
// ==========================================
function abrirModalPerfil() {
  const p = cvData.perfil || {};
  document.getElementById('editNombre').value = p.nombre || '';
  document.getElementById('editTitulo').value = p.titulo || '';
  document.getElementById('editFotoUrl').value = p.foto || '';
  document.getElementById('editEmail').value = p.email || '';
  document.getElementById('editTelefono').value = p.telefono || '';
  document.getElementById('editUbicacion').value = p.ubicacion || '';
  document.getElementById('editFotoFile').value = '';
  abrirModal('modalPerfil');
}

// Subir archivo directamente a Cloudinary
async function subirImagenACloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const respuesta = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!respuesta.ok) {
    throw new Error('Error al subir la imagen a Cloudinary');
  }

  const datos = await respuesta.json();
  return datos.secure_url; // URL HTTPS pública y optimizada
}

const formPerfil = document.getElementById('formPerfil');
if (formPerfil) {
  formPerfil.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('editFotoFile');
    const file = fileInput.files[0];
    const submitBtn = formPerfil.querySelector('button[type="submit"]');
    const textoOriginal = submitBtn.innerText;

    try {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Subiendo foto...';

      let fotoFinalUrl = document.getElementById('editFotoUrl').value.trim() || cvData.perfil.foto;

      // Si seleccionaste un archivo local, se sube primero a Cloudinary
      if (file) {
        fotoFinalUrl = await subirImagenACloudinary(file);
      }

      // Guardar el perfil con la nueva URL en JSONBin
      cvData.perfil = {
        nombre: document.getElementById('editNombre').value.trim(),
        titulo: document.getElementById('editTitulo').value.trim(),
        foto: fotoFinalUrl,
        email: document.getElementById('editEmail').value.trim(),
        telefono: document.getElementById('editTelefono').value.trim(),
        ubicacion: document.getElementById('editUbicacion').value.trim()
      };

      await guardarDatos();
      actualizarInterfaz();
      cerrarModal('modalPerfil');
    } catch (error) {
      alert('Hubo un problema al guardar la foto: ' + error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = textoOriginal;
    }
  });
}

function abrirModalSobreMi() {
  document.getElementById('editSobreMiTexto').value = cvData.sobreMi || '';
  abrirModal('modalSobreMi');
}

const formSobreMi = document.getElementById('formSobreMi');
if (formSobreMi) {
  formSobreMi.addEventListener('submit', function(e) {
    e.preventDefault();
    cvData.sobreMi = document.getElementById('editSobreMiTexto').value.trim();
    guardarDatos();
    actualizarInterfaz();
    cerrarModal('modalSobreMi');
  });
}

// ==========================================
// 9. REDES SOCIALES
// ==========================================
function abrirModalRedSocial() {
  const idInput = document.getElementById('redId');
  if (idInput) idInput.value = '';

  const title = document.getElementById('modalRedSocialTitle');
  if (title) title.innerHTML = '<i class="bi bi-share text-accent"></i> Nueva Red Social';

  document.getElementById('formRedSocial').reset();
  abrirModal('modalRedSocial');
}

function editarRed(id) {
  const red = cvData.redes.find(r => r.id === id);
  if (!red) return;

  const idInput = document.getElementById('redId');
  if (idInput) idInput.value = red.id;

  const title = document.getElementById('modalRedSocialTitle');
  if (title) title.innerHTML = '<i class="bi bi-pencil-square text-accent"></i> Editar Red Social';

  document.getElementById('redPlataforma').value = red.icono || 'bi-linkedin';
  document.getElementById('redUrl').value = red.url || '';

  abrirModal('modalRedSocial');
}

const formRedSocial = document.getElementById('formRedSocial');
if (formRedSocial) {
  formRedSocial.addEventListener('submit', function(e) {
    e.preventDefault();
    const idExistente = document.getElementById('redId') ? document.getElementById('redId').value : '';
    const icono = document.getElementById('redPlataforma').value;
    const url = document.getElementById('redUrl').value.trim();

    if (idExistente) {
      const index = cvData.redes.findIndex(r => r.id === idExistente);
      if (index !== -1) {
        cvData.redes[index].icono = icono;
        cvData.redes[index].url = url;
      }
    } else {
      cvData.redes.push({
        id: 'red_' + Date.now(),
        icono: icono,
        url: url
      });
    }

    guardarDatos();
    actualizarInterfaz();
    cerrarModal('modalRedSocial');
  });
}

function eliminarRed(id) {
  if (confirm('¿Eliminar esta red social?')) {
    cvData.redes = cvData.redes.filter(r => r.id !== id);
    guardarDatos();
    actualizarInterfaz();
  }
}

// ==========================================
// 10. EXPERIENCIA / EDUCACIÓN / PROYECTOS
// ==========================================
function abrirModalItem(tipo) {
  document.getElementById('itemTipo').value = tipo;
  document.getElementById('itemId').value = '';
  
  const title = document.getElementById('modalItemTitle');
  if (tipo === 'experiencias') title.innerText = 'Nueva Experiencia Laboral';
  if (tipo === 'educacion') title.innerText = 'Nuevo Estudio / Curso';
  if (tipo === 'proyectos') title.innerText = 'Nuevo Proyecto';

  document.getElementById('formItem').reset();
  abrirModal('modalItem');
}

function editarItem(tipo, id) {
  const item = cvData[tipo].find(it => it.id === id);
  if (!item) return;

  document.getElementById('itemTipo').value = tipo;
  document.getElementById('itemId').value = item.id;

  const title = document.getElementById('modalItemTitle');
  if (tipo === 'experiencias') title.innerText = 'Editar Experiencia Laboral';
  if (tipo === 'educacion') title.innerText = 'Editar Estudio / Curso';
  if (tipo === 'proyectos') title.innerText = 'Editar Proyecto';

  document.getElementById('itemTitulo').value = item.titulo || '';
  document.getElementById('itemSubtitulo').value = item.subtitulo || '';
  document.getElementById('itemDescripcion').value = item.desc || '';
  document.getElementById('itemLink').value = item.link || '';

  abrirModal('modalItem');
}

const formItem = document.getElementById('formItem');
if (formItem) {
  formItem.addEventListener('submit', function(e) {
    e.preventDefault();
    const tipo = document.getElementById('itemTipo').value;
    const idExistente = document.getElementById('itemId').value;

    const itemModificado = {
      id: idExistente ? idExistente : ('item_' + Date.now()),
      titulo: document.getElementById('itemTitulo').value.trim(),
      subtitulo: document.getElementById('itemSubtitulo').value.trim(),
      desc: document.getElementById('itemDescripcion').value.trim(),
      link: document.getElementById('itemLink').value.trim()
    };

    if (idExistente) {
      const index = cvData[tipo].findIndex(it => it.id === idExistente);
      if (index !== -1) cvData[tipo][index] = itemModificado;
    } else {
      cvData[tipo].unshift(itemModificado);
    }

    guardarDatos();
    actualizarInterfaz();
    cerrarModal('modalItem');
  });
}

function eliminarElemento(categoria, id) {
  if (confirm('¿Eliminar este registro?')) {
    cvData[categoria] = cvData[categoria].filter(it => it.id !== id);
    guardarDatos();
    actualizarInterfaz();
  }
}

// ==========================================
// 11. HABILIDADES CON BARRA DE PROGRESO
// ==========================================
function sincronizarPorcentaje(valor) {
  let num = parseInt(valor, 10);
  if (isNaN(num)) num = 1;
  if (num < 1) num = 1;
  if (num > 100) num = 100;

  document.getElementById('habilidadRango').value = num;
  document.getElementById('habilidadNivel').value = num;
  document.getElementById('valorPorcentajeVista').innerText = num + '%';
}

function abrirModalHabilidad() {
  document.getElementById('habilidadId').value = '';
  document.getElementById('modalHabilidadTitle').innerHTML = '<i class="bi bi-tools text-accent"></i> Nueva Habilidad';
  document.getElementById('formHabilidad').reset();
  sincronizarPorcentaje(80);
  abrirModal('modalHabilidad');
}

function editarHabilidad(id) {
  const hab = cvData.habilidades.find(h => h.id === id);
  if (!hab) return;

  document.getElementById('habilidadId').value = hab.id;
  document.getElementById('modalHabilidadTitle').innerHTML = '<i class="bi bi-pencil-square text-accent"></i> Editar Habilidad';
  document.getElementById('habilidadNombre').value = hab.nombre;
  sincronizarPorcentaje(hab.nivel || 80);

  abrirModal('modalHabilidad');
}

const formHabilidad = document.getElementById('formHabilidad');
if (formHabilidad) {
  formHabilidad.addEventListener('submit', function(e) {
    e.preventDefault();
    const idExistente = document.getElementById('habilidadId').value;
    const nombre = document.getElementById('habilidadNombre').value.trim();
    let nivel = parseInt(document.getElementById('habilidadNivel').value, 10);
    if (isNaN(nivel) || nivel < 1) nivel = 1;
    if (nivel > 100) nivel = 100;

    if (idExistente) {
      const index = cvData.habilidades.findIndex(h => h.id === idExistente);
      if (index !== -1) {
        cvData.habilidades[index].nombre = nombre;
        cvData.habilidades[index].nivel = nivel;
      }
    } else {
      cvData.habilidades.push({
        id: 'hab_' + Date.now(),
        nombre: nombre,
        nivel: nivel
      });
    }

    guardarDatos();
    actualizarInterfaz();
    cerrarModal('modalHabilidad');
  });
}

function eliminarHabilidad(id) {
  if (confirm('¿Eliminar esta habilidad?')) {
    cvData.habilidades = cvData.habilidades.filter(h => h.id !== id);
    guardarDatos();
    actualizarInterfaz();
  }
}

// ==========================================
// 12. EXPORTAR A PDF LIMPIO
// ==========================================
function descargarCvPdf() {
  if (observerHabilidades) observerHabilidades.disconnect();

  const barras = document.querySelectorAll('.skill-progress-bar');
  const labels = document.querySelectorAll('.skill-percent-label');

  barras.forEach(barra => {
    const valor = barra.getAttribute('data-target') || '50';
    barra.style.setProperty('width', valor + '%', 'important');
    barra.style.setProperty('background-color', '#0284c7', 'important');
  });

  labels.forEach(label => {
    const valor = label.getAttribute('data-target') || '50';
    label.innerText = valor + '%';
  });

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      iniciarObserverHabilidades();
    }, 500);
  }, 150);
}

// ==========================================
// 13. INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  inicializarTema();
  inicializarLoginAdmin();
  cargarDatosRemotos(); // Carga en vivo desde JSONBin
});