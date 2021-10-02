/* cada id proviene de las que seteamos en el html*/
const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');
/* 2 variables para ayudar a controlar el cronómetro, una sirve para guardar el intervalo de aun segundo el crono, y la tora para saber cuánto tiempo paso*/
let stopwatchInterval;
let runningTime = 0;
/*función para utilizar las variables de arriba*/
const playPause = () => {
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        playPauseButton.classList.add('running');
        start();
    } else {
        playPauseButton.classList.remove('running'); /*si esta pausado,sacarle el running*/
        pause();
    }
}

const pause = () => {
    secondsSphere.style.animationPlayState = 'paused'; /*para cambiar la animación de la pelota a pausa*/
    clearInterval(stopwatchInterval);
}
const stop = () => { /*la interacción con el boton de stop(cuadrado)*/
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    secondsSphere.style.animation = 'none';
    playPauseButton.classList.remove('running');
    runningTime = 0; /*muy importante ponerle el 0 de vuelta, para cuando se pare totalmente figure el 0*/
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00';
}

const start = () => { /*cuando se quiere empezar, hay que hacer que se mueva la animación. como?: utilizando el secondsSphere*/
    secondsSphere.style.animation = 'rotacion 60s linear infinite';
    let startTime = Date.now() - runningTime; /*para setear el tiempo del inicio*/
    secondsSphere.style.animationPlayState = 'running';
    stopwatchInterval = setInterval( () => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);/* calcular cuantó tiempo paso: seria los milisegundos del momento(datenow) - starttime(arranque).*/
    }, 1000)
}

const calculateTime = runningTime => { /* math floor lo utilice para poder sacarle el valor decimal al total (resultado)*/
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0"); /* ese signo de porcentaje al lado del 60 es el modulo, porque cuando lleguemos a los segundos 60, no queremos que siga en 61..62..63 es como un limite de retorno*/
    const display_minutes = total_minutes.toString().padStart(2, "0"); /* no le puse al minuto, xq quiero que siga asi vemos cuantos minutos reales llevamos, el 0 en string para que siempre vaya un 0 adelante*/

    return `${display_minutes}:${display_seconds}`
}
