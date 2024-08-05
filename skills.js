let etiquetas = ["css","html","js","java","sql","xampp","netbeans","vs-code","visual-foxpro",
                "coreldraw","office","windows","postman"];//array con etiquetas
let etiquetasfiltro = [];//array vacio
let longitud = Math.floor(Math.random() * (0 - etiquetas.length)) + etiquetas.length;

for(let i = 0; i <= longitud; i++){
    let indice = Math.floor(Math.random() * etiquetas.length);
    etiquetasfiltro.push(etiquetas[indice]);
    etiquetas.splice(indice, 1);
}

function crearSkill(){    
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
        
        
        random = Math.floor(Math.random() * (1 - 100 + 1)) + 100;//generacion de numero aleatorio para el porcentaje

        randomresto = 100 - random;//numero del porcentaje resto

        divskill.title = `${etiqueta}`.toUpperCase() +' '+`${random}%`;//asignacion de un titulo

        //h6skill.textContent = divskill.id.toUpperCase() +" "+ random+"%";//el texto que muestra las etiquetas h6 creadas
        //h6skillresto.textContent = 100 - random+"%";

        rojo = Math.floor(Math.random() * (0 - 255 + 1)) + 255;//generacion de un numero aleatorio para la formacion de un color
        verde = Math.floor(Math.random() * (0 - 255 + 1)) + 255;
        azul = Math.floor(Math.random() * (0 - 255 + 1)) + 255;
        
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
            etiquetaTexto.textContent = etiqueta.toUpperCase()+' '+ancho + '%';
        }
    }, 30);
}

crearSkill();