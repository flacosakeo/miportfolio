document.getElementById("abrirModal").onclick = function(e) {
    e.preventDefault();
    document.getElementById("miModal").style.display = "block";
  }
  
  document.querySelector(".cerrar").onclick = function() {
    document.getElementById("miModal").style.display = "none";
  }
  
  window.onclick = function(e) {
    if (e.target == document.getElementById("miModal")) {
      document.getElementById("miModal").style.display = "none";
    }
  }
  
  let index = 0;
  const slides = document.querySelectorAll(".slides img");
  function mostrarSlide(n) {
    slides.forEach((img, i) => {
      img.classList.remove("activo");
      if(i === n) img.classList.add("activo");
    });
  }
  document.querySelector(".next").onclick = function() {
    index = (index + 1) % slides.length;
    mostrarSlide(index);
  }
  document.querySelector(".prev").onclick = function() {
    index = (index - 1 + slides.length) % slides.length;
    mostrarSlide(index);
  }