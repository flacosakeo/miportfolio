function inicio(){
    let etiquetas = ["css","html","js","java","sql","xampp","netbeans","vs-code","visual-foxpro",
    "coreldraw","office","windows","postman","photoshop"];//array con etiquetas
    let etiquetasfiltro = [];//array vacio

    let longitud = Math.floor(Math.random() * (0 - etiquetas.length)) + etiquetas.length;

    for(let i = 0; i <= longitud; i++){
        let indice = 0;
        indice = Math.floor(Math.random() * etiquetas.length);
        etiquetasfiltro.push(etiquetas[indice]);
        etiquetas.splice(indice, 1);
    } 
    return etiquetasfiltro;
}


function crearSkillBarra(etiquetasfiltro){    
    
    etiquetasfiltro.forEach(etiqueta => {
        let random, randomresto, rojo, verde, azul;//declaracion de variables
        let ancho = 0;

        let divskills = document.createElement('div');//creacion de etiquetas
        let divskill = document.createElement('div');
        let divskillresto = document.createElement('div');
        let h6skill = document.createElement('h6');
        let h6skillresto = document.createElement('h6');

        divskills.classList.add('skills');//asignacion de clases de cada etiqueta creada
        divskill.classList.add('skill');
        divskillresto.classList.add('skillresto');

        divskills.id = `${etiqueta}container`;//asignacion de id
        divskill.id = `${etiqueta}`;
        divskillresto.id = `${etiqueta}100`;

        divskill.animationName = `${etiqueta}`;//asignacion de nombre para la ejecucion de la animacion keyframe
        divskillresto.animationName = `${etiqueta}100`;
        
        
        random = Math.floor(Math.random() * 100) + 1;//generacion de numero aleatorio para el porcentaje

        randomresto = 100 - random;//numero del porcentaje resto

        divskill.title = `${etiqueta}`.toUpperCase() +' '+`${random}%`;//asignacion de un titulo

        rojo = Math.floor(Math.random() * 256);//generacion de un numero aleatorio para la formacion de un color
        verde = Math.floor(Math.random() * 256);
        azul = Math.floor(Math.random() * 256);
        
        if (rojo < 150 && verde < 150 && azul < 150){//condicion que asigna un color mas claro a la etiqueta
            h6skill.style.color = 'rgb(250, 250, 250)';//de la barra de progreso
            divskill.style.borderRight = 'solid 2px white';
        }

        divskill.style.backgroundColor = `rgb(${rojo},${verde},${azul})`;//asignacion del color generado a la barra de progreso
        
        document.querySelector('.skillscontainer').appendChild(divskills);//mostrar los elementos creados
        document.getElementById(divskills.id).appendChild(divskill);
        document.getElementById(divskill.id).appendChild(h6skill);
        document.getElementById(divskills.id).appendChild(divskillresto);        
        document.getElementById(divskillresto.id).appendChild(h6skillresto);

        let observar = new IntersectionObserver((entries, observar) => {//esta funcion permite uniciar las animacion
            entries.forEach(entry => {                                  //nuevamente cuando las barra de progreso
                if (entry.isIntersecting) {                             //salen de pantalla y se vuelve a visualizar
                    crearanimacion(divskill.id, divskill.animationName, random);//funcion para la barra de progreso
                    crearanimacion(divskillresto.id, divskillresto.animationName, randomresto);//funcion para el resto de la barra de progreso
                    intervaloresto(ancho, randomresto, h6skillresto);//funcion que da inicio al intervalo
                    intervalo(ancho, random, h6skill, etiqueta);
                    //observar.disconnect(); // detiene la animacion
                }
            });
        });
        let progreso = document.getElementById(divskills.id);
        observar.observe(progreso);

    });
}

function crearanimacion(targetId, animationName, random) {
    let barraProgreso = document.getElementById(targetId);
    animacion(targetId, random);
    barraProgreso.style.animation = 'none';
    barraProgreso.offsetHeight;//forza a iniciar de nuevo
    barraProgreso.style.animation = `${animationName} 3s forwards`;
}


function animacion(id, random){
        let styleSheet = document.styleSheets[0];
        let keyframes = `
            @keyframes ${id} {                
                to { width: ${random}%; }
            }
        `;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);//inserta una nueva regla en css   
}

function intervaloresto(ancho, randomresto, etiquetaTexto){
    let interval = setInterval(function(){
        if (ancho >= randomresto){
            clearInterval(interval);
        }else{
            ancho++;
            etiquetaTexto.textContent = ancho + '%';
        }
    }, 30);//refresco en milisegundos
}

