// Obtener referencias a los elementos DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

let timeRunning = 3000; // Tiempo de transición
let timeAutoNext = 7000; // Tiempo para el cambio automático

// Funcionalidad para los botones de navegación
nextDom.onclick = function() {
    showSlider('next');
}

prevDom.onclick = function() {
    showSlider('prev');
}

// Iniciar la rotación automática del carrusel
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Función para mostrar el siguiente/previo ítem en el carrusel
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

// Añadir eventos de clic a las miniaturas para cambiar el carrusel
thumbnailItemsDom.forEach((thumbnailItem, index) => {
    thumbnailItem.addEventListener('click', () => {
        jumpToSlide(index);
    });
});

// Función para saltar a una imagen específica del carrusel
function jumpToSlide(index) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');

    // Obtener el índice actual del primer ítem
    let currentFirstItemIndex = [...SliderItemsDom].indexOf(SliderDom.firstElementChild);

    // Calcular la diferencia de índice
    let diff = index - currentFirstItemIndex;

    // Determinar la dirección de la transición
    if (diff > 0) {
        // Si la diferencia es positiva, mover los ítems hacia adelante
        for (let i = 0; i < diff; i++) {
            SliderDom.appendChild(SliderItemsDom[i]);
        }
    } else {
        // Si la diferencia es negativa, mover los ítems hacia atrás
        for (let i = diff; i < 0; i++) {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        }
    }

    // Actualizar la clase "selected" en las miniaturas
    thumbnailItemsDom.forEach((thumbnail, i) => {
        if (i === index) {
            thumbnail.classList.add('selected');
        } else {
            thumbnail.classList.remove('selected');
        }
    });

    // Detener y reiniciar el temporizador automático
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}
