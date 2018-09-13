'use strict';

function logCoords(x, y) {
    console.log(x, y);
}

function throttle(f, delay) {
    let ready = true;
    let lastArgs = null;
    let lastThis = null;

    return function wrapper(...args) {
        if (!ready) {
            lastArgs = args;
            lastThis = this;

            return;
        }

        lastArgs  = null;
        lastThis = null;

        ready = false;
        f.apply(this, args);

        setTimeout(() => {
            ready = true;
            if (lastArgs) {
                wrapper.apply(lastThis, lastArgs);
            }
        }, delay);
    }
}

let logCoordsThrottled = throttle(logCoords, 500);
document.addEventListener('mousemove', e => {
    logCoordsThrottled(e.clientX, e.clientY);
})


function debounce(f, delay) {
    let timerId;

    return function wrapper(...args) {

        clearTimeout(timerId);

        timerId = setTimeout(() => {
            f.apply(this, args);
        }, delay);
        console.log(timerId);
    }
}

let getDataWithDebounce = debounce(getData, 2000);

let input = document.querySelector('input');
input.addEventListener('input', () => {
    getData(input.value);
});