
// variables for buttons
const timerStart = document.querySelector('#start')
const timerReset = document.querySelector('#stop')

// variable for displaying timer
let timer = document.querySelector('.stopwatch__time')

// variable for save time
let overAllButtons = document.querySelector('.stopwatch__buttons')

// variable for savetime button
const createSaveTimeBtn = document.createElement('button')

// variable for timer container
const stopWatchCon = document.querySelector('.stopwatch') 

// variable for time
let hours = 0
let minutes = 0
let seconds = 0

let leadingHours = 0
let leadingMinutes = 0
let leadingSeconds = 0

// variable for interval and start pause
let stopWatchInterval = null
let startPause = "started"

// variables for saved time
let savedTimeCon = document.createElement('section')

let createTimeCon = null
let inserTimeElement = null



// even listener with function
timerStart.addEventListener('click',() => {
    if (startPause === "stopped"){
        startPause = "started"
        window.clearInterval(stopWatchInterval)
        timerStart.innerHTML = `<i class="fa-solid fa-play" id="play"></i>`
    } else {
        startPause = "stopped"
        stopWatchInterval = window.setInterval(stopWatch, 1) 
        timerStart.innerHTML = `<i class="fa-solid fa-pause" id="pause"></i>`

        createSaveTimeBtn.setAttribute('class', 'stopwatch__btn stopwatch__btn--save-time')
        createSaveTimeBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i>`
        overAllButtons.appendChild(createSaveTimeBtn)
    }
})

timerReset.addEventListener('click', ()=> {
    startPause = "started"
    hours = 0
    minutes = 0
    seconds = 0
    timer.innerHTML = `00:00:00`
    timerStart.innerHTML = `<i class="fa-solid fa-play" id="play"></i>`
    savedTimeCon.innerHTML = null;
    overAllButtons.removeChild(createSaveTimeBtn)
    window.clearInterval(stopWatchInterval)
})

overAllButtons.addEventListener('click', e => {
    createTimeCon = document.createElement('div')
    inserTimeElement = document.createElement('time')
    let savedTime = timer.innerText;

    if(e.target.classList.contains('stopwatch__btn--save-time') || e.target.classList.contains('fa-bookmark')) {
       
        createTimeCon.appendChild(inserTimeElement)
        inserTimeElement.innerText = savedTime
        stopWatchCon.appendChild(savedTimeCon)
        savedTimeCon.setAttribute('class', 'stopwatch__bookmark stopwatch__bookmark--active')
        savedTimeCon.prepend(createTimeCon)
        /* Optional
        // set element on the first child
        savedTimeCon.firstElementChild.setAttribute('class', 'firstelement')
        // remove the sibling's attribute of the first child
        savedTimeCon.firstElementChild.nextElementSibling.classList.remove('firstelement')
        */
    }
})

function stopWatch() {
    timerCount()
    fixedZeros()
    timer.innerHTML = `${leadingHours}:${leadingMinutes}:${leadingSeconds}`
}

function timerCount() {
    seconds++
    if(seconds === 60){
        seconds = 0
        minutes++
    } else if (minutes === 60){
        minutes = 0
        hours++
    }
}

function fixedZeros() {
    if(seconds < 10) {
        leadingSeconds = "0" + seconds.toString()
        if (minutes < 10) {
            leadingMinutes = "0" + minutes.toString()
            if(hours < 10){
                leadingHours = "0" + hours.toString()
            } else {
                leadingHours = hours
            }
        } else {
            leadingMinutes = minutes
        }
    } else {
        leadingSeconds = seconds
    }
}

function removeSavedTimes(elements){
    for(var i = 0; i < elements.length; i++){
        elements[i].parentNode.removeChild(elements[i]);
    }
}

console.log(removeSavedTimes(inserTimeElement))


