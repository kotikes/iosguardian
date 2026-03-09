const timeBlock = document.getElementById('time');
let time = timeBlock.textContent;

let [minutes, seconds] = time.split(':').map(Number);

function updateTime() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    }

    const formattedTime =
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    timeBlock.textContent = formattedTime;

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
    }
}

const timer = setInterval(updateTime, 1000);

const popupOpen = function (){
    setTimeout(function (){
        const popup = document.querySelector("#popUp");
        popup.classList.add("active");

    },1000)
}

popupOpen()