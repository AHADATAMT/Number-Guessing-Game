const playBtn = document.querySelectorAll('.play-btn')[0];
const process = document.getElementById('process');
const messBox = document.querySelectorAll('#mess > span')[0];

let cd, ranNum, timesGuessing_i, times;

process.addEventListener('click', function (event) {
    let aClk = event.target;
    let valueClk = parseInt(aClk.innerText);

    if (aClk.classList[0] == 'x') {
        if (valueClk !== ranNum) {
            aClk.classList.add('wrong');
            timesGuessing_i--;
            times.innerHTML = timesGuessing_i;
        } else if (valueClk === ranNum) {
            status();
        }

        clearInterval(cd);
        countDown();
        supportMess(valueClk);
        if (timesGuessing_i < 0) {
            status(false);
        }
    }
});

playBtn.addEventListener('click', function () {

  
    timesGuessing_i = 10;
    ranNum = randomNumber();
    console.log(`ranNum = ${ranNum}`);

    // setup time guessing
    times = document.querySelectorAll('#times  span')[0];
    times.innerHTML = timesGuessing_i;
    messBox.innerHTML = '<img class="conv" src="img/fighting.gif" alt="">';
    // setup countdown time
    countDown();
    playBtn.classList.add('animated', 'bounceOutDown');
    showNumberTable();
});

function supportMess(valueClk) {

    if (Math.abs(valueClk - ranNum) <= 10) {
        messBox.innerHTML = '<img class="conv" src="img/close.gif" alt="">';
        return;
    }

    if (valueClk < ranNum)
        messBox.innerHTML = '<img class="conv" src="img/low.gif" alt="">';
    else if (valueClk > ranNum)
        messBox.innerHTML = '<img class="conv" src="img/high.gif" alt="">';

}

function countDown() {
    var countDownDate = new Date().getTime() + 31000;

    cd = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.querySelector("#countdown span").innerHTML = seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(cd);
            document.querySelector("#countdown span").innerHTML = "Time's up!";
            status(false);
        }
    }, 100);
}

function randomNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

drawNumberTable();
function drawNumberTable() {
    console.log('Draw table');
    const numberTable = document.getElementById('number-table');

    for (let i = 1; i <= 100; i++) {
        if (i % 10 == 0) {
            numberTable.insertAdjacentHTML('beforeend', `<a href="#" class="x"> ${i} </a><br>`);
        } else {
            numberTable.insertAdjacentHTML('beforeend', `<a href="#" class="x"> ${i} </a>`);

        }
    }
}
function showNumberTable() {
    process.classList.remove('d-none');
    process.classList.add('animated', 'tada');
}

function status(result = true) {
    if (result) {
        process.classList.add('d-none');
        document.querySelector('#start-screen').innerHTML = "<h1>WIN!!!!!!</h1><p>Press F5 to Restart</p>"
    } else {
        process.classList.add('d-none');
        document.querySelector('#start-screen').innerHTML = "<h1>Game Over!</h1><p>Press F5 to Restart</p>"
    }
}