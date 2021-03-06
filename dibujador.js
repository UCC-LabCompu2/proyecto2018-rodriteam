/* Rodrigo Pizarro - Laboratorio de computacion 2 */
let longitudDeOnda;
let altoRendija;
let distancia;

//Valores de las unidades
let unidadLongitudDeOnda;
let unidadDistancia;
let unidadAltoRendija;

let canvas;
let ctx;

//Valores de los parametros luego del cambio de unidades correspondiente
let lon;
let an;
let dis;

let objeto;
let rendija;

//contadores globales
let cont;
let cont2;

/**
 * Funcion que se ejecuta en un principio para setear algunos valores iniciales y obtener
 * los elementos necesarios del HTML
 * @function init
 * @param
 * @return
 */
function init() {
    cont = 0;
    cont2 = 0;
    longitudDeOnda = document.getElementById("input1");
    altoRendija = document.getElementById("input2");
    distancia = document.getElementById("input3");
    unidadLongitudDeOnda = document.getElementById("label1");
    unidadAltoRendija = document.getElementById("label2");
    unidadDistancia = document.getElementById("label3");
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    lon = 1;
    an = 1;
    dis = 1;
    objeto = {
        ancho: 10,
        alto: canvas.height,
    };
    switch (unidadAltoRendija.selectedIndex) {
        case 0:
            rendija = {
                ancho: objeto.ancho,
                alto: altoRendija.value,
            };
            break;
        case 1:
            rendija = {
                ancho: objeto.ancho,
                alto: altoRendija.value * 0.0254,
            };
            break;
        case 2:
            rendija = {
                ancho: objeto.ancho,
                alto: altoRendija.value * 0.3048,
            };
            break;
        case 3:
            rendija = {
                ancho: objeto.ancho,
                alto: altoRendija.value * 0.9144,
            };
            break;
    }
}

/**
 * Funcion que realiza los cambios de unidad y chequea errores en los datos ingresados
 * @function calcular
 * @param
 * @return
 */
function calcular() {
    cont = 0;
    cont2 = 0;

    let auxDis,auxAn,auxLon;
    let minDis,minAn,minLon;
    switch (unidadAltoRendija.selectedIndex) {
        case 0:
            auxAn = altoRendija.value;
            minAn = 1;
            break;
        case 1:
            auxAn = altoRendija.value * 0.0254;
            minAn = 39.3701;
            break;
        case 2:
            auxAn = altoRendija.value * 0.3048;
            minAn = 3.28084;
            break;
        case 3:
            auxAn = altoRendija.value * 0.9144;
            minAn = 1.09361;
            break;
    }
    switch (unidadDistancia.selectedIndex) {
        case 0:
            auxDis = distancia.value;
            minDis = 1;
            break;
        case 1:
            auxDis = distancia.value * 0.0254;
            minDis = 39.3701;
            break;
        case 2:
            auxDis = distancia.value * 0.3048;
            minDis = 3.28084;
            break;
        case 3:
            auxDis = distancia.value * 0.9144;
            minDis = 1.09361;
            break;
    }
    switch (unidadLongitudDeOnda.selectedIndex) {
        case 0:
            auxLon = longitudDeOnda.value;
            minLon = 1;
            break;
        case 1:
            auxLon = longitudDeOnda.value * 0.0254;
            minLon = 39.3701;
            break;
        case 2:
            auxLon = longitudDeOnda.value * 0.3048;
            minLon = 3.28084;
            break;
        case 3:
            auxLon = longitudDeOnda.value * 0.9144;
            minLon = 1.09361;
            break;
    }
    //Comprobación de los campos
    if (auxLon > 15 || auxLon < 1){
        alert("El valor de Longitud de onda debe ir entre " + minLon + " y " + minLon*15);
        return;
    }
    if(auxAn > 20|| auxAn < 1){
        alert("El valor del ancho de la rendija debe ir entre " + minAn + " y " + minAn*15);
        return;
    }
    if(auxDis > 10|| auxDis < 1){
        alert("El valor de la distancia a debe ir entre " + minDis + " y " + minDis*10);
        return;
    }
    lon = auxLon;
    an = auxAn;
    dis = auxDis;
    rendija.alto = an;
}

/**
 * Function encargada de dibujar en el canvas segun los parametros ingresados y hacer la animación
 * @function dibujar
 * @param
 * @return
 */
function dibujar(){
    if(canvas) {
        //Limpia el canvas antes de dibujar nuevamente
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Lineas de luz
        for (let i = 0; i < cont; i++) {
            ctx.beginPath();
            ctx.moveTo(i * lon, 0);
            ctx.lineTo(i * lon, 150);
            ctx.strokeStyle = "#FFAAAA";
            ctx.stroke();
        }
        if (cont * lon < 70) {
            cont++;
        } else {
            //Arcos de luz
            for (let i = 0; i < cont2; i++) {
                ctx.beginPath();
                ctx.arc(80, 75, i * lon, Math.PI / 2, -Math.PI / 2, true);
                ctx.strokeStyle = "#FFAAAA";
                ctx.stroke();
            }
            if (cont2 * lon < 250) cont2++;
        }

        //Cota rendija
        ctx.beginPath();
        ctx.moveTo(40, 50);
        ctx.lineTo(3, 50);
        ctx.moveTo(40, 50);
        ctx.lineTo(70, objeto.alto / 2 - rendija.alto / 2);
        ctx.strokeStyle = "#008000";
        ctx.stroke();

        //texto cota rendija
        ctx.beginPath();
        ctx.fillStyle = "#008000";
        ctx.font = "bold 10px arial";
        let anc = "Ancho = " + an + "mm";
        ctx.fillText(anc, 3, 45);

        //Fondo vertical eje
        ctx.beginPath();
        ctx.rect(250, 0, 300, 300);
        ctx.fillStyle = "#008000";
        ctx.fill();
        ctx.closePath();

        //Objeto
        ctx.beginPath();
        ctx.rect(70, 0, objeto.ancho, objeto.alto);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();

        //Rendija
        ctx.beginPath();
        ctx.rect(70, objeto.alto / 2 - rendija.alto / 2, rendija.ancho, rendija.alto);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.closePath();

        //Cota de distancia
        ctx.beginPath();
        ctx.moveTo(80, 140);
        ctx.lineTo(250, 140);

        ctx.moveTo(244, 137);
        ctx.lineTo(250, 140);
        ctx.moveTo(244, 143);
        ctx.lineTo(250, 140);

        ctx.moveTo(86, 137);
        ctx.lineTo(80, 140);
        ctx.moveTo(86, 143);
        ctx.lineTo(80, 140);

        ctx.strokeStyle = "#0000FF";
        ctx.stroke();

        //Texto de cota distancia
        ctx.beginPath();
        ctx.fillStyle = "#0000FF";
        ctx.font = "bold 10px arial";
        let dist = "Distancia = " + dis + "mts";
        ctx.fillText(dist, 130, 135);

        //Texto de cota longitud de onda
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.font = "bold 10px arial";
        let long = "Longitud de Onda = " + lon + "mm";
        ctx.fillText(long, 120, 10);

        //Funcion sinc2
        for (let y = -80; y < 80; y++) {
            ctx.beginPath();
            if (y === 1) {
                ctx.moveTo(180, 75);
            } else {
                ctx.moveTo(-70 * Math.pow(Math.sin(((y - 1) * 40 * Math.PI * an) / (lon * dis * 1000)) / (((y - 1) * 40 * Math.PI * an) / (lon * dis * 1000)), 2) + 250, (y - 1) + 75);
            }
            if (y === 0) {
                ctx.lineTo(180, 75);
            } else {
                ctx.lineTo(-70 * Math.pow(Math.sin(((y) * 40 * Math.PI * an) / (lon * dis * 1000)) / (((y) * 40 * Math.PI * an) / (lon * dis * 1000)), 2) + 250, (y) + 75);
            }
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        }

        //Cota punto de intensidad 0
        ctx.beginPath();
        ctx.moveTo(260, 75);
        ctx.lineTo(260, 75 - lon * dis * 25 / an);
        ctx.moveTo(265, 75);
        ctx.lineTo(245, 75);
        ctx.moveTo(265, 75);
        ctx.lineTo(245, 75);
        ctx.moveTo(270, 75 - lon * dis * 25 / an);
        ctx.lineTo(250, 75 - lon * dis * 25 / an);
        ctx.strokeStyle = "#000";
        ctx.stroke();

        //Texto de cota longitud de onda
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.font = "bold 8px arial";
        let ye = "Y = " + lon * dis / an + "mm";
        ctx.fillText(ye, 267, 60);

        //Eje punteado
        for (let i = -1; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 20 + 15, 75);
            ctx.lineTo(i * 20 + 30, 75);
            ctx.strokeStyle = "#008000";
            ctx.stroke();
        }
    }
}
//Llamada cada 30ms de la funsion dibujar
setInterval(dibujar, 30);