function intervalo(ancho, randomresto, etiquetaTexto, etiqueta){
    let interval = setInterval(function(){
        if (ancho >= randomresto){
            clearInterval(interval);
        }else{
            ancho++;
            etiquetaTexto.textContent = `${etiqueta}`.toUpperCase() + ` ${ancho}%`;
        }
    }, 30);
}

function crearSkillCircular(etiquetasfiltro) {
    etiquetasfiltro.forEach(etiqueta => {
        let random, color1, color2, color3;
        let ancho = 0;
        let divskill = document.createElement('div');
        let spannombre = document.createElement('span');
        let spannumero = document.createElement('span');
        let divskillcontenedor = document.createElement('div');
        let divskillcentro = document.createElement('div');
        let animInterval; // Variable para la animación

        divskill.classList.add('skillscircular');
        divskillcontenedor.classList.add('skillscircularcontenedor');
        spannombre.classList.add('skillscirculartextonombre');
        spannumero.classList.add('skillscirculartexto');
        divskillcentro.classList.add('skillscircularcentro');

        divskill.id = `${etiqueta}circulo`;
        divskillcontenedor.id = `${etiqueta}`;
        divskill.title = `${etiqueta}`.toUpperCase();
        divskillcentro.id = `${etiqueta}centro`;

        spannumero.id = 'numero';

        random = Math.floor(Math.random() * 100) + 1;

        spannombre.textContent = `${etiqueta}`.toUpperCase();
        //spannumero.textContent = '0%';

        color1 = generarColor();
        color2 = generarColor();
        color3 = generarColor();
        color4 = generarColor();
        document.querySelector('.skillscircularcontainer').appendChild(divskillcontenedor);
        document.getElementById(divskillcontenedor.id).appendChild(divskill);
        document.getElementById(divskillcontenedor.id).appendChild(spannombre);
        document.getElementById(divskill.id).appendChild(divskillcentro);
        document.getElementById(divskillcentro.id).appendChild(spannumero);

        // Función para detener la animación actual
        function stopAnimation() {
            if (animInterval) {
                clearInterval(animInterval);
                animInterval = null;
            }
        }

        // Función para iniciar la animación
        function startAnimation() {
            stopAnimation(); // Asegurarse de que no haya animaciones en curso

            let progreso = 0;
            animInterval = setInterval(() => {
                progreso += 1;
                spannumero.textContent = `${progreso}%`;
                divskill.style.background = `conic-gradient(${color1}, white, ${color2}, white, ${color3}, white, ${color4} ${progreso * 3.6}deg, bisque 0deg)`;
                //divskill.style.background = `conic-gradient(black, white, black, white, black, white, black ${progreso * 3.6}deg, bisque 0deg)`;
                if (progreso >= random) {
                    clearInterval(animInterval);
                    animInterval = null;
                }
            }, 30);
        }

        let observar = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                } else {
                    stopAnimation(); // Detener animación si el elemento no está visible
                }
            });
        }, { threshold: [0] });

        let progreso = document.getElementById(divskill.id);
        if (progreso) {
            observar.observe(progreso);
        }
    });
}


function generarColor(){
    rojo = Math.floor(Math.random() * 256);//generacion de un numero aleatorio para la formacion de un color
    verde = Math.floor(Math.random() * 256);
    azul = Math.floor(Math.random() * 256);
    return color = `rgb(${rojo},${verde},${azul})`;
}

function elegir(){
    //inicio();
    let elemento = document.getElementById('opciones');
    let valor = 0;
    valor = elemento.value;
    
    if (valor == 1){
        //location.reload()
        document.getElementById('barras').innerHTML='';
        document.getElementById('circulos').innerHTML='';
        //document.getElementById('containertorta').innerHTML=''


        document.getElementById('barras').hidden = false;
        document.getElementById('circulos').hidden = true;
        document.getElementById('containertorta').hidden = true;
       
        crearSkillBarra(inicio());
    }
    if (valor == 2){
        
        document.getElementById('barras').innerHTML='';
        document.getElementById('circulos').innerHTML='';
        //document.getElementById('containertorta').innerHTML=''
    
        document.getElementById('barras').hidden = true;
        document.getElementById('circulos').hidden = false;
        document.getElementById('containertorta').hidden = true;
        
        crearSkillCircular(inicio());
    }
    if (valor == 3){
        
        document.getElementById('barras').innerHTML='';
        document.getElementById('circulos').innerHTML='';
        //document.getElementById('containertorta').innerHTML=''
    
        document.getElementById('barras').hidden = true;
        document.getElementById('circulos').hidden = true;
        document.getElementById('containertorta').hidden = false;
        
        crearSkillTorta(inicio());
    }

}

function crearSkillTorta(etiquetasfiltro){ 

    // Obtener el elemento canvas y su contexto 2D
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Datos del gráfico
    let data = generarArrayRandom(etiquetasfiltro);
    let labels = etiquetasfiltro;
    let colors = generarArrayColores(etiquetasfiltro);

    // Calcular la suma total de los datos
    var total = data.reduce((sum, value) => sum + value, 0);

    // Ajustar tamaño del canvas para acomodar etiquetas y gráfico
    canvas.width = 600;
    canvas.height = 500; // Aumentar altura para más espacio

    // Variables para el ángulo inicial y el centro del gráfico
    var radius = 150;
    var centerX = canvas.width / 2;
    var centerY = canvas.height - radius - 40;

    // Ajustes para etiquetas horizontales centradas y dinámicas
    var labelWidth = 180;
    var labelSpacing = 20;
    var squareSize = 12;

    var currentX = 0;
    var currentY = 20;

    // Parámetros de animación
    var animationDuration = 1000;
    var startTime = null;

    // Función para dibujar el gráfico
    function drawChart(timestamp) {
        if (!startTime) startTime = timestamp;

        // Calcular el progreso de la animación
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / animationDuration, 1);

        // Limpiar el canvas antes de redibujar
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Variables para el ángulo inicial del gráfico
        var animStartAngle = 0;

        // Dibujar el gráfico de torta
        for (var i = 0; i < data.length; i++) {
            var sliceAngle = (data[i] / total) * 2 * Math.PI * progress;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, animStartAngle, animStartAngle + sliceAngle);
            ctx.closePath();

            ctx.fillStyle = colors[i];
            ctx.fill();

            animStartAngle += sliceAngle / progress;
        }

        // Dibujar el círculo blanco en el centro para simular un anillo
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius / 2, 0, 2 * Math.PI); // Cambia el tamaño del círculo blanco ajustando "radius / 2"
        ctx.fillStyle = "rgb(200,200,200)"; // Color blanco para el círculo
        ctx.fill();
        ctx.closePath();

        // Dibujar las etiquetas y cuadrados
        currentX = 0;
        currentY = 20;

        for (var i = 0; i < labels.length; i++) {
            var totalElementWidth = labelWidth + labelSpacing;

            if (currentX + totalElementWidth > canvas.width) {
                currentX = 0;
                currentY += 30;
            }

            ctx.fillStyle = colors[i];
            ctx.fillRect(currentX, currentY, squareSize, squareSize);

            ctx.fillStyle = "#000";
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(labels[i].toUpperCase() + " " + Math.round(data[i] * progress) + "%", centerX - canvas.width / 2 + currentX + squareSize + 10, currentY + squareSize / 2);
         
            currentX += totalElementWidth;
        }

        // Continuar la animación hasta que se complete
        if (progress < 1) {
            requestAnimationFrame(drawChart);
        }
    }

    // Función para reiniciar la animación
    function restartAnimation() {
        startTime = null;
        requestAnimationFrame(drawChart);
    }

    // Observador para reiniciar la animación cuando el canvas vuelve a entrar en la vista
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                restartAnimation();
            }
        });
    });

    // Observar el canvas
    observer.observe(canvas);

    // Llamar a la función para dibujar el gráfico al cargar la página
    requestAnimationFrame(drawChart);
}

function generarArrayColores(etiquetasfiltro){
    colores = [];
    for(let i = 0; i < etiquetasfiltro.length; i++){
        color = generarColor();       
        colores.push(color);
    } 
    return colores;
}

function generarArrayRandom(etiquetasfiltro){
    porcentajes = [];
    for(let i = 0; i < etiquetasfiltro.length; i++){
        random = Math.floor(Math.random() * 100) + 1        
        porcentajes.push(random);
    } 
    return porcentajes;
}

function recargar(){
    
    let opcion = document.getElementById('opciones').value;
    document.getElementById('barras').innerHTML='';
    document.getElementById('circulos').innerHTML='';

    if (opcion == 0){
        alert('Elija una opción');
    }
    if (opcion == 1){
        //crearSkillBarra();
        crearSkillBarra(inicio());
    }
    if (opcion == 2){
        crearSkillCircular(inicio());
    }
    if (opcion == 3){
        crearSkillTorta(inicio());
    }
}