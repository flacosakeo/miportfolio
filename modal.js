document.addEventListener('DOMContentLoaded', () => {
  const abrir = document.getElementById('abrirModal');
  const modal = document.getElementById('miModal');
  const cerrar = modal.querySelector('.cerrar');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  const slides = Array.from(modal.querySelectorAll('.slides img'));
  let index = 0;

  function mostrar(n) {
    if (!slides.length) return;
    index = (n + slides.length) % slides.length;
    slides.forEach((img, i) => img.classList.toggle('activo', i === index));
  }

  abrir.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    mostrar(index);
  });

  cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });

  // cerrar si clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrar.click();
  });

  nextBtn.addEventListener('click', () => mostrar(index + 1));
  prevBtn.addEventListener('click', () => mostrar(index - 1));

  // teclas (Esc, flechas)
  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'block') return;
    if (e.key === 'Escape') cerrar.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });
});